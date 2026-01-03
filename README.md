# 🏰 ZELIG - Digital Morocco

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg) ![Stack](https://img.shields.io/badge/stack-FastAPI%20%7C%20React%20%7C%20LangChain-orange)

**Zelig** is a next-generation "Tourism 4.0" intelligent assistant designed to transform the travel experience in Morocco. By combining Retrieval-Augmented Generation (RAG), real-time data analysis, and cultural immersion tools, Zelig offers a personalized, safe, and deeply engaging guide for travelers.

---

## ✨ Key Features

### 🧠 1. Royal Guide AI (Hybrid RAG)
Interact with **Zelig**, an expert conversational assistant specialized in Moroccan history, culture, and logistics.
*   **RAG Technology**: Grounds responses in a verified knowledge base to ensure accuracy and reduce hallucinations.
*   **Hybrid Engine**: Utilizes local embeddings (HuggingFace) for speed and privacy, paired with Google Gemini for high-quality natural language generation.
*   **Persistent Memory**: Remembers your conversation context using ChromaDB vector storage.

### 🛡️ 2. Live Safety Agent
Travel with peace of mind using our autonomous security monitoring system.
*   **Real-time Scanning**: Continuously monitors local news sources via DuckDuckGo.
*   **Semantic Analysis**: Detects potential disruptions (weather, protests, traffic) specific to your location.
*   **Risk Scoring**: Provides an instant vigilance level (Green/Orange/Red) with contextual safety advice.

### 🗣️ 3. Terjman (Cultural Translator)
Bridge the language barrier with a translator designed for local interaction.
*   **English ↔ Darija**: Specialized translation for Moroccan Arabic to help you connect with locals.
*   **Cultural Context**: Optimized for daily travel scenarios (souks, transport, dining).

### 🗺️ 4. Interactive Trip Planner
*   **Curated Tours**: Explore pre-designed itineraries like the "Imperial Cities," "Desert Route," or "Blue North."
*   **Personal Travel Journal**: Save your discoveries and memories locally in your browser.

---

## 🛠️ Technical Architecture

The project follows a modern microservices architecture, splitting the backend logic from the frontend presentation.

### Backend (`/backend`)
*   **Core**: Python 3.12+ with FastAPI.
*   **AI Orchestration**: LangChain 0.3 (Modern Stack).
*   **Vector Store**: ChromaDB (Local persistent storage).
*   **Models**:
    *   LLM: `gemini-2.5-flash` (Google).
    *   Embeddings: `all-MiniLM-L6-v2` (HuggingFace).

### Frontend (`/frontend`)
*   **Framework**: React 18 + Vite.
*   **Styling**: Tailwind CSS with a custom "Kech" design system.
*   **Icons**: Lucide React.
*   **Visualization**: React Markdown for rich AI response rendering.

---

## 🚀 Getting Started

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   Google API Key (AI Studio)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment
# Create a .env file and add your key:
# GOOGLE_API_KEY=your_api_key_here
```

Start the API server:
```bash
uvicorn main:app --reload --port 8001
```
*The backend runs at `http://localhost:8001`.*

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*View the application at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
zelig-tourisme/
├── backend/
│   ├── data/
│   │   ├── knowledge_base.json  # Tourism knowledge source
│   │   └── chroma_db/           # Vector embeddings storage
│   ├── rag_engine.py            # LangChain RAG logic
│   ├── security_agent.py        # Real-time safety analysis
│   ├── translator.py            # Translation service
│   ├── main.py                  # FastAPI entry point
│   └── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── services/            # API integration
│   │   ├── App.jsx              # Main React Component
│   │   └── index.css            # Tailwind & Theme styles
│   ├── tailwind.config.js       # Design tokens (Colors, Typography)
│   └── package.json             # Node dependencies
│
└── README.md
```

---

## 👨‍💻 Credits

**Abdelouahed Tahri**
*   École Centrale Casablanca
*   *Advanced Software Development & AI Project*

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
