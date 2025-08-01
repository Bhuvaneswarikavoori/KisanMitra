// seed_guntur.js
// This script populates a MongoDB database with dummy data for the Kisan Mitra platform,
// specifically tailored to users and locations within the Guntur district, Andhra Pradesh.
// Data values intended for the UI are stored in Telugu.

const mongoose = require('mongoose');

// --- CONFIGURATION ---
const MONGO_URI = 'mongodb://localhost:27017/kisan_mitra_db';

// --- Reusable Location Schema ---
// This sub-document schema is used within other models to store location data consistently.
const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { _id: false });


// =================================================================
// --- MODEL DEFINITIONS ---
// =================================================================

// 1. User Model: Represents an individual user of the platform.
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    language: { type: String, required: true, default: 'telugu' },
    location: { type: locationSchema, required: true },
    capabilities: [{ type: String, enum: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER', 'LEADER'] }],
}, { timestamps: true });

// 2. Farm Model: Represents a single parcel of land owned by a user.
const farmSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    farmName: { type: String, required: true },
    areaInAcres: { type: Number, required: true },
    boundary: {
        type: { type: String, enum: ['Polygon'], required: true },
        coordinates: { type: [[[Number]]], required: true },
    },
    waterSource: { type: String, enum: ['BOREWELL', 'CANAL', 'RAIN_FED', 'RIVER'], required: true },
}, { timestamps: true });

// 3. CropMaster Model: A lookup table for crop types.
const cropMasterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    scientificName: { type: String }
});

// 4. CropInstance Model: Tracks a specific crop being grown on a specific farm.
const cropInstanceSchema = new mongoose.Schema({
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cropMasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CropMaster', required: true },
    sowingDate: { type: Date },
    status: { type: String, enum: ['PREPARING', 'GROWING', 'HARVESTED', 'SOLD'], required: true },
    timeline: [{
        timestamp: { type: Date, required: true },
        type: { type: String, required: true },
        data: { type: mongoose.Schema.Types.Mixed },
    }],
}, { timestamps: true });

// 5. LabourProfile Model: Stores the skills and rates for a user who is a labourer.
const labourProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skills: [String],
    ratePerDay: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

// 6. LabourGroup Model: Represents a team of labourers led by a user.
const labourGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// 7. Equipment Model: Represents a piece of machinery owned by a user for rental.
const equipmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['TRACTOR', 'HARVESTER', 'TILLER', 'PROCLAIN'], required: true },
    modelName: { type: String, required: true },
    rate: {
        amount: { type: Number, required: true },
        unit: { type: String, enum: ['HOUR', 'DAY'], required: true },
    },
    location: { type: locationSchema, required: true },
    photoUrl: { type: String, required: false },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

// 8. Posting Model: A marketplace listing for a need (e.g., "needs labour").
const postingSchema = new mongoose.Schema({
    postedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['NEEDS_LABOUR', 'NEEDS_EQUIPMENT'], required: true },
    details: { type: mongoose.Schema.Types.Mixed, required: true },
    location: { type: locationSchema, required: true },
    status: { type: String, enum: ['OPEN', 'FILLED', 'EXPIRED', 'CANCELLED'], default: 'OPEN' },
}, { timestamps: true });

// 9. Booking Model: Represents a confirmed agreement between a farmer and a provider.
const bookingSchema = new mongoose.Schema({
    postingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posting', required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: {
        id: { type: mongoose.Schema.Types.ObjectId, required: true },
        type: { type: String, enum: ['USER', 'GROUP'], required: true },
    },
    status: { type: String, enum: ['CONFIRMED', 'CANCELLED_BY_FARMER', 'CANCELLED_BY_PROVIDER', 'COMPLETED'], default: 'CONFIRMED' },
}, { timestamps: true });

// 10. Schedule Model: An entry in a resource's universal calendar, preventing double-booking.
const scheduleSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resourceType: { type: String, enum: ['LABOUR', 'EQUIPMENT'], required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
}, { timestamps: true });


