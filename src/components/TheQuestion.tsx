import React, { useState, useCallback } from 'react';
import './TheQuestion.css';

interface TheQuestionProps {
  onYes: () => void;
}

const HER_NAME = "Alice";

const TheQuestion: React.FC<TheQuestionProps> = ({ onYes }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const funnyMessages = [
    "Are you sure, darling? 🥺",
    "Think again! 💛",
    "Pretty please? 🌷",
    "But I love you! 💛💕💛",
    "Not an option, darling! 😤",
    "Try clicking Yes instead 😏",
    "The button is shy! 🙈",
    "Nope, can't click that! ✨"
  ];

  const [message, setMessage] = useState<string | null>(null);

  const moveNoButton = useCallback(() => {
    // Get random position within viewport
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPos({ x: newX, y: newY });
    setNoClickCount(prev => prev + 1);
    
    // Show funny message
    setMessage(funnyMessages[Math.min(noClickCount, funnyMessages.length - 1)]);
    
    // Make Yes button bigger each time No is attempted
    setYesScale(prev => Math.min(prev + 0.1, 2));
    
    // Clear message after a moment
    setTimeout(() => setMessage(null), 1500);
  }, [noClickCount, funnyMessages]);

  return (
    <div className="question-page page-container">
      <div className="floating-hearts">
        {[...Array(20)].map((_, i) => (
          <span 
            key={i} 
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`
            }}
          >
            💛
          </span>
        ))}
      </div>

      <div className="question-content fade-in">
        <div className="flower-crown">🌷💐🌷</div>
        
        <h1 className="title question-title">
          {HER_NAME}, darling... 💛
        </h1>
        
        <p className="question-text">
          Will you be my Valentine? 💛💕💛
        </p>

        <div className="question-buttons">
          <button 
            className="btn btn-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={onYes}
          >
            Yes! 💛
          </button>
          
          <button 
            className="btn btn-no"
            style={{ 
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
            }}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            onTouchStart={moveNoButton}
          >
            No
          </button>
        </div>

        {message && (
          <p className="funny-message fade-in">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TheQuestion;
