// src/features/transactions/TransactionTable.tsx

import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { formatRupiah } from '../../utils/currency'; // Pastikan path ini benar

// Definisikan tipe untuk satu transaksi agar konsisten di seluruh aplikasi
export type Transaction = {
    id: number;
    descriptions: string;
    amount: number;
    date: string;
    category: {
        id: number;
        name: string;
        type: 'pemasukan' | 'pengeluaran';
    };
    category_id: number;
};

// Komponen kecil untuk badge tipe
const TypeBadge = ({ type }: { type: 'pemasukan' | 'pengeluaran' }) => {
    const isIncome = type === 'pemasukan';
    return (
        <div className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${isIncome ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="capitalize">{type}</span>
        </div>
    );
};

// Definisikan tipe untuk props yang diterima oleh TransactionTable
interface TransactionTableProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: number) => void;
}

export const TransactionTable = ({ transactions, onEdit, onDelete }: TransactionTableProps) => {
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
                        <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 align-middle">
                            <td className="p-3 font-medium text-gray-800">{tx.descriptions}</td>
                            <td className="p-3">{tx.category.name}</td>
                            <td className="p-3">{new Date(tx.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                            <td className="p-3"><TypeBadge type={tx.category.type} /></td>
                            <td className={`p-3 text-right font-semibold ${tx.category.type === 'pemasukan' ? 'text-green-600' : 'text-gray-900'}`}>
                                {tx.category.type === 'pemasukan' ? '+' : '-'} {formatRupiah(tx.amount)}
                            </td>
                            <td className="p-3">
                                <div className="flex justify-center gap-3">
                                    <button onClick={() => onEdit(tx)} className="text-gray-400 hover:text-blue-500 transition-colors" title="Edit"><FiEdit size={16} /></button>
                                    <button onClick={() => onDelete(tx.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Hapus"><FiTrash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};