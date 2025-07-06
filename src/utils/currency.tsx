// src/lib/utils.ts

export const formatRupiah = (amount: number | undefined | null) => {
    if (amount === null || amount === undefined) {
        return 'Rp 0'; // Atau tampilkan string default lain
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};