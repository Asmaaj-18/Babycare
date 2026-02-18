import api from "./api";

export interface CommentData {
  content: string;
  babyId: string;
}

export const createComment = async (data: CommentData) => {
  const res = await api.post("/comments", data);
  return res.data;
};

export const deleteComment = async (id: string) => {
  const res = await api.delete(`/comments/${id}`);
  return res.data;
};
