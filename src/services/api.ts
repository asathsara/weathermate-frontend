import axios from "axios";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // ensures refresh token cookie is sent
});


let accessToken: string | null = null;


// Attach access token to requests
apiClient.interceptors.request.use(config => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});


// Handle 401 by refreshing access token
apiClient.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshRes = await apiClient.get('/refresh');
                accessToken = refreshRes.data.accessToken;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (err) {
                accessToken = null;
                window.location.href = '/login';
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