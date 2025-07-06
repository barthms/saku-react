import{ useState, useEffect } from 'react';
import axios from 'axios';
import { ChartCard } from './ChartCard';
import { useDashboard } from '../../context/DashboardContext';
import type { DailyChartData } from '../../types';

type ChartFilter = 'day' | 'week' | 'month' | 'year';

export const DashboardChart = () => {
    const { refreshKey } = useDashboard();
    const [chartFilter, setChartFilter] = useState<ChartFilter>('day');
    const [chartData, setChartData] = useState<DailyChartData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('https://siku-ten.vercel.app/api/dashboard/chart', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { filter: chartFilter }
                });
                setChartData(response.data);
            } catch (err) {
                setError("Gagal memuat data grafik.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchChartData();
    }, [refreshKey, chartFilter]);

    if (isLoading) return <div className="bg-white p-6 rounded-lg shadow-md h-[402px] flex items-center justify-center text-gray-500">Memuat grafik...</div>;
    if (error) return <div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div>;

    return (
        <ChartCard 
            data={chartData} 
            title="Grafik Pemasukan & Pengeluaran" 
            activeFilter={chartFilter}
            onFilterChange={setChartFilter} 
        />
    );
};