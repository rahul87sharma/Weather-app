import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, RefreshCcw } from "lucide-react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import HistoryList from "./components/HistoryList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async (city) => {
    try {
      setError("");
      setLoading(true);
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
      const [res1, res2] = await Promise.all([fetch(weatherURL), fetch(forecastURL)]);
      if (!res1.ok || !res2.ok) {
        throw new Error("City not found");
      }
      const data1 = await res1.json();
      const data2 = await res2.json();
      setWeather(data1);
      setForecast(data2);
      setHistory(prev => {
        let newHist = [data1.name, ...prev.filter(c => c.toLowerCase() !== data1.name.toLowerCase())];
        if (newHist.length > 5) newHist.pop();
        localStorage.setItem("weatherHistory", JSON.stringify(newHist));
        return newHist;
      });
    } catch (err) {
      console.error("API fetch error:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    fetchWeatherData(query);
  };

  const handleSelectHistory = (city) => {
    fetchWeatherData(city);
  };

  const handleDeleteCity = (cityToDelete) => {
    setHistory(prev => {
      const newHistory = prev.filter(city => city !== cityToDelete);
      localStorage.setItem("weatherHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  useEffect(() => {
    const savedHist = localStorage.getItem("weatherHistory");
    if (savedHist) {
      setHistory(JSON.parse(savedHist));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 relative ${
      darkMode ? "bg-slate-950 text-gray-100" : "bg-gray-100 text-gray-900"
    }`}>
      {/* Background */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            : "bg-[linear-gradient(to_right,#bfbfbf2e_1px,transparent_1px),linear-gradient(to_bottom,#bfbfbf2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]"
        }`}
      />
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-2 mb-4">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isLoading={loading}
          />
          {weather && (
            <Button
              onClick={() => fetchWeatherData(weather.name)}
              variant="outline"
              className="px-3 py-2"
            >
              <RefreshCcw className="mr-1 w-4 h-4 inline-block" /> Refresh
            </Button>
          )}
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="p-2"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-md mx-auto mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {weather && <WeatherCard weatherData={weather} isLoading={loading} />}

        {forecast && (
          <ForecastList forecastData={forecast.list} isLoading={loading} />
        )}

        {history.length > 0 && (
          <HistoryList
            history={history}
            onSelectCity={handleSelectHistory}
            onDeleteCity={handleDeleteCity}
          />
        )}
      </div>
    </div>
  );
}

export default App;