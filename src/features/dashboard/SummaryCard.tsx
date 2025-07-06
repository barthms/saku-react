// src/features/dashboard/SummaryCard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Card } from '../../components/ui/Card';
import { MetricStatCard } from '../../components/ui/MetricStatCard';
import { formatRupiah } from '../../utils/currency';
import { useDashboard } from '../../context/DashboardContext';
import type { DashboardSummary } from '../../types';

export const SummaryCard = () => {
    const { refreshKey } = useDashboard();
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) return;

            const monthParam = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
            
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard/summary', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { month: monthParam }
                });
                setSummary(response.data);
            } catch (err) {
                setError("Gagal memuat ringkasan.");
                console.error("Summary fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSummary();
    }, [refreshKey, currentDate]);

    const changeMonth = (offset: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const summaryMetrics = [
        { mainLabel: "Total Pemasukan", value: formatRupiah(summary?.total_income) },
        { mainLabel: "Total Pengeluaran", value: formatRupiah(summary?.total_expense) },
        { mainLabel: "Sisa Saldo", value: formatRupiah(summary?.balance) },
    ];

    return (
        <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Ringkasan Keuangan</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled={isLoading}><FiChevronLeft /></button>
                    <span className="text-sm font-semibold w-28 text-center">
                        {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={() => changeMonth(1)} className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50" disabled={isLoading}><FiChevronRight /></button>
                </div>
            </div>
            
            <div className={`transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                <div className="flex flex-col space-y-4 divide-y divide-gray-100 pt-2">
                    {summaryMetrics.map((metric, index) => (
                        <div key={index} className="pt-4 first:pt-0">
                            <MetricStatCard mainLabel={metric.mainLabel} value={metric.value} />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};