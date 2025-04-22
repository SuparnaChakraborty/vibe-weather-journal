
import * as LucideIcons from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntry } from "@/types";
import { MOOD_OPTIONS } from "@/lib/constants";
import { getMoodBackground } from "@/lib/utils";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const moodOption = MOOD_OPTIONS.find(m => m.id === entry.mood);
  
  // Dynamically get the icon component
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    
    if (IconComponent) {
      return <IconComponent className="h-5 w-5" />;
    }
    
    return null;
  };
  
  const dateFormatted = format(new Date(entry.date), 'EEEE, MMMM d, yyyy');
  const moodBackground = getMoodBackground(entry.mood);
  
  return (
    <Card className={`overflow-hidden ${moodBackground} text-white`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{dateFormatted}</CardTitle>
          {moodOption && (
            <div className="flex items-center space-x-1">
              {getIcon(moodOption.icon)}
              <span>{moodOption.label}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {entry.note ? (
          <p className="whitespace-pre-line">{entry.note}</p>
        ) : (
          <p className="text-white/70 italic">No notes for this day</p>
        )}
        
        {entry.weather && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getIcon(entry.weather.icon)}
                <span className="ml-1 capitalize">{entry.weather.description}</span>
              </div>
              <div>
                <span className="font-bold">{entry.weather.temperature}°C</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
