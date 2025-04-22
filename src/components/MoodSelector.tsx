
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { MoodOption } from "@/types";
import { MOOD_OPTIONS } from "@/lib/constants";

interface MoodSelectorProps {
  selectedMood: string | null;
  onChange: (moodId: string) => void;
}

export function MoodSelector({ selectedMood, onChange }: MoodSelectorProps) {
  // Dynamically get the icon component
  const getMoodIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    
    if (IconComponent) {
      return <IconComponent className="h-8 w-8" />;
    }
    
    return <LucideIcons.HelpCircle className="h-8 w-8" />;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {MOOD_OPTIONS.map((mood: MoodOption) => (
          <button
            key={mood.id}
            onClick={() => onChange(mood.id)}
            className={cn(
              "mood-card",
              mood.color,
              selectedMood === mood.id && "selected"
            )}
            aria-selected={selectedMood === mood.id}
          >
            <div className="text-white mb-2">{getMoodIcon(mood.icon)}</div>
            <span className="text-white font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
