import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // adapte selon ton chemin

interface MedicalProfile {
  last_quiz_completed_at: string | null;
}

export default function B2CDashboard() {
  const navigate = useNavigate();
  const [quizStatus, setQuizStatus] = useState<MedicalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizStatus() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("medical_profiles")
        .select("last_quiz_completed_at")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Erreur fetch quiz status:", error);
      } else {
        setQuizStatus(data);
        if (!data?.last_quiz_completed_at) {
          navigate("/quiz");
        }
      }

      setLoading(false);
    }

    fetchQuizStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-6 text-white">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const lastCompletedDate = quizStatus?.last_quiz_completed_at
    ? new Date(quizStatus.last_quiz_completed_at)
    : null;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

      {!lastCompletedDate ? (
        <button
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => navigate("/quiz")}
        >
          Start My Health Quiz
        </button>
      ) : (
        <>
          <div className="mb-4">
            <p>
              Your last health quiz was completed on{" "}
              <strong>{lastCompletedDate.toLocaleDateString()}</strong>.
            </p>
            {/* TODO: Ajouter une barre de progression ici */}
          </div>
          <button
            className="px-6 py-3 bg-green-600 rounded hover:bg-green-700"
            onClick={() => navigate("/quiz")}
          >
            Update My Answers
          </button>
        </>
      )}
    </div>
  );
}
