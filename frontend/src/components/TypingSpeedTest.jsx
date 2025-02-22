import React, { useState, useEffect } from "react";
import "./TypingSpeedTest.css";

const phrases = [
  // Coding
  "Hello World",
  "Practice makes perfect",
  "Speed is key",
  "JavaScript is fun",
  "Keep coding",
  "Aliens are real",
  "Code like a pro",
  "Type swiftly",
  "Master the keys",
  "Debugging is fun",
  "Let's go!",
  "Fish live in water",
  "The quick brown fox jumps over the lazy dog",
  "Consistency beats intensity",
  "Effort is better than perfection",
  "Keep your friends close and your syntax closer",
  "Time waits for no one",
  "Efficiency is doing better what is already being done",
  "Shortcuts save time but not mistakes",
  "In code we trust",
  "Errors are stepping stones to mastery",
  "Perseverance conquers all",
  "The future belongs to those who code it",
  "A journey of a thousand keystrokes begins with a single tap",
  "Nothing great ever came from comfort zones",
  "Fast fingers, faster mind",
  "Think twice, type once",
  "Keyboard warriors unite",
  "Success is 90% persistence, 10% caffeine",
  "Whitespace matters, in life and in code",
  "Bug-free code is a myth",
  "A good programmer writes elegant solutions, not just fast ones",
  "Always close your tags and open your mind",
  "Caps lock is cruise control for cool",
  "First solve the problem, then write the code",
  "Every developer was once a beginner",
  "Loops make life easier, but infinite loops ruin everything",
  "To err is human, to debug divine",
  "Keep your code DRY, not your humor",
  "Never underestimate the power of a single line of code",
  "Refactoring is like cleaning your room, necessary but boring",
  "What you type is what you get",
  "Silence is golden, but comments are priceless",
  "Happiness is a passing test case",
  "Challenge yourself every day",
  "Ctrl + S is your best friend",
  "Your future is written one keystroke at a time",
  "Learn from yesterday, code for today, debug for tomorrow",
  "Embrace the struggle, master the craft",
  "A smooth sea never made a skilled typist",
  "Work smarter, not harder",
  "Every masterpiece starts with a blank screen",
  "Speed is nothing without accuracy",
  "Good design is invisible",
  "Even the best code needs comments",
  "Your keyboard is your sword, type like a warrior",
  "Think in algorithms, type in solutions",
  "Challenge your limits, don't limit your challenges",
  "One keystroke closer to greatness",

  // 🔹 Classic Wisdom & Philosophy
  "Fortune favors the bold",
  "Well begun is half done",
  "An unexamined life is not worth living",
  "Do what you can, with what you have, where you are",
  "The only constant in life is change",
  "Act as if what you do makes a difference. It does",
  "A journey of a thousand miles begins with a single step",
  "Simplicity is the ultimate sophistication",
  "Happiness depends upon ourselves",
  "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment",
  "Doubt kills more dreams than failure ever will",

  // 🔹 Science & Discovery
  "Imagination is more important than knowledge",
  "We are made of star stuff",
  "Science and everyday life cannot and should not be separated",
  "The important thing is not to stop questioning",
  "Energy cannot be created or destroyed, only transformed",
  "Nature is pleased with simplicity",
  "Somewhere, something incredible is waiting to be known",

  // 🔹 Motivation & Success
  "Hard work beats talent when talent doesn’t work hard",
  "The best way out is always through",
  "Opportunities multiply as they are seized",
  "Dream big, work hard, stay humble",
  "Success is getting up one more time than you fall",
  "Great things never come from comfort zones",
  "Little by little, one travels far",
  "It always seems impossible until it’s done",
  "Courage doesn’t always roar",
  "You are what you repeatedly do",

  // 🔹 Lighthearted & Fun
  "Coffee first, questions later",
  "Dancing is just moving chaos in rhythm",
  "Be like a duck. Calm on the surface, paddling like crazy underneath",
  "A day without laughter is a day wasted",
  "Everything you can imagine is real",
  "Some people graduate with honors, I am just honored to graduate",
  "Chocolate is the answer, who cares what the question is?",
  "If life gives you lemons, make lemonade",
  "Wisdom begins in wonder",
  "Eat, sleep, code, repeat",

  // 🔹 Nature & Life
  "Not all those who wander are lost",
  "Keep your face always toward the sunshine and shadows will fall behind you",
  "A wise man adapts himself to circumstances",
  "Slow down and enjoy the moment",
  "In the middle of difficulty lies opportunity",
  "Storms make trees take deeper roots",
  "Do what makes your soul shine",
  "When nothing goes right, go left",

  // 🔹 Timeless Sayings
  "Actions speak louder than words",
  "A rolling stone gathers no moss",
  "The pen is mightier than the sword",
  "Knowledge is power",
  "What goes around comes around",
  "Hope is the only thing stronger than fear",
  "Wherever you go, go with all your heart",
  "It’s not the years in your life that count, it’s the life in your years",
  "You can’t change the wind, but you can adjust your sails",
  "Life is either a daring adventure or nothing at all",

  // 🔹 Typing-Specific
  "Keep calm and keep typing",
  "Fast fingers, faster thoughts",
  "The keyboard is mightier than the pen",
  "Code like nobody’s watching",
  "Errors exist to be fixed",
  "Innovation is just applied curiosity",
  "Logic will get you from A to B. Imagination will take you everywhere",
  "The computer is incredibly fast, accurate, and stupid",
  "The more you type, the faster you become",
  "Speed is nothing without accuracy",
];

const TypingSpeedTest = () => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTestActive, setIsTestActive] = useState(false);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const startTest = () => {
    setUserInput("");
    setIsTestActive(true);
    setTimeLeft(10);
    setResultMessage("");
    setCurrentPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  const endTest = () => {
    setIsTestActive(false);
    if (userInput.trim() === currentPhrase) {
      setScore((prev) => prev + 1);
      setResultMessage("🎉 Success! You typed the phrase correctly!");
    } else {
      setResultMessage(`❌ Oops! The correct phrase was: "${currentPhrase}".`);
    }
  };

  const handleInputChange = (e) => setUserInput(e.target.value);

  return (
    <div className="typing-test-container">
      <h1 className="typing-test-title">Typing Speed Test</h1>
      <p className="instructions">
        Type the following phrase as fast as you can:
      </p>
      <h3 className="phrase-display">
        {currentPhrase || "Press Start to Begin"}
      </h3>
      <div className="countdown">Time Left: {timeLeft} seconds</div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="user-input"
        placeholder="Start typing here..."
        disabled={!isTestActive}
      />
      <p className="result-message">{resultMessage}</p>
      <p className="score">Score: {score}</p>
      <button
        className="start-button"
        onClick={startTest}
        disabled={isTestActive}
      >
        {isTestActive ? "Test in Progress..." : "Start Test"}
      </button>
    </div>
  );
};

export default TypingSpeedTest;
