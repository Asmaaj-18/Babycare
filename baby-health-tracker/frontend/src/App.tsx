import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthChoice from "./pages/AuthChoice";
import Login from "./pages/login";
import Register from "./pages/register";
import ParentDashboard from "./pages/ParentDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import BabyDetails from "./pages/BabyDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import AddGrowthPage from "./pages/AddGrowthPage";
import AddSleepPage from "./pages/AddSleepPage";
import AddVaccinePage from "./pages/AddVaccinePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Choix profil */}
          <Route path="/" element={<AuthChoice />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Parent Dashboard */}
          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />

          {/* Doctor Dashboard */}
          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
            {/* Add Growth Record */}
            <Route
  path="/baby/:id/add-growth"
  element={<AddGrowthPage />}
/>

            {/* Add Vaccine Record */}
<Route
  path="/baby/:id/add-vaccine"
  element={<AddVaccinePage />}
/>
            {/* Add Sleep Record */}
<Route
  path="/baby/:id/add-sleep"
  element={<AddSleepPage />}
/>

          {/* Baby Details */}
          <Route
            path="/baby/:id"
            element={
              <ProtectedRoute>
                <BabyDetails />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
