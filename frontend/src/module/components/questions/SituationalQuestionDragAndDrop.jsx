import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import BoyAtTheMarket from "/assets/ImageChoices/boyatthemarket.png";
import CorrectAnswerModal from "../../components/CorrectOverlay";
import WrongAnswerModal from "../../components/WrongOverlay";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : "auto",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`px-2 py-2 text-sm rounded-lg bg-blue-100 text-black font-bold border border-blue-400 transition text-center cursor-move select-none
        ${isDragging ? "bg-yellow-200 border-yellow-400" : ""}
      `}
    >
      {children}
    </div>
  );
}

function DroppableZone({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-row flex-wrap gap-3 min-h-[56px] w-90 justify-center items-center p-4 transition ${
        isOver ? "bg-yellow-50" : ""
      } ${id === "answer-dropzone" ? "border-b-4 border-black" : ""}`}
    >
      {children}
    </div>
  );
}

function SituationalQuestionDragAndDrop({
  situation,
  instruction,
  instructionSub,
  characterName,
  question,
  choices = [],
  onCorrectAnswer,
  onWrongAnswer,
  answer,
}) {
  const [bank, setBank] = useState(choices);
  const [answerArea, setAnswerArea] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    // Reorder within answer area
    if (
      answerArea.includes(active.id) &&
      answerArea.includes(over.id) &&
      active.id !== over.id
    ) {
      const oldIndex = answerArea.indexOf(active.id);
      const newIndex = answerArea.indexOf(over.id);
      setAnswerArea((items) => arrayMove(items, oldIndex, newIndex));
      return;
    }

    // From bank to answer area
    if (bank.includes(active.id) && over.id === "answer-dropzone") {
      setBank((prev) => prev.filter((item) => item !== active.id));
      setAnswerArea((prev) => [...prev, active.id]);
      return;
    }

    // From answer area back to bank
    if (answerArea.includes(active.id) && over.id === "bank-dropzone") {
      setAnswerArea((prev) => prev.filter((item) => item !== active.id));
      setBank((prev) => [...prev, active.id]);
      return;
    }
  };

  const handleSubmit = () => {
    const userAnswer = answerArea.join(" ");

    if (userAnswer === answer) {
      setShowCorrect(true);
      setSubmitted(true);
    } else {
      setShowWrong(true);
      setSubmitted(true);
    }
  };

  const handleCloseCorrectModal = () => {
    setShowCorrect(false);
    setAnswerArea([]);
    setBank(choices);
    setSubmitted(false);
    if (onCorrectAnswer) {
      onCorrectAnswer();
    }
  };

  const handleCloseWrongModal = () => {
    setShowWrong(false);
    setSubmitted(false);
    if (onWrongAnswer) {
      onWrongAnswer();
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2 pt-2 gap-2">
      {/* Situation Bar */}
      {situation && (
        <div className="relative w-full max-w-80 mb-3">
          <img
            src={QuestionsBar}
            alt="Questions Bar"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p
              className="font-medium text-center text-xl text-black drop-shadow-[2px_2px_0px_white]  w-full max-w-md px-10"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontWeight: "bold",
              }}
            >
              {situation}
            </p>
          </div>
        </div>
      )}

      {characterName && (
        <div
          className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black]  w-full max-w-md px-10"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>
      )}
      <div
        className="px-5 py-3 bg-white rounded-lg w-100  border border-black flex flex-col text-center  justify-center"
        style={{
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: "bold",
        }}
      >
        <span className="text-2xl">Puwede mangutana?</span>
        <span className="text-blue-700">Puwede magtanong?</span>
      </div>

      {/* Instruction Bubble */}
      <div className="flex flex-row items-center gap-2 w-full max-w-md">
        <div className="flex flex-col relative">
          <div className="absolute top-[50px] right-[40px]  z-10 w-[150px]">
            <span className="font-bold text-black text-base">
              {instruction}
            </span>
            {instructionSub && (
              <div className="text-xs text-gray-500">{instructionSub}</div>
            )}
          </div>
          <img src={BoyAtTheMarket} alt="" className="h-50" />
        </div>
      </div>

      {/* Character Name */}
      {characterName && (
        <div
          className="font-medium text-right text-xl text-white drop-shadow-[2px_3px_1px_black]  w-full max-w-md px-10"
          style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
        >
          {characterName}
        </div>
      )}

      {/* Main Question */}
      {question && (
        <div className="w-[400px] max-w-md bg-white rounded-xl shadow-3xl px-4 py-4 my-2 mb-3 border border-gray-300 flex flex-col items-center">
          <div
            className="font-medium text-center text-xl text-black mb-6 px-2"
            style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: "bold" }}
          >
            {question}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col gap-6 w-full items-center ">
              {/* Answer Dropzone */}
              <SortableContext
                items={answerArea}
                strategy={rectSortingStrategy}
              >
                <DroppableZone id="answer-dropzone">
                  {answerArea.length === 0 ? (
                    <span className="text-gray-400 italic">
                      I-drag dito ang sagot
                    </span>
                  ) : (
                    answerArea.map((choice) => (
                      <SortableItem key={choice} id={choice}>
                        {choice}
                      </SortableItem>
                    ))
                  )}
                </DroppableZone>
              </SortableContext>

              {/* Choices Bank */}
              <SortableContext items={bank} strategy={rectSortingStrategy}>
                <DroppableZone id="bank-dropzone">
                  {bank.map((choice) => (
                    <SortableItem key={choice} id={choice}>
                      {choice}
                    </SortableItem>
                  ))}
                </DroppableZone>
              </SortableContext>
            </div>
          </DndContext>

          <button
            className="mt-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={answerArea.length === 0 || submitted}
          >
            Submit
          </button>
        </div>
      )}

      {/* Modals */}
      <CorrectAnswerModal
        isOpen={showCorrect}
        onClose={handleCloseCorrectModal}
      />
      <WrongAnswerModal
        isOpen={showWrong}
        onClose={handleCloseWrongModal}
        correctAnswer={answer}
      />
    </div>
  );
}

export default SituationalQuestionDragAndDrop;
