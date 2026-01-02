import React from 'react';

/**
 * Unified Button Component - Ensures consistent styling across the app
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost'
 */
const Button = ({ variant = 'primary', children, className = '', disabled = false, ...props }) => {
    const baseStyles = 'px-6 py-3 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-kech-secondary text-white hover:bg-orange-700 shadow-lg hover:shadow-xl transform hover:scale-105',
        secondary: 'bg-kech-primary text-white hover:bg-blue-900 shadow-md',
        outline: 'border-2 border-kech-primary text-kech-primary hover:bg-kech-primary hover:text-white',
        ghost: 'text-kech-primary hover:bg-kech-primary/10'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
