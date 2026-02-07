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
            De când te-am cunoscut, fiecare zi a fost mai luminoasă și mai plină de bucurie!🥹 <br></br>
            Îmi aduci zâmbetul pe buze chiar și în cele mai grele momente și mă faci să mă simt iubit în fiecare clipă!❤️ <br></br>
            <br></br>
            Ești cea mai minunată ființă din lume și sunt recunoscător pentru fiecare moment petrecut împreună și pentru că ești a mea și sunt al tău și îți mulțumesc că mă iubești și că ești așa bună și răbdătoare și minunată!🥹 <br></br>
            Ești cea mai frumoasă și perfectă și minunată din univers!❤️ <br></br>
            <br></br>
            Te iubesc din toată inima mea! ❤️ <br></br>
            Te iubesc infinit, complet, jertfitor, la nesfărșit! ❤️ <br></br>
            Te iubesc întotdeauna și cel mai mult! ❤️ <br></br>
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
