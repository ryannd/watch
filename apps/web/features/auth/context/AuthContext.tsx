import { User } from "better-auth";
import { createContext } from "react";

interface AuthContextType {
    user: User | null,
    isAuthenticated: boolean
}

const defaultContextValue: AuthContextType = {
    user: null,
    isAuthenticated: false
}

export const AuthContext = createContext<AuthContextType>(defaultContextValue);