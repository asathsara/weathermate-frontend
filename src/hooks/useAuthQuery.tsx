import { useQuery } from "@tanstack/react-query";
import { refreshClient, setAccessToken } from "../services/api";
import { clearAuth, getLoggedIn} from "../auth/auth";

async function fetchRefresh() {

    if (!getLoggedIn()) {
        // user never logged in, skip calling backend
        return { isLoggedIn: false, accessToken: null };
    }

    try {
        const res = await refreshClient.get("/refresh");
        if (res.data.accessToken) {

            setAccessToken(res.data.accessToken);
            
            return { isLoggedIn: true, accessToken: res.data.accessToken };
        }
    }
    catch {
        // refresh failed, clear login state in localStorage
        clearAuth();

        return { isLoggedIn: false, accessToken: null };
    }

}

export function useAuthQuery() {
    return useQuery({
        queryKey: ["auth"],
        queryFn: fetchRefresh,
        retry: false, // don’t retry if 401
        staleTime: 1000 * 60 * 5, // 5 min cache
    });
}
