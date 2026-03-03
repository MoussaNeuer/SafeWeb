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
    initSecureChat();
    initSecurityNFT();
});

// ==================== FONCTIONS D'INITIALISATION ====================

function initAOS() {
    AOS.init({
        duration: 600,
        once: true,
        offset: 50,
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle) {
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

// ==================== SWIPER CARROUSEL ====================
function initSwiper() {
    if (document.querySelector('.social-swiper')) {
        new Swiper('.social-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
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
        
        // Track l'action pour l'analyse comportementale
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
        
        // Échapper les caractères pour l'affichage
        const safeUser = user.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safePass = pass.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        const query = `SELECT * FROM users WHERE username = '${safeUser}' AND password = '${safePass}';`;
        
        let html = `<i class="fas fa-code"></i> Requête simulée :<br><strong>${query}</strong><br>`;
        
        if (pass.includes("' OR '1'='1") || pass.includes("' OR 1=1") || 
            user.includes("' OR '1'='1") || user.includes("' OR 1=1")) {
            html += `<br><span style="color: #ff8a8a; font-weight: bold;">➡️ INJECTION RÉUSSIE ! L'attaquant contourne l'authentification.</span>`;
            html += `<br><span style="color: #fff; background: #e31b23; padding: 0.3rem 0.8rem; border-radius: 20px; display: inline-block; margin-top: 0.5rem;">⚠️ Ne jamais utiliser cette technique en vrai !</span>`;
        } else {
            html += `<br><span style="color: #8aff8a;">➡️ Requête normale (aucune injection détectée).</span>`;
        }
        
        sqlResult.innerHTML = html;
        
        // Track pour analyse
        if (window.behaviorAnalyzer) {
            window.behaviorAnalyzer.trackAction({
                type: 'sql_test',
                injection: pass.includes("' OR ") || user.includes("' OR "),
                timestamp: Date.now()
            });
        }
    });
}

// ==================== GÉNÉRATEUR DE MOTS DE PASSE FORTS ====================
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
        
        // Garantir au moins un de chaque type
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        // Compléter jusqu'à 16 caractères
        for (let i = 4; i < 16; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // Mélanger le mot de passe
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    generateBtn.addEventListener('click', () => {
        const newPassword = generateStrongPassword();
        passwordDisplay.textContent = newPassword;
        
        // Copie automatique dans le presse-papier
        navigator.clipboard.writeText(newPassword).then(() => {
            showNotification('✅ Mot de passe copié dans le presse-papier', 'success');
        });
        
        // Analyser la force
        const strength = analyzePasswordStrength(newPassword);
        updatePasswordStrengthIndicator(strength);
    });
}

// ==================== ANALYSEUR DE FORCE DE MOT DE PASSE ====================
function initPasswordStrengthChecker() {
    // Ajouter un champ de test si nécessaire
    const container = document.querySelector('.feature-card:has(.password-display)');
    if (!container) return;
    
    const strengthDiv = document.createElement('div');
    strengthDiv.id = 'passwordStrength';
    strengthDiv.className = 'password-strength';
    strengthDiv.style.marginTop = '1rem';
    container.querySelector('.feature-demo').appendChild(strengthDiv);
    
    // Observer les changements de mot de passe
    const passwordDisplay = document.getElementById('passwordDisplay');
    if (passwordDisplay) {
        const observer = new MutationObserver(() => {
            const strength = analyzePasswordStrength(passwordDisplay.textContent);
            updatePasswordStrengthIndicator(strength);
        });
        observer.observe(passwordDisplay, { childList: true, characterData: true, subtree: true });
    }
}

function analyzePasswordStrength(password) {
    const criteria = [
        { test: p => p.length >= 12, name: 'Longueur (≥12)', points: 20 },
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
        <div style="background: #f0f0f0; border-radius: 10px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Force: <strong style="color: ${strength.color}">${strength.level}</strong></span>
                <span>Score: ${strength.score}/100</span>
            </div>
            <div style="width: 100%; height: 8px; background: #ddd; border-radius: 4px; overflow: hidden;">
                <div style="width: ${strength.score}%; height: 100%; background: ${strength.color}; transition: width 0.3s;"></div>
            </div>
            ${strength.failed.length > 0 ? `
                <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                    <small>Améliorez: ${strength.failed.join(', ')}</small>
                </div>
            ` : ''}
        </div>
    `;
}

// ==================== SYSTÈME DE PROGRESSION/XP ====================
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
        this.showNotification(`🎉 FÉLICITATIONS ! Vous avez atteint le niveau ${this.level} !`, 'success');
        
        if (this.level === 5) this.unlockBadge('expert');
        if (this.level === 10) this.unlockBadge('master');
    }
    
    unlockBadge(badgeId) {
        const badges = {
            'expert': { name: 'Expert en cybersécurité', icon: '🏆' },
            'master': { name: 'Maître de la sécurité', icon: '👑' },
            'phishing_pro': { name: 'Chasseur de phishing', icon: '🎣' },
            'sql_master': { name: 'Maître SQL', icon: '💾' },
            'perfect_quiz': { name: 'Score parfait', icon: '💯' }
        };
        
        if (!this.badges.find(b => b.id === badgeId)) {
            this.badges.push({
                id: badgeId,
                ...badges[badgeId],
                date: new Date().toISOString()
            });
            this.showNotification(`🏆 Badge débloqué : ${badges[badgeId].name} !`, 'success');
        }
    }
    
    showXPGain(amount, source) {
        const xpPopup = document.createElement('div');
        xpPopup.className = 'xp-popup';
        xpPopup.innerHTML = `+${amount} XP (${source})`;
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
    
    // Ajouter l'affichage du niveau dans le header
    const hero = document.querySelector('.hero-stats');
    if (hero) {
        const levelSpan = document.createElement('span');
        levelSpan.id = 'levelDisplay';
        levelSpan.innerHTML = `<i class="fas fa-star"></i> Niveau ${window.progressSystem.level}`;
        hero.appendChild(levelSpan);
        
        window.progressSystem.subscribe((progress) => {
            levelSpan.innerHTML = `<i class="fas fa-star"></i> Niveau ${progress.level}`;
        });
    }
}

// ==================== MINI-JEU "TROUVE LE PHISHING" ====================
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
            { from: 'LinkedIn', message: 'Nouvelle offre d\'emploi', link: 'linkedin.com/jobs' },
            { from: 'Google', message: 'Code de vérification', link: 'accounts.google.com' },
            { from: 'Microsoft', message: 'Mise à jour de sécurité', link: 'microsoft.com/security' }
        ];
        
        const examples = isPhishing ? phishingExamples : legitExamples;
        const ex = examples[Math.floor(Math.random() * examples.length)];
        
        return {
            from: ex.from,
            message: ex.message,
            link: ex.link,
            isPhishing: isPhishing
        };
    }
    
    render() {
        const gameContainer = document.getElementById('phishingGame') || this.createGameContainer();
        gameContainer.innerHTML = `
            <div class="game-header">
                <span>❤️ ${this.lives}</span>
                <span>🎯 Score: ${this.score}</span>
                <span>📊 Niveau: ${this.level}</span>
            </div>
            <div class="game-grid">
                ${this.currentItems.map((item, index) => `
                    <div class="game-card ${item.analyzed ? 'analyzed' : ''}" data-id="${item.id}">
                        <div class="game-from">${item.content.from}</div>
                        <div class="game-message">${item.content.message}</div>
                        <div class="game-link ${item.content.isPhishing ? 'suspect' : 'safe'}">${item.content.link}</div>
                        ${!item.analyzed ? `
                            <div class="game-actions">
                                <button class="btn-small game-phishing" data-id="${item.id}">🎣 Phishing</button>
                                <button class="btn-small game-safe" data-id="${item.id}">✅ Légitime</button>
                            </div>
                        ` : `
                            <div class="game-result ${item.userCorrect ? 'correct' : 'incorrect'}">
                                ${item.userCorrect ? '✅ Correct' : '❌ Faux'}
                            </div>
                        `}
                    </div>
                `).join('')}
            </div>
            ${this.currentItems.every(i => i.analyzed) ? `
                <div class="game-next">
                    <button class="btn-primary" id="nextLevelBtn">Niveau suivant</button>
                </div>
            ` : ''}
        `;
        
        // Ajouter les événements
        gameContainer.querySelectorAll('.game-phishing').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e.target.dataset.id, true));
        });
        
        gameContainer.querySelectorAll('.game-safe').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e.target.dataset.id, false));
        });
        
        const nextBtn = document.getElementById('nextLevelBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextLevel());
        }
    }
    
    checkAnswer(itemId, guessedPhishing) {
        const item = this.currentItems.find(i => i.id == itemId);
        if (item.analyzed) return;
        
        const correct = (guessedPhishing === item.content.isPhishing);
        item.analyzed = true;
        item.userCorrect = correct;
        
        if (correct) {
            this.score += 10;
            window.progressSystem?.addXP(5, 'phishing_game');
        } else {
            this.lives--;
        }
        
        this.render();
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    nextLevel() {
        this.level++;
        this.generateItems();
        this.render();
    }
    
    gameOver() {
        this.gameActive = false;
        const gameContainer = document.getElementById('phishingGame');
        gameContainer.innerHTML = `
            <div class="game-over">
                <h3>Jeu terminé !</h3>
                <p>Score final: ${this.score}</p>
                <p>Niveau atteint: ${this.level}</p>
                <button class="btn-primary" id="restartGameBtn">Rejouer</button>
            </div>
        `;
        
        document.getElementById('restartGameBtn')?.addEventListener('click', () => this.start());
        
        if (this.score >= 50) {
            window.progressSystem?.unlockBadge('phishing_pro');
        }
    }
    
    createGameContainer() {
        const section = document.querySelector('#features')?.parentNode;
        if (!section) return null;
        
        const gameSection = document.createElement('section');
        gameSection.id = 'phishingGame';
        gameSection.className = 'section alt-bg';
        gameSection.innerHTML = '<div class="container"></div>';
        
        section.parentNode.insertBefore(gameSection, section.nextSibling);
        return gameSection.querySelector('.container');
    }
}

function initPhishingGame() {
    const gameBtn = document.createElement('button');
    gameBtn.className = 'btn-primary';
    gameBtn.innerHTML = '<i class="fas fa-gamepad"></i> Jouer au mini-jeu';
    gameBtn.style.margin = '2rem auto';
    gameBtn.style.display = 'block';
    
    const features = document.getElementById('features');
    if (features) {
        features.querySelector('.container').appendChild(gameBtn);
        
        const game = new PhishingGame();
        gameBtn.addEventListener('click', () => {
            game.start();
            gameBtn.style.display = 'none';
        });
    }
}

// ==================== CLASSEMENT ET BADGES ====================
class Leaderboard {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('leaderboard')) || [];
    }
    
    addScore(playerName, score) {
        this.players.push({
            name: playerName,
            score: score,
            level: window.progressSystem?.level || 1,
            badges: window.progressSystem?.badges.length || 0,
            date: new Date().toISOString()
        });
        
        this.players.sort((a, b) => b.score - a.score);
        this.players = this.players.slice(0, 50);
        localStorage.setItem('leaderboard', JSON.stringify(this.players));
    }
    
    render() {
        const container = document.getElementById('leaderboardContainer');
        if (!container) return;
        
        let html = '<h3>🏆 Top 10</h3><div class="leaderboard-list">';
        this.players.slice(0, 10).forEach((p, i) => {
            html += `
                <div class="leaderboard-item ${i < 3 ? 'top-' + (i+1) : ''}">
                    <span class="rank">#${i+1}</span>
                    <span class="name">${p.name}</span>
                    <span class="score">${p.score} pts</span>
                    <span class="level">Niv.${p.level}</span>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }
}

function initLeaderboard() {
    const badgeContainer = document.querySelector('.badge-container');
    if (!badgeContainer) return;
    
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.id = 'leaderboardContainer';
    leaderboardDiv.className = 'leaderboard';
    leaderboardDiv.style.marginTop = '2rem';
    leaderboardDiv.style.padding = '1.5rem';
    leaderboardDiv.style.background = 'var(--card-bg)';
    leaderboardDiv.style.borderRadius = '24px';
    
    badgeContainer.parentNode.insertBefore(leaderboardDiv, badgeContainer.nextSibling);
    
    window.leaderboard = new Leaderboard();
    window.leaderboard.render();
}

// ==================== VISUALISATION DE DONNÉES ====================
function initDataVisualization() {
    const vizContainer = document.createElement('div');
    vizContainer.id = 'dataViz';
    vizContainer.className = 'section';
    vizContainer.innerHTML = `
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Statistiques</span>
                <h2>Visualisation des menaces</h2>
                <p class="section-desc">Répartition des attaques par type</p>
            </div>
            <canvas id="phishingChart" width="400" height="200"></canvas>
        </div>
    `;
    
    const quiz = document.getElementById('quiz');
    if (quiz) {
        quiz.parentNode.insertBefore(vizContainer, quiz.nextSibling);
        drawChart();
    }
}

function drawChart() {
    const canvas = document.getElementById('phishingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Données simulées
    const data = {
        labels: ['Email', 'SMS', 'Réseaux sociaux', 'Téléphone', 'Faux sites'],
        values: [45, 20, 25, 10, 35]
    };
    
    const colors = ['#00853F', '#FCD116', '#E31B23', '#FF9800', '#9C27B0'];
    
    // Animation
    let progress = 0;
    
    function animate() {
        if (progress < 1) {
            progress += 0.02;
            drawBars(progress);
            requestAnimationFrame(animate);
        }
    }
    
    function drawBars(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = 40;
        const startX = 50;
        const maxHeight = 150;
        
        data.values.forEach((value, i) => {
            const height = (value * progress) * 3;
            const x = startX + i * 60;
            const y = canvas.height - height - 30;
            
            // Barre
            ctx.fillStyle = colors[i];
            ctx.fillRect(x, y, barWidth, height);
            
            // Label
            ctx.fillStyle = 'var(--text-primary)';
            ctx.font = '12px Inter';
            ctx.fillText(data.labels[i], x, canvas.height - 10);
            
            // Valeur
            ctx.fillStyle = colors[i];
            ctx.font = 'bold 12px Inter';
            ctx.fillText(value, x + 10, y - 5);
        });
    }
    
    animate();
}

// ==================== NOTIFICATIONS EN DIRECT ====================
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.container = this.createContainer();
        this.permission = Notification.permission;
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
        const id = Date.now();
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: ${type === 'success' ? 'var(--senegal-green)' : 
                         type === 'warning' ? 'var(--senegal-yellow)' : 
                         type === 'danger' ? 'var(--senegal-red)' : 
                         'var(--dark-gray)'};
            color: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                ${this.getIcon(type)}
                <div style="flex: 1;">${message}</div>
                <i class="fas fa-times" style="opacity: 0.7;"></i>
            </div>
            <div class="notification-progress" style="position: absolute; bottom: 0; left: 0; height: 3px; background: rgba(255,255,255,0.5); width: 100%;"></div>
        `;
        
        notification.addEventListener('click', () => notification.remove());
        
        this.container.appendChild(notification);
        
        // Barre de progression
        const progress = notification.querySelector('.notification-progress');
        let width = 100;
        const interval = setInterval(() => {
            width -= 1;
            progress.style.width = width + '%';
            if (width <= 0) {
                clearInterval(interval);
                notification.remove();
            }
        }, 50);
        
        this.notifications.push({ id, message, type });
    }
    
    getIcon(type) {
        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            danger: '<i class="fas fa-times-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };
        return icons[type] || icons.info;
    }
    
    async requestPermission() {
        if ('Notification' in window) {
            this.permission = await Notification.requestPermission();
        }
    }
    
    sendSystemNotification(title, options) {
        if (this.permission === 'granted') {
            new Notification(title, options);
        }
    }
}

function initNotifications() {
    window.notificationSystem = new NotificationSystem();
    
    // Exemple de notification de bienvenue
    setTimeout(() => {
        window.notificationSystem.showInApp('👋 Bienvenue sur SafeWeb !', 'info');
    }, 2000);
}

// ==================== BOUTON PANIQUE ====================
function initPanicButton() {
    const panicBtn = document.createElement('button');
    panicBtn.id = 'panicButton';
    panicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    panicBtn.title = "Bouton panique - Efface toutes les données";
    panicBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--senegal-red);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(227,27,35,0.3);
        z-index: 9998;
        font-size: 1.5rem;
        transition: transform 0.3s;
    `;
    
    panicBtn.addEventListener('mouseenter', () => {
        panicBtn.style.transform = 'scale(1.1)';
    });
    
    panicBtn.addEventListener('mouseleave', () => {
        panicBtn.style.transform = 'scale(1)';
    });
    
    panicBtn.addEventListener('click', () => {
        if (confirm('⚠️ Attention ! Cela va effacer toutes vos données locales. Continuer ?')) {
            activatePanicMode();
        }
    });
    
    document.body.appendChild(panicBtn);
}

function activatePanicMode() {
    // Effacer les données
    localStorage.clear();
    sessionStorage.clear();
    
    // Effacer les cookies
    document.cookie.split(";").forEach(c => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Rediriger vers Google
    window.location.href = 'https://www.google.com';
}

// ==================== ANALYSE DE COMPORTEMENT ====================
class BehaviorAnalyzer {
    constructor() {
        this.actions = [];
        this.riskyPatterns = [];
        this.loadActions();
    }
    
    loadActions() {
        const saved = localStorage.getItem('behavior_analysis');
        if (saved) {
            const data = JSON.parse(saved);
            this.actions = data.actions || [];
            this.riskyPatterns = data.riskyPatterns || [];
        }
    }
    
    saveActions() {
        localStorage.setItem('behavior_analysis', JSON.stringify({
            actions: this.actions.slice(-100), // Garde les 100 dernières actions
            riskyPatterns: this.riskyPatterns
        }));
    }
    
    trackAction(action) {
        this.actions.push(action);
        this.analyzeRiskyPatterns();
        this.saveActions();
    }
    
    analyzeRiskyPatterns() {
        this.riskyPatterns = [];
        
        // Détecter les clics répétés sur URLs suspectes
        const suspiciousClicks = this.actions.filter(a => 
            a.type === 'url_check' && a.riskScore > 50
        );
        if (suspiciousClicks.length > 5) {
            this.riskyPatterns.push({
                type: 'multiple_suspicious_clicks',
                severity: 'high',
                count: suspiciousClicks.length,
                recommendation: "🚨 Vous cliquez souvent sur des liens suspects. Utilisez toujours le détecteur d'abord !",
                date: new Date().toISOString()
            });
        }
        
        // Détecter les tentatives d'injection SQL
        const sqlAttempts = this.actions.filter(a => 
            a.type === 'sql_test' && a.injection === true
        );
        if (sqlAttempts.length > 3) {
            this.riskyPatterns.push({
                type: 'sql_curiosity',
                severity: 'medium',
                count: sqlAttempts.length,
                recommendation: "⚠️ Les injections SQL sont dangereuses en conditions réelles. Continuez à apprendre en simulation !",
                date: new Date().toISOString()
            });
        }
        
        // Afficher les alertes
        this.showAlerts();
    }
    
    showAlerts() {
        this.riskyPatterns.forEach(pattern => {
            if (pattern.severity === 'high') {
                window.notificationSystem?.showInApp(pattern.recommendation, 'danger');
            } else if (pattern.severity === 'medium') {
                window.notificationSystem?.showInApp(pattern.recommendation, 'warning');
            }
        });
    }
    
    getStats() {
        return {
            totalActions: this.actions.length,
            suspiciousClicks: this.actions.filter(a => a.type === 'url_check' && a.riskScore > 50).length,
            sqlAttempts: this.actions.filter(a => a.type === 'sql_test' && a.injection).length,
            riskyPatterns: this.riskyPatterns.length,
            lastActive: this.actions[this.actions.length - 1]?.timestamp || null
        };
    }
}

function initBehaviorAnalysis() {
    window.behaviorAnalyzer = new BehaviorAnalyzer();
    
    // Ajouter un bouton pour voir les statistiques
    const statsBtn = document.createElement('button');
    statsBtn.id = 'statsButton';
    statsBtn.innerHTML = '<i class="fas fa-chart-line"></i> Mes stats';
    statsBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 0.8rem 1.5rem;
        background: var(--senegal-green);
        color: white;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,133,63,0.3);
        z-index: 9998;
        font-weight: 600;
        transition: transform 0.3s;
    `;
    
    statsBtn.addEventListener('click', () => {
        const stats = window.behaviorAnalyzer.getStats();
        alert(`
📊 Vos statistiques :
━━━━━━━━━━━━━━━
Actions totales: ${stats.totalActions}
URLs suspectes: ${stats.suspiciousClicks}
Tests SQL: ${stats.sqlAttempts}
Alertes reçues: ${stats.riskyPatterns}
        `);
    });
    
    document.body.appendChild(statsBtn);
}

// ==================== CHAT SÉCURISÉ ====================
class SecureChat {
    constructor() {
        this.messages = [];
        this.users = new Map();
        this.isActive = false;
    }
    
    start() {
        this.isActive = true;
        this.render();
    }
    
    sendMessage(text, userId = 'anonymous') {
        if (!text.trim()) return;
        
        // Simuler une vérification de sécurité
        const isSuspicious = this.detectSuspiciousMessage(text);
        
        const message = {
            id: Date.now(),
            userId: userId,
            text: this.encrypt(text),
            originalText: text,
            timestamp: new Date().toLocaleTimeString(),
            isSuspicious: isSuspicious
        };
        
        this.messages.push(message);
        this.render();
        
        if (isSuspicious) {
            window.notificationSystem?.showInApp(
                '⚠️ Message suspect détecté ! Ne partagez jamais d\'informations personnelles.',
                'warning'
            );
        }
    }
    
    detectSuspiciousMessage(text) {
        const lower = text.toLowerCase();
        const patterns = [
            'mot de passe', 'password', 'mdp', 'carte bleue', 'cb', 
            'code secret', 'rib', 'compte bancaire', 'identifiant'
        ];
        return patterns.some(p => lower.includes(p));
    }
    
    encrypt(text) {
        // Simulation d'encryption (juste pour l'affichage)
        return '🔒 ' + text.split('').map(c => 
            Math.random() > 0.5 ? c : '*'
        ).join('');
    }
    
    render() {
        let chatContainer = document.getElementById('secureChat');
        if (!chatContainer) {
            chatContainer = document.createElement('div');
            chatContainer.id = 'secureChat';
            chatContainer.className = 'chat-container';
            chatContainer.style.cssText = `
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 300px;
                height: 400px;
                background: var(--card-bg);
                border-radius: 20px;
                box-shadow: var(--shadow-lg);
                display: none;
                flex-direction: column;
                overflow: hidden;
                z-index: 9997;
            `;
            document.body.appendChild(chatContainer);
        }
        
        chatContainer.style.display = this.isActive ? 'flex' : 'none';
        
        if (!this.isActive) return;
        
        chatContainer.innerHTML = `
            <div class="chat-header" style="
                background: var(--senegal-green);
                color: white;
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span><i class="fas fa-shield"></i> Chat sécurisé</span>
                <button id="closeChat" style="background: none; border: none; color: white; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="chat-messages" style="
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            ">
                ${this.messages.map(m => `
                    <div class="message ${m.userId === 'me' ? 'own' : ''}" style="
                        align-self: ${m.userId === 'me' ? 'flex-end' : 'flex-start'};
                        background: ${m.userId === 'me' ? 'var(--senegal-green)' : 'var(--light-gray)'};
                        color: ${m.userId === 'me' ? 'white' : 'var(--text-primary)'};
                        padding: 0.5rem 1rem;
                        border-radius: 15px;
                        max-width: 80%;
                        ${m.isSuspicious ? 'border: 2px solid var(--senegal-red);' : ''}
                    ">
                        <div class="message-text">${m.isSuspicious ? '⚠️ ' : ''}${m.text}</div>
                        <div class="message-time" style="font-size: 0.7rem; opacity: 0.7;">${m.timestamp}</div>
                    </div>
                `).join('')}
            </div>
            <div class="chat-input" style="
                padding: 1rem;
                border-top: 1px solid var(--light-gray);
                display: flex;
                gap: 0.5rem;
            ">
                <input type="text" id="chatInput" placeholder="Votre message..." style="
                    flex: 1;
                    padding: 0.5rem;
                    border: 2px solid var(--light-gray);
                    border-radius: 20px;
                    background: var(--card-bg);
                    color: var(--text-primary);
                ">
                <button id="sendChatMessage" style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--senegal-green);
                    color: white;
                    border: none;
                    cursor: pointer;
                ">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        document.getElementById('closeChat')?.addEventListener('click', () => {
            this.isActive = false;
            chatContainer.style.display = 'none';
        });
        
        document.getElementById('sendChatMessage')?.addEventListener('click', () => {
            const input = document.getElementById('chatInput');
            this.sendMessage(input.value, 'me');
            input.value = '';
        });
        
        // Auto-scroll
        const messagesDiv = chatContainer.querySelector('.chat-messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function initSecureChat() {
    const chatBtn = document.createElement('button');
    chatBtn.id = 'chatButton';
    chatBtn.innerHTML = '<i class="fas fa-comment"></i>';
    chatBtn.title = "Chat sécurisé (simulation)";
    chatBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--senegal-green);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,133,63,0.3);
        z-index: 9997;
        font-size: 1.2rem;
        transition: transform 0.3s;
    `;
    
    const chat = new SecureChat();
    
    chatBtn.addEventListener('click', () => {
        chat.start();
    });
    
    document.body.appendChild(chatBtn);
}

// ==================== NFT DE SENSIBILISATION ====================
class SecurityNFT {
    constructor() {
        this.nfts = JSON.parse(localStorage.getItem('safeweb_nfts')) || [];
    }
    
    mintNFT(achievement) {
        const nft = {
            id: this.generateId(),
            achievement: achievement,
            metadata: {
                name: this.getNFTName(achievement),
                description: this.getNFTDescription(achievement),
                image: this.generateImage(achievement),
                attributes: this.getAttributes(achievement),
                date: new Date().toISOString(),
                level: window.progressSystem?.level || 1
            }
        };
        
        this.nfts.push(nft);
        localStorage.setItem('safeweb_nfts', JSON.stringify(this.nfts));
        
        this.showNFTCelebration(nft);
        return nft;
    }
    
    generateId() {
        return 'NFT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }
    
    getNFTName(achievement) {
        const names = {
            'first_quiz': 'Premier pas en cybersécurité',
            'perfect_score': 'Maître du quiz',
            'phishing_hunter': 'Chasseur de phishing',
            'sql_master': 'Expert SQL',
            'level_5': 'Gardien niveau 5',
            'level_10': 'Légende vivante'
        };
        return names[achievement] || 'Collectionneur SafeWeb';
    }
    
    getNFTDescription(achievement) {
        const desc = {
            'first_quiz': 'A complété son premier quiz de sensibilisation',
            'perfect_score': 'A obtenu un score parfait au quiz',
            'phishing_hunter': 'A détecté 10 tentatives de phishing',
            'sql_master': 'Maîtrise les concepts d\'injection SQL',
            'level_5': 'A atteint le niveau 5 sur SafeWeb',
            'level_10': 'Membre d\'élite de la communauté SafeWeb'
        };
        return desc[achievement] || 'NFT commémoratif SafeWeb';
    }
    
    generateImage(achievement) {
        // Simule la génération d'une image SVG unique
        const colors = ['#00853F', '#FCD116', '#E31B23'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23${randomColor.substr(1)}'/%3E%3Ctext x='20' y='100' fill='white' font-size='20'%3E${achievement}%3C/text%3E%3C/svg%3E`;
    }
    
    getAttributes(achievement) {
        return [
            { trait_type: 'Achievement', value: achievement },
            { trait_type: 'Level', value: window.progressSystem?.level || 1 },
            { trait_type: 'Badges', value: window.progressSystem?.badges.length || 0 }
        ];
    }
    
    showNFTCelebration(nft) {
        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, var(--senegal-green), var(--senegal-yellow));
            color: white;
            padding: 2rem;
            border-radius: 50px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideDown 0.5s ease;
        `;
        celebration.innerHTML = `
            <i class="fas fa-crown" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>🎉 NFT Débloqué !</h3>
            <p><strong>${nft.metadata.name}</strong></p>
            <p style="font-size: 0.9rem; opacity: 0.9;">${nft.metadata.description}</p>
            <img src="${nft.metadata.image}" style="width: 100px; height: 100px; margin: 1rem auto; border-radius: 20px;">
            <button id="closeNFTCelebration" style="
                background: white;
                color: var(--senegal-green);
                border: none;
                padding: 0.5rem 2rem;
                border-radius: 30px;
                margin-top: 1rem;
                cursor: pointer;
                font-weight: bold;
            ">Collectionner</button>
        `;
        
        document.body.appendChild(celebration);
        
        document.getElementById('closeNFTCelebration')?.addEventListener('click', () => {
            celebration.remove();
        });
        
        setTimeout(() => celebration.remove(), 5000);
    }
    
    render() {
        let container = document.getElementById('nftContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'nftContainer';
            container.className = 'nft-grid';
            container.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin: 2rem 0;
            `;
            
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(container, footer);
            }
        }
        
        container.innerHTML = this.nfts.map(nft => `
            <div class="nft-card" style="
                background: var(--card-bg);
                border-radius: 16px;
                padding: 1rem;
                text-align: center;
                box-shadow: var(--shadow-md);
                border: 1px solid var(--light-gray);
            ">
                <img src="${nft.metadata.image}" style="width: 100%; border-radius: 12px; margin-bottom: 0.5rem;">
                <h4 style="font-size: 1rem; margin-bottom: 0.3rem;">${nft.metadata.name}</h4>
                <p style="font-size: 0.8rem; opacity: 0.7;">${new Date(nft.metadata.date).toLocaleDateString()}</p>
            </div>
        `).join('');
    }
}

