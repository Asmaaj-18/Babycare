import api from "./api";

export interface GrowthData {
  weight: number;
  height: number;
  headSize?: number;
  babyId: string;
}

export const createGrowth = async (data: GrowthData) => {
  const res = await api.post("/growth", data);
  return res.data;
};

export const updateGrowth = async (
  id: string,
  data: Partial<GrowthData>
) => {
  const res = await api.put(`/growth/${id}`, data);
  return res.data;
};

export const deleteGrowth = async (id: string) => {
  const res = await api.delete(`/growth/${id}`);
  return res.data;
};
