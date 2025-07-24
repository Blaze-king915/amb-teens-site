import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

export const awardCoins = async (uid, amount) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { coins: increment(amount) });
};

export const deductCoins = async (uid, amount) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  const currentCoins = userData.coins || 0;

  if (currentCoins >= amount) {
    await updateDoc(userRef, { coins: currentCoins - amount });
    return true;
  } else {
    return false;
  }
};

export const saveQuizScore = async (uid, lessonId, score) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    [`quizScores.${lessonId}`]: score
  });
};
