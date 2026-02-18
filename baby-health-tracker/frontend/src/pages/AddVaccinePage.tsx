import { useNavigate, useParams } from "react-router-dom";
import VaccineForm from "../components/VaccineForm";
import { createVaccine } from "../services/vaccine.service";

const AddVaccinePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    name: string;
    date: string;
    status: "PENDING" | "DONE" | "MISSED";
    note?: string;
  }) => {
    if (!id) return;

    await createVaccine({
      ...data,
      babyId: id,
    });

    navigate(`/baby/${id}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-primary/20 w-full max-w-lg">

        <h1 className="text-2xl font-bold text-primary mb-6">
          💉 Add Vaccine
        </h1>

        <VaccineForm onSubmit={handleSubmit} />

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary hover:underline"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default AddVaccinePage;
