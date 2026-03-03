// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initMobileMenu();
    initDarkMode();
    initSwiper();
    initUrlChecker();
    initSqlSimulator();
    initPasswordGenerator();
    initPasswordStrengthChecker();
    initQuiz();
    initProgressSystem();
    initPhishingGame();
    initLeaderboard();
    initDataVisualization();
    initNotifications();
    initPanicButton();
    initBehaviorAnalysis();
    initBackToTop();
    initStatsButton();
    initChatButton();
    
    console.log('✅ SafeWeb initialisé avec succès !');
});

// ==================== AOS ====================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50,
        });
    }
}

// ==================== MENU MOBILE ====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }
}

// ==================== MODE SOMBRE ====================
function initDarkMode() {
    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        });
    }
    
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }
}

// ==================== SWIPER ====================
function initSwiper() {
    if (document.querySelector('.social-swiper') && typeof Swiper !== 'undefined') {
        new Swiper('.social-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
}

// ==================== DÉTECTEUR D'URL ====================
function initUrlChecker() {
    const urlInput = document.getElementById('urlInput');
    const checkBtn = document.getElementById('checkUrlBtn');
    const urlResult = document.getElementById('urlResult');
    
    if (!checkBtn || !urlInput || !urlResult) return;
    
    const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'confirm', 'free', 'win', 'bank', 'paypal', 'instagram', 'facebook', 'amazon', 'apple', 'microsoft'];
    const suspiciousTlds = ['.tk', '.ml', '.ga', '.cf', '.xyz', '.top', '.club', '.work', '.date', '.men', '.loan', '.download'];
    
    function checkURL(url) {
        if (!url) return { risk: 'none', message: 'Veuillez entrer une URL.', score: 0 };
        
        const lower = url.toLowerCase();
        let score = 0;
        const details = [];
        
        suspiciousKeywords.forEach(kw => {
            if (lower.includes(kw)) {
                score += 10;
                details.push(`Mot suspect: "${kw}"`);
            }
        });
        
        suspiciousTlds.forEach(tld => {
            if (lower.includes(tld)) {
                score += 20;
                details.push(`Extension risquée: ${tld}`);
            }
        });
        
        if (lower.includes('@') || lower.includes(' ')) {
            score += 30;
            details.push('Caractères spéciaux suspects');
        }
        
        if (lower.match(/\d{5,}/)) {
            score += 15;
            details.push('Nombre anormalement long');
        }
        
        if (lower.split('.').length > 3) {
            score += 25;
            details.push('Trop de sous-domaines');
        }
        
        let message, risk;
        if (score === 0) {
            message = '✅ URL semble légitime (restez vigilant).';
            risk = 'safe';
        } else if (score <= 30) {
            message = '⚠️ URL suspecte : contient des indices de phishing.';
            risk = 'douteux';
        } else {
            message = '🚨 TRÈS DANGEREUX : forte probabilité de phishing !';
            risk = 'dangereux';
        }
        
        return { risk, message, score, details };
    }
    
    checkBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        const result = checkURL(url);
        
        let html = `<i class="fas fa-shield"></i> ${result.message}`;
        if (result.details.length > 0) {
            html += '<br><small>' + result.details.join('<br>') + '</small>';
        }
        
        urlResult.innerHTML = html;
        urlResult.style.borderLeftColor = 
            result.risk === 'safe' ? 'var(--senegal-green)' : 
            result.risk === 'douteux' ? 'var(--senegal-yellow)' : 
            'var(--senegal-red)';
        
        if (window.behaviorAnalyzer) {
            window.behaviorAnalyzer.trackAction({
                type: 'url_check',
                url: url,
                riskScore: result.score,
                timestamp: Date.now()
            });
        }
    });
}

