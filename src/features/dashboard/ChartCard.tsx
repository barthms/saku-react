// src/features/dashboard/ChartCard.tsx (atau di mana pun file Anda berada)

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '../../utils/currency'; // Pastikan path ini benar

// Definisikan tipe data dari props
interface ChartData {
    date: string;
    total_expense: number;
    total_income: number;
}

// PERBAIKAN 1: Definisikan tipe ChartFilter di sini juga
type ChartFilter = 'day' | 'week' | 'month' | 'year';

interface ChartCardProps {
    data: ChartData[];
    title: string;
    // PERBAIKAN 2: Gunakan tipe yang lebih spesifik untuk type safety
    activeFilter: ChartFilter;
    onFilterChange: (filter: ChartFilter) => void;
}

export const ChartCard = ({ data, title, activeFilter, onFilterChange }: ChartCardProps) => {
    const formattedData = (data || []).map(d => ({
        date: d.date,
        Pengeluaran: d.total_expense,
        Pemasukan: d.total_income,
    }));

    // PERBAIKAN 3: Fungsi formatXAxis yang lebih kuat, menggunakan activeFilter sebagai acuan
    const formatXAxis = (tickItem: string) => {
        switch (activeFilter) {
            case 'day':
                // Input: "2023-07-25" -> Output: "25 Jul"
                return new Date(tickItem).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            case 'week':
                // Input: "2023-30" -> Output: "W30" (Minggu ke-30)
                return `W${tickItem.split('-')[1]}`;
            case 'month':
                // Input: "2023-07" -> Output: "Jul '23"
                return new Date(tickItem + '-02').toLocaleDateString('id-ID', { month: 'short', year: '2-digit' });
            case 'year':
                // Input: "2023" -> Output: "2023"
                return tickItem;
            default:
                return tickItem;
        }
    }

    // CustomTooltip tidak berubah
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const formattedLabel = formatXAxis(label); // Format label di tooltip juga
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-bold">{formattedLabel}</p>
                    {payload.map((pld: any) => (
                        <div key={pld.dataKey} style={{ color: pld.color }}>
                            {pld.dataKey}: {formatRupiah(pld.value)}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="flex space-x-2">
                    {/* Sekarang tidak perlu casting 'as ChartFilter[]' karena sudah benar */}
                    {(['day', 'week', 'month', 'year'] as ChartFilter[]).map(filter => (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${
                                activeFilter === filter
                                    ? 'bg-green-100 text-green-700 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            stroke="#9ca3af"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={formatXAxis} // Menggunakan fungsi format yang sudah diperbaiki
                        />
                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(value as number)} tick={{ fontSize: 12 }} stroke="#9ca3af" axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="Pemasukan" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="Pengeluaran" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};