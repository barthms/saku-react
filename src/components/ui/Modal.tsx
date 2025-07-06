// src/components/ui/Modal.tsx
import React from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex justify-center items-center">
            {/* Konten Modal */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
                {/* Header Modal */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FiX size={24} />
                    </button>
                </div>
                {/* Body Modal (diisi oleh 'children') */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};