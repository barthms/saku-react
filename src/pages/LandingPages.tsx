// src/pages/LandingPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEdit, FiBarChart2, FiShare2 } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import dashboardMockup from '../assets/pixlr-image-generator-686ce86fe8f2d41b55745837.png';
import yourPhoto from '../assets/muka perpus.jpg';

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white p-6 rounded-lg border border-gray-200 text-center shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <motion.div 
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 bg-green-100 text-green-600 rounded-full"
        >
            {icon}
        </motion.div>
        <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
        <p className="text-gray-500">{children}</p>
    </motion.div>
);

export function LandingPage() {
    const yourName = "Andika B Purba";
    const githubUrl = "https://github.com/barthms";
    const linkedinUrl = "https://www.linkedin.com/in/andikaPurba/";
    
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800 font-sans">
            <header className="container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-white/70 fixed top-0 left-0 right-0 z-50">
                <motion.h1 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text"
                >
                    SAKU
                </motion.h1>
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-600 font-semibold hover:text-green-600 transition-colors">Login</Link>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link to="/register" className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl">
                            Daftar Gratis
                        </Link>
                    </motion.div>
                </div>
            </header>

            <main className="pt-16">
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center py-20 px-6"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                        <span className="text-green-600">SAKU</span> - Solusi Aplikasi <br className="hidden md:block" /> Keuangan<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">mu</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        SAKU hadir sebagai solusi lengkap untuk mengelola keuangan Anda. Dengan fitur pencatatan yang mudah dan visualisasi data yang informatif, kami membantu Anda mencapai kebebasan finansial.
                    </p>
                    <motion.div 
                        className="mt-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl">
                            Mulai Sekarang <FiArrowRight className="animate-bounce" />
                        </Link>
                    </motion.div>
                </motion.section>

                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                                Semua yang Anda Butuhkan untuk Keuangan Sehat
                            </h2>
                            <p className="text-gray-500 mt-2">Dirancang untuk siswa, mahasiswa, ibu rumah tangga, dan siapa saja yang peduli keuangan.</p>
                        </motion.div>
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

                <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                                Dari Angka Menjadi Wawasan
                            </h2>
                            <p className="text-gray-500 mt-2">SAKU mengubah catatan transaksi Anda menjadi cerita visual yang bermakna.</p>
                        </motion.div>
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            src={dashboardMockup} 
                            alt="SAKU Dashboard Mockup" 
                            className="rounded-xl shadow-2xl mx-auto hover:shadow-3xl transition-shadow duration-300 w-2/3 md:w-1/2 lg:w-1/3"
                        />
                    </div>
                </section>

                <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container mx-auto px-6 text-center">
                        <motion.img 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            src={yourPhoto} 
                            alt={yourName} 
                            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold">Proyek Portofolio oleh {yourName}</h3>
                            <p className="text-green-600 font-semibold mt-1">Full-Stack Web Developer</p>
                            <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                                Proyek SAKU ini dibangun untuk menunjukkan kemampuan dalam merancang dan mengembangkan aplikasi web dari hulu ke hilir. Tujuannya adalah menciptakan alat yang fungsional, bermanfaat, dan memiliki pengalaman pengguna yang baik.
                            </p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-6"
                        >
                            <h4 className="font-semibold mb-3">Teknologi yang Digunakan:</h4>
                            <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
                                <motion.span whileHover={{ scale: 1.1 }} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">Laravel 12</motion.span>
                                <motion.span whileHover={{ scale: 1.1 }} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">React</motion.span>
                                <motion.span whileHover={{ scale: 1.1 }} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-semibold">TypeScript</motion.span>
                                <motion.span whileHover={{ scale: 1.1 }} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">MySQL</motion.span>
                                <motion.span whileHover={{ scale: 1.1 }} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">Tailwind CSS</motion.span>
                            </div>
                        </motion.div>
                        <div className="flex justify-center gap-6 mt-8">
                            <motion.a 
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                href={githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-500 hover:text-gray-800"
                            >
                                <FaGithub size={28} />
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                href={linkedinUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-500 hover:text-blue-700"
                            >
                                <FaLinkedin size={28} />
                            </motion.a>
                        </div>
                    </div>
                </section>

                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center py-20 px-6 bg-gradient-to-b from-white to-gray-50"
                >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
                        Mulai Kelola Keuangan Anda Hari Ini.
                    </h2>
                    <p className="text-gray-500 mt-2">Gratis, cepat, dan aman. Buat akun Anda sekarang.</p>
                    <motion.div 
                        className="mt-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all">
                            Daftar SAKU Gratis
                        </Link>
                    </motion.div>
                </motion.section>
            </main>

            <footer className="bg-white border-t">
                <Footer />
            </footer>
        </div>
    );
}