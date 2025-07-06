// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string; // Agar bisa menambahkan custom class jika perlu
}

export const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    );
};