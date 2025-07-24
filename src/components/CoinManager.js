import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';

const CoinManager = () => {
  const { user } = useAuth();
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);

    // Real-time coin update
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCoins(data.coins || 0);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="bg-yellow-100 text-yellow-900 px-4 py-2 rounded shadow mb-4 text-sm w-fit">
      💰 You have <span className="font-bold">{coins}</span> coins
    </div>
  );
};

export default CoinManager;
