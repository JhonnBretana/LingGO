import { db } from "../firebase";
import { doc, setDoc, increment, getDoc, updateDoc } from "firebase/firestore";

/**
 * Record Level 1 Answer
 */
export async function recordLevel1Answer(userId, questionId, isCorrect) {
  // eslint-disable-next-line no-useless-catch
  try {
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
  } catch (error) {
    throw error;
  }
}

/**
 * Record Level 2 Answer
 */
export async function recordLevel2Answer(userId, questionId, isCorrect) {
  // eslint-disable-next-line no-useless-catch
  try {
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
  } catch (error) {
    throw error;
  }
}

/**
 * Record Level 3 Answer with Score Increment
 */
export async function recordLevel3Answer(userId, questionId, isCorrect, pointsPerQuestion = 2) {
  // eslint-disable-next-line no-useless-catch
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("User document not found");
    }

    const scoreIncrement = isCorrect ? pointsPerQuestion : 0;

    await setDoc(
      userRef,
      {
        Level3Questions: {
          [`Level3Question${questionId}`]: isCorrect ? "Correct" : "Wrong",
        },
      },
      { merge: true }
    );

    if (scoreIncrement > 0) {
      await updateDoc(userRef, {
        "Score.level3Score": increment(scoreIncrement),
      });
    }
  } catch (error) {
    throw error;
  }
}
