"use client";

import { motion } from "framer-motion";
import { Plus, Calendar, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NewReservationForm {
  customerName: string;
  phone: string;
  email: string;
  venueName: string;
  date: string;
  time: string;
  partySize: number;
  specialRequests: string;
}

function CreateReservation() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<NewReservationForm>({
    customerName: "",
    phone: "",
    email: "",
    venueName: "",
    date: "",
    time: "",
    partySize: 1,
    specialRequests: "",
  });

  const venues = [
    "The Grand Cafe",
    "Ocean's Breeze",
    "The Rooftop Grill",
    "Bistro Central",
    "The Garden Terrace",
    "Sunset Lounge",
  ];

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const handleInputChange = (field: keyof NewReservationForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerName || !formData.phone || !formData.venueName || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    console.log("Creating new reservation:", formData);
    
    toast({
      title: "Reservation Created!",
      description: `New reservation for ${formData.customerName} at ${formData.venueName} has been created.`,
    });

    // Reset form
    setFormData({
      customerName: "",
      phone: "",
      email: "",
      venueName: "",
      date: "",
      time: "",
      partySize: 1,
      specialRequests: "",
    });
  };

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

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 flex flex-col items-center"
    >
      {/* Header */}
      <motion.div variants={titleVariants} className="w-full max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Plus className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Create New Reservation
          </h1>
        </div>
        <p className="text-muted-foreground">
          Add a new reservation to the system
        </p>
      </motion.div>

      {/* Form */}
      <motion.div variants={formVariants} className="w-full max-w-3xl mx-auto mt-4">
        <Card className="p-8 bg-card-elevated border border-card-border w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Customer Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 234-567-8900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="customer@example.com"
                />
              </div>
            </div>

            {/* Reservation Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Reservation Details
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="venueName">Venue *</Label>
                <select
                  id="venueName"
                  value={formData.venueName}
                  onChange={(e) => handleInputChange("venueName", e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>{venue}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm"
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partySize">Party Size *</Label>
                  <Input
                    id="partySize"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.partySize}
                    onChange={(e) => handleInputChange("partySize", parseInt(e.target.value) || 1)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Additional Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                  placeholder="Any special requirements, dietary restrictions, or seating preferences..."
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm min-h-[100px] resize-vertical"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Create Reservation
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => window.history.back()}
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-3xl mx-auto"
      >
        <Card className="p-6 bg-primary/5 border border-primary/20 w-full">
          <h4 className="font-semibold text-foreground mb-2">Quick Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Double-check the date and time before creating the reservation</li>
            <li>• Contact the customer to confirm their phone number and special requests</li>
            <li>• Large parties (8+ guests) may require additional confirmation</li>
            <li>• Peak hours (7-9 PM) may have limited availability</li>
          </ul>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export { CreateReservation };