import { useState } from "react";
import type { Weather } from "../types";


export default function DashboardDemo() {
  const [city, setCity] = useState("");

  // Hardcoded weather & history
  const weather: Weather | null = city
    ? {
        city,
        temp: 25,
        description: "Sunny",
        searchedAt: new Date().toLocaleString(),
      }
    : null;

  const history: Weather[] = [
    { city: "London", temp: 18, description: "Cloudy", searchedAt: "2025-08-21 10:00" },
    { city: "Paris", temp: 22, description: "Rainy", searchedAt: "2025-08-21 11:00" },
    { city: "New York", temp: 27, description: "Sunny", searchedAt: "2025-08-21 12:00" },
  ];

  const handleSearch = () => {
    // for demo, nothing fetches
    alert(`Searching weather for ${city}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white p-2 rounded"
        >
          Search
        </button>
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
