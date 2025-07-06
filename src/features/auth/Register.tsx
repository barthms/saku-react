// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Kita gunakan axios langsung untuk kesederhanaan
import { Card } from '../../components/ui/Card';
import { FiUserPlus } from 'react-icons/fi';

export default function RegisterPage() {
    const navigate = useNavigate();

    // State untuk form
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // State untuk menangani error validasi dari Laravel
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({}); // Reset error setiap kali submit
        setIsLoading(true);

        try {
            // Kita tidak perlu getCSRFToken() untuk API Sanctum
            // Langsung panggil API registrasi
            await axios.post('https://siku-ten.vercel.app/api/register', form);
            
            // Beri notifikasi sukses dan arahkan ke halaman login
            alert('Registrasi berhasil! Anda akan diarahkan ke halaman login untuk masuk.');
            navigate('/login');

        } catch (err: any) {
            // Tangani error validasi (422) dari Laravel
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                // Tangani error server lainnya
                setErrors({ general: ['Terjadi kesalahan pada server. Silakan coba lagi nanti.'] });
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">SAKU</h1>
                <p className="text-gray-500 mt-2">Buat akun baru untuk mulai perjalanan finansial Anda.</p>
            </div>
            
            <Card className="w-full max-w-md">
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Input untuk Nama */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
                    </div>

                    {/* Input untuk Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Alamat Email</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>

                    {/* Input untuk Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password (min. 6 karakter)</label>
                        <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>

                    {/* Input untuk Konfirmasi Password */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                        <input id="password_confirmation" name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    
                    {errors.general && <p className="text-red-500 text-sm text-center">{errors.general[0]}</p>}

                    {/* Tombol Submit */}
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