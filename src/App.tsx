import React, { useState } from 'react';
import './App.css';
import IntroPage from './components/IntroPage';
import PhotoGallery from './components/PhotoGallery';
import MiniGames from './components/MiniGames';
import TheQuestion from './components/TheQuestion';
import Celebration from './components/Celebration';

export type Page = 'intro' | 'gallery' | 'games' | 'question' | 'celebration';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('intro');

  const nextPage = () => {
    const pages: Page[] = ['intro', 'gallery', 'games', 'question', 'celebration'];
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex < pages.length - 1) {
      setCurrentPage(pages[currentIndex + 1]);
    }
  };

  const goToPage = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'intro' && <IntroPage onNext={nextPage} />}
      {currentPage === 'gallery' && <PhotoGallery onNext={nextPage} />}
      {currentPage === 'games' && <MiniGames onNext={nextPage} />}
      {currentPage === 'question' && <TheQuestion onYes={() => goToPage('celebration')} />}
      {currentPage === 'celebration' && <Celebration />}
    </div>
  );
}

export default App;
