import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundLayout from "../../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../../assets/clickbar.png";
import PageHeaderLayout from "../../module/components/PageHeaderLayout";
import questions from "../../constant/Level3/SituationalQuestion2_data.js";
import situation3Questions from "../../constant/Level3/SituationalQuestion3_data.js";

import SituationalQuestionWithChoices from "../components/questions/SituationalQuestionWithChoices.jsx";
import SituationalQuestionWithSlowSound from "../components/questions/SituationalQuestionWithSlowSound.jsx";
import Select4ChoicesWithVoice from "../components/questions/Situational4QuestionWithVoice.jsx";
import SituationalQuestionDragAndDrop from "../components/questions/SituationalQuestionDragAndDrop.jsx";
import SituationalQuestionWithVoice from "../components/questions/SituationalQuestionWithVoice.jsx";

import { recordLevel3Answer } from "../../utils/recordAnswer.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import LevelResultPreview from "../components/LevelResultPreview.jsx";

function groupIntoRows(arr, itemsPerRow = 2) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    rows.push(arr.slice(i, i + itemsPerRow));
  }
  return rows;
}

const QUESTIONS_PER_PAGE = 10;

function Level3Situation2() {
  const location = useLocation();
  const navigate = useNavigate();

  // review intent flag (passed via navigate state or localStorage)
  const fromReviewIntent =
    location.state?.review === true ||
    localStorage.getItem("enterReviewLevel3") === "true";

  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [userName, setUserName] = useState("");
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
          userData.WrongQuestionsAnsweredLevel3Situation2 || {};

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

          // Clear local storage review flag if present (we honored the intent)
          if (fromReviewIntent) {
            localStorage.removeItem("enterReviewLevel3");
          }
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleReviewWrongQuestions(wrongQuestions) {
    setReviewQuestions(wrongQuestions);
    setReviewMode(true);
    setPage(1);
    setSelectedQuestion(null);
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
            // FIXED: write to Situation2 review key (was Situation1)
            await updateDoc(userRef, {
              [`WrongQuestionsAnsweredLevel3Situation2.Level3Question${question.id}`]:
                true,
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
          <SituationalQuestionWithChoices
            question={{
              ...question,
              instruction,
              instructionSub,
              characterName,
            }}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "SituationalQuestionWithSlowSound":
        return (
          <SituationalQuestionWithSlowSound
            question={{
              ...question,
              instruction,
              instructionSub,
              characterName,
            }}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "Select4ChoicesWithVoice":
        return (
          <Select4ChoicesWithVoice
            question={{
              ...question,
              characterName,
            }}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "SituationalQuestionDragAndDrop":
        return (
          <SituationalQuestionDragAndDrop
            situation={question.situation}
            instruction={instruction}
            instructionSub={instructionSub}
            characterName={characterName}
            question={question.question}
            choices={question.choices}
            answer={question.answer}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
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

  const checkForMoreReviews = () => {
    const situation3WrongQuestions = situation3Questions.filter((q) => {
      const answer = answers[`Level3Question${q.id}`];
      return answer === "Wrong";
    });
    return situation3WrongQuestions.length > 0;
  };

  // Automatically go to Situation 3 once all Situation 2 questions are done,
  // but DO NOT auto-navigate if we arrived here intentionally for review.
  useEffect(() => {
    if (allAnswered && !reviewMode && !fromReviewIntent) {
      navigate("/level3-situation3");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAnswered, reviewMode]);

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />

        {!reviewMode ? (
          <>
            {selectedQuestion && (
              <div className="flex justify-start w-full px-4">
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="flex items-center justify-center p-2 rounded-lg bg-[#FFD43B] hover:bg-[#FFB84D] shadow-md transition-all duration-200 border-2 border-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="black"
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
              <div className="flex flex-col items-center flex-1 py-4 overflow-y-auto mt-20">
                <div className="relative w-85 max-w-full px-4 my-5">
                  <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white]  w-full max-w-md px-10"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Sitwasyon 2 - Sa Palengke
                    </span>
                  </div>
                </div>

                <div className="relative w-85 max-w-full px-4 my-5 flex justify-center">
                  <span
                    className="font-medium text-center text-2xl text-white drop-shadow-[2px_2px_0px_black]"
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Pagdating mo sa palengke, sinalubong ka agad ng bati ng mga
                    tinderang nag-aalok.
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-full px-2 sm:px-4 my-4">
                  {questionRows.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex flex-row gap-10 sm:gap-3 items-center justify-center flex-wrap"
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
                            className={`w-[140px] h-[100px] sm:w-40 max-w-[calc(50%-0.25rem)] text-center ${btnColor} ${textColor} ${opacity} text-5xl sm:text-lg font-bold py-3 px-2 sm:px-4 rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150`}
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
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center flex-1 py-4 overflow-y-auto mt-20">
            <button
              className="w-40 bg-white text-black text-lg font-bold my-5 py-2 px-4 rounded-2xl border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!reviewQuestions.every((q) => reviewAnswered.includes(q.id))}
              onClick={async () => {
                const userId = localStorage.getItem("linggoUserId");
                if (userId && reviewQuestions.length > 0) {
                  const userRef = doc(db, "users", userId);
                  const updates = {};

                  reviewQuestions.forEach((q) => {
                    updates[
                      `WrongQuestionsAnsweredLevel3Situation2.Level3Question${q.id}`
                    ] = true;
                  });

                  updates["Level3Situation2ReviewCompleted"] = true;
                  await updateDoc(userRef, updates);
                  await fetchAnswers();
                }

                setReviewMode(false);
                setReviewQuestions([]);
                setReviewAnswered([]);
                localStorage.removeItem("reviewAnswered");

                if (checkForMoreReviews()) {
                  navigate("/level3-situation3");
                } else {
                  navigate("/level1-finish");
                }
              }}
            >
              Sumunod
            </button>
          </div>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default Level3Situation2;