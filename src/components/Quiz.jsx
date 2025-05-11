// src/components/Quiz.jsx
import React, { useState } from "react";

const questions = [
  {
    question: "What do you call the pretend fish or bug you use to attract real fish?",
    options: ["Bobber", "Lure", "Rod", "Reel"],
    answer: "Lure"
  },
  {
    question: "What should you do if you catch a fish you don't want to keep?",
    options: [
      "Throw it on the ground",
      "Gently put it back in the water",
      "Give it to a bird",
      "Keep it in your pocket"
    ],
    answer: "Gently put it back in the water"
  },
  {
    question: "When is a good time to fish during a full moon?",
    options: [
      "At night",
      "Only at noon",
      "Never",
      "On a roller coaster"
    ],
    answer: "At night"
  },
  {
    question: "What do fish like to do on a hot, sunny day?",
    options: [
      "Hide in the shade or deep water",
      "Jump out of the water",
      "Sit on the shore",
      "Go to school"
    ],
    answer: "Hide in the shade or deep water"
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSelected("");
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected("");
    setScore(0);
    setShowScore(false);
  }

  return (
    <div>
      <h2>🧠 Fishing Quiz</h2>
      <section style={{ background: "#e8f5e9", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
        {!showScore ? (
          <>
            <p>
              <strong>Question {current + 1} of {questions.length}:</strong>
            </p>
            <p>{questions[current].question}</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {questions[current].options.map((option, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => handleSelect(option)}
                    style={{
                      background: selected === option ? "#007acc" : "#fff",
                      color: selected === option ? "#fff" : "#007acc",
                      border: "2px solid #007acc",
                      borderRadius: "6px",
                      padding: "0.5rem 1rem",
                      cursor: "pointer",
                      fontWeight: selected === option ? "bold" : "normal",
                      width: "100%",
                      textAlign: "left"
                    }}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleNext}
              disabled={!selected}
              className="primary"
              style={{ marginTop: "1rem" }}
            >
              {current + 1 === questions.length ? "See My Score" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h3>
              {score === questions.length
                ? "🎉 Amazing! You got them all right!"
                : `Great job! You scored ${score} out of ${questions.length}.`}
            </h3>
            <button onClick={handleRestart} className="primary">
              Try Again
            </button>
          </>
        )}
      </section>
    </div>
  );
}
