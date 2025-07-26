"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Reservation {
  id: number;
  venueName: string;
  date: string;
  time: string;
  partySize: number;
  status: "Confirmed" | "Pending";
}

const reservationsData: Reservation[] = [
  { id: 1, venueName: "The Grand Cafe", date: "2024-08-15", time: "19:00", partySize: 2, status: "Confirmed" },
  { id: 2, venueName: "Ocean's Breeze", date: "2024-08-22", time: "20:30", partySize: 4, status: "Confirmed" },
  { id: 3, venueName: "The Rooftop Grill", date: "2024-09-01", time: "18:00", partySize: 5, status: "Pending" }
];

function ReservationCard({ reservation, index }: { reservation: Reservation; index: number }) {
  const handleCancel = () => {
    console.log("Cancel reservation:", reservation.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statusColor = reservation.status === "Confirmed" 
    ? "bg-success text-success-foreground" 
    : "bg-warning text-warning-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="group"
    >
      <Card className="p-6 bg-card-elevated border border-card-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left section - Main info */}
          <div className="flex-1 space-y-4">
            {/* Venue name and status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {reservation.venueName}
              </h3>
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit",
                statusColor
              )}>
                {reservation.status}
              </span>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">{formatDate(reservation.date)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{reservation.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">{reservation.partySize} {reservation.partySize === 1 ? 'guest' : 'guests'}</span>
              </div>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 hover:scale-105"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ReservationsDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div variants={titleVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Upcoming Reservations
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage your dining reservations
        </p>
      </motion.div>

      {/* Reservations list */}
      <div className="space-y-4">
        {reservationsData.map((reservation, index) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            index={index}
          />
        ))}
      </div>

      {/* Empty state - if no reservations */}
      {reservationsData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No upcoming reservations</h3>
          <p className="text-muted-foreground">Your reservations will appear here once you make them.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export { ReservationsDashboard };