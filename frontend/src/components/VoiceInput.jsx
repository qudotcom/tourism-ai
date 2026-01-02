import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

/**
 * VoiceInput Component - Speech-to-text for hands-free interaction
 * Uses the Web Speech API (browser native)
 */
const VoiceInput = ({ onResult, language = 'fr-FR' }) => {
    const [listening, setListening] = useState(false);
    const [supported, setSupported] = useState(true);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Check if browser supports Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setSupported(false);
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = language;

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            setListening(false);
        };

        recognitionInstance.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognitionInstance.onend = () => {
            setListening(false);
        };

        setRecognition(recognitionInstance);

        return () => {
            if (recognitionInstance) {
                recognitionInstance.stop();
            }
        };
    }, [language, onResult]);

    const toggleListening = () => {
        if (!recognition) return;

        if (listening) {
            recognition.stop();
            setListening(false);
        } else {
            recognition.start();
            setListening(true);
        }
    };

    if (!supported) {
        return (
            <button
                className="p-3 rounded-full bg-gray-100 text-gray-400 cursor-not-allowed"
                title="Votre navigateur ne supporte pas la reconnaissance vocale"
                disabled
            >
                <MicOff size={20} />
            </button>
        );
    }

    return (
        <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-all duration-300 ${listening
                    ? 'bg-red-500 text-white animate-pulse-glow shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                }`}
            title={listening ? "Arrêter l'enregistrement" : "Parler pour dicter"}
        >
            {listening ? <Mic size={20} className="animate-pulse" /> : <Mic size={20} />}
        </button>
    );
};

export default VoiceInput;
