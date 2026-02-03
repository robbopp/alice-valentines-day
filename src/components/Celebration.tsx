import React, { useEffect, useState } from 'react';
import './Celebration.css';

const HER_NAME = "Alice";

const Celebration: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti
    const colors = ['#FFD700', '#FF69B4', '#FFF8DC', '#FFB6C1', '#FFEC8B', '#DB7093'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="celebration-page page-container">
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`
          }}
        />
      ))}

      <div className="celebration-content fade-in">
        <div className="big-heart">
          <span className="heart">💛</span>
        </div>

        <h1 className="title celebration-title">
          Yay!!!
        </h1>

        <p className="celebration-text">
          Știam că vei spune da! 🥰
        </p>

        <div className="love-message">
          <p>
            {HER_NAME}, draga mea, tu faci fiecare zi mai frumoasă. 💛
          </p>
          <p>
            Abia aștept să petrecem Valentine's Day împreună!
          </p>
        </div>

        <div className="flower-rain">
          🌷 🌸 💐 🌺 🌻 🌷 🌸 💐 🌺 🌻
        </div>

        <div className="signature">
          <p>Al tău pentru totdeauna,</p>
          <p className="from-name">Robi, dragul tău 💛</p>
        </div>

        {/* Optional: Add a special message or photo here */}
        <div className="final-touch">
          <p>Ne vedem pe 14 februarie! 💛</p>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
