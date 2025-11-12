import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../../assets/clickbar.png";
import PageHeaderLayout from "../../module/components/PageHeaderLayout";
import questions from "../../constant/Level3/SituationalQuestion1_data.js";
import situation2Questions from "../../constant/Level3/SituationalQuestion2_data.js";
import situation3Questions from "../../constant/Level3/SituationalQuestion3_data.js";

import Questionwith4ChoicesSituational from "../components/questions/Questionwith4ChoicesSituational.jsx";
import SituationalQuestionWithVoice from "../components/questions/SituationalQuestionWithVoice.jsx";

import { recordLevel3Answer } from "../../utils/recordAnswer.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function groupIntoRows(arr, itemsPerRow = 2) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    rows.push(arr.slice(i, i + itemsPerRow));
  }
  return rows;
}

const QUESTIONS_PER_PAGE = 10;

function Level3Situation1() {
  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const displayQuestions = reviewMode ? reviewQuestions : questions;
  const totalPages = Math.ceil(displayQuestions.length / QUESTIONS_PER_PAGE);
  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = displayQuestions.slice(startIdx, endIdx);
  const questionRows = groupIntoRows(paginatedQuestions, 2);
  const [reviewAnswered, setReviewAnswered] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;

    const fetchData = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const level3Answers = userData.Level3Questions || {};
        const wrongAnswered =
          userData.WrongQuestionsAnsweredLevel3Situation1 || {};

        setAnswers(level3Answers);
        setUserName(userData.Name || userData.name || "");

        const wrongQuestions = questions.filter((q) => {
          const answer = level3Answers[`Level3Question${q.id}`];
          return answer === "Wrong";
        });

        if (wrongQuestions.length > 0) {
          const alreadyAnswered = wrongQuestions
            .filter((q) => wrongAnswered[`Level3Question${q.id}`] === true)
            .map((q) => q.id);

          setReviewQuestions(wrongQuestions);
          setReviewAnswered(alreadyAnswered);
          setReviewMode(true);
          setPage(1);
        }
      }
    };

    fetchData();
  }, []);

  async function fetchAnswers() {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setAnswers(userSnap.data().Level3Questions || {});
    }
  }

  function renderQuestionComponent(question) {
    if (!question) return null;
    const userId = localStorage.getItem("linggoUserId");
    const showWrongOverlay = !reviewMode;

    const instruction = question.instruction?.replace("(name)", userName);
    const instructionSub = question.instructionSub?.replace("(name)", userName);
    const characterName = question.characterName?.replace("(name)", userName);

    const handleCorrectAnswer = async () => {
      console.log("🎯 Correct answer clicked! Question:", question.id);

      try {
        if (reviewMode) {
          setReviewAnswered((prev) => [...prev, question.id]);
          if (userId) {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
              [`WrongQuestionsAnsweredLevel3Situation1.Level3Question${question.id}`]: true,
            });
            await fetchAnswers();
          }
        } else if (userId) {
          console.log("📝 Calling recordLevel3Answer...", userId, question.id);
          await recordLevel3Answer(userId, question.id, true, 2);
          console.log("✅ recordLevel3Answer completed");
          await fetchAnswers();
        }
        setSelectedQuestion(null);
      } catch (error) {
        console.error("❌ Error in handleCorrectAnswer:", error);
        alert("Failed to save answer. Please try again.");
      }
    };

    const handleWrongAnswer = async () => {
      if (!reviewMode && userId) {
        await recordLevel3Answer(userId, question.id, false);
        fetchAnswers();
      }
      setSelectedQuestion(null);
    };

    switch (question.type) {
      case "Questionwith4ChoicesSituational":
        return (
          <Questionwith4ChoicesSituational
            situation={question.situation}
            instruction={instruction}
            instructionSub={instructionSub}
            characterName={characterName}
            question={question.question}
            choices={question.choices}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
            note={question.note}
            answer={question.correctAnswer}
          />
        );
      case "SituationalQuestionWithVoice":
        return (
          <SituationalQuestionWithVoice
            situation={question.situation}
            characterImage={question.characterImage}
            characterName={characterName}
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  }

  const allAnswered = questions.every((q) =>
    ["Correct", "Wrong"].includes(answers[`Level3Question${q.id}`])
  );

  function isAnswered(q) {
    if (reviewMode) return false;
    const answer = answers[`Level3Question${q.id}`];
    return answer === "Correct" || answer === "Wrong";
  }

  // Check if there are wrong questions in situation 2 or 3
  const checkForMoreReviews = () => {
    const situation2WrongQuestions = situation2Questions.filter((q) => {
      const answer = answers[`Level3Question${q.id}`];
      return answer === "Wrong";
    });

    const situation3WrongQuestions = situation3Questions.filter((q) => {
      const answer = answers[`Level3Question${q.id}`];
      return answer === "Wrong";
    });

    return (
      situation2WrongQuestions.length > 0 || situation3WrongQuestions.length > 0
    );
  };

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />

        {allAnswered && !reviewMode ? (
          <div className="flex flex-col items-center justify-center flex-1 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white text-center">
              Sitwasyon 1 Completed!
            </h2>
            <button
              className="bg-yellow-400 text-black font-bold py-2 px-4 sm:py-3 sm:px-6 lg:px-8 rounded-xl border-2 border-black hover:bg-yellow-500 transition text-base sm:text-lg md:text-xl lg:text-2xl"
              onClick={() => navigate("/level3-situation2")}
            >
              Magpatuloy sa Sitwasyon 2
            </button>
          </div>
        ) : (
          <>
            {selectedQuestion && (
              <div className="flex justify-start w-full px-2 sm:px-4 py-2">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-[#FFD43B] hover:bg-[#FFB84D] shadow-md transition-all duration-200 border-2 border-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="black"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </div>
            )}

            {selectedQuestion ? (
              <div className="flex-1 overflow-auto">
                {renderQuestionComponent(selectedQuestion)}
              </div>
            ) : (
              <div className="flex flex-col items-center flex-1 py-2 sm:py-4 overflow-y-auto mt-10 sm:mt-16 lg:mt-20">
                <div className="relative w-full max-w-[90%] sm:max-w-[85%] lg:max-w-3xl px-2 sm:px-4 my-3 sm:my-5">
                  <img
                    src={QuestionsBar}
                    alt="Questions Bar"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-medium text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-black drop-shadow-[2px_2px_0px_white] w-full px-4 sm:px-6 md:px-10"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Sitwasyon 1 - Sa Bahay
                    </span>
                  </div>
                </div>

                <div className="relative w-full max-w-[90%] sm:max-w-[85%] lg:max-w-4xl px-2 sm:px-4 my-3 sm:my-5 flex justify-center">
                  <span
                    className="font-medium text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white drop-shadow-[2px_2px_0px_black] px-2"
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Inutusan ka ng iyong ina na pumunta sa palengke upang
                    bumili.
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-[95%] sm:max-w-full px-2 sm:px-4 my-2 sm:my-4">
                  {questionRows.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-10 items-center justify-center flex-wrap"
                    >
                      {row.map((q) => {
                        const answer = answers[`Level3Question${q.id}`];
                        let btnColor = "bg-white";
                        let textColor = "text-black";
                        let opacity = "";
                        let disabled = isAnswered(q);

                        if (!reviewMode) {
                          if (answer === "Correct") {
                            btnColor = "bg-green-400";
                            textColor = "text-white";
                            opacity = "opacity-50";
                          } else if (answer === "Wrong") {
                            btnColor = "bg-red-400";
                            textColor = "text-white";
                            opacity = "opacity-50";
                          }
                        } else {
                          if (reviewAnswered.includes(q.id)) {
                            btnColor = "bg-green-400";
                            textColor = "text-white";
                            opacity = "";
                            disabled = true;
                          }
                        }

                        return (
                          <button
                            key={q.id}
                            className={`w-[120px] h-[80px] sm:w-[140px] sm:h-[100px] md:w-[160px] md:h-[110px] lg:w-40 lg:h-[100px] max-w-[calc(50%-0.5rem)] text-center ${btnColor} ${textColor} ${opacity} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text font-bold py-2 sm:py-3 px-2 sm:px-4 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150`}
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                            onClick={() => !disabled && setSelectedQuestion(q)}
                            disabled={disabled}
                          >
                            {q.id}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {reviewMode && reviewQuestions.length > 0 && (
                  <button
                    className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-56 bg-white text-black text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold my-3 sm:my-5 py-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      !reviewQuestions.every((q) =>
                        reviewAnswered.includes(q.id)
                      )
                    }
                    onClick={async () => {
                      const userId = localStorage.getItem("linggoUserId");
                      if (userId && reviewQuestions.length > 0) {
                        const userRef = doc(db, "users", userId);
                        const updates = {};

                        reviewQuestions.forEach((q) => {
                          updates[
                            `WrongQuestionsAnsweredLevel3Situation1.Level3Question${q.id}`
                          ] = true;
                        });

                        updates["Level3Situation1ReviewCompleted"] = true;

                        await updateDoc(userRef, updates);
                        await fetchAnswers();
                      }

                      setReviewMode(false);
                      setReviewQuestions([]);
                      setReviewAnswered([]);
                      localStorage.removeItem("reviewAnswered");

                      // Check for more reviews in situation 2 or 3
                      const userId2 = localStorage.getItem("linggoUserId");
                      if (userId2) {
                        const userRef2 = doc(db, "users", userId2);
                        const userSnap2 = await getDoc(userRef2);
                        const userData2 = userSnap2.exists()
                          ? userSnap2.data()
                          : {};

                        const level3Answers = userData2.Level3Questions || {};
                        const situation2Wrong = situation2Questions.some(
                          (q) =>
                            level3Answers[`Level3Question${q.id}`] === "Wrong"
                        );
                        const situation3Wrong = situation3Questions.some(
                          (q) =>
                            level3Answers[`Level3Question${q.id}`] === "Wrong"
                        );

                        if (situation2Wrong) {
                          navigate("/level3-situation2", {
                            state: { review: true },
                          });
                        } else if (situation3Wrong) {
                          navigate("/level3-situation3", {
                            state: { review: true },
                          });
                        } else {
                          navigate("/level1-finish");
                        }
                      } else {
                        navigate("/level1-finish");
                      }
                    }}
                  >
                    Sumunod
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default Level3Situation1;
