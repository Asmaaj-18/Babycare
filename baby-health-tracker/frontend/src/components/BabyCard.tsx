import React from "react";

interface BabyCardProps {
  id: string;
  name: string;
  birthDate: string;
  gender?: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
}

const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();

  const diffTime = today.getTime() - birth.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);

  return months;
};

const BabyCard: React.FC<BabyCardProps> = ({
  id,
  name,
  birthDate,
  gender,
  onSelect,
  onDelete,
}) => {
  const ageInMonths = calculateAge(birthDate);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{name}</h2>

      <p className="text-gray-600">
        👶 Age: {ageInMonths} months
      </p>

      {gender && (
        <p className="text-gray-600">
          Gender: {gender}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onSelect(id)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
        >
          View Dashboard
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default BabyCard;
