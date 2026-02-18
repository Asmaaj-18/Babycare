import React from "react";
import type { Growth } from "../services/baby.service";

interface GrowthTableProps {
  growthData: Growth[];
  onEdit?: (growth: Growth) => void;
  onDelete?: (id: string) => void;
}

const GrowthTable: React.FC<GrowthTableProps> = ({
  growthData,
  onEdit,
  onDelete,
}) => {
  if (growthData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/20">
        <p className="text-gray-500 text-center">
          No growth records yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl border border-primary/20 overflow-x-auto">

      <h2 className="text-xl font-semibold text-primary p-4">
        📏 Growth Records
      </h2>

      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Weight (kg)</th>
            <th className="p-3 text-left">Height (cm)</th>
            <th className="p-3 text-left">Head Size (cm)</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {growthData.map((growth) => (
            <tr
              key={growth.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">
                {new Date(growth.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">{growth.weight}</td>
              <td className="p-3">{growth.height}</td>
              <td className="p-3">
                {growth.headSize ?? "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(growth)}
                      className="bg-secondary text-black px-3 py-1 rounded-lg hover:opacity-90 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(growth.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}

                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default GrowthTable;
