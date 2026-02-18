import { useAuth } from "../context/useAuth";
import ParentDashboard from "./ParentDashboard.tsx";
import DoctorDashboard from "./DoctorDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === "PARENT") {
    return <ParentDashboard />;
  }

  if (user.role === "DOCTOR") {
    return <DoctorDashboard />;
  }

  return null;
};

export default Dashboard;
