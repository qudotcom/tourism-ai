import React from 'react';

/**
 * MessageSkeleton - Loading skeleton for chat messages
 */
const MessageSkeleton = () => (
    <div className="flex justify-start animate-fade-in">
        <div className="max-w-[85%] p-5 rounded-2xl bg-white shadow-md rounded-bl-none">
            <div className="space-y-2">
                <div className="skeleton h-4 w-48" />
                <div className="skeleton h-4 w-64" />
                <div className="skeleton h-4 w-40" />
            </div>
        </div>
    </div>
);

/**
 * CardSkeleton - Loading skeleton for tour cards
 */
const CardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <div className="skeleton h-40" />
        <div className="p-6 space-y-3">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-10 w-full mt-4" />
        </div>
    </div>
);

/**
 * InputSkeleton - Loading skeleton for input areas
 */
const InputSkeleton = () => (
    <div className="skeleton h-12 w-full rounded-full animate-fade-in" />
);

export { MessageSkeleton, CardSkeleton, InputSkeleton };
