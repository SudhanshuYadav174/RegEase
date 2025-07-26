import { Card } from "@/components/ui/card";
import { BarChart2, Calendar, Clock, MapPin } from "lucide-react";

const dummyData = {
  totalReservations: 47,
  mostPopularVenue: "The Grand Cafe",
  busiestTime: "19:00",
  reservationsPerDay: [
    { day: "Mon", count: 5 },
    { day: "Tue", count: 7 },
    { day: "Wed", count: 6 },
    { day: "Thu", count: 8 },
    { day: "Fri", count: 10 },
    { day: "Sat", count: 7 },
    { day: "Sun", count: 4 },
  ],
};

const Analytics = () => (
  <div className="p-6 max-w-4xl mx-auto space-y-8">
    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
      <BarChart2 className="h-7 w-7 text-primary" /> Analytics Overview
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 flex flex-col items-center">
        <Calendar className="h-8 w-8 text-primary mb-2" />
        <p className="text-2xl font-bold">{dummyData.totalReservations}</p>
        <p className="text-sm text-muted-foreground">Total Reservations</p>
      </Card>
      <Card className="p-6 flex flex-col items-center">
        <MapPin className="h-8 w-8 text-primary mb-2" />
        <p className="text-lg font-semibold">{dummyData.mostPopularVenue}</p>
        <p className="text-sm text-muted-foreground">Most Popular Venue</p>
      </Card>
      <Card className="p-6 flex flex-col items-center">
        <Clock className="h-8 w-8 text-primary mb-2" />
        <p className="text-lg font-semibold">{dummyData.busiestTime}</p>
        <p className="text-sm text-muted-foreground">Busiest Time Slot</p>
      </Card>
    </div>
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Reservations Per Day</h2>
      <div className="flex items-end gap-4 h-40">
        {dummyData.reservationsPerDay.map((d) => (
          <div key={d.day} className="flex flex-col items-center flex-1">
            <div
              className="w-8 rounded-t bg-primary"
              style={{ height: `${d.count * 12}px` }}
            ></div>
            <span className="mt-2 text-sm text-muted-foreground">{d.day}</span>
            <span className="text-xs text-foreground">{d.count}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

export default Analytics; 