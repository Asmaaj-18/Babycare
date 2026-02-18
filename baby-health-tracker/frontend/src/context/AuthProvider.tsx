import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../services/api";
import { AuthContext } from "./auth.context";
import type { User } from "./auth.context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false); // 🔥 IMPORTANT
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
