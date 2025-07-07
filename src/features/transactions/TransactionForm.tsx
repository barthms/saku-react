// src/features/transactions/TransactionForm.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDashboard } from '../../context/DashboardContext';
import { FiPlus } from 'react-icons/fi';
import type { Transaction } from './TransactionTable'; // Impor tipe dari TransactionTable

type Category = { id: number; name: string; type: 'pemasukan' | 'pengeluaran' };

interface TransactionFormProps {
    onClose: () => void;
    transactionToEdit?: Transaction | null;
}

export const TransactionForm = ({ onClose, transactionToEdit }: TransactionFormProps) => {
    const { triggerRefresh } = useDashboard();
    const isEditMode = !!transactionToEdit;

    // State form diisi dengan data dari 'transactionToEdit' jika ada
    const [transactionType, setTransactionType] = useState<'pemasukan' | 'pengeluaran'>(transactionToEdit?.category.type || 'pengeluaran');
    const [amount, setAmount] = useState(transactionToEdit?.amount.toString() || '');
    const [descriptions, setDescriptions] = useState(transactionToEdit?.descriptions || '');
    const [categoryId, setCategoryId] = useState(transactionToEdit?.category_id.toString() || '');
    const [date, setDate] = useState(transactionToEdit?.date ? transactionToEdit.date.split('T')[0] : new Date().toISOString().slice(0, 10));
    
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://saku-production.up.railway.app/api/categories', { headers: { Authorization: `Bearer ${token}` } });
                setAllCategories(response.data);
            } catch (err) {
                console.error("Gagal mengambil kategori:", err);
            }
        };
        fetchCategories();
    }, []);

    const filteredCategories = allCategories.filter(cat => cat.type === transactionType);

    const handleAddNewCategory = async () => {
        const newCategoryName = window.prompt(`Masukkan nama untuk kategori ${transactionType} baru:`);
        if (newCategoryName && newCategoryName.trim() !== '') {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post('https://saku-production.up.railway.app/api/categories', 
                    { name: newCategoryName, type: transactionType },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const newCategory: Category = response.data;
                setAllCategories(prev => [...prev, newCategory]);
                setCategoryId(newCategory.id.toString());
                alert(`Kategori "${newCategoryName}" berhasil dibuat!`);
            } catch (error) {
                alert("Gagal membuat kategori baru. Mungkin nama sudah ada.");
            }
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        const transactionData = {
            amount: parseFloat(amount),
            descriptions: descriptions,
            category_id: parseInt(categoryId),
            date,
        };

        const url = isEditMode 
            ? `https://saku-production.up.railway.app/api/transaction/${transactionToEdit.id}` 
            : 'https://saku-production.up.railway.app/api/transaction';
        
        const method = isEditMode ? 'put' : 'post';

        try {
            await axios[method](url, transactionData, { headers: { Authorization: `Bearer ${token}` } });
            alert(isEditMode ? 'Transaksi berhasil diperbarui!' : 'Transaksi berhasil ditambahkan!');
            triggerRefresh();
            onClose();
        } catch (err: any) {
            setError(isEditMode ? 'Gagal memperbarui transaksi. Pastikan data valid.' : 'Gagal menyimpan transaksi. Pastikan semua kolom terisi.');
            console.error(err.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Transaksi</label>
                <div className="flex rounded-lg border border-gray-300 p-1">
                    <button type="button" onClick={() => setTransactionType('pengeluaran')} className={`w-1/2 py-2 rounded-md transition-colors ${transactionType === 'pengeluaran' ? 'bg-red-500 text-white shadow' : 'text-gray-600'}`}>Pengeluaran</button>
                    <button type="button" onClick={() => setTransactionType('pemasukan')} className={`w-1/2 py-2 rounded-md transition-colors ${transactionType === 'pemasukan' ? 'bg-green-500 text-white shadow' : 'text-gray-600'}`}>Pemasukan</button>
                </div>
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah</label>
                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <input type="text" id="description" value={descriptions} onChange={e => setDescriptions(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                <div className="flex items-center gap-2 mt-1">
                    <select id="category" value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="" disabled>Pilih Kategori</option>
                        {filteredCategories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddNewCategory} className="p-2.5 bg-gray-200 hover:bg-gray-300 rounded-md shrink-0 transition-colors">
                        <FiPlus />
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg">Batal</button>
                <button type="submit" disabled={isLoading} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50">
                    {isLoading ? 'Menyimpan...' : (isEditMode ? 'Update Transaksi' : 'Simpan Transaksi')}
                </button>
            </div>
        </form>
    );
};