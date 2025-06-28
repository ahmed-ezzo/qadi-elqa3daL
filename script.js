// --- Game Configuration ---
const ROLES = [
    "بوَّاب 🧹", "بقَّال 🧃", "حلَّاق 💈", "نجَّار 🪚", "كهربائي 💡", "ميكانيكي 🔧", "جزَّار 🔪", "طبيب أسنان 🦷", "سايس (منظم سيارات) 🚗", "عامل نظافة 🧼", "مُدرّس 👨‍🏫", "محامي ⚖️", "تاجر 🧳", "طالب 📚", "شيف / طباخ 👨‍🍳", "ممرضة 💉", "سائق ميكروباص 🚌", "صاحب كشك 🏪", "مصوِّر 📷", "عامل في مقهى / قهوجي ☕"
];
const CRIMES = [
    "سرقة محل ذهب تحت تهديد السلاح.", "اختلاس أموال من شركة خاصة.", "قتل شريك في شقة بسبب خلاف مادي.", "فتاة قتلت صديقتها بسبب الغيرة.", "سائق دهس شخص وهرب.", "تاجر باع أدوية منتهية الصلاحية.", "أم قتلت ابنها بسبب نوبة غضب.", "مهندس زور توقيعات في أوراق رسمية.", "اختطاف طفل من الشارع وطلب فدية.", "حارس عمارة سجل السكان بكاميرا مخفية.", "صيدلي خلط الدواء بطريقة خاطئة وتسبب في موت.", "شخص زوّر شهادة جامعية.", "مراهق اخترق حسابات بنكية.", "موظف سجل حضور زملائه دون علمهم.", "رجل سرق تيار كهربائي لمنزله من العمود الرئيسي.", "طفل حرق محل ألعاب بالخطأ.", "معلم تحرش بتلميذ.", "فتاة صورت زميلاتها في الحمام ونشرت الصور.", "عامل باع أجهزة الشركة في السوق السوداء.", "أحد السكان سمم الكلاب في الشارع.", "رجل استخدم كاميرا خفية في غرفة تغيير ملابس.", "طالبة زورت النتيجة الجامعية.", "مشجع رياضي دخل الاستاد بسلاح أبيض.", "طبيب تلاعب في تشخيص مرضى للحصول على تأمين.", "رجل قتل زوجته شكًا في خيانتها.", "مربية أطفال كانت تضرب الطفل بعنف.", "فتاة ابتزت زميلها بصور شخصية.", "سائق أوبر حاول التحرش بالراكبة.", "عامل في مطعم وضع \"مخدر\" في الأكل.", "راجل كبير بيأخذ معاش والده المتوفى منذ سنوات.", "فني تركيب سرق موبايلات من منازل العملاء.", "مدير مدرسة بيبيع الامتحانات.", "فتاة انتحلت شخصية صاحبتها على فيسبوك.", "لص يسطو على خزينة مسجد.", "شاب سرق مصحف أثري من مكتبة.", "فتاة نشرت شائعات كاذبة عن زميلتها.", "بائع فاكهة يستخدم ميزان مزور.", "سائق نقل عمومي يقود من غير رخصة.", "مراهق يبتز البنات من خلال إنستغرام.", "تاجر زوّر منشأ البضاعة.", "طبيب بيجري عمليات غير مرخصة في عيادة خاصة.", "موظف بنك يسرق أرصدة العملاء.", "طالب أشعل حريقًا في المدرسة انتقامًا من المعلم.", "راجل بيخفي حشيش تحت عربية الحارة.", "حد بيستغل التبرعات لصالحه.", "مهندس نفذ عمارة مخالفة ومبنى انهار.", "شخص سرق صندوق تبرعات في مول.", "مدرب جيم يصور الزباين في أوضاع غير لائقة.", "عروس سرقت شبكة من العريس وهربت.", "شخص ادعى المرض ليحصل على صدقات من المارة."
];
const MIN_PLAYERS = 3;

// --- Game State ---
let players = [];
let currentJudgeIndex = -1;
let criminalIndex = -1;
let roundNumber = 0;
let roleRevealIndex = 0;
let totalRounds = 5; // Default number of rounds

// --- DOM Elements ---
const screens = {
    splash: document.getElementById('screen-splash'),
    setup: document.getElementById('screen-setup'),
    roundInfo: document.getElementById('screen-round-info'),
    judge: document.getElementById('screen-judge'),
    result: document.getElementById('screen-result'),
    gameOver: document.getElementById('screen-game-over'),
};
const playerNameInput = document.getElementById('playerNameInput');
const playerListSetup = document.getElementById('player-list-setup');
const startGameBtn = document.getElementById('startGameBtn');
const errorMessage = document.getElementById('error-message');

// --- Utility Functions ---
function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        if(screen) screen.classList.add('hidden');
    });
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
}

// --- Game Logic ---
function addPlayer() {
    const name = playerNameInput.value.trim();
    if (!name) {
        errorMessage.textContent = 'الرجاء إدخال اسم.';
        return;
    }
    if (players.some(p => p.name === name)) {
        errorMessage.textContent = 'هذا الاسم مستخدم بالفعل.';
        return;
    }
    players.push({ name, score: 0 });
    playerNameInput.value = '';
    errorMessage.textContent = '';
    updatePlayerListUI();
    if (players.length >= MIN_PLAYERS) {
        startGameBtn.disabled = false;
    }
    playerNameInput.focus();
}

