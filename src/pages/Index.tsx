
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JournalProvider } from "@/contexts/JournalContext";
import { Header } from "@/components/Header";
import { JournalForm } from "@/components/JournalForm";
import { JournalHistory } from "@/components/JournalHistory";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for user preference on initial load
  useEffect(() => {
    const isDark = localStorage.getItem("moodJournalDarkMode") === "true" || 
                  window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem("moodJournalDarkMode", String(newValue));
      
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newValue;
    });
  };

  return (
    <JournalProvider>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <main className="container max-w-4xl py-4 flex-1">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          
          <Tabs defaultValue="today">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="today">Today's Entry</TabsTrigger>
              <TabsTrigger value="history">Journal History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="today" className="animate-fade-in">
              <JournalForm />
            </TabsContent>
            
            <TabsContent value="history" className="animate-fade-in">
              <JournalHistory />
            </TabsContent>
          </Tabs>
        </main>
        
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>Mood Journal with Weather Integration © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </JournalProvider>
  );
};

export default Index;
