import os
import json
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        # Chemins absolus pour la stabilité
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.json_path = os.path.join(base_dir, "data", "knowledge_base.json")
        self.vector_db_path = os.path.join(base_dir, "data", "chroma_db")
        
        self.chain = None
        self.docs = []
        
        # 1. Chargement des données
        self._load_raw_data()
        
        try:
            if not self.docs:
                print("⚠️ Base de connaissances vide.")

            print("🧠 Initialisation du moteur RAG (Gemini 2.5)...")
            
            # --- IMPORTS MODERNES (LangChain 1.0+) ---
            from langchain_chroma import Chroma
            from langchain_huggingface import HuggingFaceEmbeddings
            from langchain_google_genai import ChatGoogleGenerativeAI
            from langchain_classic.chains import create_retrieval_chain
            from langchain_classic.chains.combine_documents import create_stuff_documents_chain
            from langchain_core.prompts import ChatPromptTemplate
            from langchain_core.documents import Document

            if not os.getenv("GOOGLE_API_KEY"):
                raise ValueError("GOOGLE_API_KEY manquante dans .env")

            # 2. Préparation des Documents
            documents = []
            for item in self.docs:
                content = f"Lieu: {item.get('name')}\nDescription: {item.get('description')}\nConseil Sécurité: {item.get('safety_tips', 'Standard')}"
                documents.append(Document(page_content=content, metadata={"source": item.get('name')}))

            # 3. Embeddings Locaux (HuggingFace)
            print("📥 Chargement des embeddings (all-MiniLM-L6-v2)...")
            embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
            
            # 4. Base Vectorielle (ChromaDB)
            vectorstore = Chroma.from_documents(
                documents=documents, 
                embedding=embeddings,
                persist_directory=self.vector_db_path
            )
            
            # 5. LLM (Gemini 2.5 Flash)
            llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)
            
            # 6. Prompt
            prompt = ChatPromptTemplate.from_template("""
            Tu es Zelig, un guide expert du Maroc.
            Réponds à la question en utilisant le contexte ci-dessous.
            Si la réponse n'y est pas, utilise tes connaissances générales.
            
            <contexte>
            {context}
            </contexte>
            
            Question: {input}
            """)
            
            # 7. Création de la chaîne
            doc_chain = create_stuff_documents_chain(llm, prompt)
            self.chain = create_retrieval_chain(vectorstore.as_retriever(search_kwargs={"k": 3}), doc_chain)
            print("✅ RAG Actif (Gemini 2.5 + HuggingFace)")
            
        except Exception as e:
            print(f"⚠️ Échec Init RAG: {e}")
            print("ℹ️ Passage en mode Secours (Mots-clés)")
            self.chain = None

    def _load_raw_data(self):
        try:
            if os.path.exists(self.json_path):
                with open(self.json_path, 'r', encoding='utf-8') as f:
                    self.docs = json.load(f)
            else: 
                self.docs = []
                print(f"⚠️ Fichier introuvable: {self.json_path}")
        except: 
            self.docs = []

    def get_answer(self, query: str):
        # Tentative 1 : RAG
        if self.chain:
            try:
                print(f"🔍 RAG Query: {query}")
                response = self.chain.invoke({"input": query})
                return {"result": response["answer"]}
            except Exception as e:
                print(f"❌ Erreur Invocation: {str(e)}")
        
        # Tentative 2 : Fallback
        results = [d['description'] for d in self.docs if query.lower() in str(d).lower()]
        if results: return {"result": f"Info rapide (Hors ligne) : {results[0]}"}
        return {"result": "Désolé, je n'ai pas l'information pour le moment."}
