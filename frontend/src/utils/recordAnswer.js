import { db } from "../firebase";
import { doc, setDoc, increment, getDoc, updateDoc } from "firebase/firestore"; 

/**
 * Record Level 1 Answer
 * @param {string} userId 
 * @param {number} questionId 
 * @param {boolean} isCorrect 
 */
export async function recordLevel1Answer(userId, questionId, isCorrect) {
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
    console.log(`✅ Level 1 Q${questionId} saved as ${isCorrect ? "Correct" : "Wrong"}`);
  } catch (error) {
    console.error("❌ Error recording Level 1 answer:", error);
    throw error;
  }
}

/**
 * Record Level 2 Answer
 * @param {string} userId 
 * @param {number} questionId 
 * @param {boolean} isCorrect 
 */
export async function recordLevel2Answer(userId, questionId, isCorrect) {
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
    console.log(`✅ Level 2 Q${questionId} saved as ${isCorrect ? "Correct" : "Wrong"}`);
  } catch (error) {
    console.error("❌ Error recording Level 2 answer:", error);
    throw error;
  }
}

/**
 * Record Level 3 Answer with Score Increment
 * @param {string} userId 
 * @param {number} questionId 
 * @param {boolean} isCorrect 
 * @param {number} pointsPerQuestion - Default is 2 points per question
 */
export async function recordLevel3Answer(userId, questionId, isCorrect, pointsPerQuestion = 2) {
  try {
    console.log(`📊 Recording Level 3 Answer:`, {
      userId,
      questionId,
      isCorrect,
      pointsPerQuestion
    });

    const userRef = doc(db, "users", userId);
    
    // First, check if the document exists
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.error("❌ User document does not exist!");
      throw new Error("User document not found");
    }

    const scoreIncrement = isCorrect ? pointsPerQuestion : 0;
    
    // Step 1: Update the question answer using setDoc with merge
    await setDoc(
      userRef,
      {
        Level3Questions: {
          [`Level3Question${questionId}`]: isCorrect ? "Correct" : "Wrong",
        },
      },
      { merge: true }
    );

    // Step 2: Update the score using updateDoc (better for nested fields)
    if (scoreIncrement > 0) {
      await updateDoc(userRef, {
        "Score.level3Score": increment(scoreIncrement),
      });
    }

    // Verify the update
    const updatedSnap = await getDoc(userRef);
    const updatedData = updatedSnap.data();
    
    console.log(`✅ Level 3 Q${questionId} saved successfully!`);
    console.log(`📊 Current Score.level3Score:`, updatedData.Score?.level3Score);
    console.log(`📝 Question status:`, updatedData.Level3Questions?.[`Level3Question${questionId}`]);
    
  } catch (error) {
    console.error("❌ Error recording Level 3 answer:", error);
    console.error("Error details:", {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}