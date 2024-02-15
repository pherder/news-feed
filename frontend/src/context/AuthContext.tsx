import React, {createContext, useContext, useState, ReactNode} from 'react';
import {User} from "../model/User";
import AuthService from "../services/AuthService";

interface AuthContextType {
    authenticatedUser: User | null;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(AuthService.getAuthenticatedUser());

    const loginUser = (user: User) => {
        setAuthenticatedUser(user);
    };

    const logoutUser = () => {
        AuthService.logout();
        setAuthenticatedUser(null);
    };

    const value = {
        authenticatedUser,
        loginUser,
        logoutUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
