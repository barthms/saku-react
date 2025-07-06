// src/components/layout/Footer.tsx
import React from 'react';
// Import ikon media sosial dari react-icons
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

// Komponen kecil untuk satu ikon media sosial agar tidak mengulang kode
const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-gray-600 transition-colors"
    >
        {icon}
    </a>
);

export const Footer = () => {
    // Ganti dengan nama dan link media sosial Anda
    const yourName = "Andika"; 
    const githubUrl = "https://github.com/barthms";
    const linkedinUrl = "https://www.linkedin.com/in/andikaPurba/";
    const instagramUrl = "https://www.instagram.com/barthms.prb/";
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white text-sm mt-auto py-6 px-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Bagian Kiri: Copyright & Nama Anda */}
                <div className="text-gray-500 text-center sm:text-left">
                    <span>© {currentYear} SAKU. All Rights Reserved.</span>
                    <span className="hidden sm:inline"> | </span>
                    <br className="sm:hidden" />
                    <span>Dibuat dengan oleh <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:underline">{yourName}</a></span>
                </div>

                {/* Bagian Kanan: Ikon Media Sosial */}
                <div className="flex items-center space-x-5">
                    <SocialLink href={githubUrl} icon={<FaGithub size={20} />} />
                    <SocialLink href={linkedinUrl} icon={<FaLinkedin size={20} />} />
                    <SocialLink href={instagramUrl} icon={<FaInstagram size={20} />} />
                </div>
            </div>
        </footer>
    );
};