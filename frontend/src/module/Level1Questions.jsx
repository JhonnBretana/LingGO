import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLayout from "../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../assets/clickbar.png";
import PageHeaderLayout from "../module/components/PageHeaderLayout";
import questions from "../constant/questions_data.js";

import DragAndDrop4ChoicesWithVoice from "./components/questions/DragAndDrop4ChoicesWithVoice.jsx";
import SpeechMicWithVoice from "./components/questions/SpeechMicWithVoice.jsx";
import Select6ChoicesWithVoiceAndSlow from "./components/questions/Select6ChoicesWithVoiceAndSlow.jsx";
import MatchingWordsWithWords from "./components/questions/MatchingWordsWithWords.jsx";
import MatchingWordsWithImage from "./components/questions/MatchingWordsWithImage.jsx";
import QuestionWith3Choices from "./components/questions/QuestionWith3Choices.jsx";
import QuestionWith4Choices from "./components/questions/QuestionWith4Choices.jsx";
import TypeWithVoiceAndSlow from "./components/questions/TypeWithVoiceAndSlow.jsx";
import SixChoicesWithVoice from "./components/questions/SixChoicesWithVoice.jsx";
import FourChoicesWithCharacterAndVoice from "./components/questions/FourChoicesWithCharacterAndVoice.jsx";

import { recordLevel1Answer } from "../utils/recordAnswer.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import LevelResultPreview from "./components/LevelResultPreview.jsx";

function groupIntoRows(arr, itemsPerRow = 2) {
  const rows = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    rows.push(arr.slice(i, i + itemsPerRow));
  }
  return rows;
}

const QUESTIONS_PER_PAGE = 10;

