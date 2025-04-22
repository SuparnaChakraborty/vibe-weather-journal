
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { MoodSelector } from "@/components/MoodSelector";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useJournal } from "@/contexts/JournalContext";
import { generateId, getUserLocation, fetchWeatherData } from "@/lib/utils";
import { WeatherData } from "@/types";

export function JournalForm() {
  const { addEntry } = useJournal();
  const { toast } = useToast();
  const [mood, setMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!mood) {
      toast({
        title: "Please select a mood",
        description: "You need to select how you're feeling today.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Get weather data
      let weatherData: WeatherData | null = null;
      try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        weatherData = await fetchWeatherData(latitude, longitude);
      } catch (error) {
        console.error("Failed to get weather data:", error);
        // Continue without weather data
      }
      
      // Create entry
      const entry = {
        id: generateId(),
        date: new Date().toISOString(),
        mood,
        note,
        weather: weatherData
      };
      
      addEntry(entry);
      
      // Reset form
      setMood(null);
      setNote("");
      
      toast({
        title: "Journal entry saved!",
        description: "Your mood and notes have been recorded for today."
      });
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error saving entry",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <WeatherDisplay />
        
        <Card className="journal-card">
          <CardContent className="p-0">
            <MoodSelector selectedMood={mood} onChange={setMood} />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Add notes about your day</h2>
              <Textarea
                placeholder="Write down your thoughts, activities, or anything notable about today..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[120px] input-field"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Journal Entry"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
