import React, { useState } from "react";

type VaccineStatus = "PENDING" | "DONE" | "MISSED";

interface Vaccine {
  id?: string;
  name: string;
  date: string;
  status: VaccineStatus;
  note?: string;
}

interface VaccineFormProps {
  initialData?: Vaccine;
  onSubmit: (data: Vaccine) => void;
}

const VaccineForm: React.FC<VaccineFormProps> = ({
  initialData,
  onSubmit,
}) => {

  const [formData, setFormData] = useState<Vaccine>(
    initialData ?? {
      name: "",
      date: "",
      status: "PENDING",
      note: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.date) {
      alert("Vaccine name and date are required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Vaccine" : "Add Vaccine"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Vaccine Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
            <option value="MISSED">Missed</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default VaccineForm;
