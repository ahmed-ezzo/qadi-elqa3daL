document.addEventListener('DOMContentLoaded', () => {
    // --- Game Configuration ---
    const SCENARIOS = [
        // Scenarios 1-5 (Thematic)
        { crime: "تم العثور على بصمات أصابع مليئة بالطحين على خزنة البنك.", suspect_roles: ["خبَّاز 🥖", "طباخ 👨‍🍳", "حلواني 🍰", "عامل نظافة 🧼", "مدير البنك 💼", "حارس أمن 👮‍♂️", "تاجر دقيق 🌾", "صاحب مطعم 🍽️", "عامل توصيل 🛵", "مزارع قمح 🧑‍🌾"], clues: ["شوهد شخص يشتري كميات كبيرة من الخميرة.", "مفتاح الخزنة تم نسخه باستخدام قالب من العجين.", "تم العثور على بقايا خبز محترق قرب المكان."] },
        { crime: "تمت سرقة لوحة فنية شهيرة، وتُركت ريشة غريبة في المكان.", suspect_roles: ["رسَّام 🎨", "مؤرخ فني 🧐", "صاحب معرض 🖼️", "حارس متحف 🏛️", "جامع تحف 🏺", "مرمم لوحات 🖌️", "ناقد فني ✍️", "طالب فنون 🎓", "سائح مهتم بالفن 📸", "خبير تقييم 💰"], clues: ["الريشة المستخدمة نادرة لا يستعملها إلا المحترفون.", "عُطل الليزر باستخدام مجموعة من المرايا الصغيرة.", "الفاعل لديه حساسية من زيت التربنتين."] },
        { crime: "حدث انقطاع تام للكهرباء في المدينة بسبب تخريب متعمد.", suspect_roles: ["كهربائي 💡", "مهندس كهرباء 👷‍♂️", "عامل صيانة 🔧", "موظف شركة الكهرباء 🏢", "ناشط بيئي 🌳", "مخترع 👨‍🔬", "هاكر 💻", "صحفي 📰", "مقاول بناء 🏗️", "مسؤول طوارئ 🚨"], clues: ["تم قطع الأسلاك بدقة واحترافية عالية.", "آخر شخص شوهد قرب المحطة كان يرتدي قفازات عازلة.", "الفاعل تجنب عن قصد قطع السلك الخاص بالمستشفى."] },
        { crime: "تم العثور على أثار دماء نادرة بجانب جثة القتيل.", suspect_roles: ["جزَّار 🔪", "طبيب جراح 👨‍⚕️", "ممرضة 💉", "طبيب بيطري 🐾", "صياد 🎣", "عالم أحياء 🔬", "فني مختبر 🧪", "متبرع بالدم 🩸", "طباخ 🥩", "عامل مدبغة 🏭"], clues: ["طريقة القتل تشير لمعرفة دقيقة بتشريح الأجسام.", "السلاح المستخدم هو سكين جزارة حاد جداً.", "تم العثور على مريلة ملطخة بالدماء مخبأة بالجوار."] },
        { crime: "تم تزوير مستندات قانونية هامة لإتمام صفقة مشبوهة.", suspect_roles: ["محامي ⚖️", "كاتب عدل ✍️", "سكرتير 📠", "خبير تزوير 📜", "موظف أرشيف 🗃️", "سمسار عقارات 🏘️", "مدير شركة 👨‍💼", "خبير خطوط ✒️", "مستشار قانوني 👨‍⚖️", "موظف حكومي 🏛️"], clues: ["التوقيع المزور يحتوي على خطأ إملائي لا يلاحظه إلا خبير.", "تم استخدام نوع حبر يتلاشى بعد 24 ساعة.", "الفاعل لديه نسخة من الختم الرسمي للشركة."] },
        // Scenarios 6-10 (Financial & Tech)
        { crime: "اختفت عملات رقمية بملايين الدولارات من منصة تداول مشهورة.", suspect_roles: ["هاكر 💻", "محلل مالي 📈", "مدير المنصة 👨‍💼", "موظف دعم فني 📞", "مستثمر كبير 💰", "خبير أمن سيبراني 🛡️", "صحفي اقتصادي 📰", "مهندس برمجيات 👨‍💻", "مدقق حسابات 🧾", "وسيط مالي"], clues: ["تم الاختراق عبر ثغرة في تطبيق المحفظة الباردة.", "تم تحويل الأموال إلى عنوان جديد غير معروف.", "أحد الموظفين قام ببيع كل أسهمه قبل الحادث بيوم."] },
        { crime: "تمت سرقة سيارة إسعاف واستخدامها في عملية سطو مسلح.", suspect_roles: ["مسعف 🚑", "طبيب طوارئ 👨‍⚕️", "ممرضة 💉", "سائق إسعاف 👨‍✈️", "حارس أمن 👮‍♂️", "مريض هارب 🏃‍♂️", "فني صيانة سيارات 🔧", "زائر مريب 🚶‍♂️", "صيدلي 💊", "مدير مستشفى 👨‍💼"], clues: ["السارق كان يعرف مكان مفاتيح سيارة الإسعاف.", "تم تعطيل جهاز التتبع GPS باحترافية.", "شوهد شخص يرتدي زي المسعفين وهو يضع قناعاً."] },
        { crime: "تم تسريب أسئلة امتحان الثانوية العامة قبل موعده بساعات.", suspect_roles: ["مدرس 👨‍🏫", "طالب 📚", "مدير مدرسة 🏫", "عامل مطبعة 🖨️", "موظف وزارة التعليم 🏛️", "ولي أمر 👨‍👩‍👧", "هاكر 💻", "صاحب مركز دروس 🏢", "موجه المادة 🧐", "بائع ورق 📄"], clues: ["التسريب تم عبر تطبيق واتساب من رقم مجهول.", "الورق المستخدم هو نفس نوع ورق غرفة المدير.", "تم العثور على مبلغ مالي كبير في حساب أحد المشتبه بهم."] },
        { crime: "تم العثور على مجوهرات أثرية مزيفة في متحف بدلاً من الأصلية.", suspect_roles: ["خبير مجوهرات 💍", "صائغ 💎", "حارس متحف 🏛️", "مرمم آثار 🏺", "مدير متحف 👨‍💼", "سائح ثري 💰", "لص محترف 🦹‍♂️", "موظف أرشيف 🗃️", "عامل نظافة 🧼", "مؤرخ 📜"], clues: ["المجوهرات المزيفة متقنة الصنع.", "نظام الإنذار لم ينطلق، مما يعني أن الفاعل يعرف كلمة المرور.", "تم العثور على بقايا مادة لصناعة القوالب في غرفة أحد الحراس."] },
        { crime: "تم تخريب خادم رئيسي لشركة ألعاب شهيرة، مما أدى إلى مسح بيانات اللاعبين.", suspect_roles: ["مبرمج ألعاب 🎮", "مدير مجتمع اللاعبين 👨‍👩‍👧‍👦", "لاعب محترف 🏆", "هاكر منافس 😈", "موظف سابق بالشركة", "مهندس شبكات 🌐", "مسؤول قاعدة البيانات 🗄️", "فني دعم 🎧", "مصمم شخصيات 👾", "مسؤول تسويق 📢"], clues: ["التخريب تم باستخدام صلاحيات مدير النظام (Admin).", "تم ترك رسالة مشفرة تسخر من أمن الشركة.", "آخر عملية دخول للخادم كانت من جهاز داخل الشركة."] }
    ];

    const BYSTANDER_ROLES = [
        "بوَّاب 🧹", "بقَّال 🧃", "حلَّاق 💈", "سايس 🚗", "تاجر 🧳", "طالب 📚", "سائق ميكروباص 🚌", "صاحب كشك 🏪"
    ];
    
    const MIN_PLAYERS = 3;

    // --- Game State ---
    let players = [];
    let currentJudgeIndex = -1;
    let criminalIndex = -1;
    let currentScenario = {};
    let roundNumber = 0;
    let roleRevealIndex = 0;
    let totalRounds = 5;
    let revealedCluesCount = 0;
    let investigationTime = 1; // Default to 1 minute
    let timerInterval = null;

    // --- DOM Elements ---
    const screens = {
        splash: document.getElementById('screen-splash'),
        setup: document.getElementById('screen-setup'),
        crimeInfo: document.getElementById('screen-crime-info'),
        investigation: document.getElementById('screen-investigation'),
        roleReveal: document.getElementById('screen-role-reveal'),
        judge: document.getElementById('screen-judge'),
        result: document.getElementById('screen-result'),
        gameOver: document.getElementById('screen-game-over'),
    };
    const playerNameInput = document.getElementById('playerNameInput');
    const playerListSetup = document.getElementById('player-list-setup');
    const startGameBtn = document.getElementById('startGameBtn');
    const errorMessage = document.getElementById('error-message');
    const timerDisplay = document.getElementById('timer-display');
    const rulesModal = document.getElementById('rules-modal');

    // --- Global Functions ---
    window.showScreen = (screenName) => {
        Object.values(screens).forEach(screen => {
            if(screen) screen.classList.add('hidden');
        });
        if (screens[screenName]) {
            screens[screenName].classList.remove('hidden');
        }
    };

    window.toggleRules = (show) => {
        if (show) {
            rulesModal.classList.remove('hidden');
        } else {
            rulesModal.classList.add('hidden');
        }
    };

    window.addPlayer = () => {
        const name = playerNameInput.value.trim();
        if (!name) { errorMessage.textContent = 'الرجاء إدخال اسم.'; return; }
        if (players.some(p => p.name === name)) { errorMessage.textContent = 'هذا الاسم مستخدم بالفعل.'; return; }
        players.push({ name, score: 0 });
        playerNameInput.value = '';
        errorMessage.textContent = '';
        updatePlayerListUI();
        if (players.length >= MIN_PLAYERS) startGameBtn.disabled = false;
        playerNameInput.focus();
    };

    window.selectRounds = (num) => {
        totalRounds = num;
        document.querySelectorAll('#rounds-selection .btn-round').forEach(button => {
            button.classList.toggle('selected', parseInt(button.textContent) === num);
        });
    };
    
    window.selectTime = (minutes) => {
        investigationTime = minutes;
        document.querySelectorAll('#time-selection .btn-round').forEach(button => {
            button.classList.toggle('selected', parseInt(button.textContent) === minutes);
        });
        updateTimerDisplay(investigationTime * 60);
    };

    window.removePlayer = (index) => {
        players.splice(index, 1);
        updatePlayerListUI();
        if (players.length < MIN_PLAYERS) startGameBtn.disabled = true;
    };

    window.beginGame = () => {
        if (players.length < MIN_PLAYERS) return;
        players.forEach(p => p.score = 0);
        roundNumber = 0;
        startNewRound();
    };
    
    window.showRoleRevealScreen = () => {
        roleRevealIndex = 0;
        setupRoleReveal();
        showScreen('roleReveal');
    };
    
    window.revealClue = (clueNumber) => {
        const clueTextEl = document.getElementById(`clueText${clueNumber}`);
        const clueBtnEl = document.getElementById(`revealClueBtn${clueNumber}`);

        clueTextEl.textContent = currentScenario.clues[clueNumber - 1];
        clueTextEl.classList.remove('hidden');
        clueBtnEl.disabled = true;

        if (!timerInterval) { 
            startTimer();
        }

        revealedCluesCount++;
        if (revealedCluesCount === 3) {
            document.getElementById('goToJudgeBtn').classList.remove('hidden');
        }
    };
    
    window.showJudgeScreen = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        document.getElementById('judge-title').textContent = `أيها القاضي ${players[currentJudgeIndex].name}، أصدر حكمك!`;
        renderJudgeOptions();
        showScreen('judge');
    }

    window.revealRole = () => {
        document.getElementById('role-reveal-container').classList.add('hidden');
        const roleDisplay = document.getElementById('role-display-container');
        roleDisplay.classList.remove('hidden');
        const player = players[roleRevealIndex];
        const roleTextEl = document.getElementById('playerRole');
        roleTextEl.textContent = player.role;
        roleTextEl.className = 'text-3xl font-bold ';
        if (player.role.includes("المجرم")) roleTextEl.classList.add("text-red-500");
        else if (player.role.includes("القاضي")) roleTextEl.classList.add("text-blue-600");
        else roleTextEl.classList.add("text-gray-700");
    };

    window.hideRole = () => {
        roleRevealIndex++;
        setupRoleReveal();
    };

    window.judge = (accusedIndex) => {
        const verdictEl = document.getElementById('verdict');
        let criminalRevealText = `المجرم الحقيقي كان: ${players[criminalIndex].name} - ${players[criminalIndex].base_role}`;
        if (accusedIndex === criminalIndex) {
            verdictEl.textContent = `صحيح! ${players[accusedIndex].name} هو المجرم ✅`;
            verdictEl.className = "text-xl font-bold text-green-500";
            players[currentJudgeIndex].score += 3;
        } else {
            verdictEl.textContent = `خطأ! ${players[accusedIndex].name} كان بريئاً ❌`;
            verdictEl.className = "text-xl font-bold text-red-500";
            players[criminalIndex].score += 2;
        }
        document.getElementById('criminal-reveal').textContent = criminalRevealText;
        renderScoreBoard();
        showScreen('result');
    };

    window.nextRound = () => {
        if (roundNumber >= totalRounds) showGameOver();
        else startNewRound();
    };

    window.restartGame = () => {
        players = [];
        updatePlayerListUI();
        startGameBtn.disabled = true;
        selectRounds(5);
        selectTime(1);
        showScreen('splash');
    };
    
    // --- Internal Functions ---
    function updatePlayerListUI() {
        playerListSetup.innerHTML = '';
        players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-list-item flex justify-between items-center';
            playerDiv.innerHTML = `<span>${player.name}</span> <button onclick="removePlayer(${index})" class="remove-btn">X</button>`;
            playerListSetup.appendChild(playerDiv);
        });
    }

    function startNewRound() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        roundNumber++;
        currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        
        currentJudgeIndex = Math.floor(Math.random() * players.length);
        const nonJudges = players.map((p, i) => i).filter(i => i !== currentJudgeIndex);
        
        criminalIndex = nonJudges[Math.floor(Math.random() * nonJudges.length)];
        
        let suspectRoles = [...currentScenario.suspect_roles];
        const criminalRole = suspectRoles.splice(Math.floor(Math.random() * suspectRoles.length), 1)[0]; 

        let innocentSuspectRoles = suspectRoles.sort(() => 0.5 - Math.random());
        let bystanderRoles = [...BYSTANDER_ROLES].sort(() => 0.5 - Math.random());
        
        players.forEach((player, i) => {
            if (i === currentJudgeIndex) {
                player.role = "القاضي 👨‍⚖️";
                player.base_role = "القاضي";
            } else if (i === criminalIndex) {
                player.role = `${criminalRole} (المجرم 🦹‍♂️)`;
                player.base_role = criminalRole;
            } else {
                if (innocentSuspectRoles.length > 0) {
                    player.role = innocentSuspectRoles.pop();
                } else {
                    player.role = bystanderRoles.pop() || "شاهد عيان 👁️";
                }
                player.base_role = player.role;
            }
        });

        document.getElementById('round-title-crime').textContent = `الجولة ${roundNumber} من ${totalRounds}`;
        document.getElementById('judge-announcement').innerHTML = `<span class="font-bold text-yellow-400">${players[currentJudgeIndex].name}</span>, أنت القاضي!`;
        document.getElementById('crime-story').textContent = currentScenario.crime;
        
        showScreen('crimeInfo');
    }

    function setupRoleReveal() {
        const roleRevealContainer = document.getElementById('role-reveal-container');
        const roleDisplayContainer = document.getElementById('role-display-container');
        
        roleDisplayContainer.classList.add('hidden');
        roleRevealContainer.classList.remove('hidden');
        
        if (roleRevealIndex >= players.length) {
            setupInvestigationScreen();
            showScreen('investigation');
        } else {
            document.getElementById('currentPlayerName').textContent = players[roleRevealIndex].name;
        }
    }
    
    function setupInvestigationScreen() {
        revealedCluesCount = 0;
        document.getElementById('crime-story-investigation').textContent = currentScenario.crime;
        updateTimerDisplay(investigationTime * 60);
        
        for(let i = 1; i <= 3; i++) {
            document.getElementById(`clueText${i}`).classList.add('hidden');
            document.getElementById(`revealClueBtn${i}`).disabled = false;
        }
        document.getElementById('goToJudgeBtn').classList.add('hidden');
    }
    
    function startTimer() {
        let timeInSeconds = investigationTime * 60;
        
        timerInterval = setInterval(() => {
            timeInSeconds--;
            updateTimerDisplay(timeInSeconds);

            if (timeInSeconds <= 0) {
                showJudgeScreen(); // This also clears the interval
            }
        }, 1000);
    }

    function updateTimerDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function renderJudgeOptions(){
        const convictionList = document.getElementById('conviction-list');
        convictionList.innerHTML = '';
        players.forEach((player, index) => {
            if (index === currentJudgeIndex) return;
            const btn = document.createElement('button');
            btn.className = 'btn btn-danger text-lg';
            btn.textContent = `إدانة ${player.name}`;
            btn.onclick = () => judge(index);
            convictionList.appendChild(btn);
        });
    }

    function renderScoreBoard() {
        const board = document.getElementById("scoreBoard");
        board.innerHTML = '<h3 class="text-lg font-bold text-center mb-2">لوحة النقاط</h3>';
        const sortedPlayers = [...players].sort((a,b) => b.score - a.score);
        sortedPlayers.forEach(p => {
            board.innerHTML += `<div class="flex justify-between p-1"><span>${p.name}</span> <span class="font-bold text-yellow-500">${p.score} نقطة</span></div>`;
        });
    }

    function showGameOver() {
        const finalScores = document.getElementById('final-scores');
        finalScores.innerHTML = '';
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        
        sortedPlayers.forEach((p, index) => {
            const scoreDiv = document.createElement('div');
            let medal = "";
            if(index === 0) medal = "🥇";
            if(index === 1) medal = "🥈";
            if(index === 2) medal = "🥉";
            scoreDiv.className = 'text-xl p-2 bg-gray-200 rounded-lg flex justify-between border-2 border-black';
            scoreDiv.innerHTML = `<span>${medal} ${p.name}</span> <span class="font-bold text-blue-700">${p.score} نقطة</span>`;
            finalScores.appendChild(scoreDiv);
        });
        
        showScreen('gameOver');
    }
    
    playerNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addPlayer();
    });

    // Initialize default selections
    selectTime(1);
    selectRounds(5);
    showScreen('splash');
});
</script>
</body>
</html>
