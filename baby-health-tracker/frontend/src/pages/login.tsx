import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../services/auth.service";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") as "PARENT" | "DOCTOR";

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(formData.email, formData.password);

      localStorage.setItem("accessToken", data.token);
      setUser(data.user);

      navigate(
        data.user.role === "PARENT"
          ? "/parent-dashboard"
          : "/doctor-dashboard"
      );
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-primary/10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary tracking-wide">
            Baby Health Tracker
          </h1>

          <div className="w-16 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>

          <p className="text-gray-500 mt-4 text-sm">
            Connexion {role === "DOCTOR" ? "Médecin" : "Parent"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-sm mt-6 text-center text-gray-500">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate(`/register?role=${role}`)}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            Créer un compte
          </span>
        </p>

        {/* SECURITY MESSAGE */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
          🔒 Plateforme sécurisée conforme aux normes médicales
        </div>

      </div>
    </div>
  );
};

export default Login;
