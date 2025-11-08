import { KanbanIcon } from "lucide-react";

const questions3 = [
  {
    id: 1,
    type: "Questionwith4ChoicesSituational",
    situation: "Sitwasyon 2 - Sa Bahay",
    instruction: "(name) Adto didto sa palengke.",
    instructionSub: "(name) Pumunta ka sa palengke.",
    characterName: "(name)",
    question: "Anong bibilhin po?",
    choices: ["po?", "asa", "paliton", "Unsa'y"],
    correctAnswer: "Unsa'y paliton po?",
  },
  {
    id: 2,
    type: "SituationalQuestionWithVoice",
    situation: "Sitwasyon 2 - Sa Bahay",
    instruction: "Makinig at sagutin",
    instructionSub: "Magsalita ng malinaw",
    characterName: "(name)",
    question: "Asa ang kwarta??",
    voice: "/assets/voices/question2.mp3",
    correctAnswer: "Asa ang kwarta",
  },
];

export default questions3;
