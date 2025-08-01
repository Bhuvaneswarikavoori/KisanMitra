document.addEventListener('DOMContentLoaded', () => {

    // --- Using the V6 Fully Bilingual Dummy Database ---
    const db = {
        users: [ { _id: 'user_anjamma', phone: '9876543210', name: { te: 'అంజమ్మ', en: 'Anjamma' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'] }, { _id: 'user_ramarao', phone: '9876543211', name: { te: 'రామారావు', en: 'RamaRao' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER'] }, { _id: 'user_malli', phone: '9876543212', name: { te: 'మల్లికార్జున రావు', en: 'Malli Karjuna Rao' }, language: 'te', capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'] }, { _id: 'user_kaasamma', phone: '9876543213', name: { te: 'కాసమ్మ', en: 'Kaasamma' }, language: 'te', capabilities: ['LABOURER', 'LEADER'] }, { _id: 'user_subbarao', phone: '9876543214', name: { te: 'సుబ్బారావు', en: 'Subba Rao' }, language: 'te', capabilities: ['LABOURER'] }, { _id: 'user_venkanna', phone: '9876543215', name: { te: 'వెంకన్న', en: 'Venkanna' }, language: 'te', capabilities: ['FARM_OWNER'] }, { _id: 'user_rajeshwari', phone: '9876543216', name: { te: 'రాజేశ్వరి', en: 'Rajeshwari' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER'] }, { _id: 'user_sreenu', phone: '9876543217', name: { te: 'శ్రీను', en: 'Sreenu' }, language: 'te', capabilities: ['LABOURER'] }, { _id: 'user_lakshmi', phone: '9876543218', name: { te: 'లక్ష్మి', en: 'Lakshmi' }, language: 'te', capabilities: ['LABOURER'] }, { _id: 'user_ranga', phone: '9876543219', name: { te: 'రంగా', en: 'Ranga' }, language: 'te', capabilities: ['LABOURER', 'LEADER', 'EQUIPMENT_OWNER'] }, ],
        farms: [ { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: { te: "రోడ్ దగ్గర పొలం", en: "Road-side Farm" }, waterSource: { te: 'కాలువ', en: 'Canal' } }, { _id: 'farm_anjamma_2', userId: 'user_anjamma', farmName: { te: "మామిడి తోట వెనుక", en: "Behind Mango Grove" }, waterSource: { te: 'బోరుబావి', en: 'Borewell' } }, { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: { te: "నది పక్కన భూమి", en: "Land near River" }, waterSource: { te: 'నది', en: 'River' } }, { _id: 'farm_malli_1', userId: 'user_malli', farmName: { te: "జనపాడు దగ్గర పొలం", en: "Farm near Janapadu" }, waterSource: { te: 'బోరుబావి', en: 'Borewell' } }, ],
        crops: [ { _id: 'crop_master_vari', name: { te: 'వరి', en: 'Paddy' } }, { _id: 'crop_master_mirchi', name: { te: 'మిర్చి', en: 'Chilli' } }, { _id: 'crop_master_kandhi', name: { te: 'కంది', en: 'Pigeon Pea' } } ],
        cropInstances: [ { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', status: { te: 'పెరుగుతోంది', en: 'Growing' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 3500 }, { category: { te: 'పురుగుమందులు', en: 'Pesticides' }, amount: 1200 }, { category: { te: 'ఎరువులు', en: 'Fertilizer' }, amount: 2000 }], revenue: 0 }, { _id: 'ci_ramarao_vari', farmId: 'farm_ramarao_1', userId: 'user_ramarao', cropMasterId: 'crop_master_vari', status: { te: 'అమ్మబడింది', en: 'Sold' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 5000 }, { category: { te: 'కూలీలు', en: 'Labour' }, amount: 12000 }], revenue: 95000 }, { _id: 'ci_malli_vari', farmId: 'farm_malli_1', userId: 'user_malli', cropMasterId: 'crop_master_vari', status: { te: 'కోత కోయబడింది', en: 'Harvested' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 8000 }, { category: { te: 'పరికరాలు', en: 'Equipment' }, amount: 25000 }], revenue: 0 }, ],
        labourProfiles: [ { userId: 'user_anjamma', skills: [{ te: 'మిర్చి కోత', en: 'Chilli Picking' }], ratePerDay: 550 }, { userId: 'user_ramarao', skills: [{ te: 'వరి నాట్లు', en: 'Paddy Planting' }], ratePerDay: 600 }, { userId: 'user_kaasamma', skills: [{ te: 'వరి కోత', en: 'Paddy Harvesting' }], ratePerDay: 650 }, { userId: 'user_ranga', skills: [{ te: 'ట్రాక్టర్ డ్రైవింగ్', en: 'Tractor Driving' }], ratePerDay: 750 } ],
        equipment: [ { _id: 'equip_anjamma_tiller', userId: 'user_anjamma', type: { te: 'టిల్లర్', en: 'Tiller' }, modelName: 'Generic Power Tiller', rate: { amount: 4000, unit: { te: 'రోజు', en: 'Day' } } }, { _id: 'equip_malli_harvester', userId: 'user_malli', type: { te: 'హార్వెస్టర్', en: 'Harvester' }, modelName: 'Standard H140', rate: { amount: 3000, unit: { te: 'గంట', en: 'Hour' } } } ],
        labourGroups: [ { _id: 'group_kaasamma', name: { te: "కాసమ్మ దళం", en: "Kaasamma Team" }, leaderId: 'user_kaasamma', members: ['user_kaasamma', 'user_subbarao', 'user_lakshmi'] }, { _id: 'group_ranga', name: { te: "రంగా బృందం", en: "Ranga Team" }, leaderId: 'user_ranga', members: ['user_ranga', 'user_sreenu'] } ],
        marketPrices: [ { cropMasterId: 'crop_master_vari', marketName: { te: 'గుంటూరు మార్కెట్ యార్డ్', en: 'Guntur Market Yard' }, location: { address: 'Mirchi Yard, Guntur' }, pricePerQuintal: 2100 }, { cropMasterId: 'crop_master_mirchi', marketName: { te: 'గుంటూరు మార్కెట్ యార్డ్', en: 'Guntur Market Yard' }, location: { address: 'Mirchi Yard, Guntur' }, pricePerQuintal: 7250 }, { cropMasterId: 'crop_master_vari', marketName: { te: 'తెనాలి మార్కెట్', en: 'Tenali Market' }, location: { address: 'Market Center, Tenali' }, pricePerQuintal: 2150 } ],
        postings: [ { _id: 'post_1', postedByUserId: 'user_anjamma', type: 'NEEDS_LABOUR', details: { task: { te: 'మిర్చి కోత', en: 'Chilli Picking' }, requiredCount: 2, offeredRatePerDay: 575, days: 5 }, location: { address: 'రోడ్ దగ్గర పొలం' }, status: 'FILLED' }, { _id: 'post_2', postedByUserId: 'user_ramarao', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', en: 'Need tiller for ploughing' }, days: 2 }, location: { address: 'నది పక్కన భూమి' }, status: 'FILLED' }, { _id: 'post_3', postedByUserId: 'user_malli', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి కోత', en: 'Paddy Harvesting' }, requiredCount: 5, offeredRatePerDay: 600 }, location: { address: 'జనపాడు దగ్గర పొలం' }, status: 'OPEN' }, ],
        bookings: [ { _id: 'booking_1', postingId: 'post_1', farmerId: 'user_anjamma', provider: { id: 'group_ranga', type: 'GROUP' }, status: 'COMPLETED', totalCost: 5750 }, { _id: 'booking_2', postingId: 'post_2', farmerId: 'user_ramarao', provider: { id: 'equip_anjamma_tiller', type: 'USER' }, status: 'COMPLETED', totalCost: 8000 }, ],
        schedules: [ { resourceId: 'user_ranga', resourceType: 'LABOUR', bookingId: 'booking_1', startTime: new Date('2025-09-01T09:00:00'), endTime: new Date('2025-09-05T17:00:00') } ]
    };

    // --- APP STATE ---
    let currentUser = null;
    let currentCrop = null;

    // --- DOM ELEMENTS & NAVIGATION ---
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
            case 'profile-screen': renderProfileScreen(); break;
        }
    };
    navButtons.forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.screen)));

    // =================================================================
    // --- FINANCIAL & PIE CHART LOGIC ---
    // =================================================================
    const calculateFinancials = (userId) => {
        const financials = { LABOUR: 0, EQUIPMENT: 0, SEEDS: 0, PESTS: 0, FERTILIZER: 0, CROP_REVENUE: 0, LABOUR_PROFIT: 0, EQUIPMENT_PROFIT: 0 };
        // Expenses
        db.cropInstances.filter(ci => ci.userId === userId).forEach(ci => {
            ci.expenses.forEach(exp => { financials[exp.category.en.toUpperCase()] += exp.amount; });
            financials.CROP_REVENUE += ci.revenue;
        });
        // Income
        db.bookings.filter(b => b.status === 'COMPLETED').forEach(b => {
            const myEquipment = db.equipment.find(e => e._id === b.provider.id && e.userId === userId);
            if (myEquipment) financials.EQUIPMENT_PROFIT += b.totalCost;
            const myGroup = db.labourGroups.find(g => g._id === b.provider.id && g.members.includes(userId));
            if (myGroup) financials.LABOUR_PROFIT += (b.totalCost / myGroup.members.length); // Simplified
        });
        return financials;
    };

    const renderPieChart = (financials) => {
        const lang = currentUser.language;
        const data = {
            'విత్తనాలు': financials.SEEDS, 'పురుగుమందులు': financials.PESTS, 'ఎరువులు': financials.FERTILIZER,
            'కూలీల ఖర్చు': financials.LABOUR, 'పరికరాల ఖర్చు': financials.EQUIPMENT
        };
        const colors = ['#4CAF50', '#FFC107', '#2196F3', '#F44336', '#9C27B0'];
        const totalInvestment = Object.values(data).reduce((sum, val) => sum + val, 0);
        const totalProfit = financials.CROP_REVENUE + financials.LABOUR_PROFIT + financials.EQUIPMENT_PROFIT;

        const financialCard = document.getElementById('financial-card');
        if (totalInvestment === 0 && totalProfit === 0) {
            financialCard.style.display = 'none';
            return;
        }
        financialCard.style.display = 'block';

        let gradient = 'conic-gradient(';
        let legendHTML = '';
        let currentPercentage = 0;
        let colorIndex = 0;
        for (const [key, value] of Object.entries(data)) {
            if (value > 0) {
                const percentage = (value / totalInvestment) * 100;
                const color = colors[colorIndex++];
                gradient += `${color} ${currentPercentage}% ${currentPercentage + percentage}%, `;
                legendHTML += `<div class="legend-item"><div class="legend-color" style="background-color:${color}"></div>${key}</div>`;
                currentPercentage += percentage;
            }
        }
        document.getElementById('pie-chart').style.background = totalInvestment > 0 ? (gradient.slice(0, -2) + ')') : '#eee';
        document.getElementById('pie-chart-legend').innerHTML = legendHTML;
        document.getElementById('financial-summary-totals').innerHTML = `
            <p class="investment">మొత్తం పెట్టుబడి: ₹${totalInvestment.toLocaleString('en-IN')}</p>
            <p class="profit">మొత్తం ఆదాయం: ₹${totalProfit.toLocaleString('en-IN')}</p>`;
    };

    // =================================================================
    // --- RENDER FUNCTIONS (V4 - FINAL) ---
    // =================================================================

    const renderHomeScreen = () => {
        const lang = currentUser.language;
        document.getElementById('welcome-message').innerText = `నమస్కారం, ${currentUser.name[lang]}`;
        const homeContent = document.getElementById('home-content');
        const weatherContainer = document.getElementById('weather-card-container');
        const summaryContainer = document.getElementById('summary-cards-container');

        // Render Weather
        weatherContainer.innerHTML = `<div class="card weather-card"><div><h3>గుంటూరు</h3><p>34°C, ఎండ</p></div><span class="material-icons">wb_sunny</span></div>`;

        // Render Pie Chart
        const financials = calculateFinancials(currentUser._id);
        renderPieChart(financials);

        summaryContainer.innerHTML = ''; // Clear previous summary cards

        // Render My Crop Prices
        const myCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id && ci.status.en === 'Growing');
        const relevantPrices = db.marketPrices.filter(p => myCrops.some(mc => mc.cropMasterId === p.cropMasterId));
        if(relevantPrices.length > 0) {
            summaryContainer.innerHTML += `<div class="card"><h3>నా పంటల ధరలు</h3><ul>
                ${relevantPrices.map(p => {
                const crop = db.crops.find(c => c._id === p.cropMasterId);
                return `<li>${crop.name[lang]} (${p.marketName[lang]}): ₹${p.pricePerQuintal}/q</li>`;
            }).join('')}
            </ul></div>`;
        }

        // Render My Upcoming Bookings
        const mySchedule = db.schedules.filter(s => {
            const myEquipment = db.equipment.find(e => e._id === s.resourceId && e.userId === currentUser._id);
            return (s.resourceType === 'LABOUR' && s.resourceId === currentUser._id) || !!myEquipment;
        });
        if(mySchedule.length > 0) {
            summaryContainer.innerHTML += `<div class="card"><h3>నా రాబోయే పనులు</h3><ul>
                ${mySchedule.map(s => {
                const booking = db.bookings.find(b => b._id === s.bookingId);
                const farmer = db.users.find(u => u._id === booking.farmerId);
                return `<li>${farmer.name[lang]} పొలంలో పని - ${new Date(s.startTime).toLocaleDateString('te-IN')}</li>`;
            }).join('')}
            </ul></div>`;
        }
    };

    const renderMyFarmScreen = () => {
        const lang = currentUser.language;
        const content = document.getElementById('my-farm-content');
        content.innerHTML = '';
        db.cropInstances.filter(ci => ci.userId === currentUser._id).forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);
            content.innerHTML += `<div class="card card-flex clickable" data-crop-id="${ci._id}">
                    <span class="material-icons card-icon">${{Growing:'spa',Preparing:'agriculture',Harvested:'local_shipping', Sold:'paid'}[ci.status.en]}</span>
                    <div><h3>${cropInfo.name[lang]} - ${farmInfo.farmName[lang]}</h3><p>స్థితి: ${ci.status[lang]}</p></div>
                    <div class="status-dot ${ci.status.en.toLowerCase()}"></div></div>`;
        });
        content.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => startFarmChat(card.dataset.cropId)));
    };

    const renderHireScreen = (filter = 'my-labour-posts') => {
        const lang = currentUser.language;
        const hireContent = document.getElementById('hire-content');
        let postsToDisplay = [];

        switch(filter) {
            case 'my-labour-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.postedByUserId === currentUser._id); break;
            case 'my-equipment-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_EQUIPMENT' && p.postedByUserId === currentUser._id); break;
            case 'other-labour-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.postedByUserId !== currentUser._id); break;
            case 'other-equipment-posts': postsToDisplay = db.postings.filter(p => p.type === 'NEEDS_EQUIPMENT' && p.postedByUserId !== currentUser._id); break;
        }

        if (postsToDisplay.length > 0) {
            hireContent.innerHTML = postsToDisplay.map(post => {
                const farmer = db.users.find(u => u._id === post.postedByUserId);
                return `<div class="card">
                    <h3>${post.details.task[lang]}</h3>
                    <p>రైతు: ${farmer.name[lang]}</p>
                    <p>స్థానం: ${post.location.address}</p>
                    ${post.details.offeredRatePerDay ? `<p>ధర: ₹${post.details.offeredRatePerDay} / రోజుకి</p>` : ''}
                </div>`;
            }).join('');
        } else {
            hireContent.innerHTML = `<div class="card"><p>పోస్ట్‌లు ఏవీ కనుగొనబడలేదు.</p></div>`;
        }

        document.querySelectorAll('.tab-btn').forEach(btn => {
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
            return `<div class="card"><h3>${crop.name[lang]} - ${p.marketName[lang]}</h3><p>ధర: <strong>₹${p.pricePerQuintal}</strong> / క్వింటాల్</p></div>`;
        }).join('');
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortBy);
            btn.onclick = () => renderMarketPricesScreen(btn.dataset.sort);
        });
    };

    const renderProfileScreen = () => {
        const lang = currentUser.language;
        const content = document.getElementById('profile-content');

        const financials = calculateFinancials(currentUser._id);
        const totalInvestment = financials.SEEDS + financials.PESTS + financials.FERTILIZER + financials.LABOUR + financials.EQUIPMENT;
        const totalProfit = financials.CROP_REVENUE + financials.LABOUR_PROFIT + financials.EQUIPMENT_PROFIT;

        const userFarms = db.farms.filter(f => f.userId === currentUser._id);
        const labourProfile = db.labourProfiles.find(lp => lp.userId === currentUser._id);
        const equipmentProfile = db.equipment.filter(eq => eq.userId === currentUser._id);

        content.innerHTML = `
            <div class="card profile-section"><h3>వ్యక్తిగత వివరాలు</h3><p>పేరు: ${currentUser.name[lang]}</p><p>ఫోన్: ${currentUser.phone}</p></div>
            <div class="card profile-section"><h3>ఆర్థిక సారాంశం</h3><p class="investment">మొత్తం పెట్టుబడి: ₹${totalInvestment.toLocaleString('en-IN')}</p><p class="profit">మొత్తం ఆదాయం: ₹${totalProfit.toLocaleString('en-IN')}</p></div>
            ${userFarms.length > 0 ? `<div class="card profile-section"><h3>నా పొలాలు</h3><ul>${userFarms.map(f => `<li>${f.farmName[lang]}</li>`).join('')}</ul></div>` : ''}
            ${labourProfile ? `<div class="card profile-section"><h3>కూలీ ప్రొఫైల్</h3><p>నైపుణ్యాలు: ${labourProfile.skills.map(s => s[lang]).join(', ')}</p></div>` : ''}
            ${equipmentProfile.length > 0 ? `<div class="card profile-section"><h3>నా పరికరాలు</h3><ul>${equipmentProfile.map(eq => `<li>${eq.type[lang]} (${eq.modelName})</li>`).join('')}</ul></div>` : ''}
        `;
    };

    // --- AGENTIC CHAT LOGIC ---
    const chatLog = document.getElementById('chat-log');
    const addChatMessage = (sender, content, type = 'text', options = []) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        if (type === 'image') { bubble.innerHTML = `<img src="${content}" class="chat-image" alt="leaf image">`; }
        else if (type === 'options') {
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
        } else { bubble.innerHTML = content; }
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    const startFarmChat = (cropInstanceId) => {
        currentCrop = db.cropInstances.find(ci => ci._id === cropInstanceId);
        const cropInfo = db.crops.find(c => c._id === currentCrop.cropMasterId);
        const lang = currentUser.language;
        document.getElementById('chat-title').innerText = cropInfo.name[lang];
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');

        setTimeout(() => addChatMessage('agent', `నమస్కారం! మీ ${cropInfo.name[lang]} పంటకు నేను ఎలా సహాయపడగలను?`), 500);
        setTimeout(() => {
            addChatMessage('user', '', 'options', [
                { text: 'వ్యాధిని నిర్ధారించండి', action: 'diagnose-start' }, { text: 'వాతావరణం తనిఖీ', action: 'check-weather' }, { text: 'మార్కెట్ ధర', action: 'check-price' },
                { text: 'కూలీల కోసం పోస్ట్ చేయండి', action: 'post-labour' }, { text: 'పరికరాల కోసం పోస్ట్ చేయండి', action: 'post-equipment' },
                { text: 'అందుబాటులో ఉన్న పనులు', action: 'find-labour-jobs' }, { text: 'అందుబాటులో ఉన్న పరికరాలు', action: 'find-equipment' }
            ]);
        }, 1500);
    };

    const handleChatOption = (action, payload) => {
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();

        const actionTextMap = { 'diagnose-start': 'వ్యాధిని నిర్ధారించండి', 'check-weather': 'వాతావరణం తనిఖీ', 'check-price': 'మార్కెట్ ధర' };
        if (actionTextMap[action]) { addChatMessage('user', actionTextMap[action]); }

        setTimeout(() => {
            switch (action) {
                case 'diagnose-start':
                    addChatMessage('agent', 'తప్పకుండా. దయచేసి వ్యాధి సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.');
                    setTimeout(() => addChatMessage('user', '', 'options', [{ text: 'ఫోటో అప్‌లోడ్ చేయండి', action: 'diagnose-upload' }]), 1000);
                    break;
                case 'diagnose-upload':
                    addChatMessage('user', 'leaf_curl_mirchi.png', 'image'); // BUG FIX: Directly show image
                    setTimeout(() => addChatMessage('agent', 'ఫోటోను విశ్లేషిస్తున్నాను...'), 1500);
                    setTimeout(() => addChatMessage('agent', `ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong>. నివారణకు, లీటరు నీటికి 0.5ml <strong>ఇమిడాక్లోప్రిడ్</strong> కలిపి పిచికారీ చేయండి.`), 3500);
                    break;
                // Add cases for other actions here
            }
        }, 1000);
    };

    document.getElementById('back-to-farm').addEventListener('click', () => navigateTo('my-farm-screen'));

    // --- INITIALIZATION ---
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