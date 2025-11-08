import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../../assets/clickbar.png";
import PageHeaderLayout from "../../module/components/PageHeaderLayout";
import questions from "../../constant/Level3/SituationalQuestion1_data.js";

import QuestionWithTwoChoices from "../components/questions/QuestionWithTwoChoices.jsx";
import Questionwith4ChoicesSituational from "../components/questions/Questionwith4ChoicesSituational.jsx";
import SituationalQuestionWithVoice from "../components/questions/SituationalQuestionWithVoice.jsx";

import { recordLevel2Answer } from "../../utils/recordAnswer.js";
import { doc, getDoc } from "firebase/firestore";
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

function Level3Situation1() {
  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  // Use either all questions or only wrong ones in review mode
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
    const fetchUser = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAnswers(userSnap.data().Level3Questions || {});
        setUserName(userSnap.data().Name || userSnap.data().name || ""); // <-- Fetch actual user name from backend
      }
    };
    fetchUser();
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

    const handleCorrectAnswer = () => {
      if (reviewMode) {
        setReviewAnswered((prev) => [...prev, question.id]);
      } else if (userId) {
        recordLevel3Answer(userId, question.id, true);
        fetchAnswers();
      }
      setSelectedQuestion(null);
    };

    const handleWrongAnswer = () => {
      if (!reviewMode && userId) {
        recordLevel3Answer(userId, question.id, false);
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
            onSelect={(choice) => {
              if (choice === question.correctAnswer) {
                handleCorrectAnswer();
              } else {
                handleWrongAnswer();
              }
            }}
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
    ["Correct", "Wrong"].includes(answers[`2Question${q.id}`])
  );

  // In review mode, don't disable buttons
  function isAnswered(q) {
    if (reviewMode) return false;
    const answer = answers[`Level2Question${q.id}`];
    return answer === "Correct" || answer === "Wrong";
  }

  // Save reviewAnswered to localStorage whenever it changes
  useEffect(() => {
    if (reviewMode) {
      localStorage.setItem("reviewAnswered", JSON.stringify(reviewAnswered));
    }
  }, [reviewAnswered, reviewMode]);

  useEffect(() => {
    if (reviewMode) {
      const saved = localStorage.getItem("reviewAnswered");
      if (saved) setReviewAnswered(JSON.parse(saved));
    }
  }, [reviewMode]);

  useEffect(() => {
    // Only run when answers are loaded
    const savedReviewAnswered = localStorage.getItem("reviewAnswered");
    if (savedReviewAnswered && Object.keys(answers).length > 0) {
      // Find all questions that were wrong
      const wrongQuestions = questions.filter((q) => {
        const answer = answers[`Level2Question${q.id}`];
        return answer === "Wrong";
      });
      setReviewQuestions(wrongQuestions);
      setReviewMode(true);
      setReviewAnswered(JSON.parse(savedReviewAnswered));
      setPage(1);
      setSelectedQuestion(null);
    }
  }, [answers]);
  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />

        {allAnswered && !reviewMode ? (
          <div className="flex-1 overflow-y-auto ">
            <LevelResultPreview
              onReviewWrongQuestions={handleReviewWrongQuestions}
            />
          </div>
        ) : (
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

            {/* Wrong Questions Component */}
            {selectedQuestion ? (
              <div className="flex-1 overflow-auto">
                {renderQuestionComponent(selectedQuestion)}
              </div>
            ) : (
              <div className="flex flex-col items-center flex-1 py-4 overflow-y-auto mt-20">
                <div className="relative w-85 max-w-full px-4 my-5">
                  <img
                    src={QuestionsBar}
                    alt="Questions Bar"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white]  w-full max-w-md px-10"
                      style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: "bold",
                      }}
                    >
                      Sitwasyon 1 - Sa Bahay
                    </span>
                  </div>
                </div>

                <div className="relative w-85 max-w-full px-4 my-5 flex justify-center">
                  <span
                    className=" font-medium text-center text-2xl text-white drop-shadow-[2px_2px_0px_black]  "
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Inutusan ka ng iyong ina na pumunta sa palengke upang
                    bumili.
                  </span>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-full px-2 sm:px-4 my-4">
                  {questionRows.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex flex-row gap-10 sm:gap-3 items-center justify-center flex-wrap"
                    >
                      {row.map((q) => {
                        const answer = answers[`Level2Question${q.id}`];
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
                          // In review mode, make button green if answered
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
                            className={`w-[140px]  h-[100px] sm:w-40 max-w-[calc(50%-0.25rem)] text-center ${btnColor} ${textColor} ${opacity} text-5xl sm:text-lg font-bold py-3 px-2 sm:px-4 rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150`}
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
                    className="w-40 bg-white text-black text-lg font-bold my-5 py-2 px-4 rounded-2xl border-2 border-black hover:bg-[#f2d919] active:bg-[#f2d919] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      !reviewQuestions.every((q) =>
                        reviewAnswered.includes(q.id)
                      )
                    }
                    onClick={() => {
                      setReviewMode(false);
                      setReviewQuestions([]);
                      setReviewAnswered([]);
                      localStorage.removeItem("reviewAnswered");
                      navigate("/level2-finish");
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
