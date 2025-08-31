import apiClient, { setAccessToken } from './api';


export const register = async (username: string, password: string) => {
    const res = await apiClient.post('/register', { username, password });
    return res.data;
};


export const login = async (username: string, password: string) => {
    const res = await apiClient.post('/login', { username, password });
    if (res.data.accessToken) setAccessToken(res.data.accessToken);
    return res.data;
};

export const logout = async () => {
    await apiClient.post('/logout');
    setAccessToken("");
    return true;
};