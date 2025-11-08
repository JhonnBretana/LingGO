import { KanbanIcon } from "lucide-react";

const situational_questions2 = [
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
      0: 0, // First sound matches to "udto"
      1: 1, // Second sound matches to "buntag"
      2: 2, // Third sound matches to "gabii"
    },
  },
];

export default situational_questions2;
