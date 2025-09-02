import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { getHistory, getWeather } from "../services/weather";
import { logout as logoutApi } from "../services/auth";
import type { Weather, History } from "../types";

export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuth();


  // History query (typed + initialData avoids undefined)
  const { data: history= [], refetch: refetchHistory } = useQuery<History[]>({
    queryKey: ["history"],
    queryFn: getHistory,
    retry: false,
  });

  // Weather query (on-demand)
  const weatherQuery = useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    retry: false,
    enabled: false,
  });

  const handleSearch = () => {
    weatherQuery.refetch().then(res => setWeather(res.data ?? null));
    refetchHistory();
  };

  // Logout mutation (typed)
  const logoutMutation = useMutation<boolean, Error, void>({
    mutationFn: logoutApi,
    onSuccess: () => {
      setIsLoggedIn(false);
      setAccessToken("");
      queryClient.clear();
    },
  });

  return (
    <div className="max-w-md mx-auto p-4">
      <button
        onClick={() => logoutMutation.mutate()}
        className="bg-red-300 p-2 text-white rounded mb-4"
      >
        Logout
      </button>

      <div className="flex gap-2 mb-4">
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city..."
          className="border p-2 flex-1"
        />
        <button onClick={handleSearch} className="bg-green-500 text-white p-2 rounded">
          Search
        </button>
      </div>

      {weather && (
        <div className="p-4 border rounded mb-4">
          <h2 className="text-lg font-bold">{city}</h2>
          <p>{weather.main.temp}°C, {weather.wind.speed}</p>
        </div>
      )}

      <h3 className="font-semibold mb-2">Search History</h3>
      <ul className="list-disc pl-5">
        {history.map((h) => (
          <li key={h.id}>
            {h.city} - {h.temperature}°C ({h.searchedAt})
          </li>
        ))}
      </ul>
    </div>
  );
}