// ==================== SIMULATEUR SQL ====================
function initSqlSimulator() {
    const sqlForm = document.getElementById('sqlForm');
    const sqlResult = document.getElementById('sqlResult');
    
    if (!sqlForm || !sqlResult) return;
    
    sqlForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        
        const safeUser = user.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safePass = pass.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        const query = `SELECT * FROM users WHERE username = '${safeUser}' AND password = '${safePass}';`;
        
        let html = `<i class="fas fa-code"></i> Requête simulée :<br><strong>${query}</strong><br>`;
        
        if (pass.includes("' OR '1'='1") || pass.includes("' OR 1=1") || 
            user.includes("' OR '1'='1") || user.includes("' OR 1=1")) {
            html += `<br><span style="color: #ff8a8a; font-weight: bold;">➡️ INJECTION RÉUSSIE !</span>`;
        } else {
            html += `<br><span style="color: #8aff8a;">➡️ Requête normale.</span>`;
        }
        
        sqlResult.innerHTML = html;
        
        if (window.behaviorAnalyzer) {
            window.behaviorAnalyzer.trackAction({
                type: 'sql_test',
                injection: pass.includes("' OR ") || user.includes("' OR "),
                timestamp: Date.now()
            });
        }
    });
}

// ==================== GÉNÉRATEUR DE MOT DE PASSE ====================
function initPasswordGenerator() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const generateBtn = document.getElementById('generatePasswordBtn');
    
    if (!generateBtn || !passwordDisplay) return;
    
    function generateStrongPassword() {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        const allChars = lowercase + uppercase + numbers + symbols;
        let password = '';
        
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        for (let i = 4; i < 16; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    generateBtn.addEventListener('click', () => {
        const newPassword = generateStrongPassword();
        passwordDisplay.textContent = newPassword;
        
        navigator.clipboard.writeText(newPassword).then(() => {
            showNotification('✅ Mot de passe copié !', 'success');
        });
        
        const strength = analyzePasswordStrength(newPassword);
        updatePasswordStrengthIndicator(strength);
    });
}

// ==================== ANALYSEUR DE MOT DE PASSE ====================
function initPasswordStrengthChecker() {
    const container = document.querySelector('.feature-card:has(.password-display)');
    if (!container) return;
    
    const strengthDiv = document.createElement('div');
    strengthDiv.id = 'passwordStrength';
    strengthDiv.style.marginTop = '1rem';
    container.querySelector('.feature-demo').appendChild(strengthDiv);
    
    const passwordDisplay = document.getElementById('passwordDisplay');
    if (passwordDisplay) {
        const strength = analyzePasswordStrength(passwordDisplay.textContent);
        updatePasswordStrengthIndicator(strength);
    }
}

function analyzePasswordStrength(password) {
    const criteria = [
        { test: p => p.length >= 12, name: 'Longueur', points: 20 },
        { test: p => /[a-z]/.test(p), name: 'Minuscules', points: 15 },
        { test: p => /[A-Z]/.test(p), name: 'Majuscules', points: 15 },
        { test: p => /[0-9]/.test(p), name: 'Chiffres', points: 15 },
        { test: p => /[!@#$%^&*]/.test(p), name: 'Caractères spéciaux', points: 20 },
        { test: p => !/(.)\1{2,}/.test(p), name: 'Pas de répétitions', points: 15 }
    ];
    
    let score = 0;
    const passed = [];
    const failed = [];
    
    criteria.forEach(c => {
        if (c.test(password)) {
            score += c.points;
            passed.push(c.name);
        } else {
            failed.push(c.name);
        }
    });
    
    let level, color;
    if (score < 40) { level = 'Faible'; color = '#e31b23'; }
    else if (score < 70) { level = 'Moyen'; color = '#fcd116'; }
    else if (score < 90) { level = 'Fort'; color = '#00853f'; }
    else { level = 'Très fort'; color = '#00a86b'; }
    
    return { score, level, color, passed, failed };
}

function updatePasswordStrengthIndicator(strength) {
    const div = document.getElementById('passwordStrength');
    if (!div) return;
    
    div.innerHTML = `
        <div style="background: var(--light-gray); border-radius: 10px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Force: <strong style="color: ${strength.color}">${strength.level}</strong></span>
                <span>Score: ${strength.score}/100</span>
            </div>
            <div style="width: 100%; height: 8px; background: #ddd; border-radius: 4px; overflow: hidden;">
                <div style="width: ${strength.score}%; height: 100%; background: ${strength.color}; transition: width 0.3s;"></div>
            </div>
        </div>
    `;
}

// ==================== SYSTÈME DE PROGRESSION ====================
class ProgressSystem {
    constructor() {
        this.loadProgress();
        this.observers = [];
    }
    
    loadProgress() {
        const saved = localStorage.getItem('safeweb_progress');
        if (saved) {
            const data = JSON.parse(saved);
            this.level = data.level || 1;
            this.xp = data.xp || 0;
            this.xpToNextLevel = data.xpToNextLevel || 100;
            this.badges = data.badges || [];
            this.completedQuests = data.completedQuests || {};
            this.stats = data.stats || {
                quizzesDone: 0,
                urlsChecked: 0,
                sqlTests: 0,
                gamesPlayed: 0
            };
        } else {
            this.level = 1;
            this.xp = 0;
            this.xpToNextLevel = 100;
            this.badges = [];
            this.completedQuests = {};
            this.stats = {
                quizzesDone: 0,
                urlsChecked: 0,
                sqlTests: 0,
                gamesPlayed: 0
            };
        }
    }
    
    saveProgress() {
        localStorage.setItem('safeweb_progress', JSON.stringify({
            level: this.level,
            xp: this.xp,
            xpToNextLevel: this.xpToNextLevel,
            badges: this.badges,
            completedQuests: this.completedQuests,
            stats: this.stats
        }));
        this.notifyObservers();
    }
    
    addXP(amount, source) {
        this.xp += amount;
        this.stats[source] = (this.stats[source] || 0) + 1;
        
        while (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
        
        this.saveProgress();
        this.showXPGain(amount, source);
    }
    
    levelUp() {
        this.xp -= this.xpToNextLevel;
        this.level++;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.3);
        
        const badge = {
            id: `level_${this.level}`,
            name: `Niveau ${this.level}`,
            icon: '⭐',
            date: new Date().toISOString()
        };
        
        this.badges.push(badge);
        this.showNotification(`🎉 Niveau ${this.level} atteint !`, 'success');
    }
    
    showXPGain(amount, source) {
        const xpPopup = document.createElement('div');
        xpPopup.className = 'xp-popup';
        xpPopup.innerHTML = `+${amount} XP`;
        xpPopup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--senegal-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: bold;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: fadeOut 2s forwards;
        `;
        document.body.appendChild(xpPopup);
        setTimeout(() => xpPopup.remove(), 2000);
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    notifyObservers() {
        this.observers.forEach(obs => obs(this));
    }
    
    showNotification(message, type) {
        if (window.notificationSystem) {
            window.notificationSystem.showInApp(message, type);
        }
    }
}

function initProgressSystem() {
    window.progressSystem = new ProgressSystem();
    
    const levelDisplay = document.getElementById('navLevel')?.querySelector('span');
    if (levelDisplay) {
        levelDisplay.textContent = window.progressSystem.level;
        
        window.progressSystem.subscribe((progress) => {
            levelDisplay.textContent = progress.level;
        });
    }
}

// ==================== QUIZ ====================
const questions = [
    { question: "Que signifie 'phishing' ?", options: ["Pêche aux informations", "Hameçonnage", "Virus", "Piratage de compte"], correct: 1 },
    { question: "Signe typique d'un email de phishing ?", options: ["Message personnalisé", "Lien suspect", "Expéditeur connu", "Pièce jointe .txt"], correct: 1 },
    { question: "Que fait une injection SQL ?", options: ["Insère du code malveillant", "Injecte un virus", "Supprime des fichiers", "Chiffre les données"], correct: 0 },
    { question: "Comment protéger son compte ?", options: ["Mot de passe simple", "2FA", "Partager son mot de passe", "Même mot de passe"], correct: 1 },
    { question: "Message suspect sur Instagram ?", options: ["Cliquer", "Ignorer/signaler", "Donner ses infos", "Partager"], correct: 1 },
    { question: "Que signifie 'https' ?", options: ["Protocole sécurisé", "Site dangereux", "Virus", "Hacker"], correct: 0 },
    { question: "Bon réflexe avant de cliquer ?", options: ["Survoler l'URL", "Cliquer sans vérifier", "Désactiver l'antivirus", "Copier-coller"], correct: 0 },
    { question: "Extension souvent utilisée pour du phishing ?", options: [".com", ".org", ".tk", ".gov"], correct: 2 }
];

let current = 0, score = 0, selected = null, completed = false;

function initQuiz() {
    const qArea = document.getElementById('questionArea');
    const optsArea = document.getElementById('optionsArea');
    const nextBtn = document.getElementById('nextBtn');
    const resetBtn = document.getElementById('resetQuizBtn');
    const quizScore = document.getElementById('quizScore');
    const correction = document.getElementById('quizCorrection');
    const progress = document.getElementById('progressBar');
    const badge = document.getElementById('badgeIcon');
    const certBtn = document.getElementById('generateCertBtn');
    
    if (!qArea) return;
    
    function render() {
        if (completed) return;
        const q = questions[current];
        qArea.innerText = q.question;
        optsArea.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<i class="fas fa-circle"></i> ${opt}`;
            btn.onclick = () => select(i);
            optsArea.appendChild(btn);
        });
        progress.style.width = `${(current / questions.length) * 100}%`;
        nextBtn.disabled = true;
    }
    
    function select(idx) {
        if (completed) return;
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        document.querySelectorAll('.option-btn')[idx].classList.add('selected');
        selected = idx;
        nextBtn.disabled = false;
    }
    
    function next() {
        if (completed) return;
        if (selected === questions[current].correct) score++;
        current++;
        if (current < questions.length) render();
        else end();
        selected = null;
    }
    
    function end() {
        completed = true;
        qArea.innerText = 'Quiz terminé !';
        optsArea.innerHTML = '';
        nextBtn.disabled = true;
        progress.style.width = '100%';
        const percent = (score / questions.length) * 100;
        quizScore.innerHTML = `Score : ${score}/${questions.length} (${Math.round(percent)}%)`;
        let html = '<h4>Correction :</h4><ul>';
        questions.forEach((q, i) => html += `<li><strong>Q${i+1}:</strong> ${q.options[q.correct]}</li>`);
        html += '</ul>';
        correction.innerHTML = html;
        correction.style.display = 'block';
        
        if (percent >= 60) {
            badge.classList.add('badge-visible');
            certBtn.disabled = false;
            if (window.progressSystem) window.progressSystem.addXP(50, 'quiz');
        } else {
            badge.classList.remove('badge-visible');
            certBtn.disabled = true;
        }
    }
    
    function resetQuiz() {
        current = 0; score = 0; selected = null; completed = false;
        render();
        quizScore.innerHTML = '';
        correction.innerHTML = '';
        correction.style.display = 'none';
        badge.classList.remove('badge-visible');
        certBtn.disabled = true;
    }
    
    nextBtn.addEventListener('click', next);
    resetBtn.addEventListener('click', resetQuiz);
    render();
}

// ==================== NOTIFICATIONS ====================
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = this.createContainer();
    }
    
    createContainer() {
        const div = document.createElement('div');
        div.id = 'notificationContainer';
        div.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 9999;
            width: 300px;
        `;
        document.body.appendChild(div);
        return div;
    }
    
    showInApp(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            background: ${type === 'success' ? '#00853F' : 
                         type === 'warning' ? '#FCD116' : 
                         type === 'danger' ? '#E31B23' : 
                         '#334155'};
            color: ${type === 'warning' ? '#000' : '#fff'};
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            danger: '<i class="fas fa-times-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        
        notification.innerHTML = `
            ${icons[type] || icons.info}
            <div style="flex: 1;">${message}</div>
            <i class="fas fa-times" style="opacity: 0.7; font-size: 0.9rem;"></i>
        `;
        
        notification.addEventListener('click', () => notification.remove());
        this.container.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    }
}

function initNotifications() {
    window.notificationSystem = new NotificationSystem();
}

// ==================== ANALYSEUR DE COMPORTEMENT ====================
class BehaviorAnalyzer {
    constructor() {
        this.actions = JSON.parse(localStorage.getItem('behavior_actions')) || [];
        this.riskyPatterns = JSON.parse(localStorage.getItem('risky_patterns')) || [];
    }
    
    trackAction(action) {
        this.actions.push(action);
        localStorage.setItem('behavior_actions', JSON.stringify(this.actions.slice(-100)));
        this.analyzeRiskyPatterns();
    }
    
    analyzeRiskyPatterns() {
        this.riskyPatterns = [];
        
        const suspiciousClicks = this.actions.filter(a => a.type === 'url_check' && (a.riskScore || 0) > 50);
        if (suspiciousClicks.length > 3) {
            this.riskyPatterns.push({
                type: 'multiple_suspicious_clicks',
                severity: 'high',
                message: 'Vous cliquez souvent sur des liens suspects !'
            });
        }
        
        localStorage.setItem('risky_patterns', JSON.stringify(this.riskyPatterns));
    }
    
    getStats() {
        return {
            totalActions: this.actions.length,
            suspiciousClicks: this.actions.filter(a => a.type === 'url_check' && (a.riskScore || 0) > 50).length,
            sqlAttempts: this.actions.filter(a => a.type === 'sql_test' && a.injection).length,
            riskyPatterns: this.riskyPatterns.length,
            lastActive: this.actions[this.actions.length - 1]?.timestamp || null
        };
    }
}

function initBehaviorAnalysis() {
    window.behaviorAnalyzer = new BehaviorAnalyzer();
}

// ==================== MINI-JEU ====================
class PhishingGame {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.currentItems = [];
        this.gameActive = false;
    }
    
    start() {
        this.gameActive = true;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.generateItems();
        this.render();
    }
    
    generateItems() {
        this.currentItems = [];
        const count = 3 + this.level;
        
        for (let i = 0; i < count; i++) {
            const isPhishing = Math.random() > 0.4;
            this.currentItems.push({
                id: i,
                isPhishing: isPhishing,
                content: this.generateContent(isPhishing),
                analyzed: false
            });
        }
    }
    
    generateContent(isPhishing) {
        const phishingExamples = [
            { from: 'Sécurité PayPal', message: 'Votre compte sera suspendu', link: 'paypal-verif.tk' },
            { from: 'Support Amazon', message: 'Problème de paiement', link: 'amazon-update.xyz' },
            { from: 'Banque Postale', message: 'Virement en attente', link: 'banque-secure.cf' },
            { from: 'Instagram', message: 'Connexion suspecte', link: 'instagram-login.ml' }
        ];
        
        const legitExamples = [
            { from: 'LinkedIn', message: 'Nouvelle offre', link: 'linkedin.com/jobs' },
            { from: 'Google', message: 'Code de vérification', link: 'accounts.google.com' },
            { from: 'Microsoft', message: 'Mise à jour', link: 'microsoft.com/security' }
        ];
        
        const examples = isPhishing ? phishingExamples : legitExamples;
        const ex = examples[Math.floor(Math.random() * examples.length)];
        
        return ex;
    }
    
    render() {
        const gameContainer = document.getElementById('phishingGame');
        if (!gameContainer) return;
        
        gameContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: linear-gradient(135deg, var(--senegal-green), var(--senegal-red)); color: white; border-radius: 12px; margin-bottom: 1rem;">
                <span>❤️ ${this.lives}</span>
                <span>🎯 Score: ${this.score}</span>
                <span>📊 Niveau: ${this.level}</span>
            </div>
            <div style="display: grid; gap: 1rem;">
                ${this.currentItems.map((item, index) => `
                    <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; border: 2px solid ${item.analyzed ? (item.userCorrect ? 'var(--senegal-green)' : 'var(--senegal-red)') : 'var(--light-gray)'};">
                        <div style="font-weight: bold; color: var(--senegal-green);">${item.content.from}</div>
                        <div style="margin: 0.5rem 0;">${item.content.message}</div>
                        <div style="font-family: monospace; padding: 0.5rem; background: var(--light-gray); border-radius: 8px; color: ${item.content.isPhishing ? 'var(--senegal-red)' : 'var(--senegal-green)'};">${item.content.link}</div>
                        ${!item.analyzed ? `
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                                <button class="btn-small" onclick="window.phishingGame.checkAnswer(${item.id}, true)" style="flex: 1; background: var(--senegal-red);">🎣 Phishing</button>
                                <button class="btn-small" onclick="window.phishingGame.checkAnswer(${item.id}, false)" style="flex: 1; background: var(--senegal-green);">✅ Légitime</button>
                            </div>
                        ` : `
                            <div style="text-align: center; margin-top: 0.5rem; padding: 0.5rem; background: ${item.userCorrect ? 'rgba(0,133,63,0.1)' : 'rgba(227,27,35,0.1)'}; border-radius: 8px; color: ${item.userCorrect ? 'var(--senegal-green)' : 'var(--senegal-red)'};">
                                ${item.userCorrect ? '✅ Correct !' : '❌ Faux !'}
                            </div>
                        `}
                    </div>
                `).join('')}
            </div>
            ${this.currentItems.every(i => i.analyzed) ? `
                <button class="btn-primary" onclick="window.phishingGame.nextLevel()" style="margin-top: 1rem; width: 100%;">Niveau suivant</button>
            ` : ''}
        `;
    }
    
    checkAnswer(itemId, guessedPhishing) {
        const item = this.currentItems.find(i => i.id == itemId);
        if (item.analyzed) return;
        
        const correct = (guessedPhishing === item.isPhishing);
        item.analyzed = true;
        item.userCorrect = correct;
        
        if (correct) {
            this.score += 10;
            if (window.progressSystem) window.progressSystem.addXP(5, 'game');
        } else {
            this.lives--;
        }
        
        this.render();
        
        if (this.lives <= 0) {
            setTimeout(() => {
                alert(`Game Over! Score: ${this.score}`);
                this.start();
            }, 100);
        }
    }
    
    nextLevel() {
        this.level++;
        this.generateItems();
        this.render();
    }
}

