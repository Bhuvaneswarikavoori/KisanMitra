// seed_v6_fully_bilingual.js
// Final, complete, and self-contained script with full model definitions.
// ALL user-facing data, including system values like status and categories, is now bilingual.

const mongoose = require('mongoose');

// --- CONFIGURATION ---
const MONGO_URI = 'mongodb://localhost:27017/kisan_mitra_db';

// =================================================================
// --- BILINGUAL MODEL DEFINITIONS (FINAL) ---
// =================================================================

// --- Reusable Bilingual & Location Schemas ---
const bilingualSchema = new mongoose.Schema({ te: String, en: String }, { _id: false });
const locationSchema = new mongoose.Schema({ type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true }, address: { type: String, required: true } }, { _id: false });

// --- Collection Schemas ---
const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    name: { type: bilingualSchema, required: true },
    language: { type: String, enum: ['te', 'en'], default: 'te' },
    capabilities: [{ type: String, enum: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER', 'LEADER'] }],
}, { timestamps: true });

const farmSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    farmName: { type: bilingualSchema, required: true },
    areaInAcres: { type: Number, required: true },
    waterSource: { type: bilingualSchema, required: true }, // UPDATED
}, { timestamps: true });

const cropMasterSchema = new mongoose.Schema({
    name: { type: bilingualSchema, required: true },
});

const cropInstanceSchema = new mongoose.Schema({
    farmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cropMasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CropMaster', required: true },
    status: { type: bilingualSchema, required: true }, // UPDATED
    expenses: [{ category: { type: bilingualSchema }, amount: Number }], // UPDATED
    revenue: { type: Number, default: 0 },
}, { timestamps: true });

const labourProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skills: [bilingualSchema],
    ratePerDay: { type: Number, required: true },
}, { timestamps: true });

const labourGroupSchema = new mongoose.Schema({
    name: { type: bilingualSchema, required: true },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const equipmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: bilingualSchema, required: true },
    modelName: { type: String, required: true },
    rate: { amount: { type: Number, required: true }, unit: { type: bilingualSchema } }, // UPDATED
}, { timestamps: true });

const postingSchema = new mongoose.Schema({
    postedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['NEEDS_LABOUR', 'NEEDS_EQUIPMENT'], required: true }, // Programmatic key
    details: { type: mongoose.Schema.Types.Mixed, required: true },
    location: { type: locationSchema, required: true },
    status: { type: String, enum: ['OPEN', 'FILLED', 'EXPIRED'], default: 'OPEN' }, // Programmatic key
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
    postingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posting', required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { id: { type: mongoose.Schema.Types.ObjectId, required: true }, type: { type: String, enum: ['USER', 'GROUP'] } },
    status: { type: String, enum: ['CONFIRMED', 'COMPLETED'], default: 'CONFIRMED' }, // Programmatic key
    totalCost: { type: Number, required: true },
}, { timestamps: true });

const scheduleSchema = new mongoose.Schema({
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resourceType: { type: String, enum: ['LABOUR', 'EQUIPMENT'], required: true }, // Programmatic key
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
}, { timestamps: true });

