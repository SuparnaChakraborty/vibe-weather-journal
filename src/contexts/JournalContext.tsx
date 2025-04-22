
import React, { createContext, useContext, useState, useEffect } from "react";
import { JournalEntry } from "@/types";

interface JournalContextProps {
  entries: JournalEntry[];
  addEntry: (entry: JournalEntry) => void;
  getEntryByDate: (date: string) => JournalEntry | undefined;
  getEntriesByMood: (moodId: string) => JournalEntry[];
}

const JournalContext = createContext<JournalContextProps | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("moodJournalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("moodJournalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: JournalEntry) => {
    // Check if an entry already exists for this date
    const existingEntryIndex = entries.findIndex((e) => 
      new Date(e.date).toDateString() === new Date(entry.date).toDateString()
    );

    if (existingEntryIndex >= 0) {
      // Replace the existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = entry;
      setEntries(updatedEntries);
    } else {
      // Add a new entry
      setEntries((prev) => [...prev, entry]);
    }
  };

  const getEntryByDate = (date: string) => {
    const dateStr = new Date(date).toDateString();
    return entries.find((entry) => new Date(entry.date).toDateString() === dateStr);
  };

  const getEntriesByMood = (moodId: string) => {
    return entries.filter((entry) => entry.mood === moodId);
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, getEntryByDate, getEntriesByMood }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
