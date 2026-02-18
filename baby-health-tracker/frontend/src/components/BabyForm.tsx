import { useState } from "react";

interface BabyFormProps {
  initialData?: {
    name: string;
    birthDate: string;
    gender?: "MALE" | "FEMALE";
  };
  onSubmit: (data: {
    name: string;
    birthDate: string;
    gender: "MALE" | "FEMALE";
  }) => void;
}

const BabyForm = ({ initialData, onSubmit }: BabyFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    birthDate: initialData?.birthDate || "",
    gender: initialData?.gender || "MALE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      <input
        type="text"
        name="name"
        placeholder="Baby name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />

      {/* 🔥 NEW FIELD */}
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      >
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </form>
  );
};

export default BabyForm;
