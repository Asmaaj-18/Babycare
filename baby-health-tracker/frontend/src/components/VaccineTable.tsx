import React from "react";

interface Vaccine {
  id: string;
  name: string;
  date: string;
  status: "PENDING" | "DONE" | "MISSED";
  note?: string;
}

interface VaccineTableProps {
  vaccineData: Vaccine[];
  onEdit?: (vaccine: Vaccine) => void;
  onDelete?: (id: string) => void;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "DONE":
      return "bg-green-500 text-white";
    case "PENDING":
      return "bg-secondary text-black";
    case "MISSED":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
};

const VaccineTable: React.FC<VaccineTableProps> = ({
  vaccineData,
  onEdit,
  onDelete,
}) => {
  if (vaccineData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/20">
        <p className="text-gray-500 text-center">
          No vaccine records yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl border border-primary/20 overflow-x-auto">

      <h2 className="text-xl font-semibold text-primary p-4">
        💉 Vaccines
      </h2>

      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-3 text-left">Vaccine</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Note</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {vaccineData.map((vaccine) => (
            <tr
              key={vaccine.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3 font-medium">
                {vaccine.name}
              </td>

              <td className="p-3">
                {new Date(vaccine.date).toLocaleDateString()}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    vaccine.status
                  )}`}
                >
                  {vaccine.status}
                </span>
              </td>

              <td className="p-3">
                {vaccine.note || "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(vaccine)}
                      className="bg-secondary text-black px-3 py-1 rounded-lg hover:opacity-90 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(vaccine.id)}
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

export default VaccineTable;
