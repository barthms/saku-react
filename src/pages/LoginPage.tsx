// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card'; // Gunakan komponen Card Anda yang sudah ada
import { FiLogIn, FiHome } from 'react-icons/fi';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard', { replace: true }); // Redirect setelah login berhasil
        } catch (err: any) {
            if (err.response?.status === 422) {
                setError('Email atau password yang Anda masukkan salah.');
            } else {
                setError('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <Link to="/home" className="flex items-center justify-center gap-2 hover:text-green-600 transition-colors duration-300">
                    <FiHome className="text-3xl" />
                    <h1 className="text-4xl font-bold text-gray-800">SIKU</h1>
                </Link>
                <p className="text-gray-500 mt-2">Selamat datang kembali! Silakan login untuk melanjutkan.</p>
            </div>
            
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Alamat Email</label>
                        <input 
                            id="email" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500"
                            placeholder="andika@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500"
                            placeholder="password"
                        />
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</p>}

                    <div>
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-300"
                        >
                            {isLoading ? 'Loading...' : <> <FiLogIn /> Masuk </>}
                        </button>
                    </div>
                </form>
            </Card>

            <p className="mt-6 text-center text-sm text-gray-600">
                Belum punya akun? <Link to="/register" className="font-medium text-green-600 hover:text-green-500 hover:underline">Daftar sekarang</Link>
            </p>
        </div>
    );
}