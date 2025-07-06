// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../api/auth';
import { Card } from '../components/ui/Card';
import { FiUserPlus } from 'react-icons/fi';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);
        try {
            await registerAPI({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
            navigate('/login');
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: ['Terjadi kesalahan pada server. Silakan coba lagi.'] });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">SIKU</h1>
                <p className="text-gray-500 mt-2">Buat akun baru untuk mulai perjalanan finansial Anda.</p>
            </div>
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Alamat Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" >Password (min. 6 karakter)</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" >Konfirmasi Password</label>
                        <input id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    
                    {errors.general && <p className="text-red-500 text-sm text-center">{errors.general[0]}</p>}

                    <div className="pt-2">
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-300">
                           {isLoading ? 'Mendaftar...' : <> <FiUserPlus /> Buat Akun </>}
                        </button>
                    </div>
                </form>
            </Card>
            <p className="mt-6 text-center text-sm text-gray-600">
                Sudah punya akun? <Link to="/login" className="font-medium text-green-600 hover:text-green-500 hover:underline">Login di sini</Link>
            </p>
        </div>
    );
}