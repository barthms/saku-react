// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavItem } from './NavItem'; // Menggunakan NavItem yang sudah di-upgrade

// Import ikon dari Heroicons
import {
    ChartBarIcon,
    BanknotesIcon,
    DocumentChartBarIcon,
    PhoneIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export function Sidebar() {
    // 1. HAPUS SEMUA STATE. Kita tidak lagi membutuhkannya.
    // const [activeItem, setActiveItem] = React.useState('Dashboard'); // HAPUS INI

    return (
        <aside className="h-screen bg-white p-6 flex flex-col justify-between border-r border-gray-200">
            <div>
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-800">SIKU</h1>
                    <p className="text-sm text-gray-500">Sistem Pencatatan Keuanganku</p>
                </div>

                <nav className="flex flex-col space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">General</p>
                    {/* 2. Ganti prop 'active' dan 'onClick' dengan 'to' */}
                    <NavItem
                        to="/dashboard"
                        icon={<ChartBarIcon />}
                        text="Dashboard"
                    />
                    <NavItem
                        to="/transactions"
                        icon={<BanknotesIcon />}
                        text="Transaksi"
                    />
                    <NavItem
                        to="/reports"
                        icon={<DocumentChartBarIcon />}
                        text="Laporan"
                    />
                    {/* Hapus Contact Us karena belum ada halamannya */}
                </nav>

                <nav className="flex flex-col space-y-2 mt-12">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Support</p>
                    <NavItem
                        to="/help"
                        icon={<QuestionMarkCircleIcon />}
                        text="Help"
                    />
                    <NavItem
                        to="/settings"
                        icon={<Cog6ToothIcon />}
                        text="Settings"
                    />
                </nav>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800">Tingkatkan Wawasan Keuangan Anda</h4>
                <p className="text-sm text-gray-500 mt-1">Menyederhanakan Kompleksitas, Memaksimalkan Efisiensi.</p>
            </div>
        </aside>
    );
}