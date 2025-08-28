import { useState, useEffect } from 'react';
import apiClient, { setAccessToken } from '../services/api';


export const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);


    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await apiClient.get('/refresh');
                setAccessToken(res.data.accessToken);
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            }
        };
        refresh();
    }, []);


    return { authenticated, setAuthenticated };
};