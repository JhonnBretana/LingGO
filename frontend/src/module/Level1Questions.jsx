import React, { useState } from "react";
import BackgroundLayout from "../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../assets/clickbar.png";
import PageHeaderLayout from "../module/components/PageHeaderLayout";
import questions from "../constant/questions_data.js";

// question components
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

  // Ito yung mga questions component renderer
  function renderQuestionComponent(question) {
    if (!question) return null;
    switch (question.type) {
      case "TypeWithVoiceAndSlow":
        return <TypeWithVoiceAndSlow question={question} />;
      case "SixChoicesWithVoice":
        return <SixChoicesWithVoice question={question} />;
      case "FourChoicesWithCharacterAndVoice":
        return <FourChoicesWithCharacterAndVoice question={question} />;
      case "SpeechMicWithVoice":
        return <SpeechMicWithVoice question={question} />;
      case "MatchingWordsWithImage":
        return <MatchingWordsWithImage question={question} />;
      case "QuestionWith3Choices":
        return <QuestionWith3Choices question={question} />;
      // Add cases for other types here
      default:
        return <div>Unknown question type</div>;
    }
  }
  if (selectedQuestion) {
    return (
      <BackgroundLayout>
        {renderQuestionComponent(selectedQuestion)}
        <div className="flex justify-center mt-4">
          <button
            className="mb-2 px-4 py-2 bg-white font-medium rounded-xl border-black border-2"
            onClick={() => setSelectedQuestion(null)}
          >
            Back to Questions
          </button>
        </div>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <PageHeaderLayout />
      <div className="flex flex-col items-center mt-5 min-h-screen">
        <div className="relative w-80 my-5">
          <img src={QuestionsBar} alt="Questions Bar" className="w-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">LEVEL 1 - Questions</span>
          </div>
        </div>
        <div className="flex flex-col mb-5 gap-1">
          {questionRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-row gap-3 items-center justify-center mt-3"
            >
              {row.map((q) => (
                <button
                  key={q.id}
                  className="w-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2 hover:bg-orange-200"
                  onClick={() => setSelectedQuestion(q)}
                >
                  Question {q.id}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-lg font-bold">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </BackgroundLayout>
  );
}

export default Level1Questions;
