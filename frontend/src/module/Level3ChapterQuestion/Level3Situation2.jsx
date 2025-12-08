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

  const fromReviewIntent =
    location.state?.review === true ||
    localStorage.getItem("enterReviewLevel3") === "true";

  const [page, setPage] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const [reviewAnswered, setReviewAnswered] = useState([]);
  const [isValidating, setIsValidating] = useState(false); // NEW: Loading state
  
  const displayQuestions = reviewMode ? reviewQuestions : questions;
  const totalPages = Math.ceil(displayQuestions.length / QUESTIONS_PER_PAGE);
  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = displayQuestions.slice(startIdx, endIdx);
  const questionRows = groupIntoRows(paginatedQuestions, 2);

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

          if (fromReviewIntent) {
            localStorage.removeItem("enterReviewLevel3");
          }
        } else {
          setReviewMode(false);
          setReviewQuestions([]);
          setReviewAnswered([]);
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
      setIsValidating(true); // Start loading
      try {
        if (reviewMode) {
          setReviewAnswered((prev) => [...prev, question.id]);
          if (userId) {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
              [`WrongQuestionsAnsweredLevel3Situation2.Level3Question${question.id}`]: true,
            });
            await fetchAnswers();
          }
        } else if (userId) {
          await recordLevel3Answer(userId, question.id, true, 2);
          await fetchAnswers();
        }
        setSelectedQuestion(null);
      } catch (error) {
        alert("Failed to save answer. Please try again.");
      } finally {
        setIsValidating(false); // End loading
      }
    };

    const handleWrongAnswer = async () => {
      setIsValidating(true); // Start loading
      try {
        if (!reviewMode && userId) {
          await recordLevel3Answer(userId, question.id, false);
          await fetchAnswers();
        }
        setSelectedQuestion(null);
      } finally {
        setIsValidating(false); // End loading
      }
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
      case "Situational4QuestionWithVoice":
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

  useEffect(() => {
    if (allAnswered && !reviewMode && !fromReviewIntent) {
      navigate("/level3-situation3");
    }
  }, [allAnswered, reviewMode, fromReviewIntent, navigate]);

  return (
    <BackgroundLayout>
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <PageHeaderLayout />

        {selectedQuestion ? (
          <>
            <div className="flex justify-start w-full px-2 sm:px-4 py-2">
              <button
                onClick={() => !isValidating && setSelectedQuestion(null)}
                disabled={isValidating}
                className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-[#FFD43B] hover:bg-[#FFB84D] shadow-md transition-all duration-200 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="flex-1 overflow-auto">
              {renderQuestionComponent(selectedQuestion)}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center flex-1 py-2 sm:py-4 overflow-y-auto mt-12 sm:mt-16 md:mt-20">
            {/* Questions Bar - Responsive sizing */}
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2 xs:px-3 sm:px-4 my-2 sm:my-3 md:my-5">
              <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center px-2 xs:px-4 sm:px-6">
                <span
                  className="font-medium text-center text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-black drop-shadow-[1px_1px_0px_white] sm:drop-shadow-[2px_2px_0px_white] w-full"
                  style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontWeight: "bold",
                  }}
                >
                  Sitwasyon 2 - Sa Palengke
                </span>
              </div>
            </div>

            {/* Description Text - Responsive sizing */}
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-2 xs:px-3 sm:px-4 my-2 sm:my-3 md:my-5 flex justify-center">
              <span
                className="font-medium text-center text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white drop-shadow-[1px_1px_0px_black] sm:drop-shadow-[2px_2px_0px_black] leading-tight sm:leading-normal"
                style={{
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Pagdating mo sa palengke, sinalubong ka agad ng bati ng mga
                tinderang nag-aalok.
              </span>
            </div>

            {/* Question Buttons Grid - Responsive layout */}
            <div className="flex flex-col gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 w-full max-w-[300px] xs:max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-3xl px-2 xs:px-3 sm:px-4 my-2 sm:my-3 md:my-4">
              {questionRows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 items-center justify-center flex-wrap"
                >
                  {row.map((q) => {
                    const answer = answers[`Level3Question${q.id}`];
                    let btnColor = "bg-white";
                    let textColor = "text-black";
                    let opacity = "";
                    let disabled = isAnswered(q) || isValidating; // UPDATED: Disable during validation

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
                        className={`w-[120px] h-[80px] sm:w-[140px] sm:h-[100px] md:w-[160px] md:h-[110px] lg:w-40 lg:h-[100px] max-w-[calc(50%-0.5rem)] text-center ${btnColor} ${textColor} ${opacity} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text font-bold py-2 sm:py-3 px-2 sm:px-4 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50`}
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

            {/* Review Mode Button - Responsive sizing */}
            {reviewMode && reviewQuestions.length > 0 && (
              <button
                className="
                  w-32 xs:w-36 sm:w-40 md:w-44 lg:w-48
                  bg-white text-black 
                  text-sm xs:text-base sm:text-lg md:text-xl 
                  font-bold 
                  my-3 sm:my-4 md:my-5 
                  py-1.5 xs:py-2 sm:py-2.5 md:py-3 
                  px-3 xs:px-4 sm:px-5 md:px-6 
                  rounded-xl sm:rounded-2xl 
                  border-2 border-black 
                  hover:bg-[#f2d919] active:bg-[#f2d919] 
                  transition-colors duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                disabled={
                  isValidating ||
                  !reviewQuestions.every((q) => reviewAnswered.includes(q.id))
                }
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

                  // Check for more reviews in situation 3
                  const userId2 = localStorage.getItem("linggoUserId");
                  if (userId2) {
                    const userRef2 = doc(db, "users", userId2);
                    const userSnap2 = await getDoc(userRef2);
                    const userData2 = userSnap2.exists()
                      ? userSnap2.data()
                      : {};

                    const level3Answers = userData2.Level3Questions || {};
                    const situation3Wrong = situation3Questions.some(
                      (q) =>
                        level3Answers[`Level3Question${q.id}`] === "Wrong"
                    );

                    if (situation3Wrong) {
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
      </div>
    </BackgroundLayout>
  );
}

export default Level3Situation2;