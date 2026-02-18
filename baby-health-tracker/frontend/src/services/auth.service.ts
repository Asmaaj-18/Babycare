import api from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "PARENT" | "DOCTOR";
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "PARENT" | "DOCTOR";
  };
}

export const register = async (
  data: RegisterData
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

