import { Card, CardContent } from "@/components/ui/card";

const ForecastList = ({ forecastData, isLoading }) => {
  if (!forecastData) return null;


  const dailyForecasts = forecastData
    .filter(item => item.dt_txt.includes("12:00:00")) 


  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="max-w-xl mx-auto mb-4">
      <div className="grid grid-cols-5 gap-2">
        {isLoading ? (

          Array(5).fill().map((_, idx) => (
            <Card
              key={idx}
              className="animate-pulse bg-opacity-0 dark:bg-opacity-0 backdrop-blur-sm dark:backdrop-blur-md border-opacity-30 dark:border-opacity-30 transition-all duration-300"
            >
              <CardContent className="p-4 text-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12 mx-auto mb-2"></div>
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16 mx-auto"></div>
              </CardContent>
            </Card>
          ))
        ) : (

          dailyForecasts.map((day, idx) => {
            const dayName = getDayName(day.dt_txt);
            const temp = Math.round(day.main.temp);
            const condition = day.weather[0]?.main || "";
            const iconCode = day.weather[0]?.icon;
            const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : null;

            return (
              <Card
                key={idx}
                className="bg-opacity-0 dark:bg-opacity-0 backdrop-blur-sm dark:backdrop-blur-md border-opacity-30 dark:border-opacity-30 transition-all duration-300"
              >
                <CardContent className="p-4 text-center">
                  <div className="text-sm font-medium">{dayName}</div>
                  {iconUrl && (
                    <img
                      src={iconUrl}
                      alt={condition}
                      className="w-8 h-8 mx-auto my-2"
                    />
                  )}
                  <div className="text-lg font-semibold">{temp}°C</div>
                  <div className="text-xs capitalize">{condition}</div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ForecastList;