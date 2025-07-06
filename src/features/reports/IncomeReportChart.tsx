// src/features/reports/IncomeReportCard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { CategoryPieChart } from './CategoryPieChart'; // Gunakan komponen chart yang reusable

interface Period {
    start_date: string;
    end_date: string;
}

// Definisikan palet warna hijau untuk pemasukan
const INCOME_COLORS = ['#22c55e', '#16a34a', '#15803d', '#4ade80', '#86efac', '#bbf7d0'];

export const IncomeReportCard = ({ period }: { period: Period }) => {
    const [incomeData, setIncomeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIncomeData = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Panggil endpoint API untuk data pemasukan
                const response = await axios.get('http://127.0.0.1:8000/api/reports/income-by-category', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: period
                });
                setIncomeData(response.data);
            } catch (err) {
                setError("Gagal memuat data alokasi pemasukan.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchIncomeData();
    }, [period]);

    return (
        <Card>
            <h3 className="font-bold text-lg mb-4">Alokasi Pemasukan</h3>
            {isLoading && <div className="h-72 flex items-center justify-center text-gray-500">Memuat...</div>}
            {error && <div className="h-72 flex items-center justify-center text-red-500">{error}</div>}
            {!isLoading && !error && <CategoryPieChart data={incomeData} colors={INCOME_COLORS} />}
        </Card>
    );
};