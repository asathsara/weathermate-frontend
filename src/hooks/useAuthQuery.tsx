import { useQuery } from "@tanstack/react-query";
import { refreshClient, setAccessToken } from "../services/api";

async function fetchRefresh() {

    const res = await refreshClient.get("/refresh");
    if (res.data.accessToken) {
        setAccessToken(res.data.accessToken);
        return { isLoggedIn: true, accessToken: res.data.accessToken };
    }
    return { isLoggedIn: false, accessToken: null };
}

export function useAuthQuery() {
    return useQuery({
        queryKey: ["auth"],
        queryFn: fetchRefresh,
        retry: false, // don’t retry if 401
        staleTime: 1000 * 60 * 5, // 5 min cache
    });
}
