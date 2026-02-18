import React, { useState } from "react";

interface Growth {
  id?: string;
  weight: number;
  height: number;
  headSize?: number;
}

interface GrowthFormProps {
  initialData?: Growth;
  onSubmit: (data: Growth) => void;
}

const GrowthForm: React.FC<GrowthFormProps> = ({
  initialData,
  onSubmit,
}) => {

  const [formData, setFormData] = useState<Growth>(
    initialData ?? {
      weight: 0,
      height: 0,
      headSize: 0,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.weight || !formData.height) {
      alert("Weight and height are required");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Growth Record" : "Add Growth Record"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Head Size (cm)</label>
          <input
            type="number"
            name="headSize"
            value={formData.headSize || ""}
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

export default GrowthForm;
