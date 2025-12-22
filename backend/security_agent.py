from duckduckgo_search import DDGS

class SecurityAgent:
    def check_safety(self, location: str):
        query = f"{location} Marrakech crime safety news recent"
        
        try:
            results = DDGS().text(query, max_results=3)
            
            # Simple sentiment/keyword analysis on the search snippets
            danger_keywords = ["robbery", "theft", "attack", "unsafe", "caution", "pickpocket"]
            detected_issues = []
            
            summary = "No immediate red flags found in recent news."
            risk_level = "Low"

            for res in results:
                snippet = res['body'].lower()
                for word in danger_keywords:
                    if word in snippet:
                        detected_issues.append(f"Report mentioning '{word}'")
                        risk_level = "Moderate"
            
            if len(detected_issues) > 2:
                risk_level = "High"
                summary = "Multiple recent safety mentions found. Exercise high caution."
            elif risk_level == "Moderate":
                summary = "Some cautionary reports found. Be aware of your surroundings."

            return {
                "location": location,
                "risk_level": risk_level,
                "summary": summary,
                "sources": [r['href'] for r in results]
            }
            
        except Exception as e:
            return {
                "location": location,
                "risk_level": "Unknown",
                "summary": "Could not fetch live news.",
                "error": str(e)
            }
