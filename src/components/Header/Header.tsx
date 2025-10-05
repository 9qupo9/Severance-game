import React, { useState, useEffect } from 'react';
import WalletConnect from '../WalletConnect/WalletConnect';

type PageType = 'game' | 'home';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '12px 20px',
    background: isScrolled ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(15px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    height: '65px',
    transition: 'all 0.3s ease',
    fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
    ...(isScrolled ? {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    } : {})
  };

  return (
    <header style={headerStyle}>
      <div style={{
        maxWidth: 'none',
        padding: 0,
        textAlign: 'left',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          width: '100%',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 600,
              margin: 0,
              background: 'linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #8b0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s ease',
            }}>Severance</h1>
          </div>
          
          <nav style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
          </nav>

          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;