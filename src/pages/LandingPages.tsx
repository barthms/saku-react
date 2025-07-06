// src/pages/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEdit, FiBarChart2, FiShare2 } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Footer } from '../components/layout/Footer';
// Ganti dengan path gambar mockup Anda
import dashboardMockup from '../assets/SIPU.png'; // Pastikan nama file mockup sesuai
import yourPhoto from '../assets/muka perpus.jpg'; // Siapkan foto Anda

// Komponen kecil untuk kartu fitur
const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 text-center transform hover:scale-105 transition-transform duration-300">
        <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
        <p className="text-gray-500">{children}</p>
    </div>
);

export function LandingPage() {
    // Ganti dengan nama dan link Anda
    const yourName = "Andika B Purba";
    const githubUrl = "https://github.com/barthms";
    const linkedinUrl = "https://www.linkedin.com/in/andikaPurba/";
    
    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            {/* 1. Header & Navigasi */}
            <header className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">SIPU</h1>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 font-semibold hover:text-green-600">Login</Link>
                    <Link to="/register" className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow-md">
                        Daftar Gratis
                    </Link>
                </div>
            </header>

            <main>
                {/* 2. Hero Section */}
                <section className="text-center py-20 px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Pencatatan Keuangan, <br className="hidden md:block" /> Kini Lebih <span className="text-green-600">Sederhana</span>.
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        SIPU membantu Anda memahami ke mana perginya uang Anda. Catat setiap transaksi dengan mudah dan lihat ringkasan visual untuk mengambil keputusan finansial yang lebih baik.
                    </p>
                    <div className="mt-8">
                        <Link to="/register" className="inline-flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-transform hover:scale-105">
                            Mulai Catat Sekarang <FiArrowRight />
                        </Link>
                    </div>
                </section>

                {/* 3. Fitur Unggulan */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Semua yang Anda Butuhkan untuk Keuangan Sehat</h2>
                            <p className="text-gray-500 mt-2">Dirancang untuk siswa, mahasiswa, ibu rumah tangga, dan siapa saja yang peduli keuangan.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard icon={<FiEdit size={28} />} title="Pencatatan Intuitif">
                                Catat pemasukan dan pengeluaran dalam hitungan detik. Tanpa formula rumit, tanpa keribetan.
                            </FeatureCard>
                            <FeatureCard icon={<FiBarChart2 size={28} />} title="Dashboard & Laporan">
                                Lihat ringkasan keuangan, tren bulanan, dan alokasi dana Anda dalam grafik yang mudah dipahami.
                            </FeatureCard>
                            <FeatureCard icon={<FiShare2 size={28} />} title="Ekspor Data">
                                Butuh data untuk keperluan lain? Ekspor riwayat transaksi Anda ke format CSV kapan saja dengan satu klik.
                            </FeatureCard>
                        </div>
                    </div>
                </section>

                {/* 4. Visual Showcase */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Dari Angka Menjadi Wawasan</h2>
                            <p className="text-gray-500 mt-2">SIPU mengubah catatan transaksi Anda menjadi cerita visual yang bermakna.</p>
                        </div>
                        <img src={dashboardMockup} alt="SIPU Dashboard Mockup" className="rounded-xl shadow-2xl mx-auto" />
                    </div>
                </section>

                {/* 5. Developer Spotlight (Bagian Portofolio) */}
                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-6 text-center">
                        <img src={yourPhoto} alt={yourName} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg" />
                        <h3 className="text-2xl font-bold">Proyek Portofolio oleh {yourName}</h3>
                        <p className="text-green-600 font-semibold mt-1">Full-Stack Web Developer</p>
                        <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                            Proyek SIPU ini dibangun untuk menunjukkan kemampuan dalam merancang dan mengembangkan aplikasi web dari hulu ke hilir. Tujuannya adalah menciptakan alat yang fungsional, bermanfaat, dan memiliki pengalaman pengguna yang baik.
                        </p>
                        <div className="mt-6">
                            <h4 className="font-semibold mb-3">Teknologi yang Digunakan:</h4>
                            <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Laravel 12</span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">React</span>
                                <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-semibold">TypeScript</span>
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">MySQL</span>
                                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">Tailwind CSS</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-6 mt-8">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800"><FaGithub size={28} /></a>
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700"><FaLinkedin size={28} /></a>
                        </div>
                    </div>
                </section>

                 {/* 6. Final Call-to-Action */}
                 <section className="text-center py-20 px-6">
                    <h2 className="text-3xl font-bold">Mulai Kelola Keuangan Anda Hari Ini.</h2>
                    <p className="text-gray-500 mt-2">Gratis, cepat, dan aman. Buat akun Anda sekarang.</p>
                    <div className="mt-8">
                        <Link to="/register" className="inline-flex items-center gap-2 bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-transform hover:scale-105">
                            Daftar SIPU Gratis
                        </Link>
                    </div>
                </section>
            </main>

             {/* 7. Footer */}
             <footer className="bg-white border-t">
                {/* <div className="container mx-auto px-6 py-6 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} SIPU. Sebuah Proyek Portofolio oleh {yourName}.
                </div> */}
                <Footer />
             </footer>
        </div>
    );
}