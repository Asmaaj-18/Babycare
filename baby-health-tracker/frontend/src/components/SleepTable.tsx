import React from "react";

interface Sleep {
  id: string;
  startTime: string;
  endTime: string;
  note?: string;
}

interface SleepTableProps {
  sleepData: Sleep[];
  onEdit?: (sleep: Sleep) => void;
  onDelete?: (id: string) => void;
}

const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours.toFixed(1);
};

const SleepTable: React.FC<SleepTableProps> = ({
  sleepData,
  onEdit,
  onDelete,
}) => {
  if (sleepData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-primary/20">
        <p className="text-gray-500 text-center">
          No sleep records yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl border border-primary/20 overflow-x-auto">

      <h2 className="text-xl font-semibold text-primary p-4">
        😴 Sleep Records
      </h2>

      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-3 text-left">Start</th>
            <th className="p-3 text-left">End</th>
            <th className="p-3 text-left">Duration (hours)</th>
            <th className="p-3 text-left">Note</th>
            {(onEdit || onDelete) && (
              <th className="p-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {sleepData.map((sleep) => (
            <tr
              key={sleep.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">
                {new Date(sleep.startTime).toLocaleString()}
              </td>

              <td className="p-3">
                {new Date(sleep.endTime).toLocaleString()}
              </td>

              <td className="p-3">
                {calculateDuration(
                  sleep.startTime,
                  sleep.endTime
                )}
              </td>

              <td className="p-3">
                {sleep.note || "-"}
              </td>

              {(onEdit || onDelete) && (
                <td className="p-3 text-center space-x-2">

                  {onEdit && (
                    <button
                      onClick={() => onEdit(sleep)}
                      className="bg-secondary text-black px-3 py-1 rounded-lg hover:opacity-90 transition"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(sleep.id)}
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

export default SleepTable;
