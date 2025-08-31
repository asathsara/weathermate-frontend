import type { Weather, History } from "../types";
import apiClient from "./api";

export const getWeather = async (city: string): Promise<Weather> => {

    // Fetch weather data for a specific city
    const response = await apiClient.get(`api/weather/${city}`);
    return response.data;
}

export const getHistory = async () : Promise<History[]> => {
    const res = await apiClient.get("api/history");
    return res.data;
}