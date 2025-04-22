
export interface MoodOption {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface WeatherData {
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  location: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO string
  mood: string; // Mood option id
  note: string;
  weather: WeatherData | null;
}
