
import { WeatherData } from "@/types";
import { WEATHER_ICONS, OPENWEATHER_API_KEY } from "@/lib/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date to a user-friendly string (e.g., "Monday, April 22, 2025")
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Format date to a short string (e.g., "Apr 22")
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

// Get user's geolocation
export function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
}

// Fetch weather data from OpenWeatherMap API
export async function fetchWeatherData(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error("Weather data fetch failed");
    }
    
    const data = await response.json();
    
    return {
      description: data.weather[0].description,
      icon: WEATHER_ICONS[data.weather[0].icon] || "cloud",
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      location: data.name
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Generate a unique ID for entries
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get mood background style based on mood ID
export function getMoodBackground(moodId: string): string {
  switch (moodId) {
    case "happy":
      return "bg-gradient-to-r from-yellow-200 to-yellow-400";
    case "calm":
      return "bg-gradient-to-r from-blue-200 to-blue-300";
    case "neutral":
      return "bg-gradient-to-r from-gray-200 to-gray-300";
    case "sad":
      return "bg-gradient-to-r from-purple-200 to-purple-400";
    case "angry":
      return "bg-gradient-to-r from-red-200 to-red-400";
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-200";
  }
}

// Get weather background style based on weather icon
export function getWeatherBackground(weatherIcon: string): string {
  if (weatherIcon.includes("sun") || weatherIcon === "sun") {
    return "bg-gradient-to-r from-yellow-400 to-orange-300";
  } else if (weatherIcon.includes("cloud") && !weatherIcon.includes("rain")) {
    return "bg-gradient-to-r from-gray-300 to-gray-400";
  } else if (weatherIcon.includes("rain") || weatherIcon.includes("drizzle")) {
    return "bg-gradient-to-r from-blue-300 to-blue-400";
  } else if (weatherIcon.includes("snow")) {
    return "bg-gradient-to-r from-gray-100 to-blue-100";
  } else if (weatherIcon.includes("lightning") || weatherIcon.includes("thunder")) {
    return "bg-gradient-to-r from-gray-500 to-gray-700";
  } else {
    return "bg-gradient-to-r from-gray-200 to-gray-300";
  }
}