function initPhishingGame() {
    window.phishingGame = new PhishingGame();
}

// ==================== CLASSEMENT ====================
function initLeaderboard() {
    const container = document.getElementById('leaderboardContainer');
    if (!container) return;
    
    const players = JSON.parse(localStorage.getItem('leaderboard')) || [
        { name: 'Moussa', score: 250, level: 5 },
        { name: 'Amina', score: 210, level: 4 },
        { name: 'Omar', score: 180, level: 3 }
    ];
    
    container.innerHTML = `
        <h3 style="text-align: center; margin-bottom: 1rem;">🏆 Top 10</h3>
        ${players.slice(0, 10).map((p, i) => `
            <div style="display: flex; align-items: center; padding: 0.8rem; margin: 0.3rem 0; background: var(--light-gray); border-radius: 12px; ${i === 0 ? 'border-left: 4px solid gold;' : i === 1 ? 'border-left: 4px solid silver;' : i === 2 ? 'border-left: 4px solid #cd7f32;' : ''}">
                <span style="font-weight: bold; min-width: 40px;">#${i+1}</span>
                <span style="flex: 1; font-weight: 600;">${p.name}</span>
                <span style="font-weight: bold; color: var(--senegal-green); margin-right: 1rem;">${p.score} pts</span>
                <span style="background: var(--senegal-green); color: white; padding: 0.2rem 0.5rem; border-radius: 20px; font-size: 0.8rem;">Niv.${p.level}</span>
            </div>
        `).join('')}
    `;
}

