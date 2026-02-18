import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">

      {/* ================= LOGO ================= */}
      <Link
        to={user?.role === "DOCTOR" ? "/doctor-dashboard" : "/parent-dashboard"}
        className="flex flex-col"
      >
        <span className="text-lg font-semibold text-primary tracking-tight">
          Baby Health Tracker
        </span>
        <span className="text-xs text-gray-400">
          Medical Monitoring Platform
        </span>
      </Link>

      {/* ================= USER SECTION ================= */}
      {user && (
        <div className="flex items-center gap-6">

          {/* User Info */}
          <div className="text-right">
            <p className="text-sm text-gray-400">
              Connecté en tant que
            </p>

            <p className="text-sm font-semibold text-primary">
              {user.role === "DOCTOR" ? "Dr. " : ""}
              {user.name}
            </p>
          </div>

          {/* Role Badge */}
          <span
            className={`px-4 py-1 text-xs font-medium rounded-full ${
              user.role === "DOCTOR"
                ? "bg-secondary/30 text-black"
                : "bg-primary/10 text-primary"
            }`}
          >
            {user.role === "DOCTOR" ? "Médecin" : "Parent"}
          </span>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
          >
            Déconnexion
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
