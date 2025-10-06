import React from 'react';
import { useMediaPreloader } from '../../hooks/useMediaPreloader';

interface LoadingScreenProps {
  onWelcome: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onWelcome }) => {
  const { loadingProgress, isLoaded, loadedFiles, totalFiles } = useMediaPreloader();
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      fontFamily: "'CustomFont', 'Arial', sans-serif",
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #333',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
      }}>
        <h1 style={{
          color: '#4a0e0e',
          fontSize: '2.5em',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}>
          SEVERANCE
        </h1>
        
        <h2 style={{
          color: '#fff',
          fontSize: '1.5em',
          marginBottom: '30px',
          fontWeight: 'normal',
        }}>
          License Agreement
        </h2>
        
        <div style={{
          color: '#ccc',
          fontSize: '0.9em',
          lineHeight: '1.6',
          textAlign: 'left',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #333',
          overflow: 'hidden',
          fontWeight: 'bold',
        }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>WARNING:</strong> This game may cause strong emotional reactions.
          </p>
          
          <p style={{ marginBottom: '15px' }}>
            We are not responsible if you really enjoy this product and become addicted to the gameplay, or conversely - if you are disappointed and waste your time.
          </p>
          
          <p style={{ marginBottom: '15px' }}>
            The game contains elements that may affect your perception of reality, work processes, and corporate culture.
          </p>
          
          <p style={{ marginBottom: '15px' }}>
            By continuing, you agree that you play at your own risk.
          </p>
          
          <p style={{ fontSize: '0.8em', color: '#888' }}>
            © 2025 Severance Game. All rights reserved.
          </p>
        </div>
        
        {/* Индикатор загрузки медиа файлов */}
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#0f0f0f',
          borderRadius: '8px',
          border: '1px solid #333',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
            <span style={{
              color: '#ccc',
              fontSize: '0.9em',
              fontWeight: 'bold',
            }}>
              Loading game assets...
            </span>
            <span style={{
              color: isLoaded ? '#4CAF50' : '#ccc',
              fontSize: '0.9em',
              fontWeight: 'bold',
            }}>
              {loadedFiles}/{totalFiles} ({loadingProgress}%)
            </span>
          </div>
          
          {/* Прогресс бар */}
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#333',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${loadingProgress}%`,
              height: '100%',
              backgroundColor: isLoaded ? '#4CAF50' : '#4a0e0e',
              transition: 'width 0.3s ease, background-color 0.3s ease',
              borderRadius: '4px',
            }} />
          </div>
          
          {isLoaded && (
            <div style={{
              marginTop: '8px',
              color: '#4CAF50',
              fontSize: '0.8em',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              ✓ All assets loaded successfully
            </div>
          )}
        </div>
        
        <button
          onClick={onWelcome}
          disabled={!isLoaded}
          style={{
            backgroundColor: isLoaded ? '#4a0e0e' : '#333',
            color: isLoaded ? '#fff' : '#888',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 40px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            cursor: isLoaded ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            fontFamily: "'CustomFont', 'Arial', sans-serif",
            boxShadow: isLoaded ? '0 4px 15px rgba(74, 14, 14, 0.3)' : '0 4px 15px rgba(51, 51, 51, 0.3)',
            opacity: isLoaded ? 1 : 0.6,
          }}
          onMouseEnter={(e) => {
            if (isLoaded) {
              e.currentTarget.style.backgroundColor = '#6b1414';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.8), 0 6px 20px rgba(74, 14, 14, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (isLoaded) {
              e.currentTarget.style.backgroundColor = '#4a0e0e';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 14, 14, 0.3)';
            }
          }}
        >
          {isLoaded ? 'I Accept' : 'Loading...'}
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;