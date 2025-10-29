import { KanbanIcon } from "lucide-react";

const questions = [
  {
    // Type With Voice and Slow Sample Question (Sundan niyo nalang for other questions)
    id: 1,
    type: "TypeWithVoiceAndSlow",
    question: null,
    image: null,
    choices: null,
    correctAnswer: "Dalawa",
    voice: "/assets/Voice/Number/dalawa.mp3",
  },
  {
    // Six Choices With Voice Sample Question
    id: 2,
    type: "SixChoicesWithVoice",
    question: "Kanin",
    choices: [
      { image: "/assets/ImageChoices/Gulay.png", value: "Utan" },
      { image: "/assets/ImageChoices/Kanin.png", value: "Kan on" },
      { image: "/assets/ImageChoices/Mantika.png", value: "Uwel" },
      { image: "/assets/ImageChoices/Bata.png", value: "Tuo" },
      { image: "/assets/ImageChoices/Bahay.png", value: "Balay" },
      { image: "/assets/ImageChoices/Pera.png", value: "Kwarta" },
    ],
    correctAnswer: {
      image: "/assets/ImageChoices/Kanin.png",
      value: "Kan on",
    },
    image: null,
    voice: "/assets/Voice/Words/kanin.mp3",
  },
  {
    // Four Choices With Character And Voice Sample Question
    id: 3,
    type: "FourChoicesWithCharacterAndVoice",
    question: null,
    choices: [
      { value: "Napulo", voice: "/assets/Voice/Number/sampo.mp3" },
      { value: "Usa", voice: "/assets/Voice/Number/isa.mp3" },
      { value: "Unom", voice: "/assets/Voice/Number/anim.mp3" },
      { value: "Tulo", voice: "/assets/Voice/Number/tatlo.mp3" },
    ],
    correctAnswer: "Tulo",
    image: null,
    voice: null,
  },
  {
    //Speech Mic With Voice Sample Question
    id: 4,
    type: "SpeechMicWithVoice",
    question: null,
    choices: null,
    correctAnswer: null,
    image: null,
    voice: null,
  },
  {
    //Matching Words With Image Sample Question
    id: 5,
    type: "MatchingWordsWithImage",
    question: null,
    choices: [
      { word: "Sud-an", image: "/assets/ImageChoices/Gulay.png" },
      { word: "Bugas", image: "/assets/ImageChoices/Kanin.png" },
      { word: "Kan on", image: "/assets/ImageChoices/Ulam.png" },
      { word: "Uwel", image: "/assets/ImageChoices/Bigas.png" },
      { word: "Utan", image: "/assets/ImageChoices/Mantika.png" },
    ],
    correctAnswer: [
      { word: "Utan", image: "/assets/ImageChoices/Gulay.png" },
      { word: "Kan on", image: "/assets/ImageChoices/Kanin.png" },
      { word: "Sud-an", image: "/assets/ImageChoices/Ulam.png" },
      { word: "Bugas", image: "/assets/ImageChoices/Bigas.png" },
      { word: "Uwel", image: "/assets/ImageChoices/Mantika.png" },
    ],
    image: null,
    voice: null,
  },
  {
    // Question With 3 Choices Sample Question
    id: 6,
    type: "QuestionWith3Choices",
    question: "Alin sa mga sumusunod ang Kanan?",
    choices: [
      { image: "/assets/ImageChoices/Bata.png", value: "Tuo" },
      { image: "/assets/ImageChoices/Bigas.png", value: "Bugas" },
      { image: "/assets/ImageChoices/Kaliwa.png", value: "Wala" },
    ],
    correctAnswer: "Tuo",
    image: null,
    voice: null,
  },
  {
    id: 7,
    type: "SpeechMicWithVoice",
    question: "Say the word you hear.",
    choices: null,
    correctAnswer: "Hello",
    image: null,
    voice: "/assets/audio/hello.mp3",
  },
  {
    id: 8,
    type: "Select6ChoicesWithVoiceAndSlow",
    question: "Select the correct animal.",
    choices: ["Dog", "Cat", "Cow", "Pig", "Horse", "Sheep"],
    correctAnswer: "Dog",
    image: null,
    voice: "/assets/audio/dog.mp3",
  },
  {
    id: 9,
    type: "MatchingWordsWithWords",
    question: "Match the words.",
    choices: [
      { word1: "Sun", word2: "Adlaw" },
      { word1: "Moon", word2: "Buwan" },
    ],
    correctAnswer: "Sun-Adlaw",
    image: null,
    voice: "/assets/audio/sun.mp3",
  },
  {
    id: 10,
    type: "FourChoicesWithCharacterAndVoice",
    question: "Who is Chicken Little?",
    choices: [
      { image: "/assets/images/chicken_little.png", value: "Chicken Little" },
      { image: "/assets/images/duck.png", value: "Duck" },
      { image: "/assets/images/cat.png", value: "Cat" },
      { image: "/assets/images/dog.png", value: "Dog" },
    ],
    correctAnswer: "Chicken Little",
    image: null,
    voice: "/assets/audio/chicken_little.mp3",
  },
  // ...repeat similar structure for questions 11-30
];

for (let i = 11; i <= 30; i++) {
  questions.push({
    id: i,
    type: "QuestionWith3Choices",
    question: `Sample question ${i}`,
    choices: ["Choice A", "Choice B", "Choice C"],
    correctAnswer: "Choice A",
    image: null,
    voice: null,
  });
}

export default questions;
