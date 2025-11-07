import React, { useState } from "react";
import QuestionsBar from "../../../assets/clickbar.png";
import GirlAtHouse from "/assets/ImageChoices/girlathouse.png";
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
      className={`px-4 py-2 text-lg rounded-lg bg-blue-100 text-black font-bold border border-blue-400 transition text-center cursor-move select-none
        ${isDragging ? "bg-yellow-200 border-yellow-400" : ""}
      `}
    >
      {children}
    </div>
  );
}

function DroppableZone({ id, children, isActive }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-row gap-3 min-h-[56px] min-w-[200px] w-full justify-center items-center p-4 transition ${
        isOver ? "bg-yellow-50" : ""
      } ${id === "answer-dropzone" ? "border-b-4 border-black" : ""}`}
    >
      {children}
    </div>
  );
}

const Questionwith4ChoicesSituational = ({
  situation,
  instruction,
  instructionSub,
  characterName,
  question,
  choices = [],
  onSelect,
  note,
  answer,
}) => {
  const [bank, setBank] = useState(choices);
  const [answerArea, setAnswerArea] = useState([]);
  const [feedback, setFeedback] = useState("");
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
      setFeedback("");
      return;
    }

    // From answer area back to bank
    if (answerArea.includes(active.id) && over.id === "bank-dropzone") {
      setAnswerArea((prev) => prev.filter((item) => item !== active.id));
      setBank((prev) => [...prev, active.id]);
      setFeedback("");
      return;
    }
  };

  const handleSubmit = () => {
    const userAnswer = answerArea.join(" ");

    if (userAnswer === answer) {
      setFeedback("✓ Tama!");
      setSubmitted(true);
      setTimeout(() => {
        onSelect(userAnswer);
      }, 1000);
    } else {
      setFeedback("✗ Mali. Subukan ulit.");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-2 pt-4 gap-3">
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
          <img src={GirlAtHouse} alt="" />
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
        <div className="w-[400px] max-w-md bg-white rounded-xl shadow-3xl px-4 py-4 mt-2 border border-gray-300 flex flex-col items-center">
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

          {/* Feedback Message */}
          {feedback && (
            <div
              className={`mt-4 px-4 py-2 rounded-lg font-bold text-lg transition ${
                feedback.includes("Tama")
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {feedback}
            </div>
          )}

          <button
            className="mt-6 px-6 py-2 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            onClick={handleSubmit}
            disabled={answerArea.length === 0 || submitted}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionwith4ChoicesSituational;
