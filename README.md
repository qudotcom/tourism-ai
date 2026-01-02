Voici le contenu du fichier `README.md` au format brut. Vous pouvez copier ce bloc entier et le coller dans votre fichier `README.md` sur GitHub.

```markdown
# 🏰 ZELIG - Digital Morocco

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20React%20%7C%20LangChain-orange)

**ZELIG** est une plateforme d'assistance touristique intelligente de nouvelle génération (Tourisme 4.0). Elle combine l'Intelligence Artificielle Générative (RAG), l'analyse de données en temps réel et une immersion culturelle pour offrir un guide de voyage personnalisé et sécurisé au Maroc.

---

## ✨ Fonctionnalités Clés

### 🧠 1. Guide Royal IA (RAG Hybride)
* **Assistant conversationnel** expert du Maroc ("Zelig").
* **Technologie RAG (Retrieval-Augmented Generation)** : Combine une base de connaissances vérifiée (`knowledge_base.json`) avec la puissance générative de **Google Gemini**.
* **Moteur Hybride** : Utilise des **Embeddings locaux** (HuggingFace) pour la rapidité et la confidentialité, et un LLM Cloud pour la génération de réponse.
* **Mémoire persistante** : Base de données vectorielle **ChromaDB**.

### 🛡️ 2. Sécurité Voyage Live (Agent Autonome)
* **Scan en temps réel** de la presse locale marocaine via **DuckDuckGo**.
* **Analyse sémantique** : Détecte les incidents (accidents, météo, manifestations) pour n'importe quelle ville.
* **Score de risque** : Génère un niveau de vigilance (Vert/Orange/Rouge) et des conseils contextuels.

### 🗣️ 3. Terjman (Traducteur Culturel)
* Traduction instantanée de l'**Anglais vers la Darija** (Arabe Marocain).
* Conçu pour faciliter les interactions locales.

### 🗺️ 4. Le Grand Tour & Carnet
* Itinéraires touristiques interactifs (Villes Impériales, Désert, Nord).
* Carnet de voyage personnel avec sauvegarde locale (LocalStorage).

---

## 🛠️ Architecture Technique

Le projet est divisé en deux parties : un **Backend** (API Python) et un **Frontend** (React).

### Backend (`/backend`)
* **Langage** : Python 3.12+
* **Framework API** : FastAPI + Uvicorn
* **Orchestration IA** : LangChain 0.3 (Modern Stack)
* **Vector Store** : ChromaDB (Local)
* **Modèles** :
    * LLM : `gemini-2.5-flash` (Google)
    * Embeddings : `all-MiniLM-L6-v2` (HuggingFace)
* **Outils** : DuckDuckGo Search, DeepTranslator

### Frontend (`/frontend`)
* **Framework** : React 18 + Vite
* **Styling** : Tailwind CSS (Design System "Kech" personnalisé)
* **UI Components** : Lucide React
* **Rendu** : React Markdown (Affichage riche des réponses IA)

---

## 🚀 Installation et Démarrage

### Prérequis
* Python 3.10 ou supérieur
* Node.js 18 ou supérieur
* Une clé API Google (AI Studio)

### 1. Configuration du Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # (Sur Windows: venv\Scripts\activate)

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
# Créer un fichier .env et ajouter :
# GOOGLE_API_KEY=votre_cle_ici

```

**Démarrer le serveur API :**

```bash
uvicorn main:app --reload --port 8001

```

*Le backend sera accessible sur `http://localhost:8001`.*

### 2. Configuration du Frontend

Ouvrez un nouveau terminal :

```bash
cd frontend

# Installer les paquets
npm install

# Démarrer l'interface
npm run dev

```

*L'application sera accessible sur `http://localhost:5173`.*

---

## 📂 Structure du Projet

```text
zelig-tourisme/
├── backend/
│   ├── data/
│   │   ├── knowledge_base.json  # Base de données touristique brute
│   │   └── chroma_db/           # Base vectorielle générée (Embeddings)
│   ├── rag_engine.py            # Moteur RAG (LangChain + Chroma)
│   ├── security_agent.py        # Agent de sécurité (DuckDuckGo)
│   ├── translator.py            # Service de traduction
│   ├── main.py                  # API FastAPI
│   └── requirements.txt         # Dépendances Python
│
├── frontend/
│   ├── src/
│   │   ├── services/            # Appels API vers le backend
│   │   ├── App.jsx              # Application React principale
│   │   └── index.css            # Styles Tailwind globaux
│   ├── tailwind.config.js       # Configuration du thème (Couleurs Kech/Zellige)
│   └── package.json             # Dépendances Node
│
└── README.md

```

---

## 👨‍💻 Auteur & Crédits

**Abdelouahed Tahri**

* **École Centrale Casablanca**
* *Projet de développement logiciel avancé & IA.*

---

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

```

```