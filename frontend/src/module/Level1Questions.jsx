import React, { useState } from "react";
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
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = questions.slice(startIdx, endIdx);
  const questionRows = groupIntoRows(paginatedQuestions, 2);

  function renderQuestionComponent(question) {
    if (!question) return null;
    const handleCorrectAnswer = () => setSelectedQuestion(null);

    switch (question.type) {
      case "TypeWithVoiceAndSlow":
        return <TypeWithVoiceAndSlow question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "SixChoicesWithVoice":
        return <SixChoicesWithVoice question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "FourChoicesWithCharacterAndVoice":
        return <FourChoicesWithCharacterAndVoice question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "SpeechMicWithVoice":
        return <SpeechMicWithVoice question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "MatchingWordsWithImage":
        return <MatchingWordsWithImage question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "QuestionWith3Choices":
        return <QuestionWith3Choices question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "QuestionWith4Choices":
        return <QuestionWith4Choices question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "Select6ChoicesWithVoiceAndSlow":
        return <Select6ChoicesWithVoiceAndSlow question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "MatchingWordsWithWords":
        return <MatchingWordsWithWords question={question} onCorrectAnswer={handleCorrectAnswer} />;
      case "DragAndDrop4ChoicesWithVoice":
        return <DragAndDrop4ChoicesWithVoice question={question} onCorrectAnswer={handleCorrectAnswer} />;
      default:
        return <div>Unknown question type</div>;
    }
  }

  return (
    <BackgroundLayout>
      <div className="overflow-hidden w-full h-screen flex flex-col">
        <PageHeaderLayout />

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
          <div className="flex-1 overflow-auto">{renderQuestionComponent(selectedQuestion)}</div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="relative w-80 max-w-full px-4 mb-4">
              <img src={QuestionsBar} alt="Questions Bar" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base sm:text-xl font-bold">LEVEL 1 - Questions</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-full px-4 overflow-y-auto flex-1">
              {questionRows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex flex-row gap-2 items-center justify-center flex-wrap"
                >
                  {row.map((q) => (
                    <button
                      key={q.id}
                      className="w-36 sm:w-40 max-w-[calc(50%-0.25rem)] text-center bg-white text-black text-sm sm:text-lg font-bold py-3 px-2 sm:px-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
                      onClick={() => setSelectedQuestion(q)}
                    >
                      Question {q.id}
                    </button>
                  ))}
                </div>
              ))}
            </div>

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
      </div>
    </BackgroundLayout>
  );
}

export default Level1Questions;
