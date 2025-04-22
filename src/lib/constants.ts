
import { MoodOption } from "@/types";

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "happy",
    label: "Happy",
    icon: "smile",
    color: "bg-mood-happy"
  },
  {
    id: "calm",
    label: "Calm",
    icon: "cloud",
    color: "bg-mood-calm"
  },
  {
    id: "neutral",
    label: "Neutral",
    icon: "meh",
    color: "bg-mood-neutral"
  },
  {
    id: "sad",
    label: "Sad",
    icon: "frown",
    color: "bg-mood-sad"
  },
  {
    id: "angry",
    label: "Angry",
    icon: "angry",
    color: "bg-mood-angry"
  }
];

export const WEATHER_ICONS: Record<string, string> = {
  "01d": "sun",
  "01n": "moon",
  "02d": "cloud-sun",
  "02n": "cloud-moon",
  "03d": "cloud",
  "03n": "cloud",
  "04d": "cloud",
  "04n": "cloud",
  "09d": "cloud-rain",
  "09n": "cloud-rain",
  "10d": "cloud-sun-rain",
  "10n": "cloud-moon-rain",
  "11d": "cloud-lightning",
  "11n": "cloud-lightning",
  "13d": "cloud-snow",
  "13n": "cloud-snow",
  "50d": "cloud-fog",
  "50n": "cloud-fog"
};

export const OPENWEATHER_API_KEY = "8d2de98e089f1c28e1a22fc19a24ef04"; // Public API key for demo
