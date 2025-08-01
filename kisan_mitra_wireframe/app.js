document.addEventListener('DOMContentLoaded', () => {

    const uiStrings = {
        // General
        kisan_mitra: { te: 'కిసాన్ మిత్ర', en: 'Kisan Mitra' },
        your_agri_assistant: { te: 'మీ వ్యవసాయ సహాయకుడు', en: 'Your Agri Assistant' },
        // Login
        enter_phone: { te: 'మీ ఫోన్ నంబర్ ఎంటర్ చేయండి', en: 'Enter your phone number' },
        phone_placeholder: { te: 'ఉదా., 9876543210', en: 'e.g., 9876543210' },
        login: { te: 'లాగిన్', en: 'Login' },
        user_not_found: { te: 'వినియోగదారు కనుగొనబడలేదు!', en: 'User not found!' },
        // Nav
        nav_home: { te: 'హోమ్', en: 'Home' },
        nav_my_farm: { te: 'నా పొలం', en: 'My Farm' },
        nav_services: { te: 'సేవలు', en: 'Services' },
        nav_schemes: { te: 'పథకాలు', en: 'Schemes' },
        nav_profile: { te: 'ప్రొఫైల్', en: 'Profile' },
        // Headers
        my_farm: { te: 'నా వ్యవసాయం', en: 'My Farm' },
        services_equipment: { te: 'సేవలు & పరికరాలు', en: 'Services & Equipment' },
        market_prices: { te: 'మార్కెట్ ధరలు', en: 'Market Prices' },
        govt_schemes: { te: 'ప్రభుత్వ పథకాలు', en: 'Govt Schemes' },
        my_profile: { te: 'నా ప్రొఫైల్', en: 'My Profile' },
        // Tabs & Filters
        my_labour_posts: { te: 'నా కూలీల పోస్టులు', en: 'My Labour Posts' },
        my_equipment_posts: { te: 'నా పరికరాల పోస్టులు', en: 'My Equipment Posts' },
        other_labour_posts: { te: 'ఇతర కూలీల పనులు', en: 'Other Labour Jobs' },
        other_equipment_posts: { te: 'ఇతర పరికరాల పనులు', en: 'Other Equipment Jobs' },
        sort_by_price: { te: 'ధర ప్రకారం', en: 'By Price' },
        sort_by_market: { te: 'మార్కెట్ ప్రకారం', en: 'By Market' },
        // Home Screen
        greeting: { te: 'నమస్కారం', en: 'Hello' },
        financial_summary: { te: 'ఆర్థిక సారాంశం', en: 'Financial Summary' },
        total_spent: { te: 'మొత్తం ఖర్చు', en: 'Total Spent' },
        total_made: { te: 'మొత్తం ఆదాయం', en: 'Total Made' },
        click_for_details: { te: 'విభాగంపై క్లిక్ చేయండి', en: 'Click a section for details' },
        no_expenses: { te: 'ఖర్చులు లేవు', en: 'No expenses yet' },
        estimated_profit_card_title: { te: '📈 అంచనా లాభం', en: '📈 Estimated Profit' },
        estimated_revenue: { te: 'అంచనా ఆదాయం', en: 'Est. Revenue' },
        estimated_profit: { te: 'అంచనా లాభం', en: 'Est. Profit' },
        acres: { te: 'ఎకరాలు', en: 'Acres' },
        my_labour_jobs: { te: 'నా కూలీ పనులు', en: 'My Labour Jobs' },
        work_at_farm: { te: 'పొలంలో పని', en: 'Work at farm' },
        my_schedule: { te: 'నా షెడ్యూల్', en: 'My Schedule' },
        // My Farm Screen
        area: { te: 'విస్తీర్ణం', en: 'Area' },
        status: { te: 'స్థితి', en: 'Status' },
        profit: { te: 'లాభం', en: 'Profit' },
        investment: { te: 'పెట్టుబడి', en: 'Investment' },
        no_crops_found: { te: 'మీరు పంటలు ఏమి వేయలేదు.', en: 'You have not planted any crops.' },
        // Hire Screen
        farmer: { te: 'రైతు', en: 'Farmer' },
        location: { te: 'స్థానం', en: 'Location' },
        per_day: { te: '/రోజుకి', en: '/day' },
        price_negotiable: { te: 'ధర చర్చించదగినది', en: 'Price Negotiable' },
        no_posts_found: { te: 'ఈ విభాగంలో పోస్ట్‌లు ఏవీ కనుగొనబడలేదు.', en: 'No posts found in this section.' },
        // Schemes Screen
        required_docs: { te: 'అవసరమైన పత్రాలు', en: 'Required Documents' },
        no_eligible_schemes: { te: 'ప్రస్తుతం మీకు అర్హత ఉన్న పథకాలు ఏవీ లేవు.', en: 'No eligible schemes for you at this time.' },
        talk_to_agent: { te: 'ఏజెంట్‌తో మాట్లాడండి', en: 'Talk to Agent' },
        // Profile Screen
        personal_details: { te: 'వ్యక్తిగత వివరాలు', en: 'Personal Details' },
        name: { te: 'పేరు', en: 'Name' },
        phone: { te: 'ఫోన్', en: 'Phone' },
        income_sources: { te: 'ఆదాయ వనరులు', en: 'Income Sources' },
        crop_sale: { te: 'పంట అమ్మకం', en: 'Crop Sale' },
        labour_work: { te: 'కూలి పని', en: 'Labour Work' },
        equipment_rental: { te: 'పరికరాల అద్దె', en: 'Equipment Rental' },
        my_farms: { te: 'నా పొలాలు', en: 'My Farms' },
        labour_profile: { te: 'కూలీ ప్రొఫైల్', en: 'Labour Profile' },
        skills: { te: 'నైపుణ్యాలు', en: 'Skills' },
        daily_rate: { te: 'రోజువారీ రేటు', en: 'Daily Rate' },
        my_equipment: { te: 'నా పరికరాలు', en: 'My Equipment' },
        // Chat
        how_can_i_help: { te: 'పంటకు నేను ఎలా సహాయపడగలను?', en: 'How can I help with your crop?' },
        diagnose_disease: { te: 'వ్యాధిని నిర్ధారించండి', en: 'Diagnose Disease' },
        check_weather: { te: 'వాతావరణం తనిఖీ', en: 'Check Weather' },
        check_market_price: { te: 'మార్కెట్ ధర', en: 'Market Price' },
        post_for_labour: { te: 'కూలీల కోసం పోస్ట్ చేయండి', en: 'Post for Labour' },
        govt_schemes_chat_title: { te: 'ప్రభుత్వ పథకాలు', en: 'Government Schemes' },
        chat_diagnose_start_prompt: { te: 'తప్పకుండా. దయచేసి వ్యాధి సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.', en: 'Certainly. Please upload a clear photo of the affected leaf.' },
        chat_upload_photo_option: { te: 'ఫోటో అప్‌లోడ్ చేయండి', en: 'Upload Photo' },
        chat_analyzing_photo: { te: 'ఫోటోను విశ్లేషిస్తున్నాను...', en: 'Analyzing the photo...' },
        chat_disease_result_leaf_curl: { te: 'ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong> లా కనిపిస్తోంది. నివారణకు, లీటరు నీటికి 0.5ml <strong>ఇమిడాక్లోప్రిడ్</strong> కలిపి పిచికారీ చేయండి.', en: 'This looks like <strong>Chilli Leaf Curl</strong>. For treatment, spray <strong>Imidacloprid</strong> at 0.5ml per liter of water.' },
        chat_price_info: { te: `ప్రస్తుతం మీ పంటకు గరిష్ట ధర ₹{price}/క్వింటాల్ వరకు ఉంది.`, en: `The current maximum price for your crop is ₹{price}/quintal.` },
        chat_price_not_found: { te: 'క్షమించండి, ఈ పంటకు మార్కెట్ ధర సమాచారం అందుబాటులో లేదు.', en: 'Sorry, market price information is not available for this crop.' },
        chat_post_labour_confirm: { te: 'తప్పకుండా. నేను మీ కోసం ఒక కూలీల అవసరం పోస్ట్ సృష్టిస్తాను. వివరాలు నిర్ధారించండి.', en: 'Of course. I will create a post for your labour requirement. Please confirm the details.' },

        // ** NEW SCHEME CHAT TRANSLATIONS **
        chat_scheme_greeting: { te: 'నమస్కారం! <strong>{schemeName}</strong> పథకం గురించి నేను మీకు ఎలా సహాయపడగలను?', en: 'Hello! How can I help you with the <strong>{schemeName}</strong> scheme?' },
        chat_scheme_apply_prompt: { te: '{schemeName} కోసం ఎలా దరఖాస్తు చేయాలి?', en: 'How to apply for {schemeName}?' },
        chat_scheme_apply_info_pmkisan: { te: 'మీరు మీ సమీప మీసేవ కేంద్రానికి వెళ్లి, మీ ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్, మరియు భూమి రికార్డులతో దరఖాస్తు చేసుకోవచ్చు.', en: 'You can apply at your nearest MeeSeva center with your Aadhaar card, Bank Passbook, and Land Record.' },
        chat_scheme_apply_info_rythubharosa: { te: 'దరఖాస్తు చేయడానికి, మీరు మీ గుర్తింపు రుజువు, నివాస రుజువు, భూమి పత్రాలు, ఆధార్ కార్డ్, మరియు బ్యాంక్ పాస్‌బుక్‌తో మీ సమీప రైతు భరోసా కేంద్రాన్ని సందర్శించాలి.', en: 'To apply, visit your nearest Rythu Bharosa Kendra with your ID proof, residence proof, land documents, Aadhaar card, and bank passbook.' }
    };

    const db = {
        users: [
            { _id: 'user_anjamma', phone: '9876543210', name: { te: 'అంజమ్మ', en: 'Anjamma' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_ramarao', phone: '9876543211', name: { te: 'రామారావు', en: 'RamaRao' }, language: 'en', capabilities: ['FARM_OWNER', 'LABOURER'], docs: ['AADHAAR', 'BANK_PASSBOOK'] },
            { _id: 'user_malli', phone: '9876543212', name: { te: 'మల్లికార్జున రావు', en: 'Malli Karjuna Rao' }, language: 'te', capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_kaasamma', phone: '9876543213', name: { te: 'కాసమ్మ', en: 'Kaasamma' }, language: 'te', capabilities: ['LABOURER', 'LEADER'], docs: ['AADHAAR'] },
            { _id: 'user_subbarao', phone: '9876543214', name: { te: 'సుబ్బారావు', en: 'Subba Rao' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_venkanna', phone: '9876543215', name: { te: 'వెంకన్న', en: 'Venkanna' }, language: 'te', capabilities: ['FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_sreenu', phone: '9876543217', name: { te: 'శ్రీను', en: 'Sreenu' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_lakshmi', phone: '9876543218', name: { te: 'లక్ష్మి', en: 'Lakshmi' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_ranga', phone: '9876543219', name: { te: 'రంగా', en: 'Ranga' }, language: 'te', capabilities: ['LABOURER', 'LEADER', 'EQUIPMENT_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK'] },
        ],
        crops: [
            { _id: 'crop_master_vari', name: { te: 'వరి', en: 'Paddy' }, emoji: '🌾', yieldPerAcreInQuintals: 26 },
            { _id: 'crop_master_mirchi', name: { te: 'మిర్చి', en: 'Chilli' }, emoji: '🌶️', yieldPerAcreInQuintals: 8 },
            { _id: 'crop_master_patti', name: { te: 'పత్తి', en: 'Cotton' }, emoji: '☁️', yieldPerAcreInQuintals: 10 },
            { _id: 'crop_master_kandhi', name: { te: 'కంది', en: 'Pigeon Pea' }, emoji: '🌱', yieldPerAcreInQuintals: 5 },
        ],
        farms: [
            { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: { te: "రోడ్ దగ్గర పొలం", en: "Road-side Farm" }, acres: 4 },
            { _id: 'farm_anjamma_2', userId: 'user_anjamma', farmName: { te: "మామిడి తోట వెనుక", en: "Behind Mango Grove" }, acres: 1 },
            { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: { te: "నది పక్కన భూమి", en: "Land near River" }, acres: 10 },
            { _id: 'farm_malli_1', userId: 'user_malli', farmName: { te: "జనపాడు దగ్గర పొలం", en: "Farm near Janapadu" }, acres: 12 },
            { _id: 'farm_venkanna_1', userId: 'user_venkanna', farmName: { te: "కొత్త పొలం", en: "New Farm" }, acres: 6 },
        ],
        cropInstances: [
            { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', areaSownInAcres: 2, status: { te: 'పెరుగుతోంది', en: 'Growing' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 4500 },
                    { category: { te: 'ఎరువులు', en: 'Fertilizer' }, amount: 32000 },
                    { category: { te: 'పురుగుమందులు', en: 'Pesticides' }, amount: 18000 },
                    { category: { te: 'నీరు & కరెంట్', en: 'Water & Electricity'}, amount: 2500 }
                ],
                revenue: 0
            },
            { _id: 'ci_anjamma_patti', farmId: 'farm_anjamma_2', userId: 'user_anjamma', cropMasterId: 'crop_master_patti', areaSownInAcres: 3.5, status: { te: 'అమ్మబడింది', en: 'Sold' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 6000 },
                    { category: { te: 'కూలీలు', en: 'Labour' }, amount: 75000 },
                    { category: { te: 'పరికరాలు', en: 'Equipment' }, amount: 14500 }
                ],
                revenue: 195000
            },
            { _id: 'ci_anjamma_vari', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_vari', areaSownInAcres: 2, status: { te: 'కోత కోయబడింది', en: 'Harvested' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 3000 },
                    { category: { te: 'కూలీలు', en: 'Labour' }, amount: 40000 }
                ],
                revenue: 0
            },
            { _id: 'ci_ramarao_vari', farmId: 'farm_ramarao_1', userId: 'user_ramarao', cropMasterId: 'crop_master_vari', areaSownInAcres: 10, status: { te: 'అమ్మబడింది', en: 'Sold' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 5000 }, { category: { te: 'కూలీలు', en: 'Labour' }, amount: 40000 }], revenue: 455000 },
            { _id: 'ci_malli_vari', farmId: 'farm_malli_1', userId: 'user_malli', cropMasterId: 'crop_master_vari', areaSownInAcres: 12, status: { te: 'కోత కోయబడింది', en: 'Harvested' }, expenses: [{ category: { te: 'పరికరాలు', en: 'Equipment' }, amount: 30000 }], revenue: 0 },
            { _id: 'ci_venkanna_kandhi', farmId: 'farm_venkanna_1', userId: 'user_venkanna', cropMasterId: 'crop_master_kandhi', areaSownInAcres: 6, status: { te: 'పెరుగుతోంది', en: 'Growing' }, expenses: [{ category: { te: 'ఎరువులు', en: 'Fertilizer' }, amount: 4000 }], revenue: 0 },
        ],
        labourProfiles: [
            { userId: 'user_anjamma', skills: [{ te: 'మిర్చి కోత', en: 'Chilli Picking' }, { te: 'వరి నాట్లు', en: 'Paddy Planting' },{ te: 'కలుపు తీయుట', en: 'Weeding' },{ te: 'పత్తి తీయుట', en: 'Cotton Picking' }], ratePerDay: 550 },
            { userId: 'user_ramarao', skills: [{ te: 'వరి నాట్లు', en: 'Paddy Planting' }], ratePerDay: 600 },
            { userId: 'user_kaasamma', skills: [{ te: 'వరి కోత', en: 'Paddy Harvesting' }], ratePerDay: 650 },
            { userId: 'user_subbarao', skills: [{ te: 'కలుపు తీయుట', en: 'Weeding' }], ratePerDay: 525 },
            { userId: 'user_sreenu', skills: [{ te: 'స్ప్రేయింగ్', en: 'Spraying' }], ratePerDay: 500 },
            { userId: 'user_lakshmi', skills: [{ te: 'పత్తి తీయుట', en: 'Cotton Picking' }], ratePerDay: 575 },
            { userId: 'user_ranga', skills: [{ te: 'ట్రాక్టర్ డ్రైవింగ్', en: 'Tractor Driving' }], ratePerDay: 750 },
        ],
        equipment: [
            { _id: 'equip_anjamma_tiller', userId: 'user_anjamma', type: { te: 'టిల్లర్', en: 'Tiller' }, rate: { amount: 4000, unit: { te: 'రోజు', en: 'Day' } } },
            { _id: 'equip_malli_harvester', userId: 'user_malli', type: { te: 'హార్వెస్టర్', en: 'Harvester' }, rate: { amount: 3000, unit: { te: 'గంట', en: 'Hour' } } },
            { _id: 'equip_ranga_tractor', userId: 'user_ranga', type: { te: 'ట్రాక్టర్', en: 'Tractor' }, rate: { amount: 900, unit: { te: 'గంట', en: 'Hour' } } },
        ],
        labourGroups: [
            { _id: 'group_kaasamma', name: { te: "కాసమ్మ దళం", en: "Kaasamma Team" }, leaderId: 'user_kaasamma', members: ['user_kaasamma', 'user_subbarao', 'user_lakshmi'] },
            { _id: 'group_ranga', name: { te: "రంగా బృందం", en: "Ranga Team" }, leaderId: 'user_ranga', members: ['user_ranga', 'user_sreenu'] }
        ],
        postings: [
            { _id: 'post_anjamma_1', postedByUserId: 'user_anjamma', type: 'NEEDS_LABOUR', details: { cropInstanceId: 'ci_anjamma_mirchi', task: { te: 'మిర్చి కోతకు 5 మంది కావాలి', en: 'Need 5 for chilli picking' }, requiredCount: 5, offeredRatePerDay: 580 }, location: { address: { te: 'రోడ్ దగ్గర పొలం', en: 'Road-side Farm' } }, status: 'OPEN' },
            { _id: 'post_ramarao_1', postedByUserId: 'user_ramarao', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', en: 'Need tiller for ploughing' } }, location: { address: { te: 'నది పక్కన భూమి', en: 'Land near River' } }, status: 'FILLED' },
            { _id: 'post_malli_1', postedByUserId: 'user_malli', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి కోతకు 10 మంది కావాలి', en: 'Need 10 for Paddy Harvesting' }, requiredCount: 10, offeredRatePerDay: 620 }, location: { address: { te: 'జనపాడు దగ్గర పొలం', en: 'Farm near Janapadu' } }, status: 'FILLED' },
            { _id: 'post_venkanna_1', postedByUserId: 'user_venkanna', type: 'NEEDS_LABOUR', details: { task: { te: 'కలుపు తీయుటకు 4 గురు కావాలి', en: 'Need 4 for weeding' }, requiredCount: 4, offeredRatePerDay: 530 }, location: { address: { te: 'కొత్త పొలం', en: 'New Farm' } }, status: 'OPEN' },
            { _id: 'post_ramarao_2', postedByUserId: 'user_ramarao', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి నాట్లకు 8 మంది కావాలి', en: 'Need 8 for Paddy Planting' }, requiredCount: 8, offeredRatePerDay: 600 }, location: { address: { te: 'నది పక్కన భూమి', en: 'Land near River' } }, status: 'OPEN' },
            { _id: 'post_venkanna_2', postedByUserId: 'user_venkanna', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'పంట స్ప్రే చేయడానికి ట్రాక్టర్ కావాలి', en: 'Need tractor for spraying' } }, location: { address: { te: 'కొత్త పొలం', en: 'New Farm' } }, status: 'OPEN' },
        ],
        bookings: [
            { _id: 'booking_1', postingId: 'post_ramarao_1', farmerId: 'user_ramarao', providerId: 'user_anjamma', resourceId: 'equip_anjamma_tiller', resourceType: 'EQUIPMENT', status: 'COMPLETED', totalCost: 8000 },
            { _id: 'booking_2', postingId: 'post_malli_1', farmerId: 'user_malli', providerId: 'user_kaasamma', resourceId: 'group_kaasamma', resourceType: 'LABOUR_GROUP', status: 'COMPLETED', totalCost: 32500 },
            { _id: 'booking_3', postingId: null, farmerId: 'user_malli', providerId: 'user_anjamma', resourceId: 'user_anjamma', resourceType: 'LABOUR', status: 'COMPLETED', totalCost: 6600 }, // Anjamma earning as a labourer
        ],
        schedules: [
            { _id: 'schedule_1', resourceId: 'equip_anjamma_tiller', resourceType: 'EQUIPMENT', bookingId: 'booking_1', farmerId: 'user_ramarao', startTime: new Date('2025-08-05T09:00:00'), endTime: new Date('2025-08-06T17:00:00') },
            { _id: 'schedule_2', resourceId: 'user_anjamma', resourceType: 'LABOUR', bookingId: 'booking_3', farmerId: 'user_malli', startTime: new Date('2025-08-10T09:00:00'), endTime: new Date('2025-08-12T17:00:00') },
            { _id: 'schedule_3', resourceId: 'user_kaasamma', resourceType: 'LABOUR', bookingId: 'booking_2', farmerId: 'user_malli', startTime: new Date('2025-09-01T09:00:00'), endTime: new Date('2025-09-05T17:00:00') },
        ],
        marketPrices: [
            { cropMasterId: 'crop_master_vari', marketName: { te: 'గుంటూరు మార్కెట్', en: 'Guntur Market' }, pricePerQuintal: 2100 },
            { cropMasterId: 'crop_master_vari', marketName: { te: 'తెనాలి మార్కెట్', en: 'Tenali Market' }, pricePerQuintal: 2150 },
            { cropMasterId: 'crop_master_mirchi', marketName: { te: 'గుంటూరు మార్కెట్', en: 'Guntur Market' }, pricePerQuintal: 18500 },
            { cropMasterId: 'crop_master_mirchi', marketName: { te: 'వరంగల్ మార్కెట్', en: 'Warangal Market' }, pricePerQuintal: 19200 },
            { cropMasterId: 'crop_master_patti', marketName: { te: 'ఆదిలాబాద్ మార్కెట్', en: 'Adilabad Market' }, pricePerQuintal: 7200 },
            { cropMasterId: 'crop_master_patti', marketName: { te: 'నరసరావుపేట మార్కెట్', en: 'Narasaraopet Market' }, pricePerQuintal: 7100 },
            { cropMasterId: 'crop_master_kandhi', marketName: { te: 'తాండూర్ మార్కెట్', en: 'Tandur Market' }, pricePerQuintal: 9950 },
            { cropMasterId: 'crop_master_kandhi', marketName: { te: 'గుంటూరు మార్కెట్', en: 'Guntur Market' }, pricePerQuintal: 9800 },
        ],
        governmentSchemes: [
            {_id: 'scheme_pm_kisan', name: { te: 'పీఎం కిసాన్', en: 'PM Kisan' }, description: { te: 'రైతులకు సంవత్సరానికి ₹6,000 ఆర్థిక సహాయం.', en: 'Financial aid of ₹6,000 per year to farmers.'}, eligibility: { maxAcres: 5 }, requiredDocs: [{ id: 'AADHAAR', name: { te: 'ఆధార్ కార్డు', en: 'Aadhaar Card' } }, { id: 'BANK_PASSBOOK', name: { te: 'బ్యాంక్ పాస్‌బుక్', en: 'Bank Passbook' } }, { id: 'LAND_RECORD', name: { te: 'భూమి రికార్డు', en: 'Land Record' } }] },
            {_id: 'scheme_rythu_bharosa', name: { te: 'వైఎస్ఆర్ రైతు భరోసా', en: 'YSR Rythu Bharosa' }, description: { te: 'రైతులకు సంవత్సరానికి ₹13,500 పెట్టుబడి సహాయం.', en: 'Investment support of ₹13,500 per year to farmers.'}, eligibility: { maxAcres: 7.5 }, requiredDocs: [{ id: 'AADHAAR', name: { te: 'ఆధార్ కార్డు', en: 'Aadhaar Card' } }, { id: 'LAND_RECORD', name: { te: 'భూమి రికార్డు', en: 'Land Record' } }] }
        ]
    };

    // --- APP STATE ---
    let currentUser = null;
    let currentCrop = null;
    let currentLang = 'en'; // Default language
    let chatReturnScreen = 'home-screen';

    // --- I18N (Internationalization) ---
    const translateUI = (lang) => {
        currentLang = lang;
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            if (uiStrings[key] && uiStrings[key][lang]) {
                el.innerText = uiStrings[key][lang];
            }
        });
        document.querySelectorAll('[data-translate-placeholder-key]').forEach(el => {
            const key = el.dataset.translatePlaceholderKey;
            if (uiStrings[key] && uiStrings[key][lang]) {
                el.placeholder = uiStrings[key][lang];
            }
        });
        document.getElementById('lang-te-btn').classList.toggle('active', lang === 'te');
        document.getElementById('lang-en-btn').classList.toggle('active', lang === 'en');
    };

    // --- DOM & NAVIGATION ---
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-btn');

    const navigateTo = (screenId) => {
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
        if (!currentUser) return;

        switch (screenId) {
            case 'home-screen': renderHomeScreen(); break;
            case 'my-farm-screen': renderMyFarmScreen(); break;
            case 'hire-screen': renderHireScreen(); break;
            case 'market-prices-screen': renderMarketPricesScreen(); break;
            case 'schemes-screen': renderSchemesScreen(); break;
            case 'profile-screen': renderProfileScreen(); break;
        }
    };
    navButtons.forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.screen)));

    // --- FINANCIAL LOGIC ---
    const calculateFinancials = (userId) => {
        const lang = currentUser.language;
        const financials = {
            spent: { total: 0, byCategory: {} },
            made: { total: 0, byCategory: { CROP_SALE: 0, LABOUR_WORK: 0, EQUIPMENT_RENTAL: 0 } }
        };

        db.cropInstances.filter(ci => ci.userId === userId).forEach(ci => {
            ci.expenses.forEach(exp => {
                const categoryKey = exp.category.en.toUpperCase().replace(' & ', '_');
                if (!financials.spent.byCategory[categoryKey]) {
                    financials.spent.byCategory[categoryKey] = { amount: 0, name: exp.category[lang] };
                }
                financials.spent.byCategory[categoryKey].amount += exp.amount;
            });
            financials.made.byCategory.CROP_SALE += ci.revenue;
        });

        db.bookings.filter(b => b.providerId === userId && b.status === 'COMPLETED').forEach(b => {
            if (b.resourceType === 'EQUIPMENT') {
                financials.made.byCategory.EQUIPMENT_RENTAL += b.totalCost;
            } else if (b.resourceType === 'LABOUR' || b.resourceType === 'LABOUR_GROUP') {
                financials.made.byCategory.LABOUR_WORK += b.totalCost;
            }
        });

        financials.spent.total = Object.values(financials.spent.byCategory).reduce((sum, cat) => sum + cat.amount, 0);
        financials.made.total = Object.values(financials.made.byCategory).reduce((sum, amount) => sum + amount, 0);

        return financials;
    };

    const renderPieChart = (financials) => {
        const chartContainer = document.getElementById('pie-chart-container');
        const summaryEl = document.getElementById('financial-summary-text');
        const financialCard = document.getElementById('financial-card');
        const lang = currentUser.language;

        chartContainer.innerHTML = '';
        summaryEl.innerHTML = `
            <div class="financial-total spent">
                <span>${uiStrings.total_spent[lang]}</span>
                <strong>₹${financials.spent.total.toLocaleString('en-IN')}</strong>
            </div>
            <div class="financial-total made">
                <span>${uiStrings.total_made[lang]}</span>
                <strong>₹${financials.made.total.toLocaleString('en-IN')}</strong>
            </div>
            <div id="pie-tooltip" class="pie-tooltip">${uiStrings.click_for_details[lang]}</div>`;

        financialCard.style.display = (financials.spent.total > 0 || financials.made.total > 0) ? 'block' : 'none';

        const tooltip = document.getElementById('pie-tooltip');
        const data = financials.spent.byCategory;
        if (financials.spent.total === 0) {
            tooltip.innerText = uiStrings.no_expenses[lang];
            return;
        }

        const colors = ['#4CAF50', '#FFC107', '#2196F3', '#F44336', '#9C27B0', '#FF9800'];
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "-1 -1 2 2");
        svg.style.transform = "rotate(-90deg)";

        let cumulativePercent = 0;
        let colorIndex = 0;

        const getCoordinatesForPercent = (percent) => {
            const x = Math.cos(2 * Math.PI * percent);
            const y = Math.sin(2 * Math.PI * percent);
            return [x, y];
        }

        for (const [key, value] of Object.entries(data)) {
            const percent = value.amount / financials.spent.total;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;

            const pathData = `M ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} L 0 0`;
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", pathData);
            path.setAttribute("fill", colors[colorIndex++ % colors.length]);
            path.dataset.name = value.name;
            path.dataset.amount = value.amount.toLocaleString('en-IN');

            path.addEventListener('click', () => {
                tooltip.innerHTML = `${path.dataset.name}: <strong>₹${path.dataset.amount}</strong>`;
            });
            svg.appendChild(path);
        }
        chartContainer.appendChild(svg);
    };

    // --- RENDER FUNCTIONS (NOW LANGUAGE-AWARE) ---
    const renderHomeScreen = () => {
        const lang = currentUser.language;
        document.getElementById('welcome-message').innerText = `${uiStrings.greeting[lang]}, ${currentUser.name[lang]}`;

        // Fake weather card
        document.getElementById('weather-card-container').innerHTML = `
     <div class="card weather-card">
        <div>
            <h3>Guntur</h3>
            <p>34°C, Sunny</p>
        </div>
        <span class="material-icons">wb_sunny</span>
    </div>`;

        const financials = calculateFinancials(currentUser._id);
        renderPieChart(financials);

        const summaryContainer = document.getElementById('summary-cards-container');
        summaryContainer.innerHTML = '';

        // Renders the estimated profit card for unsold crops
        const unsoldCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id && ci.status.en !== 'Sold');
        if (unsoldCrops.length > 0) {
            let profitHtml = `<div class="card profit-card"><h3>${uiStrings.estimated_profit_card_title[lang]}</h3>`;
            unsoldCrops.forEach(ci => {
                const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
                const marketPriceInfo = db.marketPrices.filter(p => p.cropMasterId === ci.cropMasterId);
                if (!cropInfo.yieldPerAcreInQuintals || marketPriceInfo.length === 0) return;

                const maxPrice = Math.max(...marketPriceInfo.map(p => p.pricePerQuintal));
                const totalYield = cropInfo.yieldPerAcreInQuintals * ci.areaSownInAcres;
                const potentialRevenue = totalYield * maxPrice;
                const currentExpenses = ci.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                const potentialProfit = potentialRevenue - currentExpenses;

                profitHtml += `<div class="profit-item">
                <h4>${cropInfo.emoji} ${cropInfo.name[lang]} (${ci.areaSownInAcres} ${uiStrings.acres[lang]})</h4>
                <p>${uiStrings.estimated_revenue[lang]}: ₹${potentialRevenue.toLocaleString('en-IN')}</p>
                <p class="profit-value">${uiStrings.estimated_profit[lang]}: <strong>₹${potentialProfit.toLocaleString('en-IN')}</strong></p>
            </div>`;
            });
            profitHtml += '</div>';
            summaryContainer.innerHTML += profitHtml;
        }

        // UPDATED SCHEDULE LOGIC STARTS HERE
        // Find all equipment owned by the current user
        const userEquipmentIds = db.equipment.filter(eq => eq.userId === currentUser._id).map(eq => eq._id);

        // Find all schedules for the user's labour OR their equipment rentals
        const userSchedules = db.schedules.filter(s =>
            (s.resourceType === 'LABOUR' && s.resourceId === currentUser._id) ||
            (s.resourceType === 'EQUIPMENT' && userEquipmentIds.includes(s.resourceId))
        );

        // Renders the schedule card if there are any upcoming jobs
        if (userSchedules.length > 0) {
            let scheduleHTML = `<div class="card"><h3>${uiStrings.my_schedule[lang]}</h3><ul>`; // Using the new title
            userSchedules.forEach(s => {
                const farmer = db.users.find(u => u._id === s.farmerId);
                const date = new Date(s.startTime).toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-GB');

                if (s.resourceType === 'LABOUR') {
                    // Displays "Labour Work - [Farmer Name]" which works in both languages
                    scheduleHTML += `<li>${uiStrings.labour_work[lang]} - ${farmer.name[lang]} (${date})</li>`;
                } else if (s.resourceType === 'EQUIPMENT') {
                    const equipment = db.equipment.find(eq => eq._id === s.resourceId);
                    if (equipment) {
                        // Displays "[Equipment] Rental - [Farmer Name]"
                        scheduleHTML += `<li>${equipment.type[lang]} ${uiStrings.equipment_rental[lang]} - ${farmer.name[lang]} (${date})</li>`;
                    }
                }
            });
            scheduleHTML += '</ul></div>';
            summaryContainer.innerHTML += scheduleHTML;
        }
    };

    const renderMyFarmScreen = () => {
        const content = document.getElementById('my-farm-content');
        const lang = currentUser.language;
        content.innerHTML = '';

        const userCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id);

        if (userCrops.length === 0) {
            // If there are no crops, display the message and stop.
            content.innerHTML = `<div class="card"><p>${uiStrings.no_crops_found[lang]}</p></div>`;
            return;
        }

        // If crops exist, render them as before.
        userCrops.forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);

            const totalExpenses = ci.expenses.reduce((sum, exp) => sum + exp.amount, 0);
            let financialInfoHtml = '';
            if (ci.status.en === 'Sold') {
                const profit = ci.revenue - totalExpenses;
                const profitClass = profit >= 0 ? 'profit' : 'investment';
                financialInfoHtml = `<p class="${profitClass}">${uiStrings.profit[lang]}: ₹${profit.toLocaleString('en-IN')}</p>`;
            } else {
                financialInfoHtml = `<p>${uiStrings.investment[lang]}: ₹${totalExpenses.toLocaleString('en-IN')}</p>`;
            }

            content.innerHTML += `<div class="card card-flex clickable" data-crop-id="${ci._id}">
                <span class="card-emoji">${cropInfo.emoji}</span>
                <div class="crop-details">
                    <h3>${cropInfo.name[lang]} - ${farmInfo.farmName[lang]}</h3>
                    <p>${uiStrings.area[lang]}: ${ci.areaSownInAcres} ${uiStrings.acres[lang]} | ${uiStrings.status[lang]}: ${ci.status[lang]}</p>
                    ${financialInfoHtml}
                </div>
                <div class="status-dot ${ci.status.en.toLowerCase()}"></div></div>`;
        });
        content.querySelectorAll('.card.clickable').forEach(card => card.addEventListener('click', () => startFarmChat(card.dataset.cropId)));
    };

    const renderHireScreen = (filter = 'other-labour-posts') => {
        const hireContent = document.getElementById('hire-content');
        const lang = currentUser.language;
        let postsToDisplay = [];
        switch(filter) {
            case 'my-labour-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.postedByUserId === currentUser._id); break;
            case 'my-equipment-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_EQUIPMENT' && p.postedByUserId === currentUser._id); break;
            case 'other-labour-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.postedByUserId !== currentUser._id && p.status === 'OPEN'); break;
            case 'other-equipment-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_EQUIPMENT' && p.postedByUserId !== currentUser._id && p.status === 'OPEN'); break;
        }
        if (postsToDisplay.length > 0) {
            hireContent.innerHTML = postsToDisplay.map(post => {
                const farmer = db.users.find(u => u._id === post.postedByUserId);
                return `<div class="card hire-card">
                            <div>
                                <h3>${post.details.task[lang]}</h3>
                                <p>${uiStrings.farmer[lang]}: ${farmer.name[lang]} | ${uiStrings.location[lang]}: ${post.location.address[lang]}</p>
                            </div>
                            <div class="rate-info">
                                ${post.details.offeredRatePerDay ? `<strong>₹${post.details.offeredRatePerDay}</strong><span>${uiStrings.per_day[lang]}</span>` : `<span>${uiStrings.price_negotiable[lang]}</span>`}
                            </div>
                        </div>`;
            }).join('');
        } else {
            hireContent.innerHTML = `<div class="card"><p>${uiStrings.no_posts_found[lang]}</p></div>`;
        }
        document.querySelectorAll('#hire-screen .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
            btn.onclick = () => renderHireScreen(btn.dataset.filter);
        });
    };

    const renderMarketPricesScreen = (sortBy = 'price') => {
        const lang = currentUser.language;
        const content = document.getElementById('market-prices-content');
        let prices = [...db.marketPrices];
        prices.sort((a, b) => sortBy === 'price' ? b.pricePerQuintal - a.pricePerQuintal : a.marketName[lang].localeCompare(b.marketName[lang]));

        content.innerHTML = prices.map(p => {
            const crop = db.crops.find(c => c._id === p.cropMasterId);
            return `<div class="card price-card">
                        <span class="card-emoji">${crop.emoji}</span>
                        <div>
                            <h3>${crop.name[lang]}</h3>
                            <p>${p.marketName[lang]}</p>
                        </div>
                        <strong class="price-tag">₹${p.pricePerQuintal.toLocaleString('en-IN')}</strong>
                    </div>`;
        }).join('');

        document.querySelectorAll('#market-prices-screen .filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortBy);
            btn.onclick = () => renderMarketPricesScreen(btn.dataset.sort);
        });
    };

    const renderSchemesScreen = () => {
        const content = document.getElementById('schemes-content');
        const lang = currentUser.language;
        const totalAcres = db.farms.filter(f => f.userId === currentUser._id).reduce((sum, farm) => sum + farm.acres, 0);
        const userDocs = currentUser.docs;

        const eligibleSchemes = db.governmentSchemes.filter(scheme => {
            const hasAllDocs = scheme.requiredDocs.every(doc => userDocs.includes(doc.id));
            const meetsAcreage = totalAcres <= scheme.eligibility.maxAcres;
            return hasAllDocs && meetsAcreage;
        });

        if (eligibleSchemes.length > 0) {
            content.innerHTML = eligibleSchemes.map(scheme => `
            <div class="card scheme-card">
                <h3>${scheme.name[lang]}</h3>
                <p>${scheme.description[lang]}</p>
                <h4>${uiStrings.required_docs[lang]}:</h4>
                <ul class="doc-list">
                    ${scheme.requiredDocs.map(doc => `<li class="has-doc">${doc.name[lang]} <span>✅</span></li>`).join('')}
                </ul>
                <button class="chat-now-btn scheme-chat-btn" data-scheme-id="${scheme._id}">${uiStrings.talk_to_agent[lang]}</button>
            </div>
        `).join('');
        } else {
            content.innerHTML = `<div class="card"><p>${uiStrings.no_eligible_schemes[lang]}</p></div>`;
        }

        // Add event listeners to the new buttons
        content.querySelectorAll('.scheme-chat-btn').forEach(btn => {
            btn.onclick = (e) => startSchemeChat(e.target.dataset.schemeId);
        });
    };

    const renderProfileScreen = () => {
        const lang = currentUser.language;
        const content = document.getElementById('profile-content');
        const financials = calculateFinancials(currentUser._id);

        const userFarms = db.farms.filter(f => f.userId === currentUser._id);
        const labourProfile = db.labourProfiles.find(lp => lp.userId === currentUser._id);
        const equipmentProfile = db.equipment.filter(eq => eq.userId === currentUser._id);

        content.innerHTML = `
            <div class="card profile-section"><h3>${uiStrings.personal_details[lang]}</h3><p>${uiStrings.name[lang]}: ${currentUser.name[lang]}</p><p>${uiStrings.phone[lang]}: ${currentUser.phone}</p></div>
            <div class="card profile-section">
                <h3>${uiStrings.financial_summary[lang]}</h3>
                <p class="investment">${uiStrings.total_spent[lang]}: ₹${financials.spent.total.toLocaleString('en-IN')}</p>
                <p class="profit">${uiStrings.total_made[lang]}: ₹${financials.made.total.toLocaleString('en-IN')}</p>
                <hr>
                <h4>${uiStrings.income_sources[lang]}:</h4>
                <p>${uiStrings.crop_sale[lang]}: ₹${financials.made.byCategory.CROP_SALE.toLocaleString('en-IN')}</p>
                <p>${uiStrings.labour_work[lang]}: ₹${financials.made.byCategory.LABOUR_WORK.toLocaleString('en-IN')}</p>
                <p>${uiStrings.equipment_rental[lang]}: ₹${financials.made.byCategory.EQUIPMENT_RENTAL.toLocaleString('en-IN')}</p>
            </div>
            ${userFarms.length > 0 ? `<div class="card profile-section"><h3>${uiStrings.my_farms[lang]}</h3><ul>${userFarms.map(f => `<li>${f.farmName[lang]} (${f.acres} ${uiStrings.acres[lang]})</li>`).join('')}</ul></div>` : ''}
            ${labourProfile ? `<div class="card profile-section"><h3>${uiStrings.labour_profile[lang]}</h3><p>${uiStrings.skills[lang]}: ${labourProfile.skills.map(s => s[lang]).join(', ')}</p><p>${uiStrings.daily_rate[lang]}: ₹${labourProfile.ratePerDay}</p></div>` : ''}
            ${equipmentProfile.length > 0 ? `<div class="card profile-section"><h3>${uiStrings.my_equipment[lang]}</h3><ul>${equipmentProfile.map(eq => `<li>${eq.type[lang]}</li>`).join('')}</ul></div>` : ''}
        `;
    };

    // --- AGENTIC CHAT LOGIC ---
    const chatLog = document.getElementById('chat-log');

    const addChatMessage = (sender, content, type = 'text', options = []) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        if (type === 'image') {
            bubble.classList.add('image-bubble'); // Add a specific class for styling
            bubble.innerHTML = `<img src="leaf_curl_mirchi.jpg" class="chat-image" alt="Chilli leaf with leaf curl."/>`;
        } else if (type === 'options') {
            bubble.classList.add('options');
            const container = document.createElement('div');
            container.classList.add('chat-options-container');
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.classList.add('chat-option-btn');
                btn.innerText = opt.text;
                btn.onclick = () => handleChatOption(opt.action, opt.payload);
                container.appendChild(btn);
            });
            bubble.appendChild(container);
        } else {
            bubble.innerHTML = content;
        }
        chatLog.appendChild(bubble);
        bubble.scrollIntoView({behavior: "smooth", block: "end"});
    };

    const startFarmChat = (cropInstanceId) => {
        const lang = currentUser.language;
        chatReturnScreen = 'my-farm-screen';
        currentCrop = db.cropInstances.find(ci => ci._id === cropInstanceId);
        const cropInfo = db.crops.find(c => c._id === currentCrop.cropMasterId);
        document.getElementById('chat-title').innerText = `${cropInfo.name[lang]} ${cropInfo.emoji}`;
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');
        setTimeout(() => addChatMessage('agent', `${uiStrings.greeting[lang]}, ${currentUser.name[lang]}! ${uiStrings.how_can_i_help[lang]}`), 500);
        setTimeout(() => addChatMessage('user', '', 'options', [
            {text: uiStrings.diagnose_disease[lang], action: 'diagnose-start'},
            {text: uiStrings.check_weather[lang], action: 'check-weather'},
            {text: uiStrings.check_market_price[lang], action: 'check-price'},
            {text: uiStrings.post_for_labour[lang], action: 'post-labour'},
        ]), 1500);
    };

    const startSchemeChat = (schemeId) => {
        const lang = currentUser.language;
        chatReturnScreen = 'schemes-screen';

        const scheme = db.governmentSchemes.find(s => s._id === schemeId);
        if (!scheme) return; // Exit if scheme not found

        document.getElementById('chat-title').innerText = scheme.name[lang];
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');

        const greeting = uiStrings.chat_scheme_greeting[lang].replace('{schemeName}', scheme.name[lang]);
        const optionText = uiStrings.chat_scheme_apply_prompt[lang].replace('{schemeName}', scheme.name[lang]);

        setTimeout(() => addChatMessage('agent', greeting), 500);
        setTimeout(() => addChatMessage('user', '', 'options', [{
            text: optionText,
            action: 'scheme-apply',
            payload: { schemeId: scheme._id } // Pass the schemeId in the payload
        }]), 1500);
    };

    const handleChatOption = (action, payload) => {
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();

        const lang = currentUser.language;

        // Add user's choice to the chat log
        const actionTextMap = {
            'diagnose-start': uiStrings.diagnose_disease[lang],
            'diagnose-upload': uiStrings.chat_upload_photo_option[lang],
            'check-price': uiStrings.check_market_price[lang],
            'post-labour': uiStrings.post_for_labour[lang],
            'check-weather': uiStrings.check_weather[lang]
        };

        if(action === 'scheme-apply' && payload) {
            const scheme = db.governmentSchemes.find(s => s._id === payload.schemeId);
            const userMessage = uiStrings.chat_scheme_apply_prompt[lang].replace('{schemeName}', scheme.name[lang]);
            addChatMessage('user', userMessage);
        } else if (actionTextMap[action]) {
            addChatMessage('user', actionTextMap[action]);
        }

        setTimeout(() => {
            switch (action) {
                case 'diagnose-start':
                    addChatMessage('agent', uiStrings.chat_diagnose_start_prompt[lang]);
                    setTimeout(() => addChatMessage('user', '', 'options', [{
                        text: uiStrings.chat_upload_photo_option[lang],
                        action: 'diagnose-upload'
                    }]), 1000);
                    break;
                case 'diagnose-upload':
                    addChatMessage('user', '', 'image');
                    setTimeout(() => addChatMessage('agent', uiStrings.chat_analyzing_photo[lang]), 1500);
                    setTimeout(() => addChatMessage('agent', uiStrings.chat_disease_result_leaf_curl[lang]), 3500);
                    break;
                case 'check-price':
                    const prices = db.marketPrices.filter(p => p.cropMasterId === currentCrop.cropMasterId);
                    if (prices.length > 0) {
                        const maxPrice = Math.max(...prices.map(p => p.pricePerQuintal));
                        const formattedPrice = maxPrice.toLocaleString('en-IN');
                        const priceInfoString = uiStrings.chat_price_info[lang].replace('{price}', formattedPrice);
                        addChatMessage('agent', priceInfoString);
                    } else {
                        addChatMessage('agent', uiStrings.chat_price_not_found[lang]);
                    }
                    break;
                case 'post-labour':
                    addChatMessage('agent', uiStrings.chat_post_labour_confirm[lang]);
                    break;
                case 'scheme-apply':
                    if (payload && payload.schemeId === 'scheme_pm_kisan') {
                        addChatMessage('agent', uiStrings.chat_scheme_apply_info_pmkisan[lang]);
                    } else if (payload && payload.schemeId === 'scheme_rythu_bharosa') {
                        addChatMessage('agent', uiStrings.chat_scheme_apply_info_rythubharosa[lang]);
                    }
                    break;
                case 'check-weather':
                    addChatMessage('agent', lang === 'te' ? 'వాతావరణం: 34°C, ఎండగా ఉంది. రాబోయే 3 రోజుల్లో వర్షం సూచన లేదు.' : 'Weather: 34°C, Sunny. No rain expected in the next 3 days.');
                    break;
            }
        }, 1000);
    };

    // --- INITIALIZATION ---
    document.getElementById('back-from-chat-btn').addEventListener('click', () => navigateTo(chatReturnScreen));

    document.getElementById('lang-en-btn').addEventListener('click', () => translateUI('en'));
    document.getElementById('lang-te-btn').addEventListener('click', () => translateUI('te'));

    document.getElementById('login-btn').addEventListener('click', () => {
        const phone = document.getElementById('phone').value;
        const user = db.users.find(u => u.phone === phone);
        if (user) {
            currentUser = user;
            currentUser.language = currentLang; // Set user language based on login screen selection

            translateUI(currentUser.language); // Translate the entire app shell once
            navigateTo('home-screen'); // Navigate to the home screen
        } else {
            alert(uiStrings.user_not_found[currentLang]);
        }
    });

    // Initial load
    translateUI(currentLang); // Translate login screen to default language
    navigateTo('login-screen');
});