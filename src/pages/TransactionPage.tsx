// src/pages/TransactionsPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useDashboard } from '../context/DashboardContext';
import { TransactionTable, type Transaction } from '../features/transactions/TransactionTable';
import { useDebounce } from '../hooks/useDebounce';
import { Modal } from '../components/ui/Modal';
import { TransactionForm } from '../features/transactions/TransactionForm';

export function TransactionsPage() {
    const { refreshKey } = useDashboard();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [paginationInfo, setPaginationInfo] = useState({ currentPage: 1, lastPage: 1, total: 0 });
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const goToPage = (page: number) => {
        if (page > 0 && page <= paginationInfo.lastPage) {
            setPaginationInfo(prev => ({ ...prev, currentPage: page }));
        }
    };

    const triggerReload = () => {
        setReloadTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/transaction', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page: paginationInfo.currentPage,
                        q: debouncedSearchTerm,
                    },
                });

                setTransactions(response.data.data);
                setPaginationInfo({
                    currentPage: response.data.current_page,
                    lastPage: response.data.last_page,
                    total: response.data.total,
                });
            } catch (err) {
                setError("Gagal mengambil data transaksi.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [refreshKey, paginationInfo.currentPage, debouncedSearchTerm, reloadTrigger]);

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`http://127.0.0.1:8000/api/transaction/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert("Transaksi berhasil dihapus.");
                triggerReload(); // 🔁 Refresh setelah hapus
            } catch (error) {
                alert("Gagal menghapus transaksi.");
            }
        }
    };

    const handleOpenAddModal = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTransaction(null);
        triggerReload(); // 🔁 Refresh setelah tambah/edit
    };

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Transaksi</h2>
                    <p className="text-sm text-gray-500">Daftar Transaksi Keuangan</p>
                </div>
                <button onClick={handleOpenAddModal} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                    + Tambah Transaksi
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Semua Transaksi ({paginationInfo.total})</h3>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari deskripsi..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-400 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="p-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                            <FiFilter />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-10">Memuat transaksi...</div>
                ) : transactions.length > 0 ? (
                    <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
                ) : (
                    <div className="text-center py-10 text-gray-500">Tidak ada transaksi yang ditemukan.</div>
                )}

                <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Halaman {paginationInfo.currentPage} dari {paginationInfo.lastPage}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => goToPage(paginationInfo.currentPage - 1)}
                            disabled={paginationInfo.currentPage === 1}
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                        >
                            Sebelumnya
                        </button>
                        <button
                            onClick={() => goToPage(paginationInfo.currentPage + 1)}
                            disabled={paginationInfo.currentPage === paginationInfo.lastPage}
                            className="px-3 py-1 border rounded-md disabled:opacity-50"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingTransaction ? "Edit Transaksi" : "Tambah Transaksi Baru"}
            >
                <TransactionForm onClose={closeModal} transactionToEdit={editingTransaction} />
            </Modal>
        </div>
    );
}
