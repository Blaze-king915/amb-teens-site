import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../supabase";
import MiniQuiz from "../../components/MiniQuiz";
import { useNavigate } from "react-router-dom";

export default function Lesson48() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLesson, setShowLesson] = useState(false);

  useEffect(() => {
    if (user) fetchCoins();
  }, [user]);

  const fetchCoins = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("coins")
      .eq("id", user.id)
      .single();

    if (error) console.error("Coin fetch error:", error);
    else {
      setCoins(data.coins);
      setShowLesson(data.coins >= 150); // Only show lesson if coins >= 150
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (coins < 25) return alert("Not enough coins to download PDF");
    await updateCoins(-25);
    window.open("/pdfs/lesson48.pdf", "_blank");
  };

  const handleShare = async () => {
    if (coins < 25) return alert("Not enough coins to share");
    await updateCoins(-25);
    alert("Shared successfully! (Fake share for now 😅)");
  };

  const updateCoins = async (amount) => {
    const newCoins = coins + amount;
    setCoins(newCoins);

    const { error } = await supabase
      .from("users")
      .update({ coins: newCoins })
      .eq("id", user.id);

    if (error) console.error("Coin update error:", error);
  };

  const goToFullQuiz = () => {
    navigate("/lesson48quiz");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!showLesson)
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        You need at least 150 coins to unlock this lesson.
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lesson 48: Introduction to Robotics</h1>

      <p className="mb-4 text-lg leading-relaxed">
        Robotics is a branch of technology that involves the design, construction, operation, and use of robots. Robots are programmable machines capable of carrying out a series of actions automatically.
        {/* More lesson content here */}
      </p>

      {/* Mini quiz (0 coins, just for fun) */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Mini Quiz</h2>
        <MiniQuiz
          questions={[
            {
              question: "What is Robotics?",
              options: [
                "A cooking method",
                "A technology to build robots",
                "A music style",
                "A dance move",
              ],
              answer: "A technology to build robots",
            },
          ]}
        />
      </div>

      {/* Download + Share buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download as PDF (25 coins)
        </button>
        <button
          onClick={handleShare}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Share Lesson (25 coins)
        </button>
      </div>

      {/* Full quiz */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Test Your Knowledge</h2>
        <button
          onClick={goToFullQuiz}
          className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700"
        >
          Take Full Quiz
        </button>
      </div>
    </div>
  );
}