// --- Compiling Schemas into Models ---
const User = mongoose.model('User', userSchema);
const Farm = mongoose.model('Farm', farmSchema);
const CropMaster = mongoose.model('CropMaster', cropMasterSchema);
const CropInstance = mongoose.model('CropInstance', cropInstanceSchema);
const LabourProfile = mongoose.model('LabourProfile', labourProfileSchema);
const LabourGroup = mongoose.model('LabourGroup', labourGroupSchema);
const Equipment = mongoose.model('Equipment', equipmentSchema);
const Posting = mongoose.model('Posting', postingSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);


// =================================================================
// --- MAIN SEEDING FUNCTION ---
// =================================================================
async function seedDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connection successful.');

        console.log('Clearing old data...');
        await Promise.all(Object.values(mongoose.models).map(model => model.deleteMany({})));
        console.log('Old data cleared.');

        console.log('Seeding new Guntur district data...');

        // --- Create Master Crop Data in Telugu ---
        const crops = await CropMaster.insertMany([
            { name: 'వరి', scientificName: 'Oryza sativa' },      // Paddy
            { name: 'మిర్చి', scientificName: 'Capsicum annuum' }, // Chilli
            { name: 'కంది', scientificName: 'Cajanus cajan' },    // Pigeon Pea
        ]);
        const variCrop = crops.find(c => c.name === 'వరి');
        const mirchiCrop = crops.find(c => c.name === 'మిర్చి');
        const kandhiCrop = crops.find(c => c.name === 'కంది');

        // --- Create Users ---
        const users = await User.insertMany([
            {
                phone: '9876543210', name: 'అంజమ్మ (Anjamma)',
                location: { type: 'Point', coordinates: [80.45, 16.30], address: '1-23, Arundelpet, Guntur' },
                capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'],
            },
            {
                phone: '9876543211', name: 'రామారావు (RamaRao)',
                location: { type: 'Point', coordinates: [80.62, 16.29], address: '4-56, Main Road, Mangalagiri' },
                capabilities: ['FARM_OWNER', 'LABOURER'],
            },
            {
                phone: '9876543212', name: 'మల్లికార్జున రావు (Malli Karjuna Rao)',
                location: { type: 'Point', coordinates: [80.44, 16.35], address: '7-89, Pattabhipuram, Guntur' },
                capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'],
            },
            {
                phone: '9876543213', name: 'కాసమ్మ (Kaasamma)',
                location: { type: 'Point', coordinates: [80.60, 16.28], address: 'Near Bus Stand, Mangalagiri' },
                capabilities: ['LABOURER', 'LEADER'],
            },
            {
                phone: '9876543214', name: 'సుబ్బారావు (Subba Rao)',
                location: { type: 'Point', coordinates: [80.61, 16.28], address: 'Vidya Nagar, Mangalagiri' },
                capabilities: ['LABOURER'],
            },
            {
                phone: '9876543215', name: 'నాగమణి (Nagamani)',
                location: { type: 'Point', coordinates: [80.62, 16.27], address: 'Temple Street, Mangalagiri' },
                capabilities: ['LABOURER'],
            }
        ]);
        const [anjamma, ramaRao, malliKarjunaRao, kaasamma, subbaRao, nagamani] = users;

        // --- Create Farms ---
        const farms = await Farm.insertMany([
            { userId: anjamma._id, farmName: "Tenali Road Farm", areaInAcres: 8, boundary: { type: 'Polygon', coordinates: [[ [80.50, 16.25], [80.51, 16.26], [80.52, 16.25], [80.50, 16.25] ]] }, waterSource: 'CANAL' },
            { userId: ramaRao._id, farmName: "Krishna River Bank Plot", areaInAcres: 12, boundary: { type: 'Polygon', coordinates: [[ [80.65, 16.30], [80.66, 16.31], [80.67, 16.30], [80.65, 16.30] ]] }, waterSource: 'RIVER' },
            { userId: malliKarjunaRao._id, farmName: "Prathipadu Farm", areaInAcres: 15, boundary: { type: 'Polygon', coordinates: [[ [80.35, 16.40], [80.36, 16.41], [80.37, 16.40], [80.35, 16.40] ]] }, waterSource: 'BOREWELL' },
        ]);
        const [anjammaFarm, ramaRaoFarm] = farms;

        // --- Create Crop Instances for Anjamma ---
        await CropInstance.insertMany([
            { farmId: anjammaFarm._id, userId: anjamma._id, cropMasterId: variCrop._id, status: 'GROWING', sowingDate: new Date('2025-06-20') },
            { farmId: anjammaFarm._id, userId: anjamma._id, cropMasterId: mirchiCrop._id, status: 'PREPARING' },
            { farmId: anjammaFarm._id, userId: anjamma._id, cropMasterId: kandhiCrop._id, status: 'PREPARING' },
        ]);

        // --- Create Labour Profiles ---
        await LabourProfile.insertMany([
            { userId: anjamma._id, skills: ['మిర్చి కోత', 'కలుపు తీయుట'], ratePerDay: 550 },
            { userId: ramaRao._id, skills: ['వరి నాట్లు', 'పురుగుమందు పిచికారీ'], ratePerDay: 600 },
            { userId: kaasamma._id, skills: ['వరి కోత', 'కలుపు తీయుట', 'నాయకత్వం'], ratePerDay: 650 },
            { userId: subbaRao._id, skills: ['వరి కోత', 'వరి నాట్లు'], ratePerDay: 500 },
            { userId: nagamani._id, skills: ['మిర్చి కోత', 'కలుపు తీయుట'], ratePerDay: 500 },
        ]);

        // --- Create Labour Group led by Kaasamma ---
        const groups = await LabourGroup.insertMany([
            { name: "కాసమ్మ దళం (Kaasamma Team)", leaderId: kaasamma._id, members: [kaasamma._id, subbaRao._id, nagamani._id] }
        ]);
        const kaasammaGroup = groups[0];

        // --- Create Equipment ---
        await Equipment.insertMany([
            { userId: malliKarjunaRao._id, type: 'HARVESTER', modelName: 'Standard H140 (Paddy Machine)', rate: { amount: 3000, unit: 'HOUR' }, location: malliKarjunaRao.location },
            { userId: anjamma._id, type: 'TILLER', modelName: 'Generic Power Tiller', rate: { amount: 4000, unit: 'DAY' }, location: anjamma.location },
        ]);

        // --- SCENARIO: RamaRao needs labour for his farm ---
        const postings = await Posting.insertMany([
            {
                postedByUserId: ramaRao._id,
                type: 'NEEDS_LABOUR',
                details: {
                    farmId: ramaRaoFarm._id, task: 'వరి కోత (Paddy Harvesting)', requiredCount: 3, offeredRatePerDay: 650,
                    startDate: new Date('2025-10-15'), endDate: new Date('2025-10-18'),
                },
                location: { type: 'Point', coordinates: ramaRaoFarm.boundary.coordinates[0][0], address: 'RamaRao Farm, Near Krishna River' },
            }
        ]);
        const ramaRaoPosting = postings[0];

        // --- SCENARIO: Kaasamma's group accepts the job ---
        const bookings = await Booking.insertMany([
            {
                postingId: ramaRaoPosting._id, farmerId: ramaRao._id,
                provider: { id: kaasammaGroup._id, type: 'GROUP' }, status: 'CONFIRMED',
            }
        ]);
        const confirmedBooking = bookings[0];

        // --- Create Schedule entries for Kaasamma's group members ---
        await Schedule.insertMany(
            kaasammaGroup.members.map(memberId => ({
                resourceId: memberId, resourceType: 'LABOUR', bookingId: confirmedBooking._id,
                startTime: new Date('2025-10-15T09:00:00'), endTime: new Date('2025-10-18T17:00:00'),
            }))
        );

        await Posting.findByIdAndUpdate(ramaRaoPosting._id, { status: 'FILLED' });

        console.log('✅ Guntur district data seeding complete.');

    } catch (error) {
        console.error('❌ An error occurred during seeding:', error);
    } finally {
        console.log('Closing MongoDB connection...');
        await mongoose.connection.close();
        console.log('Connection closed.');
    }
}

// Run the seeder
seedDatabase();