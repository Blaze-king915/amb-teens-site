import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [userCoins, setUserCoins] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserCoins(data.coins || 0);
        setCompletedLessons(data.completedLessons || []);
      }
    };

    fetchUserData();
  }, [user]);

  const markLessonAsComplete = async (lessonId, coinReward = 50) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      completedLessons: arrayUnion(lessonId),
      coins: userCoins + coinReward,
    });

    setCompletedLessons((prev) => [...prev, lessonId]);
    setUserCoins((prev) => prev + coinReward);
  };

  return (
    <AppContext.Provider
      value={{
        userCoins,
        completedLessons,
        markLessonAsComplete,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
