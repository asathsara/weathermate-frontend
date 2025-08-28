import { useState, useEffect } from "react";
import apiClient from "../services/api";
import type { Weather, History } from "../types";


export default function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [history, setHistory] = useState<History>([]);


  const fetchHistory = async () => {
    try {
      const res = await apiClient.get('api/history');
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleSearch = async () => {
    try {
      const res = await apiClient.get(`api/weather/${city}`);
      setWeather(res.data);
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => { fetchHistory(); }, []);


  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city..." className="border p-2 flex-1" />
        <button onClick={handleSearch} className="bg-green-500 text-white p-2 rounded">Search</button>
      </div>


      {weather && (
        <div className="p-4 border rounded mb-4">
          <h2 className="text-lg font-bold">{weather.city}</h2>
          <p>{weather.temp}°C, {weather.description}</p>
        </div>
      )}


      <h3 className="font-semibold mb-2">Search History</h3>
      <ul className="list-disc pl-5">
        {history.map((h, idx) => (
          <li key={idx}>
            {h.city} - {h.temp}°C - {h.description} ({h.searchedAt})
          </li>
        ))}
      </ul>
    </div>
  );
}