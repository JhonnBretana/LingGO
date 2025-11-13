import { KanbanIcon } from "lucide-react";

const situational_questions3 = [
  {
    id: 8,
    type: "SituationalMatchTheSound",
    characterName: "(name)",
    situation: "Sitwasyon 3 - Sa FB Messenger",
    question: "Ipares ang sagot sa tamang tunog. Maayong _________ Pinsan!",
    choices: ["udto", "buntag", "gabii"],
    sounds: [
      "/assets/Voice/CebuanoLevel2/buntag.mp3",
      "/assets/Voice/CebuanoLevel2/gabii.mp3",
      "/assets/Voice/CebuanoLevel2/udto.mp3",
    ],
    correctMatches: {
      0: 1,  
      1: 2,  
      2: 0,  
    },
  },
  {
    id: 9,
    type: "SituationalDragAndDrop",
    characterName: "(name)",
    situation: "Sitwasyon 3 - Sa FB Messenger",
    question: "Nasaan ka ngayon?",
    choices: ["Asa", "karon?", "ka", "Pila", "unya"],
    answer: "Asa ka karon?",
  },
  {
    id: 10,
    type: "SituationalQuestionWithVoice",
    situation: "Sitwasyon 3 - Sa FB Messenger",
    characterImage: null,
    characterName: "(name)",
    question: "Daghang Salamat!",
    voice: "/assets/Voice/CebuanoLevel2/daghangsalamat.mp3",
    correctAnswer: "Daghang Salamat",
    ConvoImage: "/assets/ImageChoices/convofooter2.png",
  },
];

export default situational_questions3;
