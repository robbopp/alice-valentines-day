import React, { useState, useCallback } from 'react';
import './TheQuestion.css';

interface TheQuestionProps {
  onYes: () => void;
}

const HER_NAME = "Alice";

const TheQuestion: React.FC<TheQuestionProps> = ({ onYes }) => {
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [isEscaping, setIsEscaping] = useState(false);

  const funnyMessages = [
    "Ești sigură, draga mea? 🥺",
    "Gândește-te din nou! 💛",
    "Te rog frumos? 🌷",
    "Dar te iubesc! 💛💕💛",
    "Nu e o opțiune, draga mea! 😤",
    "Încearcă să apeși Da 😏",
    "Butonul e timid! 🙈",
    "Nu poți apăsa asta! ✨",
    "Haha, nu mă prinzi! 🏃",
    "Mai încearcă! 😜"
  ];

  const [message, setMessage] = useState<string | null>(null);

  const moveNoButton = useCallback(() => {
    setIsEscaping(true);
    
    // Random position anywhere on screen with padding
    const padding = 20;
    const buttonWidth = 100;
    const buttonHeight = 50;
    
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    const newX = padding + Math.random() * (maxX - padding);
    const newY = padding + Math.random() * (maxY - padding);
    
    setNoButtonStyle({
      position: 'fixed',
      left: `${newX}px`,
      top: `${newY}px`,
      transform: 'none',
      zIndex: 1000,
    });
    
    setNoClickCount(prev => prev + 1);
    
    // Show funny message
    setMessage(funnyMessages[Math.min(noClickCount, funnyMessages.length - 1)]);
    
    // Make Yes button bigger each time No is attempted
    setYesScale(prev => Math.min(prev + 0.15, 2.5));
    
    // Clear message after a moment
    setTimeout(() => setMessage(null), 2000);
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
          Draga mea... 💛
        </h1>
        
        <p className="question-text">
          Vrei să fii Valentine-ul meu? 💛💕💛
        </p>

        <div className="question-buttons">
          <button 
            className="btn btn-yes"
            style={{ transform: `scale(${yesScale})` }}
            onClick={onYes}
          >
            Da! 💛
          </button>
          
          {!isEscaping && (
            <button 
              className="btn btn-no"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              onTouchStart={moveNoButton}
            >
              Nu
            </button>
          )}
        </div>

        {message && (
          <p className="funny-message fade-in">{message}</p>
        )}
      </div>

      {/* Escaped button - positioned absolutely on screen */}
      {isEscaping && (
        <button 
          className="btn btn-no escaped-no"
          style={noButtonStyle}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          onTouchStart={moveNoButton}
        >
          Nu
        </button>
      )}
    </div>
  );
};

export default TheQuestion;
