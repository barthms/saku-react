// src/components/layout/Header.tsx
import { FiCalendar, FiBell, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

const userProfileImage = "https://i.pravatar.cc/40?img=32";

// Definisikan props yang diterima oleh Header
interface HeaderProps {
    userName: string;
    onMenuButtonClick: () => void; // Fungsi yang dipanggil saat tombol menu diklik
    onLogout: () => void; // Fungsi yang dipanggil saat tombol logout diklik
}

export const Header = ({ userName, onMenuButtonClick, onLogout }: HeaderProps) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <header className="flex justify-between items-center">
            {/* Bagian Kiri: Tombol Menu (Mobile) dan Sapaan */}
            <div className="flex items-center gap-4">
                {/* Tombol ini hanya muncul di layar kecil (tersembunyi di 'lg' ke atas) */}
                <button onClick={onMenuButtonClick} className="lg:hidden text-gray-600">
                    <FiMenu size={24} />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Hai, <span className="text-green-500">{userName}!</span>
                </h1>
            </div>

            {/* Bagian Kanan: Ikon dan Profil (Tidak berubah) */}
            <div className="flex items-center space-x-2 sm:space-x-6">
                <button className="text-gray-500 hover:text-gray-800">
                    <FiCalendar size={22} />
                </button>
                <div className="relative">
                    <button className="text-gray-500 hover:text-gray-800">
                        <FiBell size={22} />
                    </button>
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        12
                    </span>
                </div>
                <div className="relative">
                    <button 
                        onClick={toggleProfileMenu}
                        className="h-10 w-10"
                    >
                        <img
                            className="h-full w-full rounded-full object-cover border-2 border-green-400 cursor-pointer"
                            src={userProfileImage}
                            alt="User Profile"
                        />
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsProfileMenuOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};