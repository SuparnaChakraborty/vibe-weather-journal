
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface HeaderProps {
  toggleDarkMode?: () => void;
  darkMode?: boolean;
}

export function Header({ toggleDarkMode, darkMode }: HeaderProps) {
  const today = new Date();
  
  return (
    <header className="flex items-center justify-between py-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Mood Journal</h1>
        <p className="text-muted-foreground">{formatDate(today)}</p>
      </div>
      
      {toggleDarkMode && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      )}
    </header>
  );
}
