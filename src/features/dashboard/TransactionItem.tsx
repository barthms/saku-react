// src/features/dashboard/TransactionItem.tsx
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { formatRupiah } from '../../utils/currency'; // Pastikan path ini benar

// Tipe data untuk satu transaksi
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    time: string;
    type: 'pemasukan' | 'pengeluaran';
    date: string;
}

export const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
    const isIncome = transaction.type === 'pemasukan';

    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                {/* Ikon */}
                <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isIncome ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                </div>
                {/* Deskripsi dan Waktu */}
                <div>
                    <p className="font-semibold text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('id-ID', { weekday: 'long' })}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
            </div>
            {/* Jumlah */}
            <p className={`font-bold ${isIncome ? 'text-green-600' : 'text-gray-800'}`}>
                {isIncome ? '+' : '-'} {formatRupiah(transaction.amount)}
            </p>
        </div>
    );
};