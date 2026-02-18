import { useNavigate } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center border border-primary/20">

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
           🍼 Baby Health Tracker
          </h1>


          <div className="w-16 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>

          <p className="text-gray-500 mt-4 text-sm">
            Suivi médical intelligent pour votre bébé
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4">

          <button
            onClick={() => navigate("/login?role=PARENT")}
            className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition shadow-md"
          >
            👩‍👦 Espace Parent
          </button>

          <button
            onClick={() => navigate("/login?role=DOCTOR")}
            className="w-full bg-secondary text-black py-3 rounded-xl font-medium hover:opacity-90 transition shadow-md"
          >
            👨‍⚕️ Espace Médecin
          </button>

        </div>

      </div>
    </div>
  );
}

export default AuthChoice;
