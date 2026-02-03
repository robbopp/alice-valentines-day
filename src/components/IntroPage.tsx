import React, { useEffect, useState } from 'react';
import './IntroPage.css';

interface IntroPageProps {
  onNext: () => void;
}

const HER_NAME = "Alice";

const FloatingFlower: React.FC<{ delay: number; left: string; emoji: string }> = ({ delay, left, emoji }) => (
  <div 
    className="flower" 
    style={{ 
      left, 
      animationDelay: `${delay}s`,
      top: `${Math.random() * 100}%`
    }}
  >
    {emoji}
  </div>
);

const IntroPage: React.FC<IntroPageProps> = ({ onNext }) => {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const flowers = ['🌷', '🌸', '💐', '🌺', '🌻'];
  
  return (
    <div className="intro-page page-container">
      {/* Floating flowers background */}
      {[...Array(10)].map((_, i) => (
        <FloatingFlower 
          key={i} 
          delay={i * 0.5} 
          left={`${i * 10}%`}
          emoji={flowers[i % flowers.length]}
        />
      ))}

      {showContent && (
        <div className="intro-content fade-in">
          <div className="intro-hearts">
            <span className="heart">💛</span>
            <span className="heart" style={{ animationDelay: '0.5s' }}>💛</span>
            <span className="heart" style={{ animationDelay: '1s' }}>💛</span>
          </div>
          
          <h1 className="title">Hello, {HER_NAME} 💛</h1>
          
          <p className="subtitle">
            I made something special just for you, darling...
          </p>

          <div className="flower-decoration">
            🌷✨🌷
          </div>

          {showButton && (
            <button className="btn fade-in" onClick={onNext}>
              Let's Begin 💕
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default IntroPage;
