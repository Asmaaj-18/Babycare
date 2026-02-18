import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import GrowthTable from "../components/GrowthTable";
import SleepTable from "../components/SleepTable";
import VaccineTable from "../components/VaccineTable";
import CommentSection from "../components/CommentSection";
import { createComment } from "../services/comment.service";

import { getBabyDashboard } from "../services/baby.service";
import { deleteGrowth } from "../services/growth.service";
import { deleteSleep } from "../services/sleep.service";
import { deleteVaccine } from "../services/vaccine.service";
import { deleteComment } from "../services/comment.service";

import { useAuth } from "../context/useAuth";
import type { BabyDetailsType } from "../services/baby.service";

const BabyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [baby, setBaby] = useState<BabyDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  const loadBaby = async () => {
    if (!id) return;
    const data = await getBabyDashboard(id);
    setBaby(data);
  };

  useEffect(() => {
    if (!id) return;

    const fetchBaby = async () => {
      try {
        const data = await getBabyDashboard(id);
        setBaby(data);
      } catch (error) {
        console.error("Error loading baby:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBaby();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Chargement du dossier patient...
      </div>
    );

  if (!baby)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Dossier introuvable
      </div>
    );

  const age = Math.floor(
    (new Date().getTime() -
      new Date(baby.birthDate).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background to-white p-10 max-w-6xl mx-auto space-y-10">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-primary transition"
        >
          ← Retour au tableau de bord
        </button>

        {/* ================= PATIENT HEADER ================= */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10">

          <p className="text-sm text-gray-400 mb-2">
            Dossier médical patient
          </p>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">

              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {baby.name.charAt(0)}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {baby.name}
                </h1>

                <p className="text-gray-500 mt-1">
                  Né le {new Date(baby.birthDate).toLocaleDateString()}
                </p>

                <p className="text-gray-400 text-sm">
                  {age} ans
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">

              <span className="px-4 py-1 rounded-full bg-secondary/30 text-black text-sm font-medium">
                {baby.gender}
              </span>

              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                Dossier actif
              </span>

            </div>

          </div>
        </div>

        {/* ================= GROWTH ================= */}
        <SectionCard
          title="Growth Records"
          addLabel="Ajouter mesure"
          onAdd={() => navigate(`/baby/${baby.id}/add-growth`)}
          canAdd={user?.role === "PARENT" || user?.role === "DOCTOR"}
        >
          <GrowthTable
            growthData={baby.growth}
            onDelete={async (growthId: string) => {
              await deleteGrowth(growthId);
              await loadBaby();
            }}
          />
        </SectionCard>

        {/* ================= SLEEP ================= */}
        <SectionCard
          title="Sleep Records"
          addLabel="Ajouter sommeil"
          onAdd={() => navigate(`/baby/${baby.id}/add-sleep`)}
          canAdd={user?.role === "PARENT"}
        >
          <SleepTable
            sleepData={baby.sleep}
            onDelete={async (sleepId: string) => {
              await deleteSleep(sleepId);
              await loadBaby();
            }}
          />
        </SectionCard>

        {/* ================= VACCINES ================= */}
        <SectionCard
          title="Vaccination"
          addLabel="Ajouter vaccin"
          onAdd={() => navigate(`/baby/${baby.id}/add-vaccine`)}
          canAdd={user?.role === "DOCTOR"}
        >
          <VaccineTable
            vaccineData={baby.vaccines}
            onDelete={async (vaccineId: string) => {
              await deleteVaccine(vaccineId);
              await loadBaby();
            }}
          />
        </SectionCard>

        {/* ================= COMMENTS ================= */}
        <SectionCard title="Medical Notes">
          <CommentSection
            comments={baby.comments}
            userRole={user?.role}
            onAddComment={
              user?.role === "DOCTOR"
                ? async (content: string) => {
                    await createComment({
                      content,
                      babyId: baby.id,
                    });
                    await loadBaby();
                  }
                : undefined
            }
            onDeleteComment={
              user?.role === "DOCTOR"
                ? async (commentId: string) => {
                    await deleteComment(commentId);
                    await loadBaby();
                  }
                : undefined
            }
          />
        </SectionCard>

      </div>
    </>
  );
};

export default BabyDetails;

/* ================= REUSABLE SECTION CARD ================= */

interface SectionCardProps {
  title: string;
  addLabel?: string;
  onAdd?: () => void;
  canAdd?: boolean;
  children: React.ReactNode;
}

const SectionCard = ({
  title,
  addLabel,
  onAdd,
  canAdd,
  children,
}: SectionCardProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary/10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary">
          {title}
        </h2>

        {canAdd && (
          <button
            onClick={onAdd}
            className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md hover:opacity-90 transition"
          >
            {addLabel}
          </button>
        )}
      </div>

      <div className="border-t border-gray-100 pt-6">
        {children}
      </div>

    </div>
  );
};
