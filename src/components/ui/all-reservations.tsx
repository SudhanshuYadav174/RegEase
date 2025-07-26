"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, X, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Reservation {
  id: number;
  venueName: string;
  date: string;
  time: string;
  partySize: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  customerName: string;
  phone: string;
}

const allReservationsData: Reservation[] = [
  { id: 1, venueName: "The Grand Cafe", date: "2024-08-15", time: "19:00", partySize: 2, status: "Confirmed", customerName: "John Doe", phone: "+1 234-567-8900" },
  { id: 2, venueName: "Ocean's Breeze", date: "2024-08-22", time: "20:30", partySize: 4, status: "Confirmed", customerName: "Jane Smith", phone: "+1 234-567-8901" },
  { id: 3, venueName: "The Rooftop Grill", date: "2024-09-01", time: "18:00", partySize: 5, status: "Pending", customerName: "Mike Johnson", phone: "+1 234-567-8902" },
  { id: 4, venueName: "Bistro Central", date: "2024-07-28", time: "17:30", partySize: 3, status: "Cancelled", customerName: "Sarah Wilson", phone: "+1 234-567-8903" },
  { id: 5, venueName: "The Garden Terrace", date: "2024-08-10", time: "12:00", partySize: 6, status: "Confirmed", customerName: "David Brown", phone: "+1 234-567-8904" },
  { id: 6, venueName: "Sunset Lounge", date: "2024-08-18", time: "21:00", partySize: 2, status: "Pending", customerName: "Emma Davis", phone: "+1 234-567-8905" },
];

function ReservationCard({ reservation, index }: { reservation: Reservation; index: number }) {
  const handleCancel = () => {
    console.log("Cancel reservation:", reservation.id);
  };

  const handleEdit = () => {
    console.log("Edit reservation:", reservation.id);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-success text-success-foreground";
      case "Pending": return "bg-warning text-warning-foreground";
      case "Cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
      <Card className="p-6 bg-card-elevated border border-card-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left section - Main info */}
          <div className="flex-1 space-y-4">
            {/* Venue name and status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {reservation.venueName}
                </h3>
                <p className="text-sm text-muted-foreground">{reservation.customerName}</p>
              </div>
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit",
                getStatusColor(reservation.status)
              )}>
                {reservation.status}
              </span>
            </div>

            {/* Details grid */}
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
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
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

function AllReservations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredReservations = allReservationsData.filter(reservation => {
    const matchesSearch = reservation.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
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
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            All Reservations
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage all your reservations in one place
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by venue or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{filteredReservations.length}</p>
          <p className="text-sm text-muted-foreground">Total Showing</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-success">{filteredReservations.filter(r => r.status === "Confirmed").length}</p>
          <p className="text-sm text-muted-foreground">Confirmed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-warning">{filteredReservations.filter(r => r.status === "Pending").length}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{filteredReservations.filter(r => r.status === "Cancelled").length}</p>
          <p className="text-sm text-muted-foreground">Cancelled</p>
        </Card>
      </motion.div>

      {/* Reservations list */}
      <div className="space-y-4">
        {filteredReservations.map((reservation, index) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            index={index}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredReservations.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No reservations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export { AllReservations };