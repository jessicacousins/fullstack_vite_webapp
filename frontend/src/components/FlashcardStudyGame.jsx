import React, { useState } from "react";
import "./FlashcardStudyGame.css";

const FlashcardStudyGame = () => {
  const [decks, setDecks] = useState([]);
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(null);
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [deckName, setDeckName] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const addDeck = () => {
    if (deckName.trim()) {
      setDecks([...decks, { name: deckName, cards: [] }]);
      setDeckName("");
    }
  };

  const addCardToDeck = () => {
    if (selectedDeckIndex !== null && frontText.trim() && backText.trim()) {
      const updatedDecks = [...decks];
      updatedDecks[selectedDeckIndex].cards.push({
        front: frontText,
        back: backText,
      });
      setDecks(updatedDecks);
      setFrontText("");
      setBackText("");
    }
  };

  const startReview = (index) => {
    setSelectedDeckIndex(index);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentCardIndex < decks[selectedDeckIndex].cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="flashcard-container">
      <h2>Flashcard Study Game</h2>

      <div className="deck-creation">
        <input
          type="text"
          placeholder="New Deck Name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addDeck();
          }}
        />
        <button onClick={addDeck}>Add Deck</button>
      </div>

      {selectedDeckIndex === null ? (
        <div className="deck-list">
          <h3>Available Decks:</h3>
          {decks.length > 0 ? (
            decks.map((deck, index) => (
              <div key={index} className="deck-card">
                <h4>{deck.name}</h4>
                <button onClick={() => startReview(index)}>Review Deck</button>
              </div>
            ))
          ) : (
            <p>No decks available. Create one to get started!</p>
          )}
        </div>
      ) : (
        <div className="flashcard-review">
          <h3>Reviewing: {decks[selectedDeckIndex].name}</h3>
          {decks[selectedDeckIndex].cards.length > 0 ? (
            <div className="flashcard">
              <div className="card-content">
                <p>
                  {showAnswer
                    ? decks[selectedDeckIndex].cards[currentCardIndex].back
                    : decks[selectedDeckIndex].cards[currentCardIndex].front}
                </p>
              </div>
              <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </button>
              <button
                onClick={nextCard}
                disabled={
                  currentCardIndex >= decks[selectedDeckIndex].cards.length - 1
                }
              >
                Next Card
              </button>
            </div>
          ) : (
            <p>No cards in this deck. Add some cards below!</p>
          )}

          <div className="card-creation">
            <h4>Add New Card:</h4>
            <textarea
              placeholder="Front of Card"
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
            />
            <textarea
              placeholder="Back of Card"
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
            />
            <button onClick={addCardToDeck}>Add Card</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardStudyGame;
