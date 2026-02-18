import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BabyCard from "../components/BabyCard";
import { getBabies } from "../services/baby.service";
import { useAuth } from "../context/useAuth";

import type { Baby } from "../services/baby.service";

const DoctorDashboard = () => {
  const { user } = useAuth();

  const [babies, setBabies] = useState<Baby[]>([]);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement des dossiers patients...
      </div>
    );

  // ================= STATS =================

  const totalPatients = babies.length;
  const activePatients = babies.length;
  

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background p-10 max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-10">

          <h1 className="text-3xl font-bold text-primary mb-2">
            Tableau de bord médical
          </h1>

          <p className="text-gray-500">
            Consultation et gestion des dossiers patients
          </p>

          <div className="w-20 h-1 bg-secondary mt-4 rounded-full"></div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-sm text-gray-400">
                Connecté en tant que
              </p>

              <p className="text-lg font-semibold text-primary">
                Dr. {user?.name}
              </p>
            </div>

            <span className="px-4 py-1 text-sm rounded-full bg-secondary/30 text-black font-medium">
              Médecin
            </span>
          </div>

        </div>

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          <StatCard
            title="Patients enregistrés"
            value={totalPatients}
          />

          <StatCard
            title="Patients actifs"
            value={activePatients}
          />



        </div>

        {/* ================= PATIENT LIST ================= */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-primary">
              Dossiers patients
            </h2>

            <span className="text-sm text-gray-400">
              {babies.length} patient(s)
            </span>
          </div>

          <div className="border-t border-gray-100 pt-6">

            {babies.length === 0 ? (
              <p className="text-gray-500 text-center">
                Aucun patient enregistré.
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

export default DoctorDashboard;

/* ================= STAT CARD ================= */

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/10">

      <p className="text-sm text-gray-500 font-medium mb-3">
        {title}
      </p>

      <p className="text-3xl font-bold text-primary">
        {value}
      </p>

      <div className="w-12 h-1 bg-secondary mt-4 rounded-full"></div>

    </div>
  );
};
