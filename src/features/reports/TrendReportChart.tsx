// src/features/reports/TrendReportCard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { TrendBarChart } from './TrendBarChart';

interface Period {
    start_date: string;
    end_date: string;
}

export const TrendReportCard = ({ period }: { period: Period }) => {
    const [trendData, setTrendData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrendData = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('https://siku-ten.vercel.app/api/reports/income-vs-expense-trend', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: period
                });
                setTrendData(response.data);
            } catch (err) {
                setError("Gagal memuat data tren.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTrendData();
    }, [period]);

    return (
        <Card>
            <h3 className="font-bold text-lg mb-4">Tren Keuangan</h3>
            {isLoading && <div className="h-72 flex items-center justify-center text-gray-500">Memuat...</div>}
            {error && <div className="h-72 flex items-center justify-center text-red-500">{error}</div>}
            {!isLoading && !error && <TrendBarChart data={trendData} />}
        </Card>
    );
};