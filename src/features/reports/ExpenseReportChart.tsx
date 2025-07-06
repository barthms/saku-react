// src/features/reports/ExpenseReportCard.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '../../components/ui/Card';
import { CategoryPieChart } from './CategoryPieChart'; // Gunakan komponen chart yang reusable

interface Period {
    start_date: string;
    end_date: string;
}

// Definisikan palet warna merah untuk pengeluaran
const EXPENSE_COLORS = ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#fca5a5', '#fecaca'];

export const ExpenseReportCard = ({ period }: { period: Period }) => {
    const [expenseData, setExpenseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExpenseData = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('https://siku-ten.vercel.app/api/reports/expense-by-category', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: period
                });
                setExpenseData(response.data);
            } catch (err) {
                setError("Gagal memuat data alokasi pengeluaran.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchExpenseData();
    }, [period]);

    return (
        <Card>
            <h3 className="font-bold text-lg mb-4">Alokasi Pengeluaran</h3>
            {isLoading && <div className="h-72 flex items-center justify-center text-gray-500">Memuat...</div>}
            {error && <div className="h-72 flex items-center justify-center text-red-500">{error}</div>}
            {!isLoading && !error && <CategoryPieChart data={expenseData} colors={EXPENSE_COLORS} />}
        </Card>
    );
};