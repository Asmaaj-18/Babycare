import { useState } from "react";

interface SleepFormProps {
  onSubmit: (data: {
    startTime: string;
    endTime: string;
    note?: string;
  }) => void;
}

const SleepForm = ({ onSubmit }: SleepFormProps) => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
      />

      <textarea
        name="note"
        value={formData.note}
        onChange={handleChange}
      />

      <button type="submit">Add Sleep</button>
    </form>
  );
};

export default SleepForm;
