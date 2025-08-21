import apiClient from "./api";

export const getWeather = async (location: string) => {

    // Fetch weather data for a specific location
    const response = await apiClient.get(`/weather/${location}`);
    return response.data;
}

export const getHistory = async () => {
    const res = await apiClient.get("/history");
    return res.data;
}