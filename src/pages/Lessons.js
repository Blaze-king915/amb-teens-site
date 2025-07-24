// src/pages/Lessons.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Lessons = () => {
  const navigate = useNavigate();
  const { userCoins, spendCoins } = useApp();

  const coins = userCoins || 0;
  const [unlockedLessons, setUnlockedLessons] = useState([]);

  const allLessons = Array.from({ length: 53 }, (_, i) => {
    const id = 48 + i;
    return {
      id,
      title: `Lesson ${id}`,
      cost: id === 48 ? 0 : 150,
    };
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('unlockedLessons')) || [48];
    setUnlockedLessons(saved);
  }, []);

  const saveProgress = async (cost, newUnlocked) => {
    const success = await spendCoins(cost);
    if (success) {
      setUnlockedLessons(newUnlocked);
      localStorage.setItem('unlockedLessons', JSON.stringify(newUnlocked));
    } else {
      toast.error('🚫 Failed to spend coins.');
    }
  };

  const handleUnlock = async (lesson) => {
    if (coins >= lesson.cost) {
      const confirmed = window.confirm(`Unlock ${lesson.title} for ${lesson.cost} coins?`);
      if (!confirmed) return;

      const newUnlocked = [...unlockedLessons, lesson.id];
      await saveProgress(lesson.cost, newUnlocked);
      toast.success(`✅ ${lesson.title} unlocked!`);
    } else {
      toast.error('🚫 Not enough coins.');
    }
  };

  const handleLessonClick = (lesson) => {
    if (unlockedLessons.includes(lesson.id)) {
      navigate(`/lessons/${lesson.id}`);
    } else {
      toast((t) => (
        <div>
          <p className="font-semibold text-sm">🔒 {lesson.title} is locked.</p>
          <p className="text-xs">Requires {lesson.cost} coins to unlock.</p>
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleUnlock(lesson);
              }}
              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
            >
              Unlock
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ));
    }
  };

  const isUnlocked = (lessonId) => unlockedLessons.includes(lessonId);

  return (
    <div className="p-4 pt-20 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Lessons</h2>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm font-bold text-yellow-500">Coins: {coins}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allLessons.map((lesson) => {
          const unlocked = isUnlocked(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={`rounded-lg p-4 shadow transition duration-200 cursor-pointer relative
                ${unlocked ? 'bg-white hover:shadow-lg' : 'bg-gray-100 text-gray-500 opacity-60 hover:opacity-100'}
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold">{lesson.title}</h3>
                {unlocked ? (
                  <FaLockOpen className="text-green-500" />
                ) : (
                  <FaLock className="text-red-400" />
                )}
              </div>

              {!unlocked && (
                <p className="text-sm">Requires {lesson.cost} coins</p>
              )}

              {unlocked && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/lessons/${lesson.id}`);

                  }}
                  className="mt-2 px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Start Lesson
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lessons;

