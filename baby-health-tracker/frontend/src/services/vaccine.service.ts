import api from "./api";

export interface VaccineData {
  name: string;
  date: string;
  status: "PENDING" | "DONE" | "MISSED";
  note?: string;
  babyId: string;
}

export const createVaccine = async (data: VaccineData) => {
  const res = await api.post("/vaccines", data);
  return res.data;
};

export const updateVaccine = async (
  id: string,
  data: Partial<VaccineData>
) => {
  const res = await api.put(`/vaccines/${id}`, data);
  return res.data;
};

export const deleteVaccine = async (id: string) => {
  const res = await api.delete(`/vaccines/${id}`);
  return res.data;
};
