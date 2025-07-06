// src/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Category {
    id: number;
    name: string;
    type: 'pengeluaran' | 'pemasukan';
    user_id: number;
    // user?: User; // Relasi user (opsional)
}
// Cetakan untuk data ringkasan dari /api/dashboard/summary
// Definisikan tipe data dari API Anda (sama seperti sebelumnya)
export interface DashboardSummary {
    total_income: number;
    total_expense: number;
    balance: number;
}
export interface DailyChartData {
    date: string;
    total_expense: number;
    total_income: number;
}
export interface Transaction {
    id: number;
    amount: string; // 'decimal' seringkali diterima sebagai string dari JSON
    descriptions: string | null;
    date: string; // 'YYYY-MM-DD'
    user_id: number;
    category_id: number;
    isDeleted: boolean;
    created_at: string;
    updated_at: string;
    category?: Category; // Relasi kategori (opsional)
    user?: User;       // Relasi user (opsional)
}

// Tipe untuk response dari endpoint login
export interface LoginResponse {
    user: User;
    access_token: string;
    token_type: string;
}

// Tipe untuk data chart yang lebih sesuai dengan desain (income & outcome)
export interface ChartData {
    labels: string[];
    incomeData: number[];
    outcomeData: number[];
}
