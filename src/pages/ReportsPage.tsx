// src/pages/ReportsPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';
// Import komponen-komponen "pintar" yang baru
import { ExpenseReportCard } from '../features/reports/ExpenseReportChart';
import { TrendReportCard } from '../features/reports/TrendReportChart';
import { IncomeReportCard } from '../features/reports/IncomeReportChart';

export function ReportsPage() {
    // State yang tersisa HANYA untuk filter dan tombol ekspor
    const [isExporting, setIsExporting] = useState(false);
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const [period, setPeriod] = useState({
        start_date: firstDayOfMonth.toISOString().slice(0, 10),
        end_date: today.toISOString().slice(0, 10)
    });

    // Logika fetch data sudah dipindahkan ke komponen masing-masing.

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeriod(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleExportCSV = async () => {
        setIsExporting(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://siku-ten.vercel.app/api/reports/export-transactions', {
                headers: { Authorization: `Bearer ${token}` },
                params: period,
                responseType: 'blob',
            });
            // ... (sisa logika download file tidak berubah)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            const contentDisposition = response.headers['content-disposition'];
            let fileName = `Laporan_SAKU.csv`;
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
            }
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert("Gagal mengekspor data.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="mt-8 space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Laporan Keuangan</h2>
                    <p className="text-sm text-gray-500">Lihat laporan keuangan Anda.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* Filter Periode */}
                    <div className="flex items-center gap-2">
                        <input type="date" name="start_date" value={period.start_date} onChange={handlePeriodChange} className="border border-gray-300 rounded-md p-2 text-sm" />
                        <span>-</span>
                        <input type="date" name="end_date" value={period.end_date} onChange={handlePeriodChange} className="border border-gray-300 rounded-md p-2 text-sm" />
                    </div>
                    {/* Tombol Aksi */}
                    <button
                        onClick={handleExportCSV}
                        disabled={isExporting}
                        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed"
                    >
                        <FiDownload />
                        {isExporting ? 'Mengekspor...' : 'Ekspor ke CSV'}
                    </button>
                </div>
            </div>

            {/* Layout Halaman Laporan yang Baru */}
            <div className="space-y-8">
                {/* Baris untuk Pie Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <IncomeReportCard period={period} />
                    <ExpenseReportCard period={period} />
                </div>
                {/* Baris untuk Bar Chart */}
                <div>
                    <TrendReportCard period={period} />
                </div>
            </div>
        </div>
    );
}