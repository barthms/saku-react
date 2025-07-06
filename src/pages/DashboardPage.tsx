// src/pages/DashboardPage.tsx

// 1. Import komponen-komponen "pintar" yang sudah kita buat
import { DashboardChart } from '../features/dashboard/DashboardChart';
import { SummaryCard } from '../features/dashboard/SummaryCard';
import { RecentTransactionsCard } from '../features/dashboard/RecentTransactionsCard';

export function DashboardPage() {
    // 2. Tidak ada lagi state, useEffect, atau renderMainContent.
    // Tugasnya sekarang HANYA menyusun layout.

    return (
        <div className="mt-8 flex flex-col gap-8">
            {/* Bagian Grafik */}
            <div>
                <DashboardChart />
            </div>

            {/* Bagian Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <RecentTransactionsCard />
                </div>
                <div className="lg:col-span-2">
                    <SummaryCard />
                </div>
            </div>
        </div>
    );
}