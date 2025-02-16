import React, { useState } from "react";
import "@fontsource/comic-neue"; // Fun font for kids

const levels = {
    easy: ["Game", "Nice", "Salt", "Sand", "Rice", "Award", "Clash", "Writer", "Pollen", "Flap"],
    medium: ["Calendar", "Ordering", "Minutes", "Quarter", "Digital", "Record", "Analogue", "Sources", "Natural", "Circuit"],
    hard: ["Investigation", "Components", "Clockwise", "Pictogram", "Diagram", "Temperature", "Experiment", "Survival", "Explorer", "Vertical"]
};

function shuffle(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
}

function App() {
    const [level, setLevel] = useState("easy");
    const [wordIndex, setWordIndex] = useState(0);
    const [word, setWord] = useState(levels[level][wordIndex]);
    const [scrambled, setScrambled] = useState(shuffle(word));
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);

    const checkAnswer = () => {
        if (guess.toLowerCase() === word.toLowerCase()) {
            setMessage("🎉 Correct! Well done!");
            setScore(score + 10);
        } else {
            setMessage("❌ Wrong! Try again.");
        }
    };

    const newWord = () => {
        const newIndex = (wordIndex + 1) % levels[level].length;
        setWordIndex(newIndex);
        const newWord = levels[level][newIndex];
        setWord(newWord);
        setScrambled(shuffle(newWord));
        setGuess("");
        setMessage("");
    };

    const changeLevel = (newLevel) => {
        setLevel(newLevel);
        setWordIndex(0);
        const firstWord = levels[newLevel][0];
        setWord(firstWord);
        setScrambled(shuffle(firstWord));
        setGuess("");
        setMessage("");
        setScore(0);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px", fontFamily: "Comic Neue, sans-serif", backgroundColor: "#f5f5dc", height: "100vh" }}>
            <h1 style={{ fontSize: "40px", color: "#ff5733" }}>🔠 Word Jumble Game</h1>
            <div>
                <button onClick={() => changeLevel("easy")} style={{ margin: "5px", padding: "10px", fontSize: "18px" }}>Easy</button>
                <button onClick={() => changeLevel("medium")} style={{ margin: "5px", padding: "10px", fontSize: "18px" }}>Medium</button>
                <button onClick={() => changeLevel("hard")} style={{ margin: "5px", padding: "10px", fontSize: "18px" }}>Hard</button>
            </div>
            <h2 style={{ fontSize: "30px", color: "#009688", fontWeight: "bold" }}>Unscramble: <span style={{ color: "#ff9800", fontSize: "35px" }}>{scrambled}</span></h2>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Your guess"
                style={{ fontSize: "20px", padding: "10px", borderRadius: "10px", border: "2px solid #ff9800" }}
            />
            <button onClick={checkAnswer} style={{ marginLeft: "10px", padding: "10px 15px", fontSize: "18px", borderRadius: "10px", border: "none", backgroundColor: "#ff5733", color: "white", cursor: "pointer" }}>Check</button>
            <p style={{ fontSize: "25px", fontWeight: "bold", color: "#009688" }}>{message}</p>
            <button onClick={newWord} style={{ padding: "10px 20px", fontSize: "18px", borderRadius: "10px", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}>🔄 New Word</button>
            <h3 style={{ fontSize: "25px", color: "#000" }}>Score: {score}</h3>
        </div>
    );
}

export default App;