function Level1Questions() {
  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [reviewAnswered, setReviewAnswered] = useState([]);
  const navigate = useNavigate();

  // Use either all questions or only wrong ones in review mode
  const displayQuestions = reviewMode ? reviewQuestions : questions;
  const totalPages = Math.ceil(displayQuestions.length / QUESTIONS_PER_PAGE);
  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = displayQuestions.slice(startIdx, endIdx);
  const questionRows = groupIntoRows(paginatedQuestions, 2);

  // Initial load - fetch data from Firestore
  useEffect(() => {
    const userId = localStorage.getItem("linggoUserId");
    if (!userId) return;

    const fetchData = async () => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const level1Answers = userData.Level1Questions || {};
        const wrongAnswered = userData.WrongQuestionsAnswered || {};

        setAnswers(level1Answers);

        // Check if there are wrong questions to review
        const wrongQuestions = questions.filter((q) => {
          const answer = level1Answers[`Level1Question${q.id}`];
          return answer === "Wrong";
        });

        if (wrongQuestions.length > 0) {
          // Load which ones have already been answered in review
          const alreadyAnswered = wrongQuestions
            .filter((q) => wrongAnswered[`Level1Question${q.id}`] === true)
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
      const userData = userSnap.data();
      setAnswers(userData.Level1Questions || {});
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

    const handleCorrectAnswer = async () => {
      if (reviewMode) {
        setReviewAnswered((prev) => [...prev, question.id]);
        // Save progress immediately to Firestore
        if (userId) {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, {
            [`WrongQuestionsAnswered.Level1Question${question.id}`]: true,
          });
          fetchAnswers();
        }
      } else if (userId) {
        recordLevel1Answer(userId, question.id, true);
        fetchAnswers();
      }
      setSelectedQuestion(null);
    };

    const handleWrongAnswer = () => {
      if (!reviewMode && userId) {
        recordLevel1Answer(userId, question.id, false);
        fetchAnswers();
      }
      setSelectedQuestion(null);
    };

    switch (question.type) {
      case "TypeWithVoiceAndSlow":
        return (
          <TypeWithVoiceAndSlow
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "SixChoicesWithVoice":
        return (
          <SixChoicesWithVoice
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "FourChoicesWithCharacterAndVoice":
        return (
          <FourChoicesWithCharacterAndVoice
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "SpeechMicWithVoice":
        return (
          <SpeechMicWithVoice
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "MatchingWordsWithImage":
        return (
          <MatchingWordsWithImage
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "QuestionWith3Choices":
        return (
          <QuestionWith3Choices
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "QuestionWith4Choices":
        return (
          <QuestionWith4Choices
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "Select6ChoicesWithVoiceAndSlow":
        return (
          <Select6ChoicesWithVoiceAndSlow
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "MatchingWordsWithWords":
        return (
          <MatchingWordsWithWords
            question={question}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            showWrongOverlay={showWrongOverlay}
          />
        );
      case "DragAndDrop4ChoicesWithVoice":
        return (
          <DragAndDrop4ChoicesWithVoice
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
    ["Correct", "Wrong"].includes(answers[`Level1Question${q.id}`])
  );

  // Add this useEffect after the allAnswered definition
  useEffect(() => {
  if (allAnswered && !reviewMode) {
    // Calculate earned points (same as LevelResultPreview)
    const earnedPoints = questions.reduce((sum, q) => {
      const answer = answers[`Level1Question${q.id}`];
      if (answer === "Correct") {
        if (
          q.type === "MatchingWordsWithWords" ||
          q.type === "MatchingWordsWithImage"
        ) {
          return sum + q.correctAnswer.length;
        }
        return sum + 1;
      }
      return sum;
    }, 0);

    // Save to Firestore under Score.level1Score
    const userId = localStorage.getItem("linggoUserId");
    if (userId) {
      const userRef = doc(db, "users", userId);
      updateDoc(userRef, {
        "Score.level1Score": earnedPoints,
      });
    }
  }
}, [allAnswered, reviewMode, answers, questions]);

  // In review mode, don't disable buttons
  function isAnswered(q) {
    if (reviewMode) return false;
    const answer = answers[`Level1Question${q.id}`];
    return answer === "Correct" || answer === "Wrong";
  }

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />

        {allAnswered && !reviewMode ? (
          <div className="flex-1 overflow-y-auto">
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

            {selectedQuestion ? (
              <div className="flex-1 overflow-auto">
                {renderQuestionComponent(selectedQuestion)}
              </div>
            ) : (
              <div className="flex flex-col items-center flex-1 py-4 overflow-y-auto">
                <div className="relative w-80 max-w-full px-4 my-5">
                  <img
                    src={QuestionsBar}
                    alt="Questions Bar"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base sm:text-xl font-bold">
                      Unang Antas - Mga Salita
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:gap-3 w-full max-w-full px-2 sm:px-4 my-4">
                  {questionRows.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex flex-row gap-2 sm:gap-3 items-center justify-center flex-wrap"
                    >
                      {row.map((q) => {
                        const answer = answers[`Level1Question${q.id}`];
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
                            className={`w-[140px] sm:w-40 max-w-[calc(50%-0.25rem)] text-center ${btnColor} ${textColor} ${opacity} text-sm sm:text-lg font-bold py-3 px-2 sm:px-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150`}
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
                    onClick={async () => {
                      const userId = localStorage.getItem("linggoUserId");
                      if (userId && reviewQuestions.length > 0) {
                        const userRef = doc(db, "users", userId);
                        const updates = {};

                        // Ensure all questions are marked as answered
                        reviewQuestions.forEach((q) => {
                          updates[
                            `WrongQuestionsAnswered.Level1Question${q.id}`
                          ] = true;
                        });

                        // Mark the entire review as completed
                        updates["Level1ReviewCompleted"] = true;

                        await updateDoc(userRef, updates);
                      }

                      setReviewMode(false);
                      setReviewQuestions([]);
                      setReviewAnswered([]);
                      localStorage.removeItem("reviewAnswered");
                      navigate("/level1-finish");
                    }}
                  >
                    Sumunod
                  </button>
                )}

                <div className="flex gap-3 sm:gap-4 mt-3 items-center">
                  <button
                    className="px-4 sm:px-6 py-2 bg-white text-black font-bold rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0 transition-all duration-150 text-sm sm:text-base"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <span className="text-base sm:text-xl font-black">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="px-4 sm:px-6 py-2 bg-white text-black font-bold rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-x-0 disabled:hover:translate-y-0 transition-all duration-150 text-sm sm:text-base"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </BackgroundLayout>
  );
}

export default Level1Questions;
