// src/features/reports/TrendBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '../../utils/currency';

type TrendData = {
    period: string;
    pemasukan: number;
    pengeluaran: number;
};

export const TrendBarChart = ({ data }: { data: TrendData[] }) => {
    if (!data || data.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-500">Tidak ada data tren.</div>;
    }

    const formatXAxis = (tickItem: string) => {
        // Format 'YYYY-MM' menjadi 'Mon YYYY'
        return new Date(tickItem + '-02').toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="period" tickFormatter={formatXAxis} fontSize={12} />
                <YAxis tickFormatter={(value: number) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value)} fontSize={12} />
                <Tooltip formatter={(value: number) => formatRupiah(value)} />
                <Legend />
                <Bar dataKey="pemasukan" fill="#22c55e" name="Pemasukan" />
                <Bar dataKey="pengeluaran" fill="#ef4444" name="Pengeluaran" />
            </BarChart>
        </ResponsiveContainer>
    );
};