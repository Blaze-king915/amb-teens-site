import React, { useState } from 'react';
import './MiniQuizBox.css'; // optional styling file

const MiniQuizBox = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  return (
    <div className="mt-4 p-3 border rounded shadow bg-white">
      <h4 className="font-semibold">{question}</h4>
      <ul className="space-y-2 mt-2">
        {options.map((opt, i) => (
          <li key={i}>
            <button
              className={`w-full text-left p-2 rounded ${
                answered
                  ? i === correctIndex
                    ? 'bg-green-200'
                    : i === selected
                    ? 'bg-red-200'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      {answered && (
        <div className="mt-3 p-2 bg-blue-100 rounded">
          {selected === correctIndex ? (
            <span className="text-green-700 font-bold">✅ Correct!</span>
          ) : (
            <span className="text-red-700 font-bold">❌ Incorrect.</span>
          )}
          <p className="mt-1 text-sm">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default MiniQuizBox;
