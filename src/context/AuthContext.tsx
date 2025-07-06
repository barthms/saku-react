// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loginAPI, logoutAPI, fetchUserAPI } from '../api/auth';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const getUser = async () => {
            if (token) {
                try {
                    const res = await fetchUserAPI(token);
                    setUser(res.data);
                } catch {
                    setToken(null);
                    localStorage.removeItem('token');
                }
            }
        };
        getUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await loginAPI(email, password);
        const { access_token, user } = res.data;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        setUser(user);
    };

    const logout = async () => {
        if (token) {
            await logoutAPI(token);
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