function initSecurityNFT() {
    window.securityNFT = new SecurityNFT();
    
    // Débloquer des NFTs en fonction des actions
    document.addEventListener('quizCompleted', (e) => {
        if (e.detail.score === 100) {
            window.securityNFT.mintNFT('perfect_score');
        }
    });
    
    // Afficher la collection
    setTimeout(() => {
        window.securityNFT.render();
    }, 1000);
}

// ==================== FONCTIONS UTILITAIRES ====================

function showNotification(message, type = 'info') {
    if (window.notificationSystem) {
        window.notificationSystem.showInApp(message, type);
    } else {
        alert(message);
    }
}

// Styles CSS pour les animations
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
    
    .game-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .game-card {
        background: var(--card-bg);
        padding: 1.2rem;
        border-radius: 16px;
        box-shadow: var(--shadow-md);
        transition: transform 0.3s;
    }
    
    .game-card:hover {
        transform: translateY(-5px);
    }
    
    .game-from {
        font-weight: bold;
        color: var(--senegal-green);
    }
    
    .game-link {
        margin: 0.8rem 0;
        padding: 0.5rem;
        border-radius: 8px;
        background: var(--light-gray);
        word-break: break-all;
    }
    
    .game-link.suspect {
        border-left: 4px solid var(--senegal-red);
    }
    
    .game-link.safe {
        border-left: 4px solid var(--senegal-green);
    }
    
    .game-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .game-result {
        text-align: center;
        padding: 0.5rem;
        border-radius: 8px;
        font-weight: bold;
    }
    
    .game-result.correct {
        background: #00853f20;
        color: var(--senegal-green);
    }
    
    .game-result.incorrect {
        background: #e31b2320;
        color: var(--senegal-red);
    }
    
    .leaderboard-item {
        display: flex;
        align-items: center;
        padding: 0.8rem;
        margin: 0.3rem 0;
        background: var(--light-gray);
        border-radius: 12px;
        gap: 0.5rem;
    }
    
    .leaderboard-item.top-1 {
        background: linear-gradient(90deg, #ffd70020, var(--light-gray));
        border-left: 4px solid gold;
    }
    
    .leaderboard-item.top-2 {
        border-left: 4px solid silver;
    }
    
    .leaderboard-item.top-3 {
        border-left: 4px solid #cd7f32;
    }
    
    .rank {
        font-weight: bold;
        min-width: 40px;
    }
    
    .name {
        flex: 1;
        font-weight: 500;
    }
    
    .score {
        font-weight: bold;
        color: var(--senegal-green);
    }
    
    .level {
        background: var(--senegal-green);
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 20px;
        font-size: 0.8rem;
    }
`;

document.head.appendChild(style);