document.addEventListener('DOMContentLoaded', () => {

    // --- V12 - INTERACTIVE FINANCIALS & PROFIT PROJECTION ---
    const db = {
        users: [
            { _id: 'user_anjamma', phone: '9876543210', name: { te: 'అంజమ్మ', en: 'Anjamma' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_ramarao', phone: '9876543211', name: { te: 'రామారావు', en: 'RamaRao' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER'], docs: ['AADHAAR', 'BANK_PASSBOOK'] },
            { _id: 'user_malli', phone: '9876543212', name: { te: 'మల్లికార్జున రావు', en: 'Malli Karjuna Rao' }, language: 'te', capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_kaasamma', phone: '9876543213', name: { te: 'కాసమ్మ', en: 'Kaasamma' }, language: 'te', capabilities: ['LABOURER', 'LEADER'], docs: ['AADHAAR'] },
            { _id: 'user_subbarao', phone: '9876543214', name: { te: 'సుబ్బారావు', en: 'Subba Rao' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_venkanna', phone: '9876543215', name: { te: 'వెంకన్న', en: 'Venkanna' }, language: 'te', capabilities: ['FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_sreenu', phone: '9876543217', name: { te: 'శ్రీను', en: 'Sreenu' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_lakshmi', phone: '9876543218', name: { te: 'లక్ష్మి', en: 'Lakshmi' }, language: 'te', capabilities: ['LABOURER'], docs: ['AADHAAR'] },
            { _id: 'user_ranga', phone: '9876543219', name: { te: 'రంగా', en: 'Ranga' }, language: 'te', capabilities: ['LABOURER', 'LEADER', 'EQUIPMENT_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK'] },
        ],
        crops: [ // Added yieldPerAcreInQuintals for profit projection
            { _id: 'crop_master_vari', name: { te: 'వరి', en: 'Paddy' }, emoji: '🌾', yieldPerAcreInQuintals: 30 },
            { _id: 'crop_master_mirchi', name: { te: 'మిర్చి', en: 'Chilli' }, emoji: '🌶️', yieldPerAcreInQuintals: 23 },
            { _id: 'crop_master_patti', name: { te: 'పత్తి', en: 'Cotton' }, emoji: '☁️', yieldPerAcreInQuintals: 10 },
            { _id: 'crop_master_kandhi', name: { te: 'కంది', en: 'Pigeon Pea' }, emoji: '🌱', yieldPerAcreInQuintals: 5 },
        ],
        farms: [
            { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: { te: "రోడ్ దగ్గర పొలం", en: "Road-side Farm" }, acres: 4 },
            { _id: 'farm_anjamma_2', userId: 'user_anjamma', farmName: { te: "మామిడి తోట వెనుక", en: "Behind Mango Grove" }, acres: 3.5 },
            { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: { te: "నది పక్కన భూమి", en: "Land near River" }, acres: 10 },
            { _id: 'farm_malli_1', userId: 'user_malli', farmName: { te: "జనపాడు దగ్గర పొలం", en: "Farm near Janapadu" }, acres: 12 },
            { _id: 'farm_venkanna_1', userId: 'user_venkanna', farmName: { te: "కొత్త పొలం", en: "New Farm" }, acres: 6 },
        ],
        cropInstances: [ // Added areaSownInAcres to each instance
            { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', areaSownInAcres: 2, status: { te: 'పెరుగుతోంది', en: 'Growing' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 4500 },
                    { category: { te: 'ఎరువులు', en: 'Fertilizer' }, amount: 3200 },
                    { category: { te: 'పురుగుమందులు', en: 'Pesticides' }, amount: 1800 },
                    { category: { te: 'నీరు & కరెంట్', en: 'Water & Electricity'}, amount: 2500 }
                ],
                revenue: 0
            },
            { _id: 'ci_anjamma_patti', farmId: 'farm_anjamma_2', userId: 'user_anjamma', cropMasterId: 'crop_master_patti', areaSownInAcres: 3.5, status: { te: 'అమ్మబడింది', en: 'Sold' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 6000 },
                    { category: { te: 'కూలీలు', en: 'Labour' }, amount: 15000 },
                    { category: { te: 'పరికరాలు', en: 'Equipment' }, amount: 4500 }
                ],
                revenue: 195000
            },
            { _id: 'ci_anjamma_vari', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_vari', areaSownInAcres: 2, status: { te: 'కోత కోయబడింది', en: 'Harvested' },
                expenses: [
                    { category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 3000 },
                    { category: { te: 'కూలీలు', en: 'Labour' }, amount: 8000 }
                ],
                revenue: 0
            },
            { _id: 'ci_ramarao_vari', farmId: 'farm_ramarao_1', userId: 'user_ramarao', cropMasterId: 'crop_master_vari', areaSownInAcres: 10, status: { te: 'అమ్మబడింది', en: 'Sold' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 5000 }, { category: { te: 'కూలీలు', en: 'Labour' }, amount: 40000 }], revenue: 455000 },
            { _id: 'ci_malli_vari', farmId: 'farm_malli_1', userId: 'user_malli', cropMasterId: 'crop_master_vari', areaSownInAcres: 12, status: { te: 'కోత కోయబడింది', en: 'Harvested' }, expenses: [{ category: { te: 'పరికరాలు', en: 'Equipment' }, amount: 30000 }], revenue: 0 },
            { _id: 'ci_venkanna_kandhi', farmId: 'farm_venkanna_1', userId: 'user_venkanna', cropMasterId: 'crop_master_kandhi', areaSownInAcres: 6, status: { te: 'పెరుగుతోంది', en: 'Growing' }, expenses: [{ category: { te: 'ఎరువులు', en: 'Fertilizer' }, amount: 4000 }], revenue: 0 },
        ],
        labourProfiles: [
            { userId: 'user_anjamma', skills: [{ te: 'మిర్చి కోత', en: 'Chilli Picking' }], ratePerDay: 550 },
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
            { _id: 'post_anjamma_1', postedByUserId: 'user_anjamma', type: 'NEEDS_LABOUR', details: { cropInstanceId: 'ci_anjamma_mirchi', task: { te: 'మిర్చి కోతకు 5 మంది కావాలి', en: 'Need 5 for chilli picking' }, requiredCount: 5, offeredRatePerDay: 580 }, location: { address: 'రోడ్ దగ్గర పొలం' }, status: 'OPEN' },
            { _id: 'post_ramarao_1', postedByUserId: 'user_ramarao', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', en: 'Need tiller for ploughing' } }, location: { address: 'నది పక్కన భూమి' }, status: 'FILLED' },
            { _id: 'post_malli_1', postedByUserId: 'user_malli', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి కోతకు 10 మంది కావాలి', en: 'Need 10 for Paddy Harvesting' }, requiredCount: 10, offeredRatePerDay: 620 }, location: { address: 'జనపాడు దగ్గర పొలం' }, status: 'FILLED' },
            { _id: 'post_venkanna_1', postedByUserId: 'user_venkanna', type: 'NEEDS_LABOUR', details: { task: { te: 'కలుపు తీయుటకు 4 గురు కావాలి', en: 'Need 4 for weeding' }, requiredCount: 4, offeredRatePerDay: 530 }, location: { address: 'కొత్త పొలం' }, status: 'OPEN' },
            { _id: 'post_ramarao_2', postedByUserId: 'user_ramarao', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి నాట్లకు 8 మంది కావాలి', en: 'Need 8 for Paddy Planting' }, requiredCount: 8, offeredRatePerDay: 600 }, location: { address: 'నది పక్కన భూమి' }, status: 'OPEN' },
            { _id: 'post_venkanna_2', postedByUserId: 'user_venkanna', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'పంట స్ప్రే చేయడానికి ట్రాక్టర్ కావాలి', en: 'Need tractor for spraying' } }, location: { address: 'కొత్త పొలం' }, status: 'OPEN' },
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
    let chatReturnScreen = 'home-screen';

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
        const financials = {
            spent: { total: 0, byCategory: {} },
            made: { total: 0, byCategory: { CROP_SALE: 0, LABOUR_WORK: 0, EQUIPMENT_RENTAL: 0 } }
        };

        // Calculate money spent from crop expenses
        db.cropInstances.filter(ci => ci.userId === userId).forEach(ci => {
            ci.expenses.forEach(exp => {
                const categoryKey = exp.category.en.toUpperCase().replace(' & ', '_');
                if (!financials.spent.byCategory[categoryKey]) {
                    financials.spent.byCategory[categoryKey] = { amount: 0, name: exp.category.te };
                }
                financials.spent.byCategory[categoryKey].amount += exp.amount;
            });
            // Calculate money made from selling crops
            financials.made.byCategory.CROP_SALE += ci.revenue;
        });

        // Calculate money made from providing services (labour/equipment)
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

        chartContainer.innerHTML = ''; // Clear previous chart
        summaryEl.innerHTML = `
            <div class="financial-total spent">
                <span>మొత్తం ఖర్చు</span>
                <strong>₹${financials.spent.total.toLocaleString('en-IN')}</strong>
            </div>
            <div class="financial-total made">
                <span>మొత్తం ఆదాయం</span>
                <strong>₹${financials.made.total.toLocaleString('en-IN')}</strong>
            </div>
            <div id="pie-tooltip" class="pie-tooltip">క్లిక్ చేయండి</div>`;

        const tooltip = document.getElementById('pie-tooltip');
        const data = financials.spent.byCategory;
        if (financials.spent.total === 0) {
            tooltip.innerText = 'ఖర్చులు లేవు';
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

    // --- RENDER FUNCTIONS ---
    const renderHomeScreen = () => {
        const lang = currentUser.language;
        document.getElementById('welcome-message').innerText = `నమస్కారం, ${currentUser.name[lang]}`;
        const financials = calculateFinancials(currentUser._id);
        renderPieChart(financials);

        const summaryContainer = document.getElementById('summary-cards-container');
        summaryContainer.innerHTML = ''; // Clear previous cards

        // Potential Profit Card
        const growingCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id && ci.status.en === 'Growing');
        if (growingCrops.length > 0) {
            let profitHtml = '<div class="card profit-card"><h3>📈 అంచనా లాభం</h3>';
            growingCrops.forEach(ci => {
                const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
                const marketPriceInfo = db.marketPrices.filter(p => p.cropMasterId === ci.cropMasterId);
                if (!cropInfo.yieldPerAcreInQuintals || marketPriceInfo.length === 0) return;

                const maxPrice = Math.max(...marketPriceInfo.map(p => p.pricePerQuintal));
                const totalYield = cropInfo.yieldPerAcreInQuintals * ci.areaSownInAcres;
                const potentialRevenue = totalYield * maxPrice;
                const currentExpenses = ci.expenses.reduce((sum, exp) => sum + exp.amount, 0);
                const potentialProfit = potentialRevenue - currentExpenses;

                profitHtml += `<div class="profit-item">
                    <h4>${cropInfo.emoji} ${cropInfo.name.te} (${ci.areaSownInAcres} ఎకరాలు)</h4>
                    <p>అంచనా ఆదాయం: ₹${potentialRevenue.toLocaleString('en-IN')}</p>
                    <p class="profit-value">అంచనా లాభం: <strong>₹${potentialProfit.toLocaleString('en-IN')}</strong></p>
                </div>`;
            });
            profitHtml += '</div>';
            summaryContainer.innerHTML += profitHtml;
        }

        // Other summary cards (market prices, schedules) can be added here as before
        const labourSchedule = db.schedules.filter(s => s.resourceId === currentUser._id && s.resourceType === 'LABOUR');
        if (labourSchedule.length > 0) {
            let labourHTML = '<div class="card"><h3>నా కూలీ పనులు</h3><ul>';
            labourSchedule.forEach(s => {
                const farmer = db.users.find(u => u._id === s.farmerId);
                labourHTML += `<li>${farmer.name[lang]} పొలంలో పని (${new Date(s.startTime).toLocaleDateString('te-IN')})</li>`;
            });
            labourHTML += '</ul></div>';
            summaryContainer.innerHTML += labourHTML;
        }
    };

    const renderMyFarmScreen = () => {
        const content = document.getElementById('my-farm-content');
        content.innerHTML = '';
        db.cropInstances.filter(ci => ci.userId === currentUser._id).forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);
            content.innerHTML += `<div class="card card-flex clickable" data-crop-id="${ci._id}">
                    <span class="card-emoji">${cropInfo.emoji}</span>
                    <div>
                        <h3>${cropInfo.name.te} - ${farmInfo.farmName.te}</h3>
                        <p>విస్తీర్ణం: ${ci.areaSownInAcres} ఎకరాలు | స్థితి: ${ci.status.te}</p>
                    </div>
                    <div class="status-dot ${ci.status.en.toLowerCase()}"></div></div>`;
        });
        content.querySelectorAll('.card.clickable').forEach(card => card.addEventListener('click', () => startFarmChat(card.dataset.cropId)));
    };

    const renderHireScreen = (filter = 'other-labour-posts') => {
        const hireContent = document.getElementById('hire-content');
        const statusMap = { OPEN: 'తెరిచి ఉంది', FILLED: 'నింపబడింది' };
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
                                <h3>${post.details.task.te}</h3>
                                <p>రైతు: ${farmer.name.te} | స్థానం: ${post.location.address}</p>
                            </div>
                            <div class="rate-info">
                                ${post.details.offeredRatePerDay ? `<strong>₹${post.details.offeredRatePerDay}</strong><span>/రోజుకి</span>` : '<span>ధర చర్చించదగినది</span>'}
                            </div>
                        </div>`;
            }).join('');
        } else {
            hireContent.innerHTML = `<div class="card"><p>ఈ విభాగంలో పోస్ట్‌లు ఏవీ కనుగొనబడలేదు.</p></div>`;
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
        const totalAcres = db.farms.filter(f => f.userId === currentUser._id).reduce((sum, farm) => sum + farm.acres, 0);
        const userDocs = currentUser.docs;
        const eligibleSchemes = db.governmentSchemes.filter(scheme => totalAcres <= scheme.eligibility.maxAcres);
        if (eligibleSchemes.length > 0) {
            content.innerHTML = eligibleSchemes.map(scheme => `<div class="card scheme-card"><h3>${scheme.name.te}</h3><p>${scheme.description.te}</p><h4>అవసరమైన పత్రాలు:</h4><ul class="doc-list">${scheme.requiredDocs.map(doc => `<li class="${userDocs.includes(doc.id) ? 'has-doc' : 'needs-doc'}">${doc.name.te} <span>${userDocs.includes(doc.id) ? '✅' : '❌'}</span></li>`).join('')}</ul></div>`).join('');
        } else {
            content.innerHTML = `<div class="card"><p>ప్రస్తుతం మీకు అర్హత ఉన్న పథకాలు ఏవీ లేవు.</p></div>`;
        }
        content.innerHTML += `<button id="scheme-chat-btn" class="chat-now-btn">ఏజెంట్‌తో మాట్లాడండి</button>`;
        document.getElementById('scheme-chat-btn').onclick = startSchemeChat;
    };

    const renderProfileScreen = () => {
        const lang = currentUser.language;
        const content = document.getElementById('profile-content');
        const financials = calculateFinancials(currentUser._id);

        const userFarms = db.farms.filter(f => f.userId === currentUser._id);
        const labourProfile = db.labourProfiles.find(lp => lp.userId === currentUser._id);
        const equipmentProfile = db.equipment.filter(eq => eq.userId === currentUser._id);

        content.innerHTML = `
            <div class="card profile-section"><h3>వ్యక్తిగత వివరాలు</h3><p>పేరు: ${currentUser.name[lang]}</p><p>ఫోన్: ${currentUser.phone}</p></div>
            <div class="card profile-section">
                <h3>ఆర్థిక సారాంశం</h3>
                <p class="investment">మొత్తం ఖర్చు: ₹${financials.spent.total.toLocaleString('en-IN')}</p>
                <p class="profit">మొత్తం ఆదాయం: ₹${financials.made.total.toLocaleString('en-IN')}</p>
                <hr>
                <h4>ఆదాయ వనరులు:</h4>
                <p>పంట అమ్మకం: ₹${financials.made.byCategory.CROP_SALE.toLocaleString('en-IN')}</p>
                <p>కూలి పని: ₹${financials.made.byCategory.LABOUR_WORK.toLocaleString('en-IN')}</p>
                <p>పరికరాల అద్దె: ₹${financials.made.byCategory.EQUIPMENT_RENTAL.toLocaleString('en-IN')}</p>
            </div>
            ${userFarms.length > 0 ? `<div class="card profile-section"><h3>నా పొలాలు</h3><ul>${userFarms.map(f => `<li>${f.farmName[lang]} (${f.acres} ఎకరాలు)</li>`).join('')}</ul></div>` : ''}
            ${labourProfile ? `<div class="card profile-section"><h3>కూలీ ప్రొఫైల్</h3><p>నైపుణ్యాలు: ${labourProfile.skills.map(s => s[lang]).join(', ')}</p><p>రోజువారీ రేటు: ₹${labourProfile.ratePerDay}</p></div>` : ''}
            ${equipmentProfile.length > 0 ? `<div class="card profile-section"><h3>నా పరికరాలు</h3><ul>${equipmentProfile.map(eq => `<li>${eq.type[lang]}</li>`).join('')}</ul></div>` : ''}
        `;
    };

    // --- AGENTIC CHAT LOGIC ---
    const chatLog = document.getElementById('chat-log');

    const addChatMessage = (sender, content, type = 'text', options = []) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        if (type === 'image') {
            bubble.innerHTML = `<img src="https://i.imgur.com/g06n6V1.jpg" class="chat-image" alt="A close-up image of a green chilli plant leaf affected by leaf curl disease. The leaf is visibly curled, crinkled, and slightly yellowed, showing typical symptoms of the viral infection.">`;
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
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    const startFarmChat = (cropInstanceId) => {
        chatReturnScreen = 'my-farm-screen';
        currentCrop = db.cropInstances.find(ci => ci._id === cropInstanceId);
        const cropInfo = db.crops.find(c => c._id === currentCrop.cropMasterId);
        document.getElementById('chat-title').innerText = `${cropInfo.name.te} ${cropInfo.emoji}`;
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');
        setTimeout(() => addChatMessage('agent', `నమస్కారం! మీ ${cropInfo.name.te} పంటకు నేను ఎలా సహాయపడగలను?`), 500);
        setTimeout(() => addChatMessage('user', '', 'options', [
            { text: 'వ్యాధిని నిర్ధారించండి', action: 'diagnose-start' },
            { text: 'వాతావరణం తనిఖీ', action: 'check-weather' },
            { text: 'మార్కెట్ ధర', action: 'check-price' },
            { text: 'కూలీల కోసం పోస్ట్ చేయండి', action: 'post-labour' },
        ]), 1500);
    };

    const startSchemeChat = () => {
        chatReturnScreen = 'schemes-screen';
        document.getElementById('chat-title').innerText = 'ప్రభుత్వ పథకాలు';
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');
        setTimeout(() => addChatMessage('agent', 'నమస్కారం! ప్రభుత్వ పథకాల గురించి నేను మీకు ఎలా సహాయపడగలను?'), 500);
        setTimeout(() => addChatMessage('user', '', 'options', [{ text: 'పీఎం కిసాన్‌కు ఎలా దరఖాస్తు చేయాలి?', action: 'scheme-apply-pmkisan' }]), 1500);
    };

    const handleChatOption = (action) => {
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();
        const actionTextMap = { 'diagnose-start': 'వ్యాధిని నిర్ధారించండి', 'check-price': 'మార్కెట్ ధర', 'post-labour': 'కూలీల కోసం పోస్ట్ చేయండి', 'find-jobs': 'అందుబాటులో ఉన్న పనులు', 'scheme-apply-pmkisan': 'పీఎం కిసాన్‌కు ఎలా దరఖాస్తు చేయాలి?' };
        if (actionTextMap[action]) addChatMessage('user', actionTextMap[action]);

        setTimeout(() => {
            switch (action) {
                case 'diagnose-start':
                    addChatMessage('agent', 'తప్పకుండా. దయచేసి వ్యాధి సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.');
                    setTimeout(() => addChatMessage('user', '', 'options', [{ text: 'ఫోటో అప్‌లోడ్ చేయండి', action: 'diagnose-upload' }]), 1000);
                    break;
                case 'diagnose-upload':
                    addChatMessage('user', '', 'image');
                    setTimeout(() => addChatMessage('agent', 'ఫోటోను విశ్లేషిస్తున్నాను...'), 1500);
                    setTimeout(() => addChatMessage('agent', `ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong> లా కనిపిస్తోంది. నివారణకు, లీటరు నీటికి 0.5ml <strong>ఇమిడాక్లోప్రిడ్</strong> కలిపి పిచికారీ చేయండి.`), 3500);
                    break;
                case 'check-price':
                    const prices = db.marketPrices.filter(p => p.cropMasterId === currentCrop.cropMasterId);
                    if (prices.length > 0) {
                        const maxPrice = Math.max(...prices.map(p => p.pricePerQuintal));
                        addChatMessage('agent', `ప్రస్తుతం మీ పంటకు గరిష్ట ధర ₹${maxPrice.toLocaleString('en-IN')}/క్వింటాల్ వరకు ఉంది.`);
                    } else {
                        addChatMessage('agent', 'క్షమించండి, ఈ పంటకు మార్కెట్ ధర సమాచారం అందుబాటులో లేదు.');
                    }
                    break;
                case 'post-labour':
                    addChatMessage('agent', 'తప్పకుండా. నేను మీ కోసం ఒక కూలీల అవసరం పోస్ట్ సృష్టిస్తాను. వివరాలు నిర్ధారించండి.');
                    break;
                case 'scheme-apply-pmkisan':
                    addChatMessage('agent', 'మీరు మీ సమీప మీసేవ కేంద్రానికి వెళ్లి, మీ ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్, మరియు భూమి రికార్డులతో దరఖాస్తు చేసుకోవచ్చు.');
                    break;
            }
        }, 1000);
    };

    // --- INITIALIZATION ---
    document.getElementById('back-from-chat-btn').addEventListener('click', () => navigateTo(chatReturnScreen));

    document.getElementById('login-btn').addEventListener('click', () => {
        const phone = document.getElementById('phone').value;
        currentUser = db.users.find(user => user.phone === phone);
        if (currentUser) {
            navigateTo('home-screen');
        } else {
            alert('User not found!');
        }
    });

    navigateTo('login-screen');
});