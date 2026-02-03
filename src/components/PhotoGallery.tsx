import React, { useState } from 'react';
import './PhotoGallery.css';

interface PhotoGalleryProps {
  onNext: () => void;
}

// TODO: Replace these with actual photos of you two!
// Add your images to the public/photos folder and update the paths
const photos = [
  {
    src: '/photos/photo1.jpg',
    caption: 'Our first adventure together 💛'
  },
  {
    src: '/photos/photo2.jpg', 
    caption: 'That time we...'
  },
  {
    src: '/photos/photo3.jpg',
    caption: 'One of my favorite memories 🌷'
  },
  {
    src: '/photos/photo4.jpg',
    caption: 'You make everything better ✨'
  },
  {
    src: '/photos/photo5.jpg',
    caption: 'Forever grateful for you 💕'
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
      <h1 className="title">Our Memories 📸</h1>
      
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
          Let's Play! 🎮
        </button>
      )}
    </div>
  );
};

export default PhotoGallery;