// ==================== VISUALISATION DE DONNÉES ====================
function initDataVisualization() {
    if (typeof Chart === 'undefined') return;
    
    const attackChart = document.getElementById('attackChart');
    if (attackChart) {
        new Chart(attackChart, {
            type: 'doughnut',
            data: {
                labels: ['Email', 'SMS', 'Réseaux', 'Téléphone', 'Faux sites'],
                datasets: [{
                    data: [45, 20, 25, 10, 35],
                    backgroundColor: ['#00853F', '#FCD116', '#E31B23', '#FF9800', '#9C27B0']
                }]
            }
        });
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type) {
    if (window.notificationSystem) {
        window.notificationSystem.showInApp(message, type);
    }
}

// ==================== BOUTON PANIQUE ====================
function initPanicButton() {
    const panicBtn = document.getElementById('panicButton');
    if (!panicBtn) return;
    
    panicBtn.addEventListener('click', () => {
        if (confirm('⚠️ Attention ! Cela va effacer toutes vos données. Continuer ?')) {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(c => {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            window.location.href = 'https://www.google.com';
        }
    });
}

// ==================== BOUTON STATISTIQUES ====================
function initStatsButton() {
    const statsBtn = document.getElementById('statsButton');
    if (!statsBtn) return;
    
    statsBtn.addEventListener('click', () => {
        if (!window.behaviorAnalyzer) {
            window.behaviorAnalyzer = new BehaviorAnalyzer();
        }
        const stats = window.behaviorAnalyzer.getStats();
        
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--card-bg);
            padding: 2rem;
            border-radius: 32px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            border: 2px solid var(--senegal-green);
            animation: slideDown 0.3s ease;
        `;
        
        popup.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <i class="fas fa-chart-line" style="font-size: 3rem; color: var(--senegal-green);"></i>
                <h3 style="margin: 0.5rem 0;">Mes statistiques</h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <div style="background: var(--light-gray); padding: 1rem; border-radius: 16px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--senegal-green);">${stats.totalActions || 0}</div>
                    <div style="font-size: 0.85rem;">Actions</div>
                </div>
                <div style="background: var(--light-gray); padding: 1rem; border-radius: 16px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--senegal-green);">${stats.suspiciousClicks || 0}</div>
                    <div style="font-size: 0.85rem;">URLs suspectes</div>
                </div>
                <div style="background: var(--light-gray); padding: 1rem; border-radius: 16px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--senegal-green);">${stats.sqlAttempts || 0}</div>
                    <div style="font-size: 0.85rem;">Tests SQL</div>
                </div>
                <div style="background: var(--light-gray); padding: 1rem; border-radius: 16px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--senegal-green);">${window.progressSystem?.level || 1}</div>
                    <div style="font-size: 0.85rem;">Niveau</div>
                </div>
            </div>
            <div style="margin-top: 1.5rem; text-align: center;">
                <button id="closeStatsPopup" style="
                    background: var(--senegal-green);
                    color: white;
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 30px;
                    font-weight: 600;
                    cursor: pointer;
                ">Fermer</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        document.getElementById('closeStatsPopup').addEventListener('click', () => {
            popup.remove();
        });
        
        popup.addEventListener('click', (e) => {
            if (e.target === popup) popup.remove();
        });
    });
}

// ==================== CHAT SÉCURISÉ ====================
class SecureChat {
    constructor() {
        this.messages = [];
        this.isActive = false;
    }
    
    start() {
        this.isActive = true;
        this.render();
    }
    
    sendMessage(text, userId = 'anonymous') {
        if (!text.trim()) return;
        
        const isSuspicious = this.detectSuspiciousMessage(text);
        
        const message = {
            id: Date.now(),
            userId: userId,
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSuspicious: isSuspicious
        };
        
        this.messages.push(message);
        this.render();
        
        if (isSuspicious) {
            showNotification('⚠️ Message suspect détecté !', 'warning');
        }
    }
    
    detectSuspiciousMessage(text) {
        const lower = text.toLowerCase();
        const patterns = ['mot de passe', 'password', 'mdp', 'carte', 'cb', 'code secret', 'rib', 'compte', 'identifiant', 'login', 'email', 'argent', 'virement'];
        return patterns.some(p => lower.includes(p));
    }
    
    render() {
        let chatContainer = document.getElementById('secureChat');
        if (!chatContainer) {
            chatContainer = document.createElement('div');
            chatContainer.id = 'secureChat';
            document.body.appendChild(chatContainer);
        }
        
        chatContainer.style.cssText = `
            position: fixed;
            bottom: 230px;
            right: 20px;
            width: 320px;
            height: 450px;
            background: var(--card-bg);
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: ${this.isActive ? 'flex' : 'none'};
            flex-direction: column;
            overflow: hidden;
            z-index: 9997;
            border: 2px solid var(--senegal-green);
            animation: slideInRight 0.3s ease;
        `;
        
        if (!this.isActive) return;
        
        chatContainer.innerHTML = `
            <div style="
                background: var(--senegal-green);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-shield"></i>
                    <span style="font-weight: 600;">Chat sécurisé</span>
                </div>
                <button id="closeChat" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="chatMessages" style="
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                background: var(--light-gray);
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            ">
                ${this.messages.length === 0 ? `
                    <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                        <i class="fas fa-comment-dots" style="font-size: 2rem; opacity: 0.5;"></i>
                        <p>Aucun message</p>
                    </div>
                ` : this.messages.map(m => `
                    <div style="
                        align-self: ${m.userId === 'me' ? 'flex-end' : 'flex-start'};
                        max-width: 80%;
                    ">
                        <div style="
                            background: ${m.userId === 'me' ? 'var(--senegal-green)' : 'var(--card-bg)'};
                            color: ${m.userId === 'me' ? 'white' : 'var(--text-primary)'};
                            padding: 0.5rem 1rem;
                            border-radius: 18px;
                            ${m.userId === 'me' ? 'border-bottom-right-radius: 4px;' : 'border-bottom-left-radius: 4px;'}
                            ${m.isSuspicious ? 'border: 2px solid var(--senegal-red);' : ''}
                        ">
                            ${m.isSuspicious ? '⚠️ ' : ''}${m.text}
                        </div>
                        <div style="font-size: 0.7rem; color: var(--text-secondary); margin-top: 0.2rem; text-align: ${m.userId === 'me' ? 'right' : 'left'};">
                            ${m.timestamp}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="
                padding: 1rem;
                border-top: 1px solid var(--light-gray);
                display: flex;
                gap: 0.5rem;
                background: var(--card-bg);
            ">
                <input type="text" id="chatInput" placeholder="Votre message..." style="
                    flex: 1;
                    padding: 0.8rem;
                    border: 2px solid var(--light-gray);
                    border-radius: 24px;
                    background: var(--light-gray);
                    color: var(--text-primary);
                ">
                <button id="sendChatMessage" style="
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: var(--senegal-green);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        document.getElementById('closeChat')?.addEventListener('click', () => {
            this.isActive = false;
            chatContainer.style.display = 'none';
        });
        
        const sendBtn = document.getElementById('sendChatMessage');
        const input = document.getElementById('chatInput');
        
        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage(input.value, 'me');
                input.value = '';
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage(input.value, 'me');
                    input.value = '';
                }
            });
        }
        
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function initChatButton() {
    const chatBtn = document.getElementById('chatButton');
    if (!chatBtn) return;
    
    let chat = null;
    
    chatBtn.addEventListener('click', () => {
        if (!chat) {
            chat = new SecureChat();
        }
        
        const existingChat = document.getElementById('secureChat');
        if (existingChat && existingChat.style.display !== 'none') {
            existingChat.style.display = 'none';
            chat.isActive = false;
        } else {
            chat.start();
        }
    });
}

// ==================== BOUTON RETOUR EN HAUT ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== GESTIONNAIRE DE CERTIFICAT ====================
document.addEventListener('click', function(e) {
    if (e.target.id === 'generateCertBtn' || e.target.closest('#generateCertBtn')) {
        const certBtn = document.getElementById('generateCertBtn');
        if (!certBtn || certBtn.disabled) return;
        
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            alert('Bibliothèque jsPDF non chargée');
            return;
        }
        
        const doc = new jsPDF();
        const name = document.getElementById('userName')?.value.trim() || 'Utilisateur SafeWeb';
        
        doc.setFillColor(0,133,63); doc.rect(0,0,210,40,'F');
        doc.setFillColor(252,209,22); doc.rect(0,40,210,20,'F');
        doc.setFillColor(227,27,35); doc.rect(0,60,210,20,'F');
        doc.setTextColor(255,255,255); doc.setFontSize(26); doc.text('SafeWeb',70,30);
        doc.setTextColor(0,0,0); doc.setFontSize(20); doc.text('Certificat de sensibilisation',40,90);
        doc.setFontSize(16); doc.text(`Décerné à : ${name}`,40,120);
        doc.text(`Score : ${score || 0}/8`,40,140);
        doc.save('certificat_safeweb.pdf');
    }
});

// ==================== STYLES DYNAMIQUES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, -50%); opacity: 1; }
    }
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--senegal-green);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
    }
    .back-to-top.visible {
        opacity: 1;
        pointer-events: auto;
    }
`;
document.head.appendChild(style);