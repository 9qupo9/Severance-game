import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import Footer from './components/Footer/Footer';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Error from './components/Error/Error';
import { useDeviceDetection } from './components/Error/useDeviceDetection';

import errorImage from './components/Error/error.png';
import controlsImage from './components/Game/controls.png';

type PageType = 'game' | 'home';

function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<PageType>('game');
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);
  const { isDesktop, isMobile, isTablet } = useDeviceDetection();


  useEffect(() => {
    const preloadImages = [
      errorImage,
      controlsImage
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
      
 
      const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      const webpImg = new Image();
      webpImg.src = webpSrc;
    });
  }, []);

  const handleWelcome = () => {
    setShowLoadingScreen(false);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'game':
        return <Game />;
      case 'home':
      default:
        return (
          <div style={{
            minHeight: 'calc(100vh - 180px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
          }}>
            <div>
            </div>
          </div>
        );
    }
  };

  if (isMobile || isTablet || !isDesktop) {
    return <Error />;
  }

  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    ...(currentPage === 'game' ? {
      padding: '0',
      overflow: 'hidden',
      height: '100vh',
    } : {})
  };

  const mainContentStyle = {
    flex: 1,
    paddingTop: '48px',
    paddingBottom: '0px',
    overflowY: 'auto' as const,
    ...(currentPage === 'game' ? {
      padding: '0',
      overflow: 'hidden',
      height: '100vh',
    } : {})
  };

  return (
    <div style={appStyle}>
      {showLoadingScreen ? (
        <LoadingScreen onWelcome={handleWelcome} />
      ) : (
        <>
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main style={mainContentStyle}>
            {renderPage()}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;