const marketPriceSchema = new mongoose.Schema({
    cropMasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'CropMaster', required: true },
    marketName: { type: bilingualSchema, required: true },
    location: { type: locationSchema, required: true },
    pricePerQuintal: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

// --- Compile Models ---
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
const MarketPrice = mongoose.model('MarketPrice', marketPriceSchema);

// --- MAIN SEEDING FUNCTION ---
async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Clearing all collections...');
        await Promise.all(Object.values(mongoose.models).map(model => model.deleteMany({})));
        console.log('Seeding new FULLY BILINGUAL dataset...');

        // --- Bilingual Constants ---
        const waterSources = {
            CANAL: { te: 'కాలువ', en: 'Canal' },
            BOREWELL: { te: 'బోరుబావి', en: 'Borewell' },
            RIVER: { te: 'నది', en: 'River' },
            RAIN_FED: { te: 'వర్షాధారం', en: 'Rain-fed' }
        };
        const cropStatuses = {
            PREPARING: { te: 'సిద్ధమవుతోంది', en: 'Preparing' },
            GROWING: { te: 'పెరుగుతోంది', en: 'Growing' },
            HARVESTED: { te: 'కోత కోయబడింది', en: 'Harvested' },
            SOLD: { te: 'అమ్మబడింది', en: 'Sold' }
        };
        const expenseCategories = {
            SEEDS: { te: 'విత్తనాలు', en: 'Seeds' },
            PESTS: { te: 'పురుగుమందులు', en: 'Pesticides' },
            FERTILIZER: { te: 'ఎరువులు', en: 'Fertilizer' },
            LABOUR: { te: 'కూలీలు', en: 'Labour' },
            EQUIPMENT: { te: 'పరికరాలు', en: 'Equipment' }
        };

        // --- Master Data ---
        const crops = await CropMaster.insertMany([
            { name: { te: 'వరి', en: 'Paddy' } },
            { name: { te: 'మిర్చి', en: 'Chilli' } },
            { name: { te: 'కంది', en: 'Pigeon Pea' } },
        ]);
        const [variCrop, mirchiCrop, kandhiCrop] = crops;

        // --- Users ---
        const users = await User.insertMany([
            { phone: '9876543210', name: { te: 'అంజమ్మ', en: 'Anjamma' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'] },
            { phone: '9876543211', name: { te: 'రామారావు', en: 'RamaRao' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER'] },
            { phone: '9876543212', name: { te: 'మల్లికార్జున రావు', en: 'Malli Karjuna Rao' }, language: 'te', capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'] },
        ]);
        const [anjamma, ramaRao, malliKarjunaRao] = users;

        // --- Farms with Bilingual waterSource ---
        const farms = await Farm.insertMany([
            { userId: anjamma._id, farmName: { te: "రోడ్ దగ్గర పొలం", en: "Road-side Farm" }, areaInAcres: 8, waterSource: waterSources.CANAL },
            { userId: anjamma._id, farmName: { te: "మామిడి తోట వెనుక", en: "Behind Mango Grove" }, areaInAcres: 5, waterSource: waterSources.BOREWELL },
            { userId: ramaRao._id, farmName: { te: "నది పక్కన భూమి", en: "Land near River" }, areaInAcres: 12, waterSource: waterSources.RIVER },
            { userId: malliKarjunaRao._id, farmName: { te: "జనపాడు దగ్గర పొలం", en: "Farm near Janapadu" }, areaInAcres: 15, waterSource: waterSources.BOREWELL },
        ]);
        const [anjammaFarm1, anjammaFarm2, ramaRaoFarm1, malliFarm1] = farms;

        // --- Profiles & Equipment ---
        await LabourProfile.create({ userId: anjamma._id, skills: [{ te: 'మిర్చి కోత', en: 'Chilli Picking' }, { te: 'కలుపు తీయుట', en: 'Weeding' }], ratePerDay: 550 });
        const anjammaTiller = await Equipment.create({ userId: anjamma._id, type: { te: 'టిల్లర్', en: 'Tiller' }, modelName: 'Generic Power Tiller', rate: { amount: 4000, unit: { te: 'రోజు', en: 'Day' } } });

        // --- Crop Instances with Bilingual status & expenses ---
        await CropInstance.insertMany([
            { farmId: anjammaFarm1._id, userId: anjamma._id, cropMasterId: mirchiCrop._id, status: cropStatuses.GROWING, expenses: [{ category: expenseCategories.SEEDS, amount: 3500 }, { category: expenseCategories.PESTS, amount: 1200 }] },
            { farmId: anjammaFarm2._id, userId: anjamma._id, cropMasterId: kandhiCrop._id, status: cropStatuses.PREPARING, expenses: [{ category: expenseCategories.FERTILIZER, amount: 1000 }] },
            { farmId: ramaRaoFarm1._id, userId: ramaRao._id, cropMasterId: variCrop._id, status: cropStatuses.SOLD, expenses: [{ category: expenseCategories.SEEDS, amount: 5000 }, { category: expenseCategories.LABOUR, amount: 8000 }], revenue: 95000 },
            { farmId: malliFarm1._id, userId: malliKarjunaRao._id, cropMasterId: variCrop._id, status: cropStatuses.HARVESTED, expenses: [{ category: expenseCategories.SEEDS, amount: 8000 }, { category: expenseCategories.EQUIPMENT, amount: 25000 }] },
        ]);

        // --- Market Prices ---
        await MarketPrice.create({ cropMasterId: mirchiCrop._id, marketName: { te: 'గుంటూరు మార్కెట్ యార్డ్', en: 'Guntur Market Yard' }, location: { type: 'Point', coordinates: [80.41, 16.32], address: 'Mirchi Yard, Guntur' }, pricePerQuintal: 7250, date: new Date() });

        // --- Transactions ---
        const post1 = await Posting.create({
            postedByUserId: ramaRao._id, type: 'NEEDS_EQUIPMENT',
            details: { task: { te: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', en: 'Need tiller for ploughing' }, days: 2 },
            location: { type: 'Point', coordinates: [0, 0], address: 'నది పక్కన భూమి' }, status: 'FILLED'
        });
        await Booking.create({ postingId: post1._id, farmerId: ramaRao._id, provider: { id: anjammaTiller._id, type: 'USER' }, status: 'COMPLETED', totalCost: 8000 });

        console.log('✅ Fully bilingual dataset seeded successfully.');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed.');
    }
}

seedDatabase();