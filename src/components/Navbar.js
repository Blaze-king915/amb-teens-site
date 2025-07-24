import React, { useEffect, useState } from 'react';
import NotificationBell from './NotificationBell';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Navbar = ({ onStartTour }) => {
  const [userName, setUserName] = useState('User');
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.displayName) {
      setUserName(user.displayName);
    } else if (user?.email) {
      setUserName(user.email.split('@')[0]);
    }

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const unsub = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          setCoins(snap.data().coins || 0);
        }
      });
      return () => unsub();
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-4 fixed top-0 left-0 right-0 md:ml-64 z-40">
      <h2 className="text-xl font-semibold text-gray-700">Welcome, {userName}</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={onStartTour}
          className="text-sm text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-100"
        >
          Need Help?
        </button>

        {/* 💰 Coin Badge */}
        <div className="relative">
          <span className="text-yellow-600 text-xl">💰</span>
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs px-2 rounded-full">
            {coins}
          </span>
        </div>

        <NotificationBell />
      </div>
    </div>
  );
};

export default Navbar;
