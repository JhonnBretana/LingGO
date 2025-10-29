import React, { useState } from "react";
import BackgroundLayout from "../module/components/BackgroundLayout.jsx";
import QuestionsBar from "../assets/clickbar.png";
import PageHeaderLayout from "../module/components/PageHeaderLayout";
import questions from "../constant/questions_data.js";

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
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const paginatedQuestions = questions.slice(startIdx, endIdx);
  const questionRows = groupIntoRows(paginatedQuestions, 2);

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
              className="flex flex-row gap-3 items-center justify-center mt-2"
            >
              {row.map((q) => (
                <div
                  key={q.id}
                  className="w-40 text-center bg-white text-black text-lg font-bold py-2 px-4 rounded-xl border-2"
                >
                  Question {q.id}
                </div>
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
