import axios from "axios";
import { clearAuth } from "../auth/auth";

// Custom error type for authentication errors

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // ensures refresh token cookie is sent
});

// Separate client for refresh
export const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});


let accessToken: string | null = null;


// Attach access token to requests
// This ensures all requests carry the current access token automatically.
apiClient.interceptors.request.use(config => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});


// Handle 401 by refreshing access token
apiClient.interceptors.response.use(

    // Just returns successful responses unchanged
    res => res,
    async error => {
        const originalRequest = error.config;
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {

            // Prevent infinite retry loops
            originalRequest._retry = true;

            try {
                const refreshRes = await refreshClient.get('/refresh');
                accessToken = refreshRes.data.accessToken;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Retry the original request with the new access token
                return apiClient(originalRequest);

            } catch (err) {

                // If refresh fails, log out the user
                // Clear auth state in localStorage
                clearAuth()
                
                accessToken = null;
                return Promise.reject(err);

            }
        }
        return Promise.reject(error);
    }
);


export const setAccessToken = (token: string) => {
    accessToken = token;
};


export default apiClient;