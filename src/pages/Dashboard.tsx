import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { getHistory, getWeather } from "../services/weather";
import { logout as logoutApi } from "../services/auth";
import type { Weather, History } from "../types";
import { clearAuth } from "../auth/auth";
import { kelvinToCelsius } from "../utils/converter";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuth();

  // History query
  const { data: history = [], refetch: refetchHistory } = useQuery<History[]>({
    queryKey: ["history"],
    queryFn: getHistory,
    retry: false,
  });

  // Weather query (lazy fetch)
  const {
    data: weather,
    refetch: refetchWeather,
    isLoading: weatherLoading,
    isError: weatherError,
  } = useQuery<Weather>({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    retry: false,
    enabled: false,        // only fetch on search
    staleTime: 1000 * 60,  // 1 minute cache for better UX
  });

  const handleSearch = () => {
    if (!city.trim()) return;
    refetchWeather();
    refetchHistory();
  };

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      clearAuth();
      setIsLoggedIn(false);
      setAccessToken("");
      queryClient.clear();
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-400">🌤️ Weather Dashboard</h1>
          <button
            onClick={() => logoutMutation.mutate()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="border border-gray-300 p-4 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl transition cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Weather Card */}
        {weatherLoading && <p>Loading weather...</p>}
        {weatherError && <p className="text-red-500">Error fetching weather.</p>}
        {weather && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">{city}</h2>
            <p className="text-lg">
              🌡 {weather.main.temp}°C
            </p>
            <p className="text-sm opacity-90">💨 {weather.wind.speed} m/s wind</p>
          </div>
        )}

        {/* History */}
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Searches</h3>
        {history.length > 0 ? (
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border"
              >
                <span className="font-medium">{item.city}</span>
                <span className="text-gray-500 text-sm">
                  {kelvinToCelsius(item.temperature)}°C • {new Date(item.searchedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No searches yet</p>
        )}
      </div>
    </div>
  );
}
