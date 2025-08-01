document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // --- V2 DUMMY DATABASE (Guntur District) ---
    // =================================================================
    const db = {
        users: [
            { _id: 'user_anjamma', phone: '9876543210', name: 'అంజమ్మ', location: { type: 'Point', coordinates: [80.45, 16.30], address: '1-23, Arundelpet, Guntur' }, capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'] },
            { _id: 'user_ramarao', phone: '9876543211', name: 'రామారావు', location: { type: 'Point', coordinates: [80.62, 16.29], address: '4-56, Main Road, Mangalagiri' }, capabilities: ['FARM_OWNER', 'LABOURER'] },
            { _id: 'user_malli', phone: '9876543212', name: 'మల్లికార్జున రావు', location: { type: 'Point', coordinates: [80.44, 16.35], address: '7-89, Pattabhipuram, Guntur' }, capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'] },
            { _id: 'user_kaasamma', phone: '9876543213', name: 'కాసమ్మ', location: { type: 'Point', coordinates: [80.60, 16.28], address: 'Near Bus Stand, Mangalagiri' }, capabilities: ['LABOURER', 'LEADER'] },
            { _id: 'user_subbarao', phone: '9876543214', name: 'సుబ్బారావు', location: { type: 'Point', coordinates: [80.61, 16.28], address: 'Vidya Nagar, Mangalagiri' }, capabilities: ['LABOURER'] },
            { _id: 'user_nagamani', phone: '9876543215', name: 'నాగమణి', location: { type: 'Point', coordinates: [80.62, 16.27], address: 'Temple Street, Mangalagiri' }, capabilities: ['LABOURER'] },
            { _id: 'user_prasad', phone: '9876543216', name: 'ప్రసాద్', location: { type: 'Point', coordinates: [80.59, 16.27], address: 'Market Center, Mangalagiri' }, capabilities: ['LABOURER'] },
        ],
        farms: [
            { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: "రోడ్ దగ్గర పొలం", areaInAcres: 8, waterSource: 'CANAL' },
            { _id: 'farm_anjamma_2', userId: 'user_anjamma', farmName: "మామిడి తోట వెనుక", areaInAcres: 5, waterSource: 'BOREWELL' },
            { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: "నది పక్కన భూమి", areaInAcres: 12, waterSource: 'RIVER' },
            { _id: 'farm_malli_1', userId: 'user_malli', farmName: "జనపాడు దగ్గర పొలం", areaInAcres: 15, waterSource: 'BOREWELL' },
        ],
        crops: [ { _id: 'crop_master_vari', name: 'వరి' }, { _id: 'crop_master_mirchi', name: 'మిర్చి' }, { _id: 'crop_master_kandhi', name: 'కంది' } ],
        cropInstances: [
            { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', status: 'GROWING' },
            { _id: 'ci_anjamma_kandhi', farmId: 'farm_anjamma_2', userId: 'user_anjamma', cropMasterId: 'crop_master_kandhi', status: 'PREPARING' },
            { _id: 'ci_ramarao_vari', farmId: 'farm_ramarao_1', userId: 'user_ramarao', cropMasterId: 'crop_master_vari', status: 'GROWING' },
            { _id: 'ci_malli_vari', farmId: 'farm_malli_1', userId: 'user_malli', cropMasterId: 'crop_master_vari', status: 'HARVESTED' },
        ],
        labourProfiles: [
            { userId: 'user_anjamma', skills: ['మిర్చి కోత', 'కలుపు తీయుట'], ratePerDay: 550 },
            { userId: 'user_ramarao', skills: ['వరి నాట్లు', 'పురుగుమందు పిచికారీ'], ratePerDay: 600 },
            { userId: 'user_kaasamma', skills: ['వరి కోత', 'కలుపు తీయుట', 'నాయకత్వం'], ratePerDay: 650 },
            { userId: 'user_subbarao', skills: ['వరి కోత', 'వరి నాట్లు'], ratePerDay: 500 },
            { userId: 'user_nagamani', skills: ['మిర్చి కోత', 'కలుపు తీయుట'], ratePerDay: 500 },
            { userId: 'user_prasad', skills: ['వరి నాట్లు', 'ట్రాక్టర్ డ్రైవింగ్'], ratePerDay: 700 },
        ],
        equipment: [
            { _id: 'equip_malli_harvester', userId: 'user_malli', type: 'HARVESTER', modelName: 'Standard H140 (Paddy Machine)', rate: { amount: 3000, unit: 'HOUR' } },
            { _id: 'equip_anjamma_tiller', userId: 'user_anjamma', type: 'TILLER', modelName: 'Generic Power Tiller', rate: { amount: 4000, unit: 'DAY' } },
        ],
        labourGroups: [{ _id: 'group_kaasamma', name: "కాసమ్మ దళం", leaderId: 'user_kaasamma', members: ['user_kaasamma', 'user_subbarao', 'user_nagamani', 'user_prasad'] }],
        marketPrices: [
            { _id: 'price_1', cropMasterId: 'crop_master_vari', marketName: 'Guntur Market Yard', pricePerQuintal: 2100, date: new Date() },
            { _id: 'price_2', cropMasterId: 'crop_master_mirchi', marketName: 'Guntur Market Yard', pricePerQuintal: 7250, date: new Date() },
            { _id: 'price_3', cropMasterId: 'crop_master_kandhi', marketName: 'Guntur Market Yard', pricePerQuintal: 5500, date: new Date() },
            { _id: 'price_4', cropMasterId: 'crop_master_vari', marketName: 'Tenali Market', pricePerQuintal: 2150, date: new Date() },
        ],
        postings: [
            { _id: 'post_1', postedByUserId: 'user_ramarao', type: 'NEEDS_LABOUR', details: { task: 'వరి నాట్లు', requiredCount: 5, offeredRatePerDay: 625 }, location: { address: 'నది పక్కన భూమి' }, status: 'FILLED' },
            { _id: 'post_2', postedByUserId: 'user_anjamma', type: 'NEEDS_LABOUR', details: { task: 'మిర్చి కోత', requiredCount: 10, offeredRatePerDay: 575 }, location: { address: 'రోడ్ దగ్గర పొలం' }, status: 'OPEN' },
            { _id: 'post_3', postedByUserId: 'user_anjamma', type: 'NEEDS_EQUIPMENT', details: { task: 'వరి కోతకు హార్వెస్టర్ కావాలి', equipmentType: 'HARVESTER' }, location: { address: 'రోడ్ దగ్గర పొలం' }, status: 'FILLED' },
            { _id: 'post_4', postedByUserId: 'user_ramarao', type: 'NEEDS_EQUIPMENT', details: { task: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', equipmentType: 'TILLER' }, location: { address: 'నది పక్కన భూమి' }, status: 'OPEN' },
        ],
        bookings: [
            { _id: 'booking_1', postingId: 'post_1', farmerId: 'user_ramarao', provider: { id: 'group_kaasamma', type: 'GROUP' } },
            { _id: 'booking_2', postingId: 'post_3', farmerId: 'user_anjamma', provider: { id: 'equip_malli_harvester', type: 'USER' } },
        ],
        schedules: [
            // Kaasamma's group members are booked for RamaRao's farm
            { resourceId: 'user_kaasamma', resourceType: 'LABOUR', bookingId: 'booking_1', startTime: new Date('2025-08-04T09:00:00'), endTime: new Date('2025-08-08T17:00:00') },
            { resourceId: 'user_subbarao', resourceType: 'LABOUR', bookingId: 'booking_1', startTime: new Date('2025-08-04T09:00:00'), endTime: new Date('2025-08-08T17:00:00') },
            { resourceId: 'user_nagamani', resourceType: 'LABOUR', bookingId: 'booking_1', startTime: new Date('2025-08-04T09:00:00'), endTime: new Date('2025-08-08T17:00:00') },
            { resourceId: 'user_prasad', resourceType: 'LABOUR', bookingId: 'booking_1', startTime: new Date('2025-08-04T09:00:00'), endTime: new Date('2025-08-08T17:00:00') },
            // Malli's harvester is booked for Anjamma's farm
            { resourceId: 'equip_malli_harvester', resourceType: 'EQUIPMENT', bookingId: 'booking_2', startTime: new Date('2025-08-10T08:00:00'), endTime: new Date('2025-08-10T18:00:00') },
        ]
    };

    // --- APP STATE ---
    let currentUser = null;
    let currentCrop = null;

    // --- DOM ELEMENTS ---
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-btn');

    // --- NAVIGATION ---
    const navigateTo = (screenId) => {
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
        // Trigger render functions when navigating
        if (screenId === 'home-screen') renderHomeScreen();
        if (screenId === 'my-farm-screen') renderMyFarmScreen();
        if (screenId === 'hire-screen') renderHireScreen();
        if (screenId === 'market-prices-screen') renderMarketPricesScreen();
        if (screenId === 'profile-screen') renderProfileScreen();
    };
    navButtons.forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.screen)));

    // =================================================================
    // --- RENDERING FUNCTIONS (V2) ---
    // =================================================================

    const renderHomeScreen = () => {
        document.getElementById('welcome-message').innerText = `నమస్కారం, ${currentUser.name}`;
        const content = document.getElementById('home-content');

        // 1. Weather Card
        const weatherHTML = `
            <div class="card weather-card">
                <div>
                    <h3>గుంటూరు</h3>
                    <p>34°C, ఎండ</p>
                </div>
                <span class="material-icons">wb_sunny</span>
            </div>
        `;

        // 2. My Crop Prices
        const myCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id && ci.status === 'GROWING');
        const myCropIds = myCrops.map(ci => ci.cropMasterId);
        const relevantPrices = db.marketPrices.filter(p => myCropIds.includes(p.cropMasterId));
        const pricesHTML = relevantPrices.length > 0 ? `
            <div class="card">
                <h3>నా పంటల ధరలు</h3>
                <ul>
                    ${relevantPrices.map(p => {
            const crop = db.crops.find(c => c._id === p.cropMasterId);
            return `<li>${crop.name} (${p.marketName}): ₹${p.pricePerQuintal}/quintal</li>`;
        }).join('')}
                </ul>
            </div>
        ` : '';

        // 3. My Upcoming Schedule
        const mySchedule = db.schedules.filter(s => {
            // check if user is the labourer
            if(s.resourceType === 'LABOUR' && s.resourceId === currentUser._id) return true;
            // check if user owns the equipment
            const equipment = db.equipment.find(e => e._id === s.resourceId);
            return equipment && equipment.userId === currentUser._id;
        });
        const scheduleHTML = mySchedule.length > 0 ? `
            <div class="card">
                <h3>నా రాబోయే పనులు</h3>
                <ul>
                    ${mySchedule.map(s => {
            const booking = db.bookings.find(b => b._id === s.bookingId);
            const farmer = db.users.find(u => u._id === booking.farmerId);
            return `<li>${farmer.name} పొలంలో పని - ${new Date(s.startTime).toLocaleDateString('te-IN')}</li>`;
        }).join('')}
                </ul>
            </div>
        ` : '';

        content.innerHTML = weatherHTML + pricesHTML + scheduleHTML;
    };

    const renderMyFarmScreen = () => {
        const content = document.getElementById('my-farm-content');
        content.innerHTML = '';
        db.cropInstances.filter(ci => ci.userId === currentUser._id).forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);
            content.innerHTML += `
                <div class="card card-flex clickable" data-crop-id="${ci._id}">
                    <span class="material-icons card-icon">${{GROWING:'spa',PREPARING:'agriculture',HARVESTED:'local_shipping'}[ci.status]}</span>
                    <div>
                        <h3>${cropInfo.name} - ${farmInfo.farmName}</h3>
                        <p>స్థితి: ${ci.status}</p>
                    </div>
                    <div class="status-dot ${ci.status.toLowerCase()}"></div>
                </div>
            `;
        });
        content.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => startFarmChat(card.dataset.cropId)));
    };

    const renderHireScreen = (type = 'labour') => {
        const hireContent = document.getElementById('hire-content');
        const postType = type === 'labour' ? 'NEEDS_LABOUR' : 'NEEDS_EQUIPMENT';
        const allPosts = db.postings.filter(p => p.type === postType && p.status === 'OPEN');

        const myPosts = allPosts.filter(p => p.postedByUserId === currentUser._id);
        const otherPosts = allPosts.filter(p => p.postedByUserId !== currentUser._id);

        const createPostHTML = (post) => {
            const farmer = db.users.find(u => u._id === post.postedByUserId);
            return `
                <div class="card">
                    <h3>${post.details.task}</h3>
                    <p>రైతు: ${farmer.name}</p>
                    <p>స్థానం: ${post.location.address}</p>
                    ${post.details.offeredRatePerDay ? `<p>ధర: ₹${post.details.offeredRatePerDay} / రోజుకి</p>` : ''}
                </div>
            `;
        };

        let html = '';
        if (myPosts.length > 0) {
            html += '<h4 class="post-section-title">నా పోస్ట్‌లు</h4>';
            html += myPosts.map(createPostHTML).join('');
        }
        if (otherPosts.length > 0) {
            html += '<h4 class="post-section-title">ఇతర పోస్ట్‌లు</h4>';
            html += otherPosts.map(createPostHTML).join('');
        }
        hireContent.innerHTML = html;

        // Tab handling
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === type);
            btn.onclick = () => renderHireScreen(btn.dataset.tab);
        });
    };

    const renderMarketPricesScreen = (sortBy = 'price') => {
        const content = document.getElementById('market-prices-content');
        let prices = [...db.marketPrices]; // Create a copy to sort

        if (sortBy === 'price') {
            prices.sort((a, b) => b.pricePerQuintal - a.pricePerQuintal);
        } else if (sortBy === 'locality') {
            prices.sort((a, b) => a.marketName.localeCompare(b.marketName));
        }

        content.innerHTML = prices.map(p => {
            const crop = db.crops.find(c => c._id === p.cropMasterId);
            return `
                <div class="card">
                    <h3>${crop.name} - ${p.marketName}</h3>
                    <p>ధర: <strong>₹${p.pricePerQuintal}</strong> / క్వింటాల్</p>
                    <p class="light-text-color">${p.location.address}</p>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.sort === sortBy);
            btn.onclick = () => renderMarketPricesScreen(btn.dataset.sort);
        });
    };

    const renderProfileScreen = () => { /* ... same as before, no changes needed ... */
        const content = document.getElementById('profile-content');
        const labourProfile = db.labourProfiles.find(lp => lp.userId === currentUser._id);
        const equipmentProfile = db.equipment.filter(eq => eq.userId === currentUser._id);

        let labourHTML = labourProfile ? `<h4>కూలీ ప్రొఫైల్</h4><p>నైపుణ్యాలు: ${labourProfile.skills.join(', ')}</p><p>రోజువారీ ధర: ₹${labourProfile.ratePerDay}</p>` : '';
        let equipmentHTML = equipmentProfile.length > 0 ? `<h4>నా పరికరాలు</h4>${equipmentProfile.map(eq => `<p>${eq.type} (${eq.modelName}) - ₹${eq.rate.amount}/${eq.rate.unit}</p>`).join('')}` : '';

        content.innerHTML = `<div class="card"><h3>${currentUser.name}</h3><p>${currentUser.location.address}</p></div>
            ${labourHTML ? `<div class="card">${labourHTML}</div>` : ''}
            ${equipmentHTML ? `<div class="card">${equipmentHTML}</div>` : ''}`;
    };

    // =================================================================
    // --- AGENTIC CHAT LOGIC (V2) ---
    // =================================================================
    const chatLog = document.getElementById('chat-log');

    const addChatMessage = (sender, text, type = 'text', options = []) => { /* ... BUG FIX: image display fixed by simply not having text for image messages ... */
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);

        if (type === 'image') {
            bubble.innerHTML = `<img src="${text}" class="chat-image" alt="leaf image">`;
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
        } else { // 'text'
            bubble.innerHTML = text;
        }
        chatLog.appendChild(bubble);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    const startFarmChat = (cropInstanceId) => {
        currentCrop = db.cropInstances.find(ci => ci._id === cropInstanceId);
        const cropInfo = db.crops.find(c => c._id === currentCrop.cropMasterId);
        document.getElementById('chat-title').innerText = cropInfo.name;
        chatLog.innerHTML = '';
        navigateTo('farm-chat-screen');

        setTimeout(() => addChatMessage('agent', `నమస్కారం! మీ ${cropInfo.name} పంటకు నేను ఎలా సహాయపడగలను?`), 500);
        setTimeout(() => {
            addChatMessage('user', '', 'options', [
                { text: 'వ్యాధిని నిర్ధారించండి', action: 'diagnose-start' },
                { text: 'కూలీలను నియమించుకోండి', action: 'hire-labour' },
                { text: 'పరికరాలు అద్దెకు తీసుకోండి', action: 'hire-equipment' },
            ]);
        }, 1500);
    };

    const handleChatOption = (action, payload) => {
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();

        // BUG FIX: Only show user message if it's a primary action
        const actionTextMap = {
            'diagnose-start': 'వ్యాధిని నిర్ధారించండి',
            'hire-labour': 'కూలీలను నియమించుకోండి',
            'hire-equipment': 'పరికరాలు అద్దెకు తీసుకోండి'
        };
        if(actionTextMap[action]) {
            addChatMessage('user', actionTextMap[action]);
        }

        setTimeout(() => {
            switch(action) {
                case 'diagnose-start':
                    addChatMessage('agent', 'తప్పకుండా. దయచేసి వ్యాధి సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.');
                    setTimeout(() => addChatMessage('user', '', 'options', [{ text: 'ఫోటో అప్‌లోడ్ చేయండి', action: 'diagnose-upload' }]), 1000);
                    break;
                case 'diagnose-upload':
                    addChatMessage('user', 'leaf_curl_mirchi.png', 'image');
                    setTimeout(() => addChatMessage('agent', 'ఫోటోను విశ్లేషిస్తున్నాను...'), 1500);
                    setTimeout(() => addChatMessage('agent', `ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong> లాగా ఉంది. ఇది రసం పీల్చే పురుగుల వలన వస్తుంది.`), 3500);
                    setTimeout(() => addChatMessage('agent', `నివారణకు, లీటరు నీటికి 0.5ml <strong>ఇమిడాక్లోప్రిడ్</strong> కలిపి పిచికారీ చేయాలని నేను సిఫార్సు చేస్తున్నాను.`), 5000);
                    break;
                case 'hire-labour':
                    const relevantPosts = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.status === 'OPEN' && p.details.task.includes('మిర్చి'));
                    if (relevantPosts.length > 0) {
                        addChatMessage('agent', 'మీ మిర్చి పంట కోసం సమీపంలో అందుబాటులో ఉన్న కొన్ని జాబ్ పోస్టింగ్‌లు ఇక్కడ ఉన్నాయి. మీరు కూలీల కోసం దరఖాస్తు చేసుకోవచ్చు.');
                    } else {
                        addChatMessage('agent', 'క్షమించండి, ప్రస్తుతం మీ పంటకు సరిపోయే జాబ్ పోస్టింగ్‌లు అందుబాటులో లేవు. మీరు కొత్త పోస్ట్ సృష్టించాలనుకుంటున్నారా?');
                    }
                    break;
                case 'hire-equipment':
                    addChatMessage('agent', 'మీరు ఏ పరికరం కోసం వెతుకుతున్నారు? ఉదాహరణకు: టిల్లర్, హార్వెస్టర్.');
                    break;
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

    // Start on login screen
    navigateTo('login-screen');
});