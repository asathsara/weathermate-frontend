import apiClient from "./api";

export const signUp = async (username: string, password: string) => {
    
    // send a POST request to the API to create a new user
    const response = await apiClient.post("/auth/signup", { username, password })
    return response.data
}

export const login = async (username: string, password: string) => {
    
    const response = await apiClient.post('/auth/login', { username, password })

    if (response.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token); 
    }
    return response.data
}