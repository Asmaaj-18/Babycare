import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { register } from "../services/auth.service";
import { useAuth } from "../context/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role") as "PARENT" | "DOCTOR";

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  babyName: "",
  babyBirthDate: "",
  babyGender: "MALE" as "MALE" | "FEMALE",
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
      const data = await register({
        ...formData,
        role: roleParam || "PARENT",
      });

      // 🔥 IMPORTANT
      localStorage.setItem("accessToken", data.token);
      setUser(data.user);

      if (data.user.role === "PARENT") {
        navigate("/parent-dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    } catch (error) {
      console.error("Register failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Register {roleParam && `as ${roleParam}`}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      {/* 🔥 Lien vers login */}
      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate(`/login?role=${roleParam}`)}
          className="text-green-500 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
