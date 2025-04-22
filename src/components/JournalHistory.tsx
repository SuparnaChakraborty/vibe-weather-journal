
import { useState } from "react";
import { format } from "date-fns";
import * as LucideIcons from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJournal } from "@/contexts/JournalContext";
import { MOOD_OPTIONS } from "@/lib/constants";
import { Calendar } from "./Calendar";
import { JournalEntryCard } from "./JournalEntryCard";

export function JournalHistory() {
  const { entries, getEntryByDate, getEntriesByMood } = useJournal();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterMood, setFilterMood] = useState<string | null>(null);
  
  const filteredEntries = filterMood 
    ? getEntriesByMood(filterMood) 
    : entries;
  
  const selectedEntry = selectedDate 
    ? getEntryByDate(selectedDate.toISOString()) 
    : null;
  
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Calendar onSelectDate={handleSelectDate} />
            </div>
            
            <div className="md:col-span-2">
              {selectedEntry ? (
                <JournalEntryCard entry={selectedEntry} />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    {selectedDate ? (
                      <p>No entry for {format(selectedDate, 'MMMM d, yyyy')}</p>
                    ) : (
                      <p>Select a date to view your journal entry</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Journal Entries</CardTitle>
                <Select 
                  value={filterMood || ""} 
                  onValueChange={val => setFilterMood(val || null)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All moods</SelectItem>
                    {MOOD_OPTIONS.map(mood => (
                      <SelectItem key={mood.id} value={mood.id}>
                        {mood.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {filteredEntries.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No journal entries found
                </p>
              ) : (
                <div className="space-y-4">
                  {filteredEntries
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map(entry => (
                      <JournalEntryCard key={entry.id} entry={entry} />
                    ))
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
