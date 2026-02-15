import React, { useState, useEffect, useRef } from "react";
import "@fontsource/comic-neue";
import Confetti from "react-confetti";

const words = [
  "extraordinary",
  "conversation",
  "dedicates",
  "educating",
  "destitute",
  "dangerous",
  "desperate",
  "admission",
  "determination",
  "inspired",
  "occasion",
  "therefore",
  "refused",
  "merely",
  "recently",
  "drumming",
  "stopped",
  "stopping",
  "fitted",
  "fitting",
  "swimming",
  "patted",
  "digging",
  "interesting",
  "unusual",
  "freezing",
  "enormous",
  "elderly",
  "scorching",
  "ancient",
  "because",
  "although",
  "however",
  "classification",
  "paragraph",
  "punctuation",
  "connectives",
  "revising",
  "improving",
  "introduction",
"background",
"character",
"charity",
"exists",
"setting",
"impatient",
"believe",
"anxious",
"insisted",
"unusual",
"extraordinary",
"elderly",
"connectives",
"determination",
"destitute",
"paragraph",
"historical",
"planning",
"partner",
"suggestions",
"corrections",
"exciting",
"powerful",
"punctuation",
"separate",
"sentences",
"revising",
"improving",
"interesting",
"conversation",
"pronunciation",
"accommodation",
"immediately",
"incidentally",
"necessarily",
"responsibility",
"government",
"environment",
"opportunity",
"mischievous",
"embarrass",
"maintenance",
"knowledge",
"thorough",
"stationery",
"stationary",
"principal",
"principle",
"conscience",
"conscious",
"accept",
"except",
"affect",
"effect",
"advice",
"advise",
"loose",
"lose",
"quite",
"quiet",
"desert",
"dessert",
"complement",
"compliment",
"committee",
"necessary",
"occasion",
"calendar",
"beginning",
"disappear",
"explanation",
"medicine",
"neighbour",
"parliament",
"restaurant",
"temperature",
"vacuum",
"weird",



"Character",
"Imagine",
"plot",
"Prop",
"Audience",
"Costume",
"Acorns",
"Scene",
"Setting",
"Story",
"Italic",
"Script",
"Capital",
"Colon",
"Smirking",
"Flutting",
"Phrases",
"adjectives",
"Paragraph",
"describes",
"Sentences",
"instructions",
"Playscript",
"sight",
"limerick",
"calligram",
"acrostic",
"riddle",
"rhythm",
"hurricane",
"gasp",
"courageous",
"buggy",
"whizz",
"unmissable",
"bargain",
"implement",
"persuade",
"Presentation",
"Persuasive",
"spacesuit",
"bossy",
"exclamation",
"Incredible",
"astronaut",
"delay",
"statements",
"mysterious",
"curiosity",
"manned",
"flights",
"rescued",
"expense",
"exploration",
"convinced",
"although",
"redrafting",
"revising",
"gallop",
"contented",
"camel","acute","addition","affect","affects","agree",
"airborne","amount","analyse","analysis","animals","approximate",
"argue","ascending","assigned","because","behaviour","caused",
"classification","classifying","close","comparing","conclusion","contact",
"contaminated","conversion","convert","corona","cough","covid-","decided","decimal",
"decimals","denominator","descending","different","discussion","disease","diseases",
"distancing","division","doctor","dosage","downwards","droplets","easily","emotion","equivalent",
"estimate","every","evidence","exist","fever","forms","fraction","fractions","frequently","hands",
"happier","happiest","happiness","happy","humans","identifying","illness","important","improper",
"increase","individual","infection","infectious","information","informative","investigation","involuntary",
"irritation","layer","liquid","lungs","medications","medicine","middle","mission","money","mouth","multiplication",
"nostrils","numerator","observation","observing","ordering","organisation","organise","other","oxygen","particles","patches",
"pattern","peaceful","people","percentage","percentages","person","pharmacist","pharmacy","place","planet","plants","point",
"poorer","population","poverty","prevention","project","proper","qualified","reasoning","recognise","recognition","red-brown",
"release","report","research","respiration","respiratory","richer","rough","rounding","runny","seeking","separation","severe",
"sharp","signs","simplify","simplifying","small","smile","social","someone","something","sound","spread","started","steroids",
"subtraction","sudden","suggested","supportive","supposed","surfaces","symptoms","syndrome","taken","teacher","testing","their",
"therapy","things","thinking","transmission","treatment","useful","vaccinated","virus","watery","where","wound"

];

