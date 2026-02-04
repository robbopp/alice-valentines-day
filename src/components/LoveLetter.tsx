import React from 'react';
import './LoveLetter.css';

interface LoveLetterProps {
  onNext: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ onNext }) => {
  return (
    <div className="letter-page page-container">
      <div className="letter-content fade-in">
        <div className="letter-header">💌</div>
        
        <h1 className="title">Pentru tine, draga mea...</h1>
        
        <div className="letter-body">
          <p>
            {/* SCRIE MESAJUL TĂU AICI */}
            Aici poți scrie un mesaj personal pentru Alice.
            Spune-i cât de mult înseamnă pentru tine,
            amintiri frumoase, sau orice simți în inimă. 💛
          </p>
        </div>

        <button className="btn fade-in" onClick={onNext}>
          Continuă 💛
        </button>
      </div>
    </div>
  );
};

export default LoveLetter;
