import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            setToken(storedToken);
            setUser(decoded);
        }
    }, []);

    const login = (jwtToken, userData) => {
        localStorage.setItem("token", jwtToken);
        const decoded = jwtDecode(jwtToken);
        setToken(jwtToken);
        setUser({ ...decoded, ...userData }); // Include role
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            token, 
            user, 
            login, 
            logout,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);