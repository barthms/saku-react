// src/features/transactions/TransactionTable.tsx
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatRupiah } from '../../utils/currency';

// Komponen kecil untuk status Pemasukan/Pengeluaran
const TypeBadge = ({ type }: { type: 'pemasukan' | 'pengeluaran' }) => {
    const isIncome = type === 'pemasukan';
    return (
        <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isIncome ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="capitalize">{type}</span>
        </div>
    );
};

export const TransactionTable = ({ transactions }: { transactions: any[] }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-200 text-gray-600">
                    <tr>
                        <th className="p-3 font-semibold">Deskripsi</th>
                        <th className="p-3 font-semibold">Kategori</th>
                        <th className="p-3 font-semibold">Tanggal</th>
                        <th className="p-3 font-semibold">Tipe</th>
                        <th className="p-3 font-semibold text-right">Jumlah</th>
                        <th className="p-3 font-semibold text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-3 font-medium text-gray-800">{tx.description}</td>
                            <td className="p-3">{tx.category.name}</td>
                            <td className="p-3">{new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                            <td className="p-3"><TypeBadge type={tx.category.type} /></td>
                            <td className={`p-3 text-right font-semibold ${tx.category.type === 'pemasukan' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.category.type === 'pemasukan' ? '+' : '-'} {formatRupiah(tx.amount)}
                            </td>
                            <td className="p-3">
                                <div className="flex justify-center gap-2">
                                    <button className="text-gray-400 hover:text-blue-500"><FiEdit /></button>
                                    <button className="text-gray-400 hover:text-red-500"><FiTrash2 /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};