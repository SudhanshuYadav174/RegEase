"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DashboardStats {
  totalReservations: number;
  upcomingToday: number;
  pendingApproval: number;
  completedThisMonth: number;
}

const stats: DashboardStats = {
  totalReservations: 47,
  upcomingToday: 3,
  pendingApproval: 2,
  completedThisMonth: 23,
};

function StatsCard({ title, value, icon: Icon, description, delay }: {
  title: string;
  value: number;
  icon: any;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 bg-card-elevated border border-card-border hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function RecentActivity() {
  const activities = [
    { id: 1, action: "New reservation", venue: "The Grand Cafe", time: "2 hours ago", type: "new" },
    { id: 2, action: "Reservation confirmed", venue: "Ocean's Breeze", time: "4 hours ago", type: "confirmed" },
    { id: 3, action: "Cancellation request", venue: "The Rooftop Grill", time: "6 hours ago", type: "cancelled" },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "new": return "text-info";
      case "confirmed": return "text-success";
      case "cancelled": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-card-elevated border border-card-border">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground">{activity.venue}</p>
              </div>
              <span className={`text-xs font-medium ${getActivityColor(activity.type)}`}>
                {activity.time}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function DashboardOverview() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 pt-6 space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your reservation overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reservations"
          value={stats.totalReservations}
          icon={Calendar}
          description="All time bookings"
          delay={0.1}
        />
        <StatsCard
          title="Today's Bookings"
          value={stats.upcomingToday}
          icon={Clock}
          description="Scheduled for today"
          delay={0.2}
        />
        <StatsCard
          title="Pending Approval"
          value={stats.pendingApproval}
          icon={AlertCircle}
          description="Awaiting confirmation"
          delay={0.3}
        />
        <StatsCard
          title="This Month"
          value={stats.completedThisMonth}
          icon={TrendingUp}
          description="Completed reservations"
          delay={0.4}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6 bg-card-elevated border border-card-border">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full p-3 text-left rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                <p className="text-sm font-medium text-primary">Create New Reservation</p>
                <p className="text-xs text-muted-foreground">Add a new booking to the system</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <p className="text-sm font-medium text-foreground">View Today's Schedule</p>
                <p className="text-xs text-muted-foreground">Check all reservations for today</p>
              </button>
              <button className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors">
                <p className="text-sm font-medium text-foreground">Generate Report</p>
                <p className="text-xs text-muted-foreground">Export reservation data</p>
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

export { DashboardOverview };