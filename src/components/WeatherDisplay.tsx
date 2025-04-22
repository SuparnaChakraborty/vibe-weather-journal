
import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/types";
import { fetchWeatherData, getUserLocation } from "@/lib/utils";

export function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getWeather() {
      try {
        setLoading(true);
        setError(null);
        
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        
        const weatherData = await fetchWeatherData(latitude, longitude);
        setWeather(weatherData);
      } catch (err) {
        console.error("Error getting weather:", err);
        setError("Unable to fetch weather data. Please check your location settings.");
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, []);

  // Dynamically get the icon component
  const getWeatherIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    
    if (IconComponent) {
      return <IconComponent className="h-8 w-8 text-blue-500" />;
    }
    
    return <LucideIcons.Cloud className="h-8 w-8 text-blue-500" />;
  };

  if (loading) {
    return (
      <Card className="weather-card animate-pulse">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading weather...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="weather-card border-red-200">
        <CardContent className="flex items-center p-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <span className="ml-2 text-sm text-muted-foreground">{error}</span>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="weather-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">{weather.location}</h3>
            <p className="text-sm capitalize text-muted-foreground">{weather.description}</p>
          </div>
          <div className="flex flex-col items-center">
            {getWeatherIcon(weather.icon)}
            <span className="text-2xl font-bold">{weather.temperature}°C</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Humidity</p>
            <p className="font-medium">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Wind</p>
            <p className="font-medium">{weather.windSpeed} m/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
