import { KanbanIcon } from "lucide-react";

const situational_questions1 = [
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
    characterImage: "/assets/ImageChoices/girlathouse2.png",
    characterName: "(name)",
    question: "Asa ang kwarta??",
    voice: "/assets/Voice/CebuanoNumber/asaangkwarta.mp3",
    correctAnswer: "Asa ang kwarta",
  },
];

export default situational_questions1;
