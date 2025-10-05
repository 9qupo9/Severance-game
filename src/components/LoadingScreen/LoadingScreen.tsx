import React from 'react';

interface LoadingScreenProps {
  onWelcome: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onWelcome }) => {
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
        
        <button
          onClick={onWelcome}
          style={{
            backgroundColor: '#4a0e0e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '15px 40px',
            fontSize: '1.1em',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'CustomFont', 'Arial', sans-serif",
            boxShadow: '0 4px 15px rgba(74, 14, 14, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6b1414';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.8), 0 6px 20px rgba(74, 14, 14, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4a0e0e';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(74, 14, 14, 0.3)';
          }}
        >
          I Accept
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;