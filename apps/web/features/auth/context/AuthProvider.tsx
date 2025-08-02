import { ReactNode, useEffect, useState } from "react";
import { authClient } from "@/features/auth/lib/auth-client";
import { User } from "better-auth";
import { AuthContext } from "@/features/auth/context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { 
        data: session, 
        isPending,
        error,
    } = authClient.useSession() 

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(!isPending && !error && session) {
            setUser(session.user)
            setIsAuthenticated(true)
        } else if(!isPending) {
            setIsAuthenticated(false)
        }
    }, [session, isPending, error])

    const authContextValue = {
        user,
        isAuthenticated
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )
}