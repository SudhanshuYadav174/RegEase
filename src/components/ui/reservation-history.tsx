"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface HistoryReservation {
  id: number;
  venueName: string;
  date: string;
  time: string;
  partySize: number;
  status: "Completed" | "Cancelled" | "No-show";
  customerName: string;
  phone: string;
  notes?: string;
}

const historyData: HistoryReservation[] = [
  { 
    id: 1, 
    venueName: "The Grand Cafe", 
    date: "2024-07-20", 
    time: "19:00", 
    partySize: 2, 
    status: "Completed", 
    customerName: "John Doe", 
    phone: "+1 234-567-8900",
    notes: "Great experience, customer loved the ambiance"
  },
  { 
    id: 2, 
    venueName: "Ocean's Breeze", 
    date: "2024-07-15", 
    time: "20:30", 
    partySize: 4, 
    status: "Completed", 
    customerName: "Jane Smith", 
    phone: "+1 234-567-8901"
  },
  { 
    id: 3, 
    venueName: "The Rooftop Grill", 
    date: "2024-07-10", 
    time: "18:00", 
    partySize: 5, 
    status: "Cancelled", 
    customerName: "Mike Johnson", 
    phone: "+1 234-567-8902",
    notes: "Cancelled due to weather concerns"
  },
  { 
    id: 4, 
    venueName: "Bistro Central", 
    date: "2024-07-05", 
    time: "17:30", 
    partySize: 3, 
    status: "No-show", 
    customerName: "Sarah Wilson", 
    phone: "+1 234-567-8903",
    notes: "Customer did not arrive, no prior notice"
  },
  { 
    id: 5, 
    venueName: "The Garden Terrace", 
    date: "2024-06-28", 
    time: "12:00", 
    partySize: 6, 
    status: "Completed", 
    customerName: "David Brown", 
    phone: "+1 234-567-8904",
    notes: "Large family celebration, requested special seating"
  },
];

function HistoryCard({ reservation, index }: { reservation: HistoryReservation; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed": 
        return { 
          color: "bg-success text-success-foreground", 
          icon: CheckCircle,
          bgColor: "bg-success/10"
        };
      case "Cancelled": 
        return { 
          color: "bg-warning text-warning-foreground", 
          icon: AlertCircle,
          bgColor: "bg-warning/10"
        };
      case "No-show": 
        return { 
          color: "bg-destructive text-destructive-foreground", 
          icon: AlertCircle,
          bgColor: "bg-destructive/10"
        };
      default: 
        return { 
          color: "bg-muted text-muted-foreground", 
          icon: AlertCircle,
          bgColor: "bg-muted/10"
        };
    }
  };

  const statusConfig = getStatusConfig(reservation.status);
  const StatusIcon = statusConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const,
      }}
      className="group"
    >
      <Card className={cn(
        "p-6 border transition-all duration-300 hover:shadow-lg",
        statusConfig.bgColor,
        "border-card-border hover:border-primary/30"
      )}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-full", statusConfig.bgColor)}>
                <StatusIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {reservation.venueName}
                </h3>
                <p className="text-sm text-muted-foreground">{reservation.customerName}</p>
              </div>
            </div>
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit",
              statusConfig.color
            )}>
              {reservation.status}
            </span>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">{reservation.phone}</span>
            </div>
          </div>

          {/* Notes section */}
          {reservation.notes && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="text-primary hover:text-primary/80"
              >
                {expanded ? "Hide Notes" : "Show Notes"}
              </Button>
              
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-accent/50 rounded-lg"
                >
                  <p className="text-sm text-foreground">{reservation.notes}</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

function ReservationHistory() {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredHistory = historyData.filter(reservation => {
    return statusFilter === "All" || reservation.status === statusFilter;
  });

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
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={titleVariants}>
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Reservation History
          </h1>
        </div>
        <p className="text-muted-foreground">
          View past reservations and their outcomes
        </p>
      </motion.div>

      {/* Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-medium text-foreground">Filter by status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-background border border-border rounded-md px-3 py-2 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="No-show">No-show</option>
        </select>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{filteredHistory.length}</p>
          <p className="text-sm text-muted-foreground">Total Records</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success">{filteredHistory.filter(r => r.status === "Completed").length}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-warning">{filteredHistory.filter(r => r.status === "Cancelled").length}</p>
          <p className="text-sm text-muted-foreground">Cancelled</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{filteredHistory.filter(r => r.status === "No-show").length}</p>
          <p className="text-sm text-muted-foreground">No-show</p>
        </Card>
      </motion.div>

      {/* History list */}
      <div className="space-y-4">
        {filteredHistory.map((reservation, index) => (
          <HistoryCard
            key={reservation.id}
            reservation={reservation}
            index={index}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No history found</h3>
          <p className="text-muted-foreground">No reservations match the selected filter.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export { ReservationHistory };