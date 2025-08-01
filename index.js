document.addEventListener('DOMContentLoaded', () => {

    // --- V11 - ALL CHAT FEATURES RESTORED & DATA EXPANDED ---
    const db = {
        users: [
            { _id: 'user_anjamma', phone: '9876543210', name: { te: 'అంజమ్మ', en: 'Anjamma' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER', 'EQUIPMENT_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_ramarao', phone: '9876543211', name: { te: 'రామారావు', en: 'RamaRao' }, language: 'te', capabilities: ['FARM_OWNER', 'LABOURER'], docs: ['AADHAAR', 'BANK_PASSBOOK'] },
            { _id: 'user_malli', phone: '9876543212', name: { te: 'మల్లికార్జున రావు', en: 'Malli Karjuna Rao' }, language: 'te', capabilities: ['EQUIPMENT_OWNER', 'FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
            { _id: 'user_venkanna', phone: '9876543215', name: { te: 'వెంకన్న', en: 'Venkanna' }, language: 'te', capabilities: ['FARM_OWNER'], docs: ['AADHAAR', 'BANK_PASSBOOK', 'LAND_RECORD'] },
        ],
        crops: [
            { _id: 'crop_master_vari', name: { te: 'వరి', en: 'Paddy' }, emoji: '🌾' },
            { _id: 'crop_master_mirchi', name: { te: 'మిర్చి', en: 'Chilli' }, emoji: '🌶️' },
            { _id: 'crop_master_patti', name: { te: 'పత్తి', en: 'Cotton' }, emoji: '☁️' }
        ],
        farms: [
            { _id: 'farm_anjamma_1', userId: 'user_anjamma', farmName: { te: "రోడ్ దగ్గర పొలం", en: "Road-side Farm" }, acres: 4 },
            { _id: 'farm_anjamma_2', userId: 'user_anjamma', farmName: { te: "మామిడి తోట వెనుక", en: "Behind Mango Grove" }, acres: 3.5 },
            { _id: 'farm_ramarao_1', userId: 'user_ramarao', farmName: { te: "నది పక్కన భూమి", en: "Land near River" }, acres: 10 },
            { _id: 'farm_malli_1', userId: 'user_malli', farmName: { te: "జనపాడు దగ్గర పొలం", en: "Farm near Janapadu" }, acres: 12 },
            { _id: 'farm_venkanna_1', userId: 'user_venkanna', farmName: { te: "కొత్త పొలం", en: "New Farm" }, acres: 6 },
        ],
        cropInstances: [
            { _id: 'ci_anjamma_mirchi', farmId: 'farm_anjamma_1', userId: 'user_anjamma', cropMasterId: 'crop_master_mirchi', status: { te: 'పెరుగుతోంది', en: 'Growing' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 4500 }], revenue: 0 },
            { _id: 'ci_anjamma_patti', farmId: 'farm_anjamma_2', userId: 'user_anjamma', cropMasterId: 'crop_master_patti', status: { te: 'కోత కోయబడింది', en: 'Harvested' }, expenses: [{ category: { te: 'కూలీలు', en: 'Labour' }, amount: 7000 }], revenue: 0 },
            { _id: 'ci_ramarao_vari', farmId: 'farm_ramarao_1', userId: 'user_ramarao', cropMasterId: 'crop_master_vari', status: { te: 'అమ్మబడింది', en: 'Sold' }, expenses: [{ category: { te: 'విత్తనాలు', en: 'Seeds' }, amount: 5000 }], revenue: 155000 },
        ],
        equipment: [
            { _id: 'equip_anjamma_tiller', userId: 'user_anjamma', type: { te: 'టిల్లర్', en: 'Tiller' }, rate: { amount: 4000, unit: { te: 'రోజు', en: 'Day' } } },
            { _id: 'equip_malli_harvester', userId: 'user_malli', type: { te: 'హార్వెస్టర్', en: 'Harvester' }, rate: { amount: 3000, unit: { te: 'గంట', en: 'Hour' } } },
        ],
        postings: [
            { _id: 'post_anjamma_1', postedByUserId: 'user_anjamma', type: 'NEEDS_LABOUR', details: { task: { te: 'మిర్చి కోతకు 5 మంది కావాలి', en: 'Need 5 for chilli picking' }, requiredCount: 5, offeredRatePerDay: 580 }, location: { address: 'రోడ్ దగ్గర పొలం' }, status: 'OPEN' },
            { _id: 'post_ramarao_1', postedByUserId: 'user_ramarao', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'దుక్కి దున్నడానికి టిల్లర్ కావాలి', en: 'Need tiller for ploughing' } }, location: { address: 'నది పక్కన భూమి' }, status: 'FILLED' },
            { _id: 'post_malli_1', postedByUserId: 'user_malli', type: 'NEEDS_LABOUR', details: { task: { te: 'వరి కోతకు 10 మంది కావాలి', en: 'Need 10 for Paddy Harvesting' }, requiredCount: 10, offeredRatePerDay: 620 }, location: { address: 'జనపాడు దగ్గర పొలం' }, status: 'OPEN' },
            { _id: 'post_venkanna_2', postedByUserId: 'user_venkanna', type: 'NEEDS_EQUIPMENT', details: { task: { te: 'పంట స్ప్రే చేయడానికి ట్రాక్టర్ కావాలి', en: 'Need tractor for spraying' } }, location: { address: 'కొత్త పొలం' }, status: 'OPEN' },
        ],
        marketPrices: [
            { cropMasterId: 'crop_master_vari', marketName: { te: 'గుంటూరు మార్కెట్', en: 'Guntur Market' }, pricePerQuintal: 2100 },
            { cropMasterId: 'crop_master_mirchi', marketName: { te: 'గుంటూరు మార్కెట్', en: 'Guntur Market' }, pricePerQuintal: 7250 },
            { cropMasterId: 'crop_master_patti', marketName: { te: 'నరసరావుపేట మార్కెట్', en: 'Narasaraopet Market' }, pricePerQuintal: 5600 },
        ],
        governmentSchemes: [
            {_id: 'scheme_pm_kisan', name: { te: 'పీఎం కిసాన్', en: 'PM Kisan' }, description: { te: 'రైతులకు సంవత్సరానికి ₹6,000 ఆర్థిక సహాయం.', en: 'Financial aid of ₹6,000 per year to farmers.'}, eligibility: { maxAcres: 5 }, requiredDocs: [{ id: 'AADHAAR', name: { te: 'ఆధార్ కార్డు', en: 'Aadhaar Card' } }, { id: 'BANK_PASSBOOK', name: { te: 'బ్యాంక్ పాస్‌బుక్', en: 'Bank Passbook' } }, { id: 'LAND_RECORD', name: { te: 'భూమి రికార్డు', en: 'Land Record' } }] }
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

    // --- RENDER FUNCTIONS ---
    const renderHomeScreen = () => {
        document.getElementById('welcome-message').innerText = `నమస్కారం, ${currentUser.name.te}`;
    };

    const renderMyFarmScreen = () => {
        const content = document.getElementById('my-farm-content');
        content.innerHTML = '';
        db.cropInstances.filter(ci => ci.userId === currentUser._id).forEach(ci => {
            const cropInfo = db.crops.find(c => c._id === ci.cropMasterId);
            const farmInfo = db.farms.find(f => f._id === ci.farmId);
            content.innerHTML += `<div class="card card-flex clickable" data-crop-id="${ci._id}">
                    <span class="card-emoji">${cropInfo.emoji}</span>
                    <div><h3>${cropInfo.name.te} - ${farmInfo.farmName.te}</h3><p>స్థితి: ${ci.status.te}</p></div>
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
                            <div><h3>${post.details.task.te}</h3><p>రైతు: ${farmer.name.te}</p></div>
                            <div class="rate-info"><strong>₹${post.details.offeredRatePerDay || 'N/A'}</strong><span>/రోజుకి</span></div>
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
        const content = document.getElementById('market-prices-content');
        let prices = [...db.marketPrices];
        prices.sort((a, b) => sortBy === 'price' ? b.pricePerQuintal - a.pricePerQuintal : a.marketName.te.localeCompare(b.marketName.te));
        content.innerHTML = prices.map(p => {
            const crop = db.crops.find(c => c._id === p.cropMasterId);
            return `<div class="card price-card">
                        <span class="card-emoji">${crop.emoji}</span>
                        <div><h3>${crop.name.te}</h3><p>${p.marketName.te}</p></div>
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
    };

    const renderProfileScreen = () => {
        const content = document.getElementById('profile-content');
        content.innerHTML = `<div class="card"><p>ప్రొఫైల్ వివరాలు ఇక్కడ చూపబడతాయి.</p></div>`;
    };

    // --- AGENTIC CHAT LOGIC ---
    const chatLog = document.getElementById('chat-log');

    const addChatMessage = (sender, content, type = 'text', options = []) => {
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', sender);
        if (type === 'image') {
            bubble.innerHTML = `<img src="https://i.imgur.com/vLhpt3x.jpg" class="chat-image" alt="A close-up image of a green chilli plant leaf affected by leaf curl disease.">`;
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
            { text: 'పరికరాల కోసం పోస్ట్ చేయండి', action: 'post-equipment' },
            { text: 'అందుబాటులో ఉన్న పనులు', action: 'find-labour-jobs' },
            { text: 'అందుబాటులో ఉన్న పరికరాలు', action: 'find-equipment' }
        ]), 1500);
    };

    const handleChatOption = (action) => {
        const optionsContainer = document.querySelector('.chat-options-container');
        if (optionsContainer) optionsContainer.parentElement.remove();
        const actionTextMap = { 'diagnose-start': 'వ్యాధిని నిర్ధారించండి', 'check-weather': 'వాతావరణం తనిఖీ', 'check-price': 'మార్కెట్ ధర', 'post-labour': 'కూలీల కోసం పోస్ట్ చేయండి', 'post-equipment': 'పరికరాల కోసం పోస్ట్ చేయండి', 'find-labour-jobs': 'అందుబాటులో ఉన్న పనులు', 'find-equipment': 'అందుబాటులో ఉన్న పరికరాలు'};
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
                    setTimeout(() => addChatMessage('agent', `ఇది <strong>మిర్చి ఆకు ముడత (Chilli Leaf Curl)</strong>.`), 3500);
                    break;
                case 'check-weather':
                    addChatMessage('agent', 'రాబోయే 3 రోజులు గుంటూరులో వాతావరణం ఎండగా ఉంటుంది, ఉష్ణోగ్రత 35°C వరకు ఉంటుంది.');
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
                    addChatMessage('agent', 'తప్పకుండా. నేను మీ కోసం ఒక కూలీల అవసరం పోస్ట్ సృష్టిస్తాను. పని ఏమిటి?');
                    break;
                case 'post-equipment':
                    addChatMessage('agent', 'తప్పకుండా. మీకు ఏ పరికరం కావాలో చెప్పండి?');
                    break;
                case 'find-labour-jobs':
                    const labourJobs = db.postings.filter(p => p.type === 'NEEDS_LABOUR' && p.status === 'OPEN' && p.postedByUserId !== currentUser._id);
                    if (labourJobs.length > 0) {
                        addChatMessage('agent', 'మీ ప్రాంతంలో అందుబాటులో ఉన్న కొన్ని పనులు:');
                        labourJobs.slice(0, 2).forEach(job => {
                            const farmer = db.users.find(u => u._id === job.postedByUserId);
                            addChatMessage('agent', `<strong>పని:</strong> ${job.details.task.te}<br><strong>రైతు:</strong> ${farmer.name.te}<br><strong>రేటు:</strong> ₹${job.details.offeredRatePerDay}/రోజుకి`);
                        });
                    } else {
                        addChatMessage('agent', 'ప్రస్తుతం అందుబాటులో కూలీ పనులు ఏవీ లేవు.');
                    }
                    break;
                case 'find-equipment':
                    const equipmentJobs = db.postings.filter(p => p.type === 'NEEDS_EQUIPMENT' && p.status === 'OPEN' && p.postedByUserId !== currentUser._id);
                    if (equipmentJobs.length > 0) {
                        addChatMessage('agent', 'మీ ప్రాంతంలో అందుబాటులో ఉన్న కొన్ని పరికరాల అవసరాలు:');
                        equipmentJobs.slice(0, 2).forEach(job => {
                            const farmer = db.users.find(u => u._id === job.postedByUserId);
                            addChatMessage('agent', `<strong>అవసరం:</strong> ${job.details.task.te}<br><strong>రైతు:</strong> ${farmer.name.te}`);
                        });
                    } else {
                        addChatMessage('agent', 'ప్రస్తుతం ఎవరికీ పరికరాల అవసరం లేదు.');
                    }
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