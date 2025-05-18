import { useState } from "react";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  RefreshCcw,
} from "lucide-react";

// Mock calendar data
const calendarData = {
  month: "April",
  year: 2023,
  days: Array.from({ length: 30 }, (_, i) => i + 1),
  events: [
    {
      id: 1,
      title: "Client Meeting",
      description: "Discuss pool coating project",
      date: "2023-04-24",
      time: "10:00 AM",
      type: "meeting",
      relatedTo: "City Recreation Department"
    },
    {
      id: 2,
      title: "Follow-up Call",
      description: "Marina dock restoration proposal",
      date: "2023-04-22",
      time: "2:30 PM",
      type: "call",
      relatedTo: "Coastal Marinas LLC"
    },
    {
      id: 3,
      title: "Project Kickoff",
      description: "Building waterproofing project start",
      date: "2023-04-28",
      time: "9:00 AM",
      type: "project",
      relatedTo: "ABC Construction"
    },
    {
      id: 4,
      title: "Product Demo",
      description: "Fire retardant application showcase",
      date: "2023-04-25",
      time: "1:00 PM",
      type: "demo",
      relatedTo: "Regional Fire Prevention"
    },
    {
      id: 5,
      title: "Team Meeting",
      description: "Weekly status update",
      date: "2023-04-22",
      time: "9:00 AM",
      type: "internal",
      relatedTo: null
    },
    {
      id: 6,
      title: "Site Visit",
      description: "Mobile home community inspection",
      date: "2023-04-23",
      time: "11:00 AM",
      type: "site-visit",
      relatedTo: "Sunrise Mobile Estates"
    }
  ]
};

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "meeting":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "call":
      return "bg-green-100 text-green-800 border-green-300";
    case "project":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "demo":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "internal":
      return "bg-gray-100 text-gray-800 border-gray-300";
    case "site-visit":
      return "bg-orange-100 text-orange-800 border-orange-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const getDayEvents = (day: number) => {
  // Format the day to match the date format in events
  const formattedDay = day.toString().padStart(2, "0");
  const dateStr = `2025-04-${formattedDay}`;
  
  return calendarData.events.filter(event => event.date === dateStr);
};

const getMonthDays = () => {
  // For simplicity, we're just generating April 2025 with 30 days
  // In a real implementation, this would account for the actual month/year
  return Array.from({ length: 30 }, (_, i) => i + 1);
};

const getWeekDays = () => {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
};

export default function CalendarContent() {
  const { refreshData } = useAdminContext();
  const [viewType, setViewType] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const days = getMonthDays();
  const weekDays = getWeekDays();
  
  // For a simple mockup, we'll start April 2025 on a Tuesday (index 2)
  const startDayOffset = 2;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Manage your schedule and appointments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refreshData} size="sm" variant="outline" className="h-9">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">{calendarData.month} {calendarData.year}</h3>
          <Button size="sm" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={viewType === "month" ? "default" : "outline"}
            onClick={() => setViewType("month")}
          >
            Month
          </Button>
          <Button 
            size="sm" 
            variant={viewType === "week" ? "default" : "outline"}
            onClick={() => setViewType("week")}
          >
            Week
          </Button>
          <Button 
            size="sm" 
            variant={viewType === "day" ? "default" : "outline"}
            onClick={() => setViewType("day")}
          >
            Day
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="meetings">Meetings</SelectItem>
              <SelectItem value="calls">Calls</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewType === "month" && (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
              {weekDays.map((day, i) => (
                <div 
                  key={i} 
                  className="bg-white dark:bg-gray-800 p-2 text-center font-medium"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells for days before the start of the month */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div 
                  key={`empty-${i}`} 
                  className="bg-white dark:bg-gray-800 p-2 min-h-[100px]"
                />
              ))}

              {/* Calendar days */}
              {days.map((day) => {
                const dayEvents = getDayEvents(day);
                const isToday = day === 22; // Simulating April 22 as today
                
                return (
                  <div 
                    key={day} 
                    className={`bg-white dark:bg-gray-800 p-2 min-h-[100px] border ${
                      isToday ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'
                    }`}
                  >
                    <div className={`text-right mb-1 ${
                      isToday ? 'font-bold text-blue-600 dark:text-blue-400' : ''
                    }`}>
                      {day}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 rounded cursor-pointer truncate ${
                            getEventTypeColor(event.type)
                          }`}
                        >
                          {event.time} - {event.title}
                        </div>
                      ))}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-center text-muted-foreground">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {viewType === "week" && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[500px] text-center">
            <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Week View</p>
            <p className="text-sm text-muted-foreground mt-1">
              This is a placeholder for the week view calendar.
            </p>
          </CardContent>
        </Card>
      )}

      {viewType === "day" && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[500px] text-center">
            <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Day View</p>
            <p className="text-sm text-muted-foreground mt-1">
              This is a placeholder for the day view calendar.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calendarData.events.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-start space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-16 text-center">
                <p className="text-sm font-medium">{event.date.split('-')[2]}</p>
                <p className="text-xs text-muted-foreground">Apr</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`${getEventTypeColor(event.type)}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace("-", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm">{event.time}</p>
                  {event.relatedTo && (
                    <p className="text-xs text-muted-foreground">
                      Related to: {event.relatedTo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}