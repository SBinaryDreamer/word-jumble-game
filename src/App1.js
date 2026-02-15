import React, { useState, useEffect, useRef } from "react";
import "@fontsource/comic-neue";
import Confetti from "react-confetti";

const words = ["nutrients","steamed","vehicles","destination","pattern","enormous","separate","distributive","diagram","arguing","disaster","complain","multiplication","timeline","interval","combined","technology","apparent","audience","prediction","upright","associative","subtract","iceberg","adventure","migration","handspan","findings","centimetres","attracted","opaque","interval","annoy","kilometre","suitable","irregular","increasing","creatures","exhausted","eventually","boastful","mystery","seedlings","gleaming","magnetic","terrified","classify","timetable","legends","impression"
]; // Keep the word list shorter for testing

function shuffle(word) {
  return word.split("").sort(() => Math.random() - 0.5).join("");
}

function App() {
  const [remainingWords, setRemainingWords] = useState([...words]);
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  //const [hint, setHint] = useState("");

  const timerRef = useRef(null);

  // Load new word
  useEffect(() => {
    newWord();
  }, []);

  // Start Timer
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else {
      setMessage("⏳ Time's up! Try another word.");
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const playCorrectSound = () => new Audio("/correct.mp3").play(); // Replace with your actual sound file
  const playWrongSound = () => new Audio("/wrong.mp3").play();

  const checkAnswer = () => {
    if (guess.toLowerCase() === word.toLowerCase()) {
      setMessage("🎉 Correct! Well done!");
      if (!answeredCorrectly) {
        setScore((prevScore) => prevScore + 1);
        setAnsweredCorrectly(true);
      }
      setConfetti(true);
      playCorrectSound();
      setTimeout(() => setConfetti(false), 2000);
    } else {
      setMessage("❌ Oops! Try again.");
      playWrongSound();
    }
  };

  const newWord = () => {
    if (remainingWords.length === 0) {
      setMessage("🎉 You've completed all words!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const newWord = remainingWords[randomIndex];

    setRemainingWords(remainingWords.filter((_, index) => index !== randomIndex));
    setWord(newWord);
    setScrambled(shuffle(newWord));
    setGuess("");
    setMessage("");
    setAnsweredCorrectly(false);
    setTimeLeft(20); // Reset timer
    //setHint(`Hint: ${newWord[0]}...${newWord[newWord.length - 1]}`);
  };

  return (
    <div style={styles.container}>
      {confetti && <Confetti />}
      <h1 style={styles.title}>🎈 Word Jumble Fun! 🔠</h1>
      <h2 style={styles.scrambled}>{scrambled}</h2>
   
      <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} style={styles.input} />
      <button style={styles.btn} onClick={checkAnswer}>✅ Check</button>
      <p style={styles.message}>{message}</p>
      <button style={styles.btn} onClick={newWord}>🔄 New Word</button>
      <h3 style={styles.score}>Score: {score} ⭐</h3>
      <h4 style={styles.timer}>⏳ Time Left: {timeLeft}s</h4>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Comic Neue, sans-serif",
    backgroundColor: "#121212",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#E91E63",
    fontSize: "2.5em",
  },
  scrambled: {
    fontSize: "2em",
    color: "#673AB7",
  },
  /*hint: {
    fontSize: "1.2em",
    color: "#FFA000",
  }, */
  input: {
    padding: "10px",
    fontSize: "1.5em",
    textAlign: "center",
    borderRadius: "5px",
    border: "2px solid #E91E63",
    margin: "10px",
  },
  btn: {
    backgroundColor: "#FF5722",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.2em",
    cursor: "pointer",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  message: {
    fontSize: "1.5em",
    color: "#00796B",
  },
  score: {
    fontSize: "2em",
    color: "#D32F2F",
  },
  timer: {
    fontSize: "1.5em",
    color: "#FFEB3B",
  },
};

export default App;
