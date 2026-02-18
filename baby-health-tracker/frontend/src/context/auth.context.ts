import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "PARENT" | "DOCTOR";
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean; 
}


export const AuthContext = createContext<AuthContextType | null>(null);
