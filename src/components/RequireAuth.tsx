// src/components/RequireAuth.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = {
    children: ReactNode;
}

const RequireAuth = ({ children }: { children: RequireAuthProps}) => {
    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;