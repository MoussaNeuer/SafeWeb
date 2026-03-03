# SafeWeb · Application Éducative de Cybersécurité 🇸🇳

![Version](https://img.shields.io/badge/version-2.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Made in Senegal](https://img.shields.io/badge/made%20in-Sénégal-green)

<p align="center">
  <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="SafeWeb Banner" width="600">
</p>

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Démo en ligne](#-démo-en-ligne)
- [Capture d'écran](#-capture-décran)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Déploiement sur GitHub Pages](#-déploiement-sur-github-pages)
- [Structure du projet](#-structure-du-projet)
- [Guide d'utilisation](#-guide-dutilisation)
- [Fonctionnalités JavaScript détaillées](#-fonctionnalités-javascript-détaillées)
- [Badges et progression](#-badges-et-progression)
- [Compatibilité](#-compatibilité)
- [Contribution](#-contribution)
- [Auteur](#-auteur)
- [Licence](#-licence)
- [Remerciements](#-remerciements)

---
## Structure du projet 
`text
safeweb/
│
├── index.html              # Page principale
├── style.css               # Styles complets
├── script.js                # Toutes les fonctionnalités JS
│
├── assets/
│   ├── images/             # Images et captures d'écran
│   │   └── screenshot.png
│   ├── icons/              # Icônes personnalisées
│   └── videos/             # Vidéos (optionnel)
│
├── README.md                # Documentation
├── LICENSE                  # Licence MIT
└── .gitignore               # Fichiers à ignorer


## 🎯 À propos

**SafeWeb** est une application web éducative interactive conçue pour sensibiliser le grand public, les étudiants et les développeurs aux dangers de la cybersécurité, en particulier le **phishing** et les **injections SQL**.

Créée par **Moussa LO** en 2026, cette plateforme 100% frontend utilise les couleurs du Sénégal (vert, jaune, rouge) et propose une expérience d'apprentissage ludique et sans risque. **Aucune donnée personnelle n'est collectée ou stockée** - tout se passe dans votre navigateur.

### 🎓 Public cible
- Étudiants en informatique
- Développeurs web débutants
- Utilisateurs internet non techniques
- Grand public souhaitant se sensibiliser

---

## ✨ Fonctionnalités

### 📱 **Interface moderne et responsive**
- Design mobile-first adapté à tous les écrans
- Mode sombre/clair avec mémorisation
- Animations fluides au scroll (AOS)
- Navigation intuitive avec menu burger

### 🎣 **Module Phishing**
- Exemples concrets sur 6 plateformes (Instagram, Facebook, Snapchat, Twitter, TikTok, LinkedIn)
- Détecteur d'URL suspectes avec score de risque
- Analyse de texte pour détecter les messages frauduleux
- Mini-jeu "Trouvez le phishing" avec vies et niveaux

### 💾 **Module Injection SQL**
- Simulateur d'injection SQL sans base de données
- Visualisation de la requête en temps réel
- Explication pédagogique du fonctionnement

### 🔐 **Outils de sécurité**
- Générateur de mots de passe forts personnalisable
- Analyseur de force de mot de passe en temps réel
- Simulateur d'authentification à deux facteurs (2FA)
- Défis express quotidiens

### 📊 **Système de gamification**
- **XP et niveaux** : Gagnez de l'expérience en utilisant les fonctionnalités
- **Badges** : Collectionnez des badges pour vos accomplissements
- **Classement** : Comparez votre progression avec la communauté
- **NFTs de sensibilisation** : Obtenez des NFTs uniques pour chaque étape franchie

### 🎮 **Mini-jeu interactif**
- Identifiez les messages de phishing en un temps limité
- 3 vies par niveau, 5 niveaux de difficulté
- Scores et classement

### 📈 **Visualisation de données**
- Graphiques animés des statistiques de menaces
- Évolution des attaques par plateforme
- Statistiques personnelles

### 📄 **Certificat PDF**
- Générez un certificat personnalisé après réussite du quiz
- Badge "Utilisateur sensibilisé" déblocable

### 💬 **Chat sécurisé (démonstration)**
- Chat qui détecte automatiquement les messages suspects
- Simulation de chiffrement
- Interface moderne

### 🚨 **Bouton panique**
- Efface toutes les données locales
- Redirection vers Google
- Double confirmation de sécurité

---

## 🌐 Démo en ligne

L'application est hébergée sur **GitHub Pages** et accessible ici :

👉 **[https://MoussaNeuer.github.io/safeweb](https://MoussaNeuer.github.io/safeweb)**

> *Remplacez "moussa-lo" par votre nom d'utilisateur GitHub*

---

## 📸 Capture d'écran

<p align="center">
  <img src="https://via.placeholder.com/800x400/00853F/FFFFFF?text=SafeWeb+Screenshot" alt="Capture d'écran SafeWeb" width="800">
</p>

*Ajoutez vos propres captures d'écran dans le dossier `/assets/images/`*

---

## 🛠 Technologies utilisées

| Technologie | Utilisation |
|------------|-------------|
| **HTML5** | Structure sémantique |
| **CSS3** | Styles, animations, responsive design |
| **JavaScript (ES6+)** | Toutes les fonctionnalités interactives |
| **Font Awesome 6** | Icônes vectorielles |
| **Google Fonts (Inter)** | Typographie moderne |
| **AOS (Animate on Scroll)** | Animations au scroll |
| **Swiper.js** | Carrousels tactiles |
| **Chart.js** | Graphiques animés |
| **jsPDF** | Génération de certificats PDF |
| **GitHub Pages** | Hébergement gratuit |

---

## 📦 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Git (optionnel, pour cloner)

### Étapes d'installation locale

1. **Cloner le dépôt**
```bash
git clone https://github.com/MoussaNeuer/safeweb.git
cd safeweb
