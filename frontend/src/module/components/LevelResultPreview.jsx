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

  // Calculate total possible points
  const totalPoints = questions.reduce((sum, q) => {
    if (q.type === "MatchingWordsWithWords" || q.type === "MatchingWordsWithImage") {
      return sum + q.correctAnswer.length;
    }
    return sum + 1;
  }, 0);

  // Calculate earned points
  const earnedPoints = questions.reduce((sum, q) => {
    const answer = answers[`Level1Question${q.id}`];
    if (answer === "Correct") {
      if (q.type === "MatchingWordsWithWords" || q.type === "MatchingWordsWithImage") {
        return sum + q.correctAnswer.length;
      }
      return sum + 1;
    }
    return sum;
  }, 0);

  const wrongQuestions = questions.filter(
    (q) => answers[`Level1Question${q.id}`] === "Wrong"
  );

  const percentage = ((earnedPoints / totalPoints) * 100).toFixed(1);

  // Helper function to format correct answer
  const formatCorrectAnswer = (question) => {
    if (question.type === "MatchingWordsWithWords") {
      return (
        <div className="space-y-1">
          {question.correctAnswer.map((pair, index) => (
            <div key={index} className="text-green-900">
              {pair.word1} - {pair.word2}
            </div>
          ))}
        </div>
      );
    } else if (question.type === "MatchingWordsWithImage") {
      return (
        <div className="space-y-2">
          {question.correctAnswer.map((pair, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-green-900">{pair.word}</span>
              <span>-</span>
              <img src={pair.image} alt={pair.word} className="w-8 h-8 object-contain" />
            </div>
          ))}
        </div>
      );
    } else if (typeof question.correctAnswer === "string") {
      return <span className="text-green-900">{question.correctAnswer}</span>;
    } else if (question.correctAnswer?.value) {
      return <span className="text-green-900">{question.correctAnswer.value}</span>;
    } else {
      return <span className="text-green-900">{JSON.stringify(question.correctAnswer)}</span>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Level 1 Results</h2>

      <div className="mb-6 p-4 bg-blue-100 border-2 border-blue-400 rounded-lg text-center">
        <div className="text-3xl font-bold text-blue-900">
          {earnedPoints} / {totalPoints}
        </div>
        <div className="text-lg text-blue-700">Score: {percentage}%</div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-red-700">
          Wrong Answers ({wrongQuestions.length})
        </h3>
        {wrongQuestions.length === 0 ? (
          <div className="p-6 text-center bg-green-100 border-2 border-green-400 rounded-lg">
            <div className="text-2xl font-bold text-green-700 mb-2">
              🎉 Perfect Score!
            </div>
            <div className="text-green-600">
              You answered all questions correctly!
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {wrongQuestions.map((q) => (
              <li
                key={q.id}
                className="p-4 rounded-lg bg-red-50 border-2 border-red-400"
              >
                <div className="font-bold text-red-900 mb-2">
                  Question {q.id}
                </div>
                {q.question && (
                  <div className="text-gray-800 mb-2">{q.question}</div>
                )}
                {!q.question && (
                  <div className="text-gray-600 text-sm mb-2 italic">
                    {q.type === "TypeWithVoiceAndSlow" && "Voice Question"}
                    {q.type === "SpeechMicWithVoice" && "Speech Recognition Question"}
                    {q.type === "FourChoicesWithCharacterAndVoice" && "Character Voice Question"}
                  </div>
                )}
                <div className="mt-2 p-3 bg-green-100 rounded border border-green-400">
                  <div className="font-semibold text-green-800 mb-1">
                    Correct Answer:
                  </div>
                  {formatCorrectAnswer(q)}
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