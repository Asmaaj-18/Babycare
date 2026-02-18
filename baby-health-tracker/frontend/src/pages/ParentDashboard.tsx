import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BabyCard from "../components/BabyCard";
import BabyForm from "../components/BabyForm";
import {
  getBabies,
  createBaby,
  deleteBaby,
} from "../services/baby.service";

import type { Baby } from "../services/baby.service";

const ParentDashboard = () => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBabies = async () => {
      try {
        const data = await getBabies();
        setBabies(data);
      } catch (error) {
        console.error("Error loading babies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBabies();
  }, []);

  const handleCreate = async (data: {
    name: string;
    birthDate: string;
    gender: "MALE" | "FEMALE";
  }) => {
    const newBaby = await createBaby(data);
    setBabies((prev) => [...prev, newBaby]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await deleteBaby(id);
    setBabies((prev) =>
      prev.filter((b) => b.id !== id)
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement des données...
      </div>
    );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background p-10 max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-12">

          <h1 className="text-3xl font-bold text-primary mb-2">
            Espace Parent
          </h1>

          <p className="text-gray-500">
            Gérez et consultez le suivi médical de votre enfant
          </p>

          <div className="w-20 h-1 bg-secondary mt-4 rounded-full"></div>

        </div>

        {/* ================= ACTION BAR ================= */}
        <div className="flex justify-end mb-8">

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition font-medium"
          >
            {showForm ? "Annuler" : "Ajouter un enfant"}
          </button>

        </div>

        {/* ================= FORM SECTION ================= */}
        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10 mb-10">
            <h2 className="text-lg font-semibold text-primary mb-6">
              Informations de l’enfant
            </h2>

            <BabyForm onSubmit={handleCreate} />
          </div>
        )}

        {/* ================= BABY LIST SECTION ================= */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">
              Enfants enregistrés
            </h2>

            <span className="text-sm text-gray-400">
              {babies.length} dossier(s)
            </span>
          </div>

          <div className="border-t border-gray-100 pt-6">

            {babies.length === 0 ? (
              <p className="text-gray-500 text-center">
                Aucun enfant enregistré pour le moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {babies.map((baby) => (
                  <BabyCard
                    key={baby.id}
                    {...baby}
                    onSelect={(id: string) =>
                      window.location.href = `/baby/${id}`
                    }
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default ParentDashboard;
