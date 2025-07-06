// src/components/ui/MetricStatCard.tsx

interface MetricStatCardProps {
  value: string;
  mainLabel: string;
  subLabel?: string;
}

export const MetricStatCard = ({ value, mainLabel, subLabel }: MetricStatCardProps) => {
  const getColorClass = () => {
    switch (mainLabel) {
      case "Total Pemasukan":
        return "text-[#3b82f6]";
      case "Total Pengeluaran":
        return "text-[#f97316]";
      case "Sisa Saldo":
        return "text-green-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <span className="font-semibold text-gray-700">{mainLabel}</span>
        {subLabel && <span className="block text-xs text-gray-400">{subLabel}</span>}
      </div>
      
      <p className={`text-lg font-bold ${getColorClass()}`}>{value}</p>
    </div>
  );
};