import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

// ✅ Already Existing
export const checkLessonCompletion = async (userId, lessonId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const data = userSnap.data();
  return data?.completedLessons?.includes(lessonId);
};

// ✅ Already Existing
export const updateUserProgress = async (userId, lessonId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    completedLessons: arrayUnion(lessonId)
  });
};

// ✅ Add this
export const updateUserCoins = async (userId, coinsToAdd) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const currentCoins = userSnap.data()?.coins || 0;

  await updateDoc(userRef, {
    coins: currentCoins + coinsToAdd
  });
};

// ✅ Add this
export const markLessonCompleted = async (userId, lessonId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    completedLessons: arrayUnion(lessonId)
  });
};
