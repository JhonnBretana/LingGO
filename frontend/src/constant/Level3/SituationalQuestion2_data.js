import { KanbanIcon } from "lucide-react";

const situational_questions2 = [
  {
    id: 3,
    type: "Questionwith4ChoicesSituational",
    situation: "Sitwasyon 2 - Sa Palengke",
    characterName: "(name)",
    question: "Alin sa mga sumusunod ang 'Tagapagsalita'? Maayong ____________",
    choices: [
      { value: "gabii", image: "/assets/ImageChoices/Gabi.png" },
      { value: "buntag", image: "/assets/ImageChoices/Umaga.png" },
      { value: "udto", image: "/assets/ImageChoices/Tanghali.png" },
      { value: "hapon", image: "/assets/ImageChoices/Hapon.png" },
    ],
    correctAnswer: "udto",
  },
  {
    id: 4,
    type: "SituationalQuestionWithSlowSound",
    situation: "Sitwasyon 2 - Sa Palengke",
    characterName: "(name)",
    question: "I-type ang iyong narinig.",
    voice: null,
    correctAnswer: "tulo",
  },
  {
    id: 5,
    type: "Select4ChoicesWithVoice",
    situation: "Sitwasyon 2 - Sa Palengke",
    characterName: "(name)",
    question: "Piliin ang iyong narinig.",
    choices: [
      { value: "Nalipay ko nga nakaila tika!", image: null },
      { value: "Asa dapit ang tindahan?", image: null },
      { value: "Pag-amping!", image: null },
      { value: "Puwede mangutana?", image: null },
    ],
    voice: null,
    correctAnswer: "Nalipay ko nga nakaila tika!",
  },
  {
    id: 6,
    type: "SituationalQuestionDragAndDrop",
    situation: "Sitwasyon 2 - Sa Palengke",
    characterName: "(name)",
    question: "Saan banda may bilihan ng gulay?",
    choices: ["naay", "Asa", "dapit", "tindahan", "utant?", "dirig", "Usa"],
    answer: "Asa dapit naay tindahan dirig utant?",
  },
  {
    id: 7,
    type: "SituationalQuestionWithVoice",
    situation: "Sitwasyon 2 - Sa Bahay",
    characterImage: "/assets/ImageChoices/boyatthemarket1.png",
    characterName: "(name)",
    question: "Daghang Salamat!",
    voice: "/assets/voices/question2.mp3",
    correctAnswer: "Daghang Salamat",
    ConvoImage:null,
  },
];

export default situational_questions2;