function selectRounds(num) {
    totalRounds = num;
    const buttons = document.querySelectorAll('#rounds-selection .btn-round');
    buttons.forEach(button => {
        if (parseInt(button.textContent) === num) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

playerNameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addPlayer();
});

function updatePlayerListUI() {
    playerListSetup.innerHTML = '';
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-list-item';
        playerDiv.innerHTML = `<span>${player.name}</span> <button onclick="removePlayer(${index})" class="remove-btn">X</button>`;
        playerListSetup.appendChild(playerDiv);
    });
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerListUI();
    if (players.length < MIN_PLAYERS) {
        startGameBtn.disabled = true;
    }
}

function beginGame() {
    if (players.length < MIN_PLAYERS) return;
    players.forEach(p => p.score = 0);
    roundNumber = 0;
    startNewRound();
}

function startNewRound() {
    roundNumber++;
    currentJudgeIndex = Math.floor(Math.random() * players.length);
    
    const potentialCriminals = players.map((p, i) => i).filter(i => i !== currentJudgeIndex);
    criminalIndex = potentialCriminals[Math.floor(Math.random() * potentialCriminals.length)];
    
    const shuffledRoles = [...ROLES].sort(() => Math.random() - 0.5);
    let roleIndex = 0;
    
    players.forEach((player, i) => {
        const assignedRole = shuffledRoles[roleIndex % shuffledRoles.length];
        if (i === currentJudgeIndex) {
            player.role = "القاضي 👨‍⚖️";
        } else if (i === criminalIndex) {
            player.role = `${assignedRole} (المجرم 🦹‍♂️)`;
            roleIndex++;
        } else {
            player.role = assignedRole;
            roleIndex++;
        }
    });

    document.getElementById('judge-announcement').innerHTML = `<span class="font-bold text-yellow-400">${players[currentJudgeIndex].name}</span>, أنت القاضي لهذه الجولة!`;
    const crime = CRIMES[Math.floor(Math.random() * CRIMES.length)];
    document.getElementById('crime-story').textContent = crime;
    
    roleRevealIndex = 0;
    document.getElementById('round-title').textContent = `الجولة ${roundNumber} من ${totalRounds}`;
    setupRoleReveal();
    showScreen('roundInfo');
}

function setupRoleReveal() {
    document.getElementById('role-display-container').classList.add('hidden');
    document.getElementById('role-reveal-container').classList.remove('hidden');
    
    if (roleRevealIndex >= players.length) {
        document.getElementById('judge-title').textContent = `أيها القاضي ${players[currentJudgeIndex].name}، أصدر حكمك!`;
        renderJudgeOptions();
        showScreen('judge');
    } else {
        document.getElementById('currentPlayerName').textContent = players[roleRevealIndex].name;
    }
}

function revealRole() {
    document.getElementById('role-reveal-container').classList.add('hidden');
    const roleDisplay = document.getElementById('role-display-container');
    roleDisplay.classList.remove('hidden');
    
    const player = players[roleRevealIndex];
    const roleTextEl = document.getElementById('playerRole');
    roleTextEl.textContent = player.role;
    
    if (player.role.includes("المجرم")) {
        roleTextEl.className = "text-3xl font-bold text-red-500";
    } else if (player.role.includes("القاضي")) {
         roleTextEl.className = "text-3xl font-bold text-blue-600";
    } else {
        roleTextEl.className = "text-3xl font-bold text-gray-700";
    }
}

function hideRole() {
    roleRevealIndex++;
    setupRoleReveal();
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

function judge(accusedIndex) {
    let verdictText = "";
    let criminalRevealText = `المجرم الحقيقي كان: ${players[criminalIndex].name} - ${players[criminalIndex].role.replace(' (المجرم 🦹‍♂️)', '')}`;
    
    if (accusedIndex === criminalIndex) {
        verdictText = `صحيح! ${players[accusedIndex].name} هو المجرم ✅`;
        document.getElementById('verdict').className = "text-xl font-bold text-green-500";
        players[currentJudgeIndex].score += 3;
    } else {
        verdictText = `خطأ! ${players[accusedIndex].name} كان بريئاً ❌`;
         document.getElementById('verdict').className = "text-xl font-bold text-red-500";
        players[criminalIndex].score += 2;
        players.forEach((p, i) => {
            if (i !== criminalIndex && i !== accusedIndex && i !== currentJudgeIndex) p.score += 1;
        });
    }

    document.getElementById('verdict').textContent = verdictText;
    document.getElementById('criminal-reveal').textContent = criminalRevealText;
    renderScoreBoard();
    showScreen('result');
}

function renderScoreBoard() {
    const board = document.getElementById("scoreBoard");
    board.innerHTML = '<h3 class="text-lg font-bold text-center mb-2">لوحة النقاط</h3>';
    const sortedPlayers = [...players].sort((a,b) => b.score - a.score);
    sortedPlayers.forEach(p => {
        board.innerHTML += `<div class="flex justify-between p-1"><span>${p.name}</span> <span class="font-bold text-yellow-500">${p.score} نقطة</span></div>`;
    });
}

function nextRound() {
    if (roundNumber >= totalRounds) {
        showGameOver();
    } else {
        startNewRound();
    }
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

function restartGame() {
    players = [];
    updatePlayerListUI();
    startGameBtn.disabled = true;
    selectRounds(5); // Reset rounds to default
    showScreen('splash');
}

// Initial State
showScreen('splash');
