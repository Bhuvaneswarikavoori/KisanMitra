document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // --- DUMMY DATABASE (Guntur District) ---
    // =================================================================
    const db = {
        users: [
            { _id: 'user_anjamma', phone: '9876543210', name: 'అంజమ్మ (Anjamma)', location: { address: '1-23, Arundelpet, Guntur' }, capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'] },
            { _id: 'user_ramarao', phone: '9876543211', name: 'రామారావు (RamaRao)', location: { address: '4-56, Main Road, Mangalagiri' }, capabilities: ['FARM_OWNER', 'LABOURER'] },
            { _id: 'user_malli', phone: '9876543212', name: 'మల్లికార్జున రావు', location: { address: '7-89, Pattabhipuram, Guntur' }, capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'] },
            { _id: 'user_kaasamma', phone: '9876543213', name: 'కాసమ్మ (Kaasamma)', location: { address: 'Near Bus Stand, Mangalagiri' }, capabilities: ['LABOURER', 'LEADER'] },
        ],
        farms: [
            { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: "Tenali Road Farm", areaInAcres: 8 },
            { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: "Krishna River Bank Plot", areaInAcres: 12 },
        ],
        crops: [
            { _id: 'crop_master_vari', name: 'వరి', scientificName: 'Oryza sativa' },
            { _id: 'crop_master_mirchi', name: 'మిర్చి', scientificName: 'Capsicum annuum' },
            { _id: 'crop_master_kandhi', name: 'కంది', scientificName: 'Cajanus cajan' },
        ],
        cropInstances: [
            { _id: 'ci_anjamma_vari', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_vari', status: 'GROWING', sowingDate: new Date('2025-06-20') },
            { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', status: 'GROWING', sowingDate: new Date('2025-07-10') },
            { _id: 'ci_anjamma_kandhi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_kandhi', status: 'PREPARING' },
        ],
        postings: [
            { _id: 'post_1', postedByUserId: 'user_ramarao', type: 'NEEDS_LABOUR', details: { task: 'వరి కోత (Paddy Harvesting)', requiredCount: 3, offeredRatePerDay: 650 }, location: { address: 'RamaRao Farm, Near Krishna River' } }
        ],
        labourProfiles: [
            { userId: 'user_anjamma', skills: ['మిర్చి కోత', 'కలుపు తీయుట'], ratePerDay: 550 },
            { userId: 'user_kaasamma', skills: ['వరి కోత', 'కలుపు తీయుట', 'నాయకత్వం'], ratePerDay: 650 },
        ],
        equipment: [
            { userId: 'user_anjamma', type: 'TILLER', modelName: 'Generic Power Tiller', rate: { amount: 4000, unit: 'DAY' } },
            { userId: 'user_malli', type: 'HARVESTER', modelName: 'Standard H140 (Paddy Machine)', rate: { amount: 3000, unit: 'HOUR' } }
        ]
    };

    // =================================================================
    // --- APP STATE & DOM ELEMENTS ---
    // =================================================================
    let currentUser = null;
    let currentCrop = null;
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-btn');

    // =================================================================
    // --- NAVIGATION ---
    // =================================================================
    const navigateTo = (screenId) => {
        screens.forEach(screen => screen.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.screen === screenId);
        });
    };

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => navigateTo(btn.dataset.screen));
    });

    // =================================================================
    // --- RENDERING FUNCTIONS ---
    // =================================================================

    const renderHomeScreen = () => {
        document.getElementById('welcome-message').innerText = `నమస్కారం, ${currentUser.name}`;
        const content = document.getElementById('home-content');
        content.innerHTML = `
            <div class="card card-flex" data-screen="my-farm-screen">
                <span class="material-icons card-icon">grass</span>
                <div><h3>నా పొలం</h3><p>మీ పంటలను మరియు పొలాలను చూడండి</p></div>
            </div>
            <div class="card card-flex" data-screen="marketplace-screen">
                <span class="material-icons card-icon">storefront</span>
                <div><h3>మార్కెట్ ప్లేస్</h3><p>పనిని కనుగొనండి లేదా కూలీలను నియమించుకోండి</p></div>
            </div>
            <div class="card card-flex" data-screen="profile-screen">
                <span class="material-icons card-icon">account_circle</span>
                <div><h3>నా ప్రొఫైల్</h3><p>మీ వివరాలు మరియు నైపుణ్యాలను నవీకరించండి</p></div>
            </div>
        `;
        content.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => navigateTo(card.dataset.screen));
        });
    };

    const renderMyFarmScreen = () => {
        const content = document.getElementById('my-farm-content');
        content.innerHTML = '';
        const userCrops = db.cropInstances.filter(ci => ci.userId === currentUser._id);
        userCrops.forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);
            content.innerHTML += `
                <div class="card card-flex" data-crop-id="${ci._id}">
                    <span class="material-icons card-icon">${ci.status === 'GROWING' ? 'spa' : 'agriculture'}</span>
                    <div>
                        <h3>${cropInfo.name} - ${farmInfo.farmName}</h3>
                        <p>స్థితి: ${ci.status === 'GROWING' ? ' పెరుగుతోంది' : 'సిద్ధమవుతోంది'}</p>
                    </div>
                    <div class="status-dot ${ci.status.toLowerCase()}"></div>
                </div>
            `;
        });
        content.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => startFarmChat(card.dataset.cropId));
        });
    };

    const renderMarketplaceScreen = () => {
        const content = document.getElementById('marketplace-content');
        content.innerHTML = '';
        db.postings.forEach(p => {
            const farmer = db.users.find(u => u._id === p.postedByUserId);
            content.innerHTML += `
                <div class="card">
                    <h3>${p.details.task}</h3>
                    <p>రైతు: ${farmer.name}</p>
                    <p>స్థానం: ${p.location.address}</p>
                    <p>ధర: ₹${p.details.offeredRatePerDay} / రోజుకి</p>
                </div>
             `;
        });
    };

    const renderProfileScreen = () => {
        const content = document.getElementById('profile-content');
        const labourProfile = db.labourProfiles.find(lp => lp.userId === currentUser._id);
        const equipmentProfile = db.equipment.filter(eq => eq.userId === currentUser._id);

        let labourHTML = labourProfile ? `
            <h4>కూలీ ప్రొఫైల్</h4>
            <p>నైపుణ్యాలు: ${labourProfile.skills.join(', ')}</p>
            <p>రోజువారీ ధర: ₹${labourProfile.ratePerDay}</p>
        ` : '';

        let equipmentHTML = equipmentProfile.length > 0 ? `
            <h4>నా పరికరాలు</h4>
            ${equipmentProfile.map(eq => `<p>${eq.type} (${eq.modelName}) - ₹${eq.rate.amount}/${eq.rate.unit}</p>`).join('')}
        ` : '';

        content.innerHTML = `
            <div class="card">
                <h3>${currentUser.name}</h3>
                <p>${currentUser.location.address}</p>
            </div>
            ${labourHTML ? `<div class="card">${labourHTML}</div>` : ''}
            ${equipmentHTML ? `<div class="card">${equipmentHTML}</div>` : ''}
        `;
    };


    // =================================================================
    // --- AGENTIC CHAT LOGIC ---
    // =================================================================
    const chatLog = document.getElementById('chat-log');
    const chatInputArea = document.getElementById('chat-input-area');

    const addChatMessage = (sender, text, type = 'text', options = []) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);

        if (type === 'text') {
            bubble.innerHTML = text;
        } else if (type === 'image') {
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

        setTimeout(() => {
            addChatMessage('agent', `నమస్కారం ${currentUser.name}! మీ ${cropInfo.name} పంటకు నేను ఎలా సహాయపడగలను?`);
        }, 500);

        setTimeout(() => {
            addChatMessage('user', '', 'options', [
                { text: 'వ్యాధిని నిర్ధారించండి', action: 'diagnose-start' },
                { text: 'వాతావరణం తనిఖీ చేయండి', action: 'check-weather' },
                { text: 'మార్కెట్ ధర తెలుసుకోండి', action: 'check-price' }
            ]);
        }, 1500);
    };

    const handleChatOption = (action, payload) => {
        // Remove options after selection
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();

        const selectedOption = {
            'diagnose-start': 'వ్యాధిని నిర్ధారించండి',
            'check-weather': 'వాతావరణం తనిఖీ చేయండి',
            'check-price': 'మార్కెట్ ధర తెలుసుకోండి'
        }[action];
        addChatMessage('user', selectedOption);

        // Agent response logic
        setTimeout(() => {
            if (action === 'diagnose-start') {
                addChatMessage('agent', 'తప్పకుండా. దయచేసి వ్యాధి సోకిన ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.');
                setTimeout(() => {
                    addChatMessage('user', '', 'options', [{ text: 'ఫోటో అప్‌లోడ్ చేయండి', action: 'diagnose-upload' }]);
                }, 1000);
            }
            if(action === 'diagnose-upload') {
                addChatMessage('user', 'leaf_curl_mirchi.png', 'image');
                setTimeout(() => addChatMessage('agent', 'ఫోటోను విశ్లేషిస్తున్నాను...'), 1500);
                setTimeout(() => {
                    addChatMessage('agent', `ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong> లాగా ఉంది. ఇది రసం పీల్చే పురుగుల వలన వస్తుంది.`);
                }, 3500);
                setTimeout(() => {
                    addChatMessage('agent', `నివారణకు, లీటరు నీటికి 0.5ml <strong>ఇమిడాక్లోప్రిడ్</strong> కలిపి పిచికారీ చేయాలని నేను సిఫార్సు చేస్తున్నాను.`);
                }, 5000);
            }
            if (action === 'check-weather') {
                addChatMessage('agent', 'గుంటూరులో రాబోయే 3 రోజులు వాతావరణం పొడిగా, ఎండగా ఉంటుంది. ఉష్ణోగ్రత సుమారు 34°C ఉంటుంది.');
            }
            if (action === 'check-price') {
                const cropInfo = db.crops.find(c => c._id === currentCrop.cropMasterId);
                addChatMessage('agent', `గుంటూరు మార్కెట్‌లో ఈరోజు ${cropInfo.name} ధర క్వింటాల్‌కు సుమారు ₹7,200గా ఉంది.`);
            }
        }, 1000);
    };

    document.getElementById('back-to-farm').addEventListener('click', () => navigateTo('my-farm-screen'));


    // =================================================================
    // --- INITIALIZATION ---
    // =================================================================
    document.getElementById('login-btn').addEventListener('click', () => {
        const phone = document.getElementById('phone').value;
        currentUser = db.users.find(user => user.phone === phone);
        if (currentUser) {
            renderHomeScreen();
            renderMyFarmScreen();
            renderMarketplaceScreen();
            renderProfileScreen();
            navigateTo('home-screen');
        } else {
            alert('User not found!');
        }
    });

});