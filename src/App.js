import React, { useState, useEffect, useRef } from "react";
import "@fontsource/comic-neue";
import Confetti from "react-confetti";

/* ---------------- WORD LIST ---------------- */

const words = [
  "extraordinary","conversation","dedicates","educating",
  "destitute","dangerous","desperate","admission",
  "determination","inspired","occasion","therefore",
  "refused","merely","recently","drumming","stopped",
  "stopping","fitted","fitting","swimming","patted",
  "digging","interesting","unusual","freezing",
  "enormous","elderly","scorching","ancient",
  "because","although","however","classification",
  "paragraph","punctuation","connectives","revising",
  "improving","introduction","background","character",
  "charity","exists","setting","impatient","believe",
  "anxious","insisted","historical","planning",
  "partner","suggestions","corrections","exciting",
  "powerful","separate","sentences","pronunciation",
  "accommodation","immediately","necessarily",
  "responsibility","government","environment",
  "opportunity","mischievous","embarrass",
  "maintenance","knowledge","thorough","stationery",
  "stationary","principal","principle","conscience",
  "conscious","accept","except","affect","effect",
  "advice","advise","loose","lose","quite","quiet",
  "desert","dessert","committee","calendar",
  "beginning","disappear","explanation","medicine",
  "neighbour","parliament","restaurant","temperature",
  "vacuum","weird"
];

/* ---------------- HELPER FUNCTIONS ---------------- */

// Missing Letter Logic
function removeLetters(word) {
  const percentage = Math.random() * (0.5 - 0.35) + 0.35;
  const numToRemove = Math.max(2, Math.floor(word.length * percentage));
  const indices = new Set();

  while (indices.size < numToRemove) {
    const rand = Math.floor(Math.random() * word.length);
    indices.add(rand);
  }

  return word
    .split("")
    .map((char, index) => (indices.has(index) ? "_" : char))
    .join("");
}

// Misspelled Options Logic
function generateOptions(correctWord) {
  const wrongOptions = new Set();
  let attempts = 0;

  while (wrongOptions.size < 3 && attempts < 20) {
    attempts++;
    let word = correctWord;
    const type = Math.floor(Math.random() * 4);

    switch (type) {
      case 0:
        const i = Math.floor(Math.random() * word.length);
        word = word.slice(0, i) + word.slice(i + 1);
        break;
      case 1:
        const j = Math.floor(Math.random() * word.length);
        word = word.slice(0, j) + word[j] + word.slice(j);
        break;
      case 2:
        const k = Math.floor(Math.random() * (word.length - 1));
        const arr = word.split("");
        [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]];
        word = arr.join("");
        break;
      default:
        break;
    }

    if (word !== correctWord) wrongOptions.add(word);
  }

  return [...wrongOptions, correctWord]
    .sort(() => Math.random() - 0.5);
}

/* ---------------- MAIN APP ---------------- */

function App() {
  const [mode, setMode] = useState("spelling"); // spelling or missing
  const [word, setWord] = useState("");
  const [masked, setMasked] = useState("");
  const [options, setOptions] = useState([]);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [confetti, setConfetti] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    newWord();
  }, [mode]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else {
      setMessage("⏳ Time's up! Word was: " + word);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const playCorrect = () => new Audio("/correct.mp3").play();
  const playWrong = () => new Audio("/wrong.mp3").play();

  const newWord = () => {
    const random = words[Math.floor(Math.random() * words.length)];
    setWord(random);
    setMasked(removeLetters(random));
    setOptions(generateOptions(random));
    setGuess("");
    setMessage("");
    setTimeLeft(15);
  };

  const checkMissing = () => {
    setAttempts(a => a + 1);
    if (guess.trim().toLowerCase() === word.toLowerCase()) {
      setScore(s => s + 1);
      setMessage("🎉 Correct!");
      setConfetti(true);
      playCorrect();
      setTimeout(() => setConfetti(false), 1500);
    } else {
      setMessage("❌ Wrong!");
      playWrong();
    }
  };

  const checkSpelling = (selected) => {
    setAttempts(a => a + 1);
    if (selected === word) {
      setScore(s => s + 1);
      setMessage("🎉 Correct!");
      setConfetti(true);
      playCorrect();
      setTimeout(() => setConfetti(false), 1500);
    } else {
      setMessage("❌ Wrong!");
      playWrong();
    }
  };

  const accuracy =
    attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <div style={styles.container}>
      {confetti && <Confetti />}

      <h1 style={styles.title}>
        {mode === "spelling"
          ? "📝 Choose Correct Spelling"
          : "🔤 Missing Letters Mode"}
      </h1>

      {/* Mode Switch */}
      <div style={{ marginBottom: "15px" }}>
        <button style={styles.switchBtn}
          onClick={() => setMode("spelling")}>
          Spelling Mode
        </button>
        <button style={styles.switchBtn}
          onClick={() => setMode("missing")}>
          Missing Mode
        </button>
      </div>

      {mode === "spelling" ? (
        <div>
          {options.map((option, index) => (
            <button
              key={index}
              style={styles.optionBtn}
              onClick={() => checkSpelling(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 style={styles.masked}>{masked}</h2>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            style={styles.input}
            placeholder="Type full word"
          />
          <button style={styles.btn} onClick={checkMissing}>
            Check
          </button>
        </div>
      )}

      <p style={styles.message}>{message}</p>

      <button style={styles.btn} onClick={newWord}>
        🔄 New Word
      </button>

      <h3 style={styles.score}>
        Score: {score} / {attempts} ({accuracy}%)
      </h3>

      <h4 style={styles.timer}>
        ⏳ Time Left: {timeLeft}s
      </h4>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Comic Neue, sans-serif",
    backgroundColor: "#1E1E1E",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: { color: "#FF4081", fontSize: "2.5em" },
  optionBtn: {
    backgroundColor: "#E040FB",
    color: "white",
    padding: "10px",
    margin: "8px",
    fontSize: "1.2em",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    fontSize: "1.3em",
    textAlign: "center",
    borderRadius: "5px",
    border: "2px solid #FF4081",
    margin: "10px"
  },
  btn: {
    backgroundColor: "#00E676",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "1.2em",
    cursor: "pointer",
    margin: "10px"
  },
  switchBtn: {
    backgroundColor: "#FFC107",
    padding: "8px 15px",
    margin: "5px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },
  masked: {
    fontSize: "2em",
    color: "#FFC107",
    letterSpacing: "5px"
  },
  message: { fontSize: "1.4em", color: "#00E676" },
  score: { fontSize: "1.8em", color: "#FF1744" },
  timer: { fontSize: "1.3em", color: "#FFEA00" }
};

export default App;
