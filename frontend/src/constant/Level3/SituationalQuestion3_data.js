import { KanbanIcon } from "lucide-react";

const situational_questions3 = [
  {
    id: 8,
    type: "SituationalMatchTheSound",
    characterName: "(name)",
    situation: "Sitwasyon 3 - Mga Oras ng Araw",
    question: "Ipares ang sagot sa tamang tunog. Maayong _________ Pinsan!",
    choices: ["udto", "buntag", "gabii"],
    sounds: [
      "/assets/sounds/udto.mp3",
      "/assets/sounds/buntag.mp3",
      "/assets/sounds/gabii.mp3",
    ],
    correctMatches: {
      0: 0,
      1: 1,
      2: 2,
    },
  },
  {
    id: 9,
    type: "SituationalDragAndDrop",
    characterName: "(name)",
    situation: "Sitwasyon 3 - Mga Oras ng Araw",
    question: "Nasaan ka ngayon?",
    choices: ["Asa", "karon?", "ka", "Pila", "unya"],
    answer: "Asa ka karon?",
  },
];

export default situational_questions3;