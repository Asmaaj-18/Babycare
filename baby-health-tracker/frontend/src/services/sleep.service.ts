import api from "./api";

export interface SleepData {
  startTime: string;
  endTime: string;
  note?: string;
  babyId: string;
}

export const createSleep = async (data: SleepData) => {
  const res = await api.post("/sleep", data);
  return res.data;
};

export const updateSleep = async (
  id: string,
  data: Partial<SleepData>
) => {
  const res = await api.put(`/sleep/${id}`, data);
  return res.data;
};

export const deleteSleep = async (id: string) => {
  const res = await api.delete(`/sleep/${id}`);
  return res.data;
};
