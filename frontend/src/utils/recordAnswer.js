import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

/**
 * Records the answer for a Level 1 question under the user's document.
 * @param {string} userId - The user's document ID.
 * @param {number} questionId - The question number (e.g., 1 for Level1Question1).
 * @param {boolean} isCorrect - True if correct, false if wrong.
 */
export async function recordLevel1Answer(userId, questionId, isCorrect) {
  const questionField = `Level1Questions.Level1Question${questionId}`;
  const userRef = doc(db, "users", userId);

  await setDoc(
    userRef,
    {
      Level1Questions: {
        [`Level1Question${questionId}`]: isCorrect ? "Correct" : "Wrong",
      },
    },
    { merge: true }
  );
}

export async function recordLevel2Answer(userId, questionId, isCorrect) {
  const questionField = `Level2Questions.Level2Question${questionId}`;
  const userRef = doc(db, "users", userId);

  await setDoc(
    userRef,
    {
      Level2Questions: {
        [`Level2Question${questionId}`]: isCorrect ? "Correct" : "Wrong",
      },
    },
    { merge: true }
  );
}


