
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns";
import { cn, formatShortDate } from "@/lib/utils";
import { useJournal } from "@/contexts/JournalContext";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export function Calendar({ onSelectDate }: CalendarProps) {
  const { entries } = useJournal();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Calculate days for current month view
  const firstDay = startOfMonth(currentMonth);
  const lastDay = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: firstDay, end: lastDay });
  
  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Check if date has a journal entry
  const hasEntry = (date: Date) => {
    return entries.some(entry => 
      isSameDay(new Date(entry.date), date)
    );
  };

  return (
    <Card>
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>
            {format(currentMonth, 'MMMM yyyy')}
          </CardTitle>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay.getDay() }, (_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}
          
          {days.map((day) => {
            const hasJournalEntry = hasEntry(day);
            return (
              <button
                key={day.toString()}
                className={cn(
                  "calendar-day",
                  !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                  isToday(day) && "bg-primary/10 font-bold",
                  hasJournalEntry && !isToday(day) && "bg-accent/50",
                  hasJournalEntry && "has-entry"
                )}
                onClick={() => onSelectDate(day)}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
