import React from 'react';
import { motion } from 'framer-motion';

/**
 * SecurityGauge - A visual gauge component showing security levels
 * @param {number} value - Security value from 0-100
 * @param {string} label - Label for the gauge
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 */
const SecurityGauge = ({ value = 75, label = '', size = 'md', showValue = true }) => {
    // Clamp value between 0-100
    const safeValue = Math.max(0, Math.min(100, value));

    // Determine color based on value
    const getColor = (val) => {
        if (val >= 80) return { main: '#22c55e', light: '#dcfce7', text: 'Excellent' };
        if (val >= 60) return { main: '#84cc16', light: '#ecfccb', text: 'Bon' };
        if (val >= 40) return { main: '#eab308', light: '#fef9c3', text: 'Modéré' };
        if (val >= 20) return { main: '#f97316', light: '#ffedd5', text: 'Attention' };
        return { main: '#ef4444', light: '#fee2e2', text: 'Risqué' };
    };

    const colors = getColor(safeValue);

    // Size configurations
    const sizes = {
        sm: { width: 80, strokeWidth: 8, fontSize: 14, labelSize: 10 },
        md: { width: 120, strokeWidth: 10, fontSize: 20, labelSize: 12 },
        lg: { width: 160, strokeWidth: 12, fontSize: 28, labelSize: 14 },
    };

    const config = sizes[size] || sizes.md;
    const radius = (config.width - config.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (safeValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: config.width, height: config.width }}>
                {/* Background circle */}
                <svg
                    className="transform -rotate-90"
                    width={config.width}
                    height={config.width}
                >
                    <circle
                        cx={config.width / 2}
                        cy={config.width / 2}
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={config.strokeWidth}
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx={config.width / 2}
                        cy={config.width / 2}
                        r={radius}
                        fill="none"
                        stroke={colors.main}
                        strokeWidth={config.strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                </svg>

                {/* Center content */}
                {showValue && (
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <motion.span
                            className="font-bold"
                            style={{ fontSize: config.fontSize, color: colors.main }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {safeValue}%
                        </motion.span>
                        <span
                            className="text-gray-500 font-medium"
                            style={{ fontSize: config.labelSize }}
                        >
                            {colors.text}
                        </span>
                    </div>
                )}
            </div>

            {label && (
                <span
                    className="mt-2 text-center font-medium text-gray-700"
                    style={{ fontSize: config.labelSize }}
                >
                    {label}
                </span>
            )}
        </div>
    );
};

/**
 * SecurityBar - A horizontal bar showing security level
 */
export const SecurityBar = ({ value = 75, label = '', height = 8, showLabel = true }) => {
    const safeValue = Math.max(0, Math.min(100, value));

    const getColor = (val) => {
        if (val >= 80) return '#22c55e';
        if (val >= 60) return '#84cc16';
        if (val >= 40) return '#eab308';
        if (val >= 20) return '#f97316';
        return '#ef4444';
    };

    const color = getColor(safeValue);

    return (
        <div className="w-full">
            {showLabel && label && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-bold" style={{ color }}>{safeValue}%</span>
                </div>
            )}
            <div
                className="w-full bg-gray-200 rounded-full overflow-hidden"
                style={{ height }}
            >
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${safeValue}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

/**
 * SecurityMeter - A semi-circular meter for security visualization
 */
export const SecurityMeter = ({ value = 75, label = '', width = 200 }) => {
    const safeValue = Math.max(0, Math.min(100, value));

    const getColor = (val) => {
        if (val >= 80) return { main: '#22c55e', gradient: ['#22c55e', '#16a34a'] };
        if (val >= 60) return { main: '#84cc16', gradient: ['#84cc16', '#65a30d'] };
        if (val >= 40) return { main: '#eab308', gradient: ['#eab308', '#ca8a04'] };
        if (val >= 20) return { main: '#f97316', gradient: ['#f97316', '#ea580c'] };
        return { main: '#ef4444', gradient: ['#ef4444', '#dc2626'] };
    };

    const colors = getColor(safeValue);
    const height = width / 2 + 20;
    const strokeWidth = 16;
    const radius = (width - strokeWidth) / 2;
    const circumference = Math.PI * radius; // Half circle
    const strokeDashoffset = circumference - (safeValue / 100) * circumference;

    // Calculate needle position
    const needleAngle = -180 + (safeValue / 100) * 180;

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width, height }}>
                <svg width={width} height={height} className="overflow-visible">
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id={`meter-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={colors.gradient[0]} />
                            <stop offset="100%" stopColor={colors.gradient[1]} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arc */}
                    <path
                        d={`M ${strokeWidth / 2} ${height - 10} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height - 10}`}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    {/* Progress arc */}
                    <motion.path
                        d={`M ${strokeWidth / 2} ${height - 10} A ${radius} ${radius} 0 0 1 ${width - strokeWidth / 2} ${height - 10}`}
                        fill="none"
                        stroke={`url(#meter-gradient-${label})`}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        filter="url(#glow)"
                    />

                    {/* Needle */}
                    <motion.g
                        initial={{ rotate: -180 }}
                        animate={{ rotate: needleAngle }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                        style={{ transformOrigin: `${width / 2}px ${height - 10}px` }}
                    >
                        <line
                            x1={width / 2}
                            y1={height - 10}
                            x2={width / 2}
                            y2={30}
                            stroke={colors.main}
                            strokeWidth={3}
                            strokeLinecap="round"
                        />
                        <circle
                            cx={width / 2}
                            cy={height - 10}
                            r={8}
                            fill={colors.main}
                        />
                    </motion.g>

                    {/* Scale markers */}
                    {[0, 25, 50, 75, 100].map((mark) => {
                        const angle = (-180 + (mark / 100) * 180) * (Math.PI / 180);
                        const x = width / 2 + (radius + 20) * Math.cos(angle);
                        const y = height - 10 + (radius + 20) * Math.sin(angle);
                        return (
                            <text
                                key={mark}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                className="text-xs fill-gray-400"
                            >
                                {mark}
                            </text>
                        );
                    })}
                </svg>

                {/* Value display */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                    <motion.div
                        className="text-3xl font-bold"
                        style={{ color: colors.main }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {safeValue}%
                    </motion.div>
                </div>
            </div>

            {label && (
                <span className="mt-2 text-center font-medium text-gray-700">
                    {label}
                </span>
            )}
        </div>
    );
};

/**
 * SecurityIndicator - A simple dot indicator for inline use
 */
export const SecurityIndicator = ({ value = 75, size = 12 }) => {
    const safeValue = Math.max(0, Math.min(100, value));

    const getColor = (val) => {
        if (val >= 80) return '#22c55e';
        if (val >= 60) return '#84cc16';
        if (val >= 40) return '#eab308';
        if (val >= 20) return '#f97316';
        return '#ef4444';
    };

    return (
        <span
            className="inline-block rounded-full animate-pulse"
            style={{
                width: size,
                height: size,
                backgroundColor: getColor(safeValue),
                boxShadow: `0 0 ${size / 2}px ${getColor(safeValue)}40`,
            }}
        />
    );
};

export default SecurityGauge;
