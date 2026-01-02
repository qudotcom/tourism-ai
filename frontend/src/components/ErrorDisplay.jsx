import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * ErrorDisplay Component - Shows user-friendly error messages with retry option
 */
const ErrorDisplay = ({ error, onRetry }) => {
    const messages = {
        network: "Connexion perdue. Vérifiez votre internet 📶",
        server: "Nos serveurs font une pause thé. Réessayez dans un moment ☕",
        timeout: "La réponse prend trop de temps. Simplifiez votre question ?",
        default: "Mince ! Quelque chose s'est mal passé."
    };

    const errorMessage = error?.message || messages[error?.type] || messages.default;

    return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-fade-in shadow-md">
            <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                    <p className="font-bold text-red-700 mb-1">Oops!</p>
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="mt-3 text-red-600 hover:text-red-700 flex items-center gap-2 text-sm font-semibold transition-colors group"
                        >
                            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                            Réessayer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorDisplay;
