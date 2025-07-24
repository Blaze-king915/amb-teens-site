import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which book comes after Genesis in the Bible?',
    options: ['Exodus', 'Leviticus', 'Psalms', 'Matthew'],
    answer: 'Exodus',
  },
];

const Quiz = () => {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === quizData[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < quizData.length) {
        setCurrent(current + 1);
        setSelected('');
      } else {
        setFinished(true);
        awardCoins();
      }
    }, 800);
  };

  const awardCoins = async () => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    const coins = snap.exists() ? snap.data().coins || 0 : 0;

    await updateDoc(userRef, { coins: coins + 5 }); // award 5 coins
    toast.success('🎉 You earned 5 coins!');
  };

  if (!user) return <p className="text-center">Please log in to take the quiz.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto text-center">
      {!finished ? (
        <>
          <h2 className="text-xl font-bold mb-4">{quizData[current].question}</h2>
          <div className="grid gap-2">
            {quizData[current].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`py-2 px-4 rounded border text-sm transition ${
                  selected
                    ? opt === quizData[current].answer
                      ? 'bg-green-200 border-green-500'
                      : opt === selected
                      ? 'bg-red-200 border-red-500'
                      : 'bg-gray-100 border-gray-300'
                    : 'bg-white hover:bg-blue-100 border-blue-300'
                }`}
                disabled={!!selected}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
          <p className="mb-4">You scored {score} out of {quizData.length}</p>
          <p className="text-green-600 font-semibold">+5 coins awarded</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
