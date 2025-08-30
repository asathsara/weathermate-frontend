import { useQuery } from "@tanstack/react-query";
import { refreshClient, setAccessToken } from "../services/api";
import { AuthContext } from "./AuthContext";



export function AuthProvider({ children }: { children: React.ReactNode }) {

    // Try to refresh token on app load
    const { data } = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const res = await refreshClient.get("/refresh");
            if (res.data.accessToken) {
                setAccessToken(res.data.accessToken);
                return true;
            }
            return false;
        },
        staleTime: 1000 * 60 * 5, // 5 min cache
        retry: false, // don’t retry if 401
    });

    const isLoggedIn = data ?? false;

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: () => { } }}>
            {children}
        </AuthContext.Provider>
    );
}





