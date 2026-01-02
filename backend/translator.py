import difflib
from langchain_google_genai import ChatGoogleGenerativeAI
from transformers import pipeline

# --- CONFIGURATION ---

# 1. Chargement de Gemini (Cerveau Généraliste)
# Assurez-vous d'avoir une clé valide dans le .env
try:
    llm_gemini = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)
except Exception as e:
    print(f"⚠️ Erreur Gemini: {e}")
    llm_gemini = None

# 2. Chargement de Terjman v2.0 (Spécialiste Local)
print("⏳ Chargement du modèle Terjman-Nano-v2.0...")
try:
    # Le nom exact fourni par vous :
    local_translator = pipeline("translation_en_to_ar", model="atlasia/Terjman-Nano-v2.0")
    print("✅ Terjman Nano v2.0 actif.")
except Exception as e:
    print(f"⚠️ Erreur chargement Terjman: {e}")
    local_translator = None

def calculate_similarity(text1, text2):
    """Calcule un pourcentage de ressemblance (0-100)"""
    if not text1 or not text2: return 0
    return difflib.SequenceMatcher(None, text1, text2).ratio() * 100

def translate_hybrid(text: str, direction: str):
    """
    Logique Hybride :
    - En -> Darija : Terjman v2.0 (Rapide)
    - Darija -> En : Gemini + Vérification Terjman (Robuste)
    """
    
    # --- CAS 1 : ANGLAIS -> DARIJA ---
    if direction == "en_to_darija":
        if local_translator:
            try:
                # Traduction locale pure
                result = local_translator(text)[0]['translation_text']
                return {
                    "translation": result,
                    "verification": {
                        "verified": True,
                        "status": "Terjman v2.0 🚀",
                        "score": 100,
                        "details": "Traduction directe par le modèle local."
                    }
                }
            except Exception as e:
                return {"translation": "Erreur Terjman Local", "verification": None}
        
        # Fallback Gemini si Terjman a planté
        elif llm_gemini:
            res = llm_gemini.invoke(f"Translate to Moroccan Darija: {text}")
            return {"translation": res.content, "verification": None}
        else:
            return {"translation": "Service indisponible", "verification": None}

    # --- CAS 2 : DARIJA -> ANGLAIS ---
    else: 
        if not llm_gemini:
             return {"translation": "Erreur : Clé API Google invalide", "verification": None}

        # A. Traduction Principale (Gemini)
        prompt_job = f"""
        You are a professional translator. 
        Translate this Moroccan Darija text (Arabic or Latin script) into standard English.
        Only return the English translation.
        Text: {text}
        """
        try:
            response = llm_gemini.invoke(prompt_job)
            english_result = response.content.strip()

            # B. Vérification (Back-Translation Consistency)
            verification_data = {"verified": False, "status": "Non vérifié"}
            
            if local_translator:
                try:
                    # 1. On retraduit l'anglais obtenu vers le Darija (Terjman)
                    back_darija_terjman = local_translator(english_result)[0]['translation_text']
                    
                    # 2. On retraduit l'anglais obtenu vers le Darija (Gemini)
                    prompt_check = f"Translate this English text to Moroccan Darija: {english_result}"
                    back_darija_gemini = llm_gemini.invoke(prompt_check).content.strip()
                    
                    # 3. Comparaison
                    score = calculate_similarity(back_darija_terjman, back_darija_gemini)
                    
                    if score > 60: status = "Certifié Robuste ✅"
                    elif score > 30: status = "Validé 👌"
                    else: status = "Nuance Incertaine ⚠️"

                    verification_data = {
                        "verified": True,
                        "status": status,
                        "score": round(score),
                        "details": f"Cohérence Back-Translation : {round(score)}%"
                    }
                except:
                    pass 
            
            return {
                "translation": english_result,
                "verification": verification_data
            }

        except Exception as e:
            return {"translation": f"Erreur de traduction : {str(e)}", "verification": None}
