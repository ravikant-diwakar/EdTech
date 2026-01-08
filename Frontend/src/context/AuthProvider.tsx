import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    _id: string;
    fullname: string;
    email: string;
    role: "student" | "teacher" | "book_seller" | "admin";
    avatar?: string;
    token: string;
    isVerified?: boolean;
    enrolledCourses?: any[];
    purchasedBooks?: any[];
}

interface AuthContextType {
    authUser: User | null;
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("Users");
        if (storedUser) {
            try {
                setAuthUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user data", error);
                localStorage.removeItem("Users");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setAuthUser(userData);
        localStorage.setItem("Users", JSON.stringify(userData));
    }

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem("Users");
        // Optional: Redirect to login or home
        window.location.href = "/login";
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
