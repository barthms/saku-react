import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { TransactionItem, type Transaction } from './TransactionItem';
import { useDashboard } from '../../context/DashboardContext';

export const RecentTransactionsCard = () => {
    const { refreshKey } = useDashboard();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecentTransactions = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('https://siku-ten.vercel.app/api/dashboard/recent-transactions', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Gagal memuat transaksi terbaru:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecentTransactions();
    }, [refreshKey]);


    return (
        <Card className="h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Transaksi Terbaru</h3>
                <a href="/transactions" className="text-sm text-green-600 font-semibold hover:underline">
                    Lihat lebih banyak
                </a>
            </div>
            <div className={`transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                {transactions.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {transactions.map(tx => (
                            <TransactionItem key={tx.id} transaction={tx} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        {isLoading ? 'Memuat...' : 'Belum ada transaksi terbaru.'}
                    </div>
                )}
            </div>
        </Card>
    );
};