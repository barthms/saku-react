// src/pages/CategoriesPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <-- 1. Import axios
import type { Category } from '../types';

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Kita butuh 'setError' untuk menangani error dari API
    const [error, setError] = useState<string | null>(null);

    // 2. Kita akan memodifikasi useEffect secara signifikan
    useEffect(() => {
        // Definisikan fungsi async untuk mengambil data
        const fetchCategories = async () => {
            // Ambil token dari local storage
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Autentikasi tidak ditemukan. Silakan login kembali.");
                setIsLoading(false);
                return;
            }

            try {
                // Lakukan request ke API Laravel
                const response = await axios.get('https://siku-ten.vercel.app/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}` // Sertakan token
                    }
                });
                
                // Jika berhasil, simpan data dari API ke state
                setCategories(response.data);

            } catch (err) {
                // Jika terjadi error (misal: token expired, server down, CORS)
                setError("Gagal memuat data kategori.");
                console.error(err); // Tampilkan detail error di console untuk debug
            } finally {
                // Apapun hasilnya, hentikan loading
                setIsLoading(false);
            }
        };

        // Panggil fungsi yang baru kita buat
        fetchCategories();
        
    }, []); // Array dependensi kosong, artinya hanya berjalan sekali

    if (isLoading) {
        return <div>Loading kategori...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Kelola Kategori</h1>

            <button style={{ marginBottom: '20px' }}>+ Tambah Kategori Baru</button>

            {/* Tampilan tabelnya tetap sama, tidak perlu diubah */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Nama Kategori</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Tipe</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{category.name}</td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                    <span style={{ 
                                        padding: '2px 8px', 
                                        borderRadius: '12px', 
                                        color: 'white',
                                        backgroundColor: category.type === 'pemasukan' ? 'green' : 'red'
                                    }}>
                                        {category.type}
                                    </span>
                                </td>
                                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                    <button style={{ marginRight: '5px' }}>Edit</button>
                                    <button>Hapus</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                Anda belum memiliki kategori. Silakan tambah baru.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default CategoriesPage;