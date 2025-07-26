import { useState } from "react";
import { ReservationSidebar } from "@/components/ui/animated-sidebar";
import { ReservationsDashboard } from "@/components/ui/reservations-dashboard";
import { DashboardOverview } from "@/components/ui/dashboard-overview";
import { AllReservations } from "@/components/ui/all-reservations";
import { ReservationHistory } from "@/components/ui/reservation-history";
import { CreateReservation } from "@/components/ui/create-reservation";
import { useNavigate } from "react-router-dom";
import Analytics from "./Analytics";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />;
      case "upcoming":
        return <ReservationsDashboard />;
      case "all":
        return <AllReservations />;
      case "history":
        return <ReservationHistory />;
      case "create":
        return <CreateReservation />;
      case "analytics":
        return <Analytics />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="relative">
      {/* Sidebar and Main Content */}
      <div className="relative">
        <ReservationSidebar onNavigate={handleNavigate} currentPage={currentPage} />
        {/* Main Content Area */}
        <div className="ml-0 md:ml-64 pt-0">
          <div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
