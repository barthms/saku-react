// src/context/DashboardContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definisikan apa yang akan disediakan oleh context kita
interface DashboardContextType {
    // refreshKey adalah angka yang akan kita ubah untuk memicu useEffect
    refreshKey: number;
    // triggerRefresh adalah fungsi untuk mengubah angka tersebut
    triggerRefresh: () => void;
}

// Buat context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Buat komponen Provider yang akan memegang state
export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1); // Tambah angka untuk memicu update
    };

    return (
        <DashboardContext.Provider value={{ refreshKey, triggerRefresh }}>
            {children}
        </DashboardContext.Provider>
    );
};

// Buat custom hook untuk mempermudah penggunaan context
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};