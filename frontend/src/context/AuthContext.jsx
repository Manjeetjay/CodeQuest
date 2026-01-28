import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/api";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load auth from localStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            try {
                setAuth(JSON.parse(storedAuth));
            } catch (error) {
                console.error("Failed to parse auth from localStorage", error);
                localStorage.removeItem("auth");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiLogin({ email, password });
            const authData = {
                token: response.token,
                type: response.type,
                username: response.username,
                email: response.email,
                role: response.role,
            };
            setAuth(authData);
            localStorage.setItem("auth", JSON.stringify(authData));
            localStorage.setItem("email", response.email);
            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.message || "Login failed" };
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await apiRegister({ username, email, password });
            const authData = {
                token: response.token,
                type: response.type,
                username: response.username,
                email: response.email,
                role: response.role,
            };
            setAuth(authData);
            localStorage.setItem("auth", JSON.stringify(authData));
            return { success: true };
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, error: error.message || "Registration failed" };
        }
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };

    const value = {
        auth,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!auth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
