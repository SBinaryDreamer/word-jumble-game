import React, { useState } from "react";
import "@fontsource/comic-neue";
import Confetti from "react-confetti";
//import { Howl } from "howler";
//import correctSoundFile from "./sounds/correct.mp3";
//import wrongSoundFile from "./sounds/wrong.mp3";

//const correctSound = new Howl({ src: [correctSoundFile] });
//const wrongSound = new Howl({ src: [wrongSoundFile] });

const levels = {
  easy: ["Game", "cine", "Salt", "Sand", "Rice", "Award", "Clash", "Writer", "Pollen", "Flap", "Cheese", "Idol", "Brittle", "Annoy", "Village", "City", "Fair", "Grip", "Stalk", "Avenue", "Ate", "Knives", "Oxen", "Larvae", "Lost"],
  medium: ["Calendar", "Gymnastics", "Ordering", "Units", "Analogue", "Quarter", "Digital", "Record", "Minutes", "Seconds", "Arguing", "Ragged", "Gleaming", "Wrong", "Threw", "Banged", "Yelled", "Pile", "Silly", "Grabbed", "Sources", "Natural", "Electricity", "Paraffin", "Circuit", "Investigation", "Appears", "Apparent", "Components", "Sockets", "Rescue", "Clinging", "Clockwise", "Tally", "Living", "Enquiry", "Grinned", "Dangled", "Pictogram", "Diagram", "Explore", "Classify", "Amazing", "Throb", "Carroll", "Data", "Dead", "Observe", "Terrified", "Whirr", "Pattern", "Survey", "Identify", "Object", "Panic", "Harness", "Random", "Collect", "Scientific", "Include", "Develop", "Moist", "Amphibian", "Embryo", "Mammal", "Abdomen", "Reproduce", "Producer", "Consumer", "Predator", "Danger", "Dangle"],
    hard: ["Dizzy", "Formal", "Informal", "Paragraph", "Charity", "Greeting", "Purpose", "Audience", "Thousand", "Sticker", "Numeral", "Estimate", "Compare", "Notation", "Dollar", "Cent", "Compose", "Decompose", "Upright", "Transport", "Seedlings", "Wilt", "Properties", "Temperature", "Nutrients", "Organ", "Digests", "Identical", "Commutative", "Associative", "Subtract", "Seconds", "Minutes", "Hours", "Analogue", "Interval", "Timetable", "Suitable", "Funny", "Decay", "Experiment", "Rubbish", "Creatures", "Receive", "Different", "Catalogue", "Protect", "Pill", "Leisure", "Mystery", "Prowling", "Legends", "Fantasy", "Historical", "Adventure", "Folktales", "Fascinating", "Crouching", "Mixture", "Properties", "Combined", "Separate", "Practical", "Attracted", "Sieve", "Physical", "Observe", "Pretzels", "Comment", "Strategies", "Project", "Timeline", "Interval", "Fabulous", "Express", "Arrives", "Departure", "Shortest", "Survival", "Tonga", "Explorer", "Weighing", "Gravity", "Containers", "Equipment", "Calves", "Attract", "Vertical", "Force meter", "Experiment", "Friction", "Equator", "Nostrils", "Reflection", "Polygons", "Sketch", "Humpback", "Antarctica", "Pacific", "Plastic", "Soles", "Irregular", "Bubbles", "Sledges", "Horizontal", "Fabric", "Migration", "Blubber", "Enormous", "Complain", "Muttered", "Withered", "Eventually", "Kookaburra", "Wiggled", "Wobbled", "Punctuation", "Conditional", "Transparent", "Opaque", "Shadow", "Translucent", "Observation", "Aluminium", "Technology", "Handspan", "Conclusion", "Prediction", "Manipulative", "Increasing", "Decreasing", "Constant", "Designing", "Sequence", "Capacity", "Measure", "Kilometre", "Estimate", "Greeks", "Sheba", "Shone", "Width", "Poles", "Fossils", "Trojans", "Yemen", "Centimetres", "Area", "Interact", "Vehicles", "Armies", "Boastful", "Millilitres", "Chance", "Attract", "Trapped", "Terrible", "Clutched", "Weighing", "Results", "Magnetic", "Benefit", "Creatures", "Exhausted", "Perimeter", "Likely", "Repel", "Findings", "Crew", "Iceberg", "Voyage", "Properties", "Maiden", "Freezing", "Lounge", "Lifejacket", "Drilling", "Facts", "Hull", "Shipwreck", "Chandelier", "Destination", "Impression", "Multiplication", "Tilt", "Pilot", "Lookout", "Liquified", "Extinct", "Distributive", "Disaster", "Seabed", "Steamed", "Engine", "Explore", "Multiples", "Massive", "Survivors", "Plan", "Fix", "Toad", "Lawn"]
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
    const [confetti, setConfetti] = useState(false);

    const checkAnswer = () => {
        if (guess.toLowerCase() === word.toLowerCase()) {
            setMessage("🎉 Correct! Well done!");
            setScore(score + 1);
            //correctSound.play();
            setConfetti(true);
            setTimeout(() => setConfetti(false), 2000);
        } else {
            setMessage("❌ Oops! Try again.");
            //wrongSound.play();
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
        <div style={{
            textAlign: "center",
            padding: "20px",
            fontFamily: "Comic Neue, sans-serif",
            backgroundColor: "#121212",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {confetti && <Confetti />}
            <h1 style={{ color: "#E91E63", fontSize: "2.5em" }}>🎈 Word Jumble Fun! 🔠</h1>
            <div>
                <button style={btnStyle} onClick={() => changeLevel("easy")}>🌟 Easy</button>
                <button style={btnStyle} onClick={() => changeLevel("medium")}>🚀 Medium</button>
                <button style={btnStyle} onClick={() => changeLevel("hard")}>🔥 Hard</button>
            </div>
            <h2 style={{ fontSize: "2em", color: "#673AB7", animation: "bounce 1s infinite" }}>
                {scrambled}
            </h2>
            <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                style={inputStyle}
            />
            <button style={btnStyle} onClick={checkAnswer}>✅ Check</button>
            <p style={{ fontSize: "1.5em", color: "#00796B" }}>{message}</p>
            <button style={btnStyle} onClick={newWord}>🔄 New Word</button>
            <h3 style={{ fontSize: "2em", color: "#D32F2F" }}>Score: {score} ⭐</h3>
        </div>
    );
}

const btnStyle = {
    backgroundColor: "#FF5722",
    color: "white",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    borderRadius: "10px",
    fontSize: "1.2em",
    cursor: "pointer",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)"
};

const inputStyle = {
    padding: "10px",
    fontSize: "1.5em",
    textAlign: "center",
    borderRadius: "5px",
    border: "2px solid #E91E63",
    margin: "10px"
};

export default App;

