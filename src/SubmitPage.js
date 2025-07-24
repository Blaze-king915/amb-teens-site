import React, { useEffect } from "react";
import { useSignup } from "./SignupContext";
import db from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SubmitPage = () => {
  const { formData } = useSignup();

  useEffect(() => {
    const saveData = async () => {
      try {
        await addDoc(collection(db, "users"), {
          ...formData,
          timestamp: serverTimestamp(),
        });
        alert("Signup successful!");
      } catch (error) {
        console.error("Error saving data: ", error);
        alert("Error saving data.");
      }
    };
    saveData();
  }, [formData]);

  return (
    <div className="form-container">
      <h2>Submitting...</h2>
    </div>
  );
};

export default SubmitPage;
