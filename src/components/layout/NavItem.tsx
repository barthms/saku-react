// src/components/layout/NavItem.tsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // 1. Ganti import jadi NavLink

// Tentukan tipe props yang baru
type NavItemProps = {
    icon: React.ReactNode;
    text: string;
    to: string; // 2. Ganti 'onClick' dan 'active' dengan 'to'
};

export function NavItem({ icon, text, to }: NavItemProps) {
    // Styling Anda yang sudah ada, tidak perlu diubah
    const baseClasses = "flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors w-full";

    // Styling untuk item yang TIDAK aktif
    const inactiveClasses = "text-gray-500 hover:bg-gray-100";
    
    // Styling untuk item yang AKTIF (sesuai yang Anda suka)
    const activeClasses = "bg-lime-500 text-white"; // Menggunakan warna 'lime-500' dari kode Anda

    return (
        // 3. Ganti <a> menjadi NavLink
        <NavLink
            to={to}
            // 4. Logika className yang dinamis menggunakan fitur NavLink
            className={({ isActive }) => 
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
        >
            <span className="h-6 w-6">{icon}</span>
            <span className="font-semibold">{text}</span>
        </NavLink>
    );
}