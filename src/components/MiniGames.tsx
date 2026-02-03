import React, { useState, useEffect, useCallback } from 'react';
import './MiniGames.css';

interface MiniGamesProps {
  onNext: () => void;
}

type GameType = 'menu' | 'catch' | 'trivia' | 'complete';

// Personalizează întrebările despre relația voastră!
const triviaQuestions = [
  {
    question: "Care e mâncarea italiană preferată să o împărțim?",
    options: ["Pizza", "Paste", "Risotto", "Lasagna"],
    correct: 0 // Schimbă cu răspunsul corect
  },
  {
    question: "Unde am vrea să călătorim împreună?",
    options: ["Paris", "Tokyo", "Bali", "Toate!"],
    correct: 3
  },
  {
    question: "Ce floare îți amintește de mine?",
    options: ["Trandafir", "Bujor", "Lalea", "Floarea-soarelui"],
    correct: 1 // Bujor - preferata ei!
  }
];

const MiniGames: React.FC<MiniGamesProps> = ({ onNext }) => {
  const [currentGame, setCurrentGame] = useState<GameType>('menu');
  const [gamesCompleted, setGamesCompleted] = useState<Set<string>>(new Set());

  const completeGame = (game: string) => {
    setGamesCompleted(prev => new Set([...prev, game]));
    setCurrentGame('menu');
  };

  const allGamesCompleted = gamesCompleted.size >= 2;

  return (
    <div className="games-page page-container">
      {currentGame === 'menu' && (
        <GameMenu 
          onSelectGame={setCurrentGame}
          gamesCompleted={gamesCompleted}
          allCompleted={allGamesCompleted}
          onNext={onNext}
        />
      )}
      {currentGame === 'catch' && (
        <CatchGame onComplete={() => completeGame('catch')} />
      )}
      {currentGame === 'trivia' && (
        <TriviaGame onComplete={() => completeGame('trivia')} />
      )}
    </div>
  );
};

// Game Menu
interface GameMenuProps {
  onSelectGame: (game: GameType) => void;
  gamesCompleted: Set<string>;
  allCompleted: boolean;
  onNext: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onSelectGame, gamesCompleted, allCompleted, onNext }) => (
  <div className="game-menu fade-in">
    <h1 className="title">Hai să ne jucăm! 🎮</h1>
    <p className="subtitle">Completează jocurile pentru a debloca surpriza!</p>
    
    <div className="game-options">
      <button 
        className={`game-card ${gamesCompleted.has('catch') ? 'completed' : ''}`}
        onClick={() => onSelectGame('catch')}
      >
        <span className="game-icon">🍫</span>
        <span className="game-name">Prinde Kinder-ul!</span>
        {gamesCompleted.has('catch') && <span className="check">✓</span>}
      </button>
      
      <button 
        className={`game-card ${gamesCompleted.has('trivia') ? 'completed' : ''}`}
        onClick={() => onSelectGame('trivia')}
      >
        <span className="game-icon">💕</span>
        <span className="game-name">Trivia Dragostei</span>
        {gamesCompleted.has('trivia') && <span className="check">✓</span>}
      </button>
    </div>

    {allCompleted && (
      <button className="btn fade-in" onClick={onNext}>
        Deblochează Surpriza! 🎁
      </button>
    )}
  </div>
);

// Catch the Kinder Game
interface CatchGameProps {
  onComplete: () => void;
}

const CatchGame: React.FC<CatchGameProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [kinderPos, setKinderPos] = useState({ x: 50, y: 50 });
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const targetScore = 10;

  const moveKinder = useCallback(() => {
    setKinderPos({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20
    });
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveKinder, 1000);
    return () => clearInterval(interval);
  }, [moveKinder]);

  const catchKinder = () => {
    if (!gameOver) {
      setScore(s => s + 1);
      moveKinder();
      if (score + 1 >= targetScore) {
        setGameOver(true);
      }
    }
  };

  const won = score >= targetScore;

  return (
    <div className="catch-game">
      <h2 className="game-title">Prinde Kinder-ul! 🍫</h2>
      <div className="game-stats">
        <span>Scor: {score}/{targetScore}</span>
        <span>Timp: {timeLeft}s</span>
      </div>
      
      {!gameOver ? (
        <div className="catch-area">
          <button
            className="kinder"
            style={{ left: `${kinderPos.x}%`, top: `${kinderPos.y}%` }}
            onClick={catchKinder}
          >
            🍫
          </button>
        </div>
      ) : (
        <div className="game-result fade-in">
          {won ? (
            <>
              <span className="result-emoji">🎉</span>
              <p>Bravo! Le-ai prins pe toate!</p>
              <button className="btn" onClick={onComplete}>Continuă</button>
            </>
          ) : (
            <>
              <span className="result-emoji">😅</span>
              <p>Aproape! Mai încerci?</p>
              <button className="btn" onClick={() => {
                setScore(0);
                setTimeLeft(15);
                setGameOver(false);
              }}>
                Încearcă din nou
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Trivia Game
interface TriviaGameProps {
  onComplete: () => void;
}

const TriviaGame: React.FC<TriviaGameProps> = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = triviaQuestions[currentQ];
  const isCorrect = selectedAnswer === question.correct;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === question.correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < triviaQuestions.length - 1) {
      setCurrentQ(q => q + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const isLastQuestion = currentQ === triviaQuestions.length - 1;
  const allCorrect = score === triviaQuestions.length;

  return (
    <div className="trivia-game">
      <h2 className="game-title">Trivia Dragostei 💕</h2>
      <p className="question-counter">Întrebarea {currentQ + 1}/{triviaQuestions.length}</p>
      
      <div className="question-card">
        <p className="question-text">{question.question}</p>
        
        <div className="options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option ${answered ? (idx === question.correct ? 'correct' : idx === selectedAnswer ? 'wrong' : '') : ''}`}
              onClick={() => handleAnswer(idx)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <div className="answer-feedback fade-in">
            {isCorrect ? (
              <p className="feedback-correct">💛 Mă cunoști atât de bine!</p>
            ) : (
              <p className="feedback-wrong">Oops! Dar e în regulă 💕</p>
            )}
            
            {isLastQuestion ? (
              <button className="btn" onClick={onComplete}>
                {allCorrect ? "Scor Perfect! 🌟" : "Continuă 💕"}
              </button>
            ) : (
              <button className="btn" onClick={nextQuestion}>
                Următoarea întrebare
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGames;