function generateOptions(correctWord) {
  const wrongOptions = new Set();
  let attempts = 0;

  while (wrongOptions.size < 3 && attempts < 20) {
    attempts++;
    let word = correctWord;
    const mistakeType = Math.floor(Math.random() * 4);

    switch (mistakeType) {
      case 0:
        if (word.length > 5) {
          const i = Math.floor(Math.random() * word.length);
          word = word.slice(0, i) + word.slice(i + 1);
        }
        break;

      case 1:
        const i1 = Math.floor(Math.random() * word.length);
        word = word.slice(0, i1) + word[i1] + word.slice(i1);
        break;

      case 2:
        const vowels = ["a","e","i","o","u"];
        const i2 = Math.floor(Math.random() * word.length);
        if (vowels.includes(word[i2])) {
          word = word.slice(0,i2) +
            vowels[Math.floor(Math.random()*5)] +
            word.slice(i2+1);
        }
        break;

      case 3:
        if (word.length > 4) {
          const i3 = Math.floor(Math.random() * (word.length - 1));
          const arr = word.split("");
          [arr[i3], arr[i3+1]] = [arr[i3+1], arr[i3]];
          word = arr.join("");
        }
        break;

      default:
        break;
    }

    if (word !== correctWord && word.length > 3) {
      wrongOptions.add(word);
    }
  }

  return [...wrongOptions, correctWord]
    .sort(() => Math.random() - 0.5);
}

function App() {
  const [remainingWords, setRemainingWords] = useState([...words]);
  const [currentWord, setCurrentWord] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const lastKeyRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    newWord();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current =
        setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else {
      setMessage("⏳ Time's up! Correct: " + currentWord);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = parseInt(e.key);
      if (key >= 1 && key <= 4 && options[key - 1]) {

        if (
          lastKeyRef.current === key &&
          options[key - 1] === currentWord
        ) {
          newWord();
          lastKeyRef.current = null;
          setSelectedIndex(null);
          return;
        }

        lastKeyRef.current = key;
        checkAnswer(options[key - 1], key - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () =>
      window.removeEventListener("keydown", handleKeyPress);
  }, [options, currentWord]);

  const playCorrectSound = () =>
    new Audio("/correct.mp3").play();

  const playWrongSound = () =>
    new Audio("/wrong.mp3").play();

  const checkAnswer = (selected, index) => {

    setTotalAttempts(prev => prev + 1);  // count attempts
    setSelectedIndex(index);

    if (selected === currentWord) {
      setMessage("🎉 Correct! Press same number again.");
      setScore(s => s + 1);
      setConfetti(true);
      playCorrectSound();
      setTimeout(() => setConfetti(false), 1200);
    } else {
      setMessage("❌ Wrong!");
      playWrongSound();
    }
  };

  const newWord = () => {
    if (remainingWords.length === 0) {
      setMessage("🎉 Game Complete!");
      return;
    }

    const randomIndex =
      Math.floor(Math.random() * remainingWords.length);

    const selected = remainingWords[randomIndex];

    setRemainingWords(prev =>
      prev.filter((_, i) => i !== randomIndex)
    );

    setCurrentWord(selected);
    setOptions(generateOptions(selected));
    setMessage("");
    setTimeLeft(15);
  };

  const accuracy =
    totalAttempts > 0
      ? Math.round((score / totalAttempts) * 100)
      : 0;

  return (
    <div style={styles.container}>
      {confetti && <Confetti />}
      <h1 style={styles.title}>
        📝 Choose Correct Spelling
      </h1>

      <div style={styles.optionsContainer}>
        {options.map((option, index) => (
          <button
            key={index}
            style={{
              ...styles.optionBtn,
              backgroundColor:
                selectedIndex === index
                  ? "#00E676"
                  : "#E040FB"
            }}
            onClick={() =>
              checkAnswer(option, index)
            }
          >
            {index + 1}. {option}
          </button>
        ))}
      </div>

      <p style={styles.message}>{message}</p>

      <button style={styles.btn} onClick={newWord}>
        🔄 Next Word
      </button>

      <h3 style={styles.score}>
        Score: {score} / {totalAttempts} ({accuracy}%)
      </h3>

      <h4 style={styles.timer}>
        ⏳ Time Left: {timeLeft}s
      </h4>
    </div>
  );
}

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
  title: {
    color: "#FF4081",
    fontSize: "2.5em"
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    margin: "20px"
  },
  optionBtn: {
    color: "white",
    padding: "10px",
    fontSize: "1.2em",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  },
  btn: {
    backgroundColor: "#00E676",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "1.2em",
    cursor: "pointer"
  },
  message: {
    fontSize: "1.4em",
    color: "#FFC107"
  },
  score: {
    fontSize: "2em",
    color: "#FF1744"
  },
  timer: {
    fontSize: "1.4em",
    color: "#FFEA00"
  }
};

export default App;