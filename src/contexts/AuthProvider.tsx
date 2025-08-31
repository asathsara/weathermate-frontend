import { AuthContext } from "./AuthContext";
import { useAuthQuery } from "../hooks/useAuthQuery";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    // Try to refresh token on app load
    const { data , refetch } = useAuthQuery();
    const isLoggedIn = data?.isLoggedIn ?? false;

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: () => { }, refetch }}>
            {children}
        </AuthContext.Provider>
    );
}





