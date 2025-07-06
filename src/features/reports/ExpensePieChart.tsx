// src/features/reports/ExpensePieChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '../../utils/currency';

// Tipe data yang diterima (tidak perlu diubah)
type ExpenseData = {
    category_name: string;
    total_amount: number | string; // Buat lebih fleksibel, kadang API mengirim string
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

export const ExpensePieChart = ({ data }: { data: ExpenseData[] }) => {
    // 1. Filter data yang bernilai nol atau tidak valid
    const processedData = data
        .map(item => ({
            name: item.category_name,
            value: parseFloat(item.total_amount as string) || 0, // Pastikan value adalah angka
        }))
        .filter(item => item.value > 0);

    // 2. Tampilkan pesan yang jelas jika tidak ada data yang bisa ditampilkan
    if (processedData.length === 0) {
        return <div className="h-72 flex items-center justify-center text-gray-500">Tidak ada data pengeluaran pada periode ini.</div>;
    }
    
    // 3. Customisasi label agar lebih rapi
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ 
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent
    }: {
        cx: number;
        cy: number;
        midAngle: number;
        innerRadius: number;
        outerRadius: number;
        percent: number;
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // Hanya tampilkan persen jika lebih dari 5% agar tidak berantakan
        if (percent * 100 < 5) return null;

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        // 4. BERI UKURAN PASTI PADA WADAH CHART
        <div style={{ width: '100%', height: 350 }}> 
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={processedData}
                        cx="50%"
                        cy="50%"
                        labelLine={false} // Matikan garis label untuk tampilan lebih bersih
                        label={renderCustomizedLabel} // Gunakan fungsi label kustom kita
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {processedData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number, name: string) => [formatRupiah(value), name]} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};