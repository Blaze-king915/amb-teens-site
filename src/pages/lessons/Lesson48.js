import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const ToggleVerse = ({ title, verse }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <button
        onClick={() => setShow(!show)}
        className="w-full bg-blue-100 hover:bg-blue-200 text-left px-4 py-2 rounded font-semibold transition"
      >
        {title} {show ? '🔽' : '▶️'}
      </button>
      {show && (
        <div className="bg-white shadow-inner rounded px-4 py-3 mt-2 border-l-4 border-blue-500 text-gray-700">
          {verse}
        </div>
      )}
    </div>
  );
};

const MiniQuiz = ({ question, options, onAnswer, disabled }) => (
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-2">🧪 Mini Quiz</h4>
    <p className="mb-2">{question}</p>
    <div className="space-y-2">
      {options.map((opt, index) => (
        <button
          key={index}
          disabled={disabled}
          onClick={() => onAnswer(opt.correct, opt.feedback)}
          className="block w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const Lesson48 = () => {
  const navigate = useNavigate();
const { userData, completedLessons, markLessonCompleted, spendCoins } = useApp();
const coin = userData?.coins || 0;


  const lessonId = 'lesson48';
  const isCompleted = Array.isArray(completedLessons) && completedLessons.includes(lessonId);

  const [hasDownloaded, setHasDownloaded] = useState(false);

  const [quizState, setQuizState] = useState({
    intro: false,
    importance: false,
    life: false,
  });

  const handleAnswer = (section, isCorrect, feedback) => {
    if (quizState[section]) return;
    setQuizState((prev) => ({ ...prev, [section]: true }));

    if (isCorrect) {
      toast.success('✅ Correct!');
    } else {
      toast.error(`❌ Wrong! ${feedback}`);
    }
  };

  const trySpendCoins = async (amount, actionName, onSuccess) => {
  const success = await spendCoins(amount);
  if (success) {
    toast.success(`✅ ${actionName} for ${amount} coins!`);
    onSuccess();
  } else {
    toast.error(`🚫 Not enough coins to ${actionName}. You need ${amount}.`);
  }
};


  const downloadNotes = () => {
  if (hasDownloaded) {
    toast('✅ Already downloaded!');
    return;
  }

  toast(
    (t) => (
      <span>
        🧾 Are you sure you want to download this for 20 coins?
        <div className="mt-2 flex gap-2">
          <button
            onClick={async () => {
              trySpendCoins(20, 'Download notes', () => {
  const text = 'Lesson 48 - Good Communication...';
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'Lesson48_Notes.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
  setHasDownloaded(true);
  toast.success('✅ Notes downloaded!');
});

              trySpendCoins(20, 'Download notes', () => {
  const text = 'Lesson 48 - Good Communication...';
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.download = 'Lesson48_Notes.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
  setHasDownloaded(true);
  toast.success('✅ Notes downloaded!');
});

              toast.dismiss(t.id);
            }}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </span>
    ),
    { duration: 10000 }
  );
};

  const shareLesson = () => {
    trySpendCoins(20, 'Share lesson', () => {
      toast('📤 Shared!');
    });
  };

  const handleCompletion = () => {
    if (!isCompleted) {
      markLessonCompleted(lessonId, 50);
      toast.success('✅ Lesson marked as complete! +50 coins');
    }
  };

  const content = (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen space-y-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline text-sm">
          ← Back
        </button>
        <div className="flex gap-4">
          <button onClick={downloadNotes} className="text-sm px-3 py-1 bg-green-100 hover:bg-green-200 rounded">
            ⬇️ Download Notes
          </button>
          <button onClick={shareLesson} className="text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded">
            🔗 Share
          </button>
        </div>
      </div>

      <h2 className="text-4xl font-extrabold text-blue-700 text-center">📘 Lesson 48: Good Communication</h2>

      <section className="space-y-8 text-gray-800">
        {/* Bible Texts */}
        <div>
          <h3 className="text-2xl font-bold">📖 Bible Text</h3>
          <ToggleVerse
            title="Colossians 4:4–6"
            verse={'[4] Pray that I may proclaim it clearly... [6] Let your conversation be always full of grace...'}
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold">🧠 Memory Verse</h3>
          <ToggleVerse
            title="Proverbs 15:1"
            verse={'A soft answer turneth away wrath; but grievous words stir up anger.'}
          />
        </div>

        {/* INTRODUCTION */}
        <div>
          <h3 className="text-2xl font-bold">🗣️ Introduction</h3>
          <div className="bg-white shadow rounded p-5 leading-relaxed">
            Good communication is key to relationships and sharing our faith. Ephesians 4:29 tells us to use words that
            build others up. Avoid negativity. Speak life and love. (Also see Proverbs 12:18.)
          </div>

          <MiniQuiz
            question="What does Ephesians 4:29 teach us?"
            disabled={quizState.intro}
            onAnswer={(correct, feedback) => handleAnswer('intro', correct, feedback)}
            options={[
              { label: 'Use words that build others', correct: true },
              { label: 'Speak only when spoken to', correct: false, feedback: 'Nope. It encourages active kindness.' },
              { label: 'Stay silent always', correct: false, feedback: 'No. It’s about wise speech, not silence.' },
            ]}
          />
        </div>

        {/* IMPORTANCE */}
        <div>
          <h3 className="text-2xl font-bold">📌 Importance</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Builds strong relationships (Proverbs 15:1)</li>
            <li>Encourages unity and collaboration</li>
            <li>Prevents misunderstandings</li>
            <li>Improves productivity and peace</li>
            <li>Resolves conflict biblically (Proverbs 18:13)</li>
            <li>Grows personal character and spiritual maturity</li>
          </ul>

          <MiniQuiz
            question="Why is good communication important?"
            disabled={quizState.importance}
            onAnswer={(correct, feedback) => handleAnswer('importance', correct, feedback)}
            options={[
              { label: 'To impress others with fancy words', correct: false, feedback: 'That’s not the goal here.' },
              { label: 'To build trust and avoid conflict', correct: true },
              { label: 'To win arguments faster', correct: false, feedback: 'No, it’s about peace, not winning.' },
            ]}
          />
        </div>

        {/* LIFE APPLICATION */}
        <div>
          <h3 className="text-2xl font-bold">💡 Life Application</h3>
          <p className="bg-white rounded shadow p-4 leading-relaxed">
            Apply this lesson by being mindful of your words, especially when upset. Practice listening first (James
            1:19), and aim to be gracious. Your speech should reflect Christ’s love and truth every day.
          </p>

          <MiniQuiz
            question="How can you apply this lesson?"
            disabled={quizState.life}
            onAnswer={(correct, feedback) => handleAnswer('life', correct, feedback)}
            options={[
              { label: 'Listen before reacting', correct: true },
              { label: 'Yell when angry', correct: false, feedback: 'Nope. That’s the opposite.' },
              { label: 'Use sarcasm often', correct: false, feedback: 'Not Christlike communication.' },
            ]}
          />
        </div>

        {/* SUMMARY */}
        <div>
          <h3 className="text-2xl font-bold">📍 Summary</h3>
          <p className="bg-white rounded shadow p-4">
            Good communication involves clarity, grace, patience, and kindness — all rooted in Scripture.
          </p>
        </div>

        {/* Completion & Quiz */}
        <div className="text-center mt-10 space-y-4">
          {!isCompleted ? (
            <button
              onClick={handleCompletion}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              ✅ Mark as Completed
            </button>
          ) : (
            <div className="text-green-700 font-semibold">🎉 Lesson Completed!</div>
          )}

          <button
            onClick={() => navigate('/quiz/lesson48')}
            className="bg-indigo-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            🎯 Take Full Quiz
          </button>
        </div>
      </section>
    </div>
  );

  return content;

};

export default Lesson48;
