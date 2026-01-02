import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8001';

export const chatWithGuide = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat`, { query });
    return response.data.result || response.data.response; // Handle both keys
  } catch (e) {
    console.error('Chat API Error:', e);
    throw { type: 'network', message: "Connexion perdue. Vérifiez votre internet 📶" };
  }
};

export const translateText = async (text, direction = 'en_to_darija') => {
  try {
    const response = await axios.post(`${API_URL}/api/translate`, { text, direction });
    return response.data;
  } catch (e) {
    console.error('Translation API Error:', e);
    throw { type: 'network', message: "Service de traduction indisponible" };
  }
};

export const checkCitySecurity = async (city) => {
  try {
    const response = await axios.post(`${API_URL}/api/security`, { city }); // Fixed: POST not GET
    return response.data;
  } catch (e) {
    console.error('Security API Error:', e);
    throw { type: 'network', message: "Service de sécurité indisponible" };
  }
};