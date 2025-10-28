import React from "react";
import Man from "../../assets/man.png";
import Oil from "../../assets/oil.png";
import Money from "../../assets/money.png";
import Rice from "../../assets/rice.png";
import Vegetable from "../../assets/vegetable.png";
import House from "../../assets/kubo.png";

function ChoiceGrid({ selectedChoice, onSelectChoice }) {
  const choices = [
    { id: 1, label: "tao", image: Man },
    { id: 2, label: "kan on", image: Rice },
    { id: 3, label: "langis", image: Oil },
    { id: 4, label: "pera", image: Money },
    { id: 5, label: "bahay", image: House },
    { id: 6, label: "gulay", image: Vegetable },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 p-8 ">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => onSelectChoice(choice.id)}
          className={`w-40 h-40 rounded-lg border-4 flex flex-col items-center justify-center transition-all ${
            selectedChoice === choice.id
              ? "bg-yellow-400 border-yellow-600"
              : "bg-white border-gray-300"
          }`}
        >
          <img src={choice.image} alt={choice.label} className="h-28 w-28 object-cover" />
          <span className="mt-2 text-black font-bold text-sm">{choice.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ChoiceGrid;