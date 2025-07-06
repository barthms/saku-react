// src/components/layout/Layout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // <-- IMPORT PENTING
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '../../context/AuthContext';
import { Footer } from './Footer';

export const Layout = () => {
    // State untuk layout seperti sidebar mobile dan data user akan hidup di sini
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    // Untuk sementara kita hardcode, nanti ini akan diambil dari context/state management
    const { user, logout } = useAuth();

    // Nanti di sini kita bisa tambahkan useEffect untuk fetch data user

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <div className="flex">
                {/* === Sidebar (Desktop & Mobile) === */}
                <div className="hidden lg:block w-72 flex-shrink-0">
                    <Sidebar />
                </div>
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative w-72 bg-white h-full shadow-xl">
                            <Sidebar />
                        </div>
                    </div>
                )}

                {/* === Konten Utama === */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-screen">
                    <Header
                        userName={user?.name || ''}
                        onMenuButtonClick={() => setSidebarOpen(true)}
                        onLogout={logout}
                    />
                    {/* 
                      <Outlet /> adalah "placeholder" dari React Router.
                      Di sinilah konten dari halaman (DashboardPage, TransactionsPage, dll) 
                      akan secara otomatis ditampilkan.
                    */}
                    <Outlet />
                    <Footer />
                </main>
            </div>
        </div>
    );
};