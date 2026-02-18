
import api from "./api";

export interface Baby {
  id: string;
  name: string;
  birthDate: string;
}

export interface Growth {
  id: string;
  weight: number;
  height: number;
  headSize?: number;
  createdAt: string;
}

export interface Sleep {
  id: string;
  startTime: string;
  endTime: string;
  note?: string;
  createdAt: string;
}

export interface Vaccine {
  id: string;
  name: string;
  date: string;
  status: "PENDING" | "DONE" | "MISSED";
  note?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    role: "PARENT" | "DOCTOR";
  };
}

export interface BabyDetailsType {
  id: string;
  name: string;
  birthDate: string;
  gender?: string;
  growth: Growth[];
  sleep: Sleep[];
  vaccines: Vaccine[];
  comments: Comment[];
}


export const getBabies = async (): Promise<Baby[]> => {
  const res = await api.get("/babies");
  return res.data;
};

export const createBaby = async (data: {
  name: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
}) => {
  const res = await api.post("/babies", data);
  return res.data;
};


export const updateBaby = async (
  id: string,
  data: Partial<Baby>
) => {
  const res = await api.put(`/babies/${id}`, data);
  return res.data;
};

export const deleteBaby = async (id: string) => {
  const res = await api.delete(`/babies/${id}`);
  return res.data;
};

export const getBabyDashboard = async (id: string) => {
  const res = await api.get(`/babies/${id}/full`);
  return res.data;
};
