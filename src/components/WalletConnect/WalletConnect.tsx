import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import headSkeletImage from './head-skelet.png';
import fonVideo from '../Game/fon.mp4';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setShowWalletModal(true);
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Wallet connection error');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      {/* Custom Wallet Installation Modal */}
      {showWalletModal && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            margin: 0,
            padding: '20px',
            boxSizing: 'border-box',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowWalletModal(false)}
        >
          <motion.div
            style={{
              background: 'transparent',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80vh',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
              textAlign: 'center',
              margin: 'auto',
              position: 'relative',
              transform: 'translate(0, 0)',
              overflow: 'hidden',
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
                objectFit: 'cover',
                borderRadius: '20px',
                zIndex: -1,
              }}
            >
               <source src={fonVideo} type="video/mp4" />
              </video>
            <motion.div
              style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img 
                src={headSkeletImage} 
                alt="Skull" 
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain',
                }}
              />
            </motion.div>
            <h2 style={{
              color: '#ffffff',
              fontSize: '1.8rem',
              fontWeight: 600,
              marginBottom: '1rem',
              fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
            }}>
              Wallet Not Found
            </h2>
            <p style={{
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: '1.6',
                marginBottom: '2rem',
                fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
            }}>
              To connect your wallet, you need to install a Web3 wallet extension like MetaMask or similar.
            </p>
            <motion.button
              onClick={() => setShowWalletModal(false)}
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                 border: 'none',
                 borderRadius: '8px',
                 padding: '12px 24px',
                 color: '#4a0e0e',
                 fontWeight: 600,
                 fontSize: '1rem',
                 cursor: 'pointer',
                 fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
                boxShadow: '0 4px 15px rgba(128, 128, 128, 0.3)',
              }}
              whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 25px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.8), 0 6px 20px rgba(128, 128, 128, 0.4)',
                }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Got it
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      }}>
      {account ? (
        <motion.div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(139, 0, 0, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.15)',
              y: -1,
              boxShadow: '0 6px 20px rgba(139, 0, 0, 0.3)',
              borderColor: 'rgba(139, 0, 0, 0.5)',
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              style={{
                width: '10px',
                height: '10px',
                background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 10px rgba(74, 222, 128, 0.5)',
                  '0 0 20px rgba(74, 222, 128, 0.8)',
                  '0 0 10px rgba(74, 222, 128, 0.5)'
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span style={{
              color: 'white',
              fontWeight: 500,
              fontSize: '0.9rem',
              fontFamily: "'Courier New', monospace",
              letterSpacing: '0.5px',
            }}>
              {formatAddress(account)}
            </span>
          </motion.div>
          <motion.button 
            onClick={disconnectWallet} 
            style={{
              fontSize: '0.8rem',
              fontWeight: 400,
              padding: '6px 12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '15px',
              color: '#ef4444',
              cursor: 'pointer',
              backdropFilter: 'blur(5px)',
              fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
            }}
            whileHover={{
              background: 'rgba(239, 68, 68, 0.2)',
              borderColor: 'rgba(239, 68, 68, 0.5)',
              color: '#fff',
              y: -1,
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Disconnect
          </motion.button>
        </motion.div>
      ) : (
        <motion.button
          onClick={connectWallet}
          disabled={isConnecting}
          style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            padding: '10px 20px',
            background: isConnecting 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #8b0000 100%)',
            border: 'none',
            borderRadius: '20px',
            color: 'white',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            boxShadow: isConnecting ? 'none' : '0 4px 15px rgba(139, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontFamily: 'inherit',
            opacity: isConnecting ? 0.6 : 1,
          }}
          whileHover={!isConnecting ? {
            background: 'linear-gradient(135deg, #a52a2a 0%, #dc143c 50%, #a52a2a 100%)',
            y: -2,
            boxShadow: '0 8px 25px rgba(139, 0, 0, 0.6)',
          } : {}}
          whileTap={!isConnecting ? {
            y: 0,
            boxShadow: '0 4px 15px rgba(139, 0, 0, 0.4)',
          } : {}}
          animate={isConnecting ? {
            opacity: [0.6, 0.8, 0.6],
          } : {}}
          transition={{
            duration: isConnecting ? 1.5 : 0.3,
            repeat: isConnecting ? Infinity : 0,
          }}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </motion.button>
      )}
      </div>
    </>
  );
};

export default WalletConnect;