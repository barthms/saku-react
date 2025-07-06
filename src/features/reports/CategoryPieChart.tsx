// src/features/reports/CategoryPieChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatRupiah } from '../../utils/currency';

interface ChartData {
    category_name: string;
    total_amount: number | string;
}

interface CategoryPieChartProps {
    data: ChartData[];
    colors: string[];
}

interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    name: string;
}

export const CategoryPieChart = ({ data, colors }: CategoryPieChartProps) => {
    const processedData = data
        .map(item => ({
            name: item.category_name,
            value: parseFloat(item.total_amount as string) || 0,
        }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);

    if (processedData.length === 0) {
        return (
            <div className="h-72 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                <p className="text-lg">Tidak ada data pada periode ini.</p>
            </div>
        );
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: CustomizedLabelProps) => {
        if (percent * 100 < 5) return null;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <g>
                <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    className="font-bold text-sm"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text 
                    x={x} 
                    y={y + 15} 
                    fill="white" 
                    textAnchor="middle" 
                    dominantBaseline="central" 
                    className="text-xs"
                >
                    {name}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full h-[400px] p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"> 
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={processedData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={140}
                        innerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={3}
                        animationBegin={0}
                        animationDuration={1000}
                    >
                        {processedData.map((_, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={colors[index % colors.length]}
                                stroke="white"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number, name: string) => [formatRupiah(value), name]}
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            padding: '8px 12px'
                        }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        wrapperStyle={{
                            paddingTop: '20px'
                        }}
                        formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};