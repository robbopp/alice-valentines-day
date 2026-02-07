import React, { useState } from 'react';
import './PhotoGallery.css';

interface PhotoGalleryProps {
  onNext: () => void;
}

// Adaugă pozele voastre în public/photos și actualizează textele
const photos = [
  {
    src: `${process.env.PUBLIC_URL}/photos/photo1.jpg`,
    caption: 'Prima noastră aventură împreună ❤️'
  },
  {
    src: `${process.env.PUBLIC_URL}/photos/photo2.jpg`, 
    caption: 'Cea mai minunată din univers! ❤️'
  },
  {
    src: `${process.env.PUBLIC_URL}/photos/photo3.jpg`,
    caption: 'Una dintre amintirile mele preferate 🌷'
  },
  {
    src: `${process.env.PUBLIC_URL}/photos/photo4.jpg`,
    caption: 'Tu faci totul mai frumos ✨'
  },
  {
    src: `${process.env.PUBLIC_URL}/photos/photo5.jpg`,
    caption: 'Mereu recunoscător pentru tine 💕'
  }
];

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const goNext = () => {
    if (currentIndex < photos.length - 1) {
      setDirection('left');
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setDirection(null);
      }, 300);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection('right');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setDirection(null);
      }, 300);
    }
  };

  const isLastPhoto = currentIndex === photos.length - 1;

  return (
    <div className="gallery-page page-container">
      <h1 className="title">Amintirile Noastre 📸</h1>
      
      <div className="gallery-container">
        <div className={`photo-frame ${direction ? `slide-${direction}` : ''}`}>
          <img 
            src={photos[currentIndex].src} 
            alt={`Memory ${currentIndex + 1}`}
            onError={(e) => {
              // Placeholder if image doesn't exist
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400/FFD700/5D4037?text=Add+Photo+' + (currentIndex + 1);
            }}
          />
          <p className="photo-caption">{photos[currentIndex].caption}</p>
        </div>

        <div className="gallery-controls">
          <button 
            className="gallery-btn" 
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            ◀
          </button>
          
          <div className="photo-dots">
            {photos.map((_, idx) => (
              <span 
                key={idx} 
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          
          <button 
            className="gallery-btn" 
            onClick={goNext}
            disabled={isLastPhoto}
          >
            ▶
          </button>
        </div>
      </div>

      {isLastPhoto && (
        <button className="btn fade-in" onClick={onNext}>
          Mai departe ➡
        </button>
      )}
    </div>
  );
};

export default PhotoGallery;
