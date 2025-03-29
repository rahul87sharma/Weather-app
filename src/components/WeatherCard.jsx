
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WeatherCard = ({ weatherData, isLoading }) => {
  if (!weatherData) return null;
  const { name, sys, weather, main, wind } = weatherData;
 
  const cityName = name;
  const country = sys?.country;
  const condition = weather[0]?.main || "";        
  const conditionDesc = weather[0]?.description || ""; 
  const iconCode = weather[0]?.icon;               
  const temperature = Math.round(main.temp);       
  const humidity = main.humidity;
  const windSpeedKmh = (wind.speed * 3.6).toFixed(1);  


  const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;


  const cityDisplay = country ? `${cityName}, ${country}` : cityName;

  return (
    <Card
      className={`max-w-xl mx-auto mb-4 ${
        isLoading ? "animate-pulse" : ""
      } bg-opacity-0 dark:bg-opacity-0 backdrop-blur-sm dark:backdrop-blur-md border-opacity-30 dark:border-opacity-30 transition-all duration-300`}
    >
      <CardHeader>
        <CardTitle className="text-2xl">
          {cityDisplay}
        </CardTitle>
        <p className="text-sm text-muted-foreground capitalize">{conditionDesc}</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (

          <div className="animate-pulse flex items-center">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
            <div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>
          </div>
        ) : (

          <div className="flex items-center">
            {iconUrl && (
              <img src={iconUrl} alt={condition} className="w-16 h-16 mr-4" />
            )}
            <div>
              <div className="text-4xl font-bold">{temperature}°C</div>
              <div className="text-md mt-1">Humidity: {humidity}%</div>
              <div className="text-md">Wind: {windSpeedKmh} km/h</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;