import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import questions from "../../constant/questions_data.js";

function LevelResultPreview() {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;
    const fetchAnswers = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAnswers(userSnap.data().Level1Questions || {});
      }
      setLoading(false);
    };
    fetchAnswers();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const correctQuestions = questions.filter(
    (q) => answers[`Level1Question${q.id}`] === "Correct"
  );
  const wrongQuestions = questions.filter(
    (q) => answers[`Level1Question${q.id}`] === "Wrong"
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Level 1 Results</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2 text-green-700">
          Correct Answers
        </h3>
        {correctQuestions.length === 0 ? (
          <div className="text-gray-500">No correct answers yet.</div>
        ) : (
          <ul>
            {correctQuestions.map((q) => (
              <li
                key={q.id}
                className="mb-2 p-3 rounded bg-green-100 border border-green-400 text-green-900"
              >
                <span className="font-bold">Question {q.id}:</span>{" "}
                {q.question || "Voice/Image Question"}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-red-700">
          Wrong Answers
        </h3>
        {wrongQuestions.length === 0 ? (
          <div className="text-gray-500">No wrong answers!</div>
        ) : (
          <ul>
            {wrongQuestions.map((q) => (
              <li
                key={q.id}
                className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-900"
              >
                <div>
                  <span className="font-bold">Question {q.id}:</span>{" "}
                  {q.question || "Voice/Image Question"}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-semibold text-gray-700">
                    Correct Answer:
                  </span>{" "}
                  {typeof q.correctAnswer === "string"
                    ? q.correctAnswer
                    : q.correctAnswer?.value || JSON.stringify(q.correctAnswer)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LevelResultPreview;
