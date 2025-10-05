import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ModalState {
  isVisible: boolean;
  type: 'error' | 'warning' | 'success';
  title: string;
  message: string;
}

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'error',
    title: '',
    message: ''
  });

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
      setModal({
        isVisible: true,
        type: 'warning',
        title: 'Wallet Not Found',
        message: 'Please install MetaMask or another Web3 wallet extension.'
      });
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
      setModal({
        isVisible: true,
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to connect to wallet. Please try again.'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isVisible: false }));
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
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
              boxShadow: '0 6px 20px rgba(255, 255, 255, 0.5)',
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
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 10px rgba(255, 255, 255, 0.7)',
                  '0 0 20px rgba(255, 255, 255, 1)',
                  '0 0 10px rgba(255, 255, 255, 0.7)'
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
            boxShadow: 'none',
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
            boxShadow: 'none',
          } : {}}
          whileTap={!isConnecting ? {
            y: 0,
            boxShadow: 'none',
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

      {modal.isVisible && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            boxSizing: 'border-box',
            minHeight: '100vh',
            minWidth: '100vw',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80vh',
              margin: '0 auto',
              border: modal.type === 'error' 
                ? '2px solid rgba(139, 0, 0, 0.5)' 
                : modal.type === 'warning'
                ? '2px solid rgba(139, 0, 0, 0.5)'
                : '2px solid rgba(139, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'auto',
              boxSizing: 'border-box',
              transform: 'translate3d(0, 0, 0)',
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
          
            <h3 style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '1rem',
              fontSize: '1.25rem',
              fontWeight: '600',
              fontFamily: 'inherit',
            }}>
              {modal.title}
            </h3>

           
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.5',
              fontFamily: 'inherit',
            }}>
              {modal.message}
            </p>

           
            <motion.button
              onClick={closeModal}
              style={{
                width: '100%',
                padding: '12px 24px',
                background: modal.type === 'error'
                  ? 'linear-gradient(135deg, #8b0000, #a52a2a)'
                  : modal.type === 'warning'
                  ? 'linear-gradient(135deg, #8b0000, #a52a2a)'
                  : 'linear-gradient(135deg, #8b0000, #a52a2a)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: modal.type === 'error'
                  ? '0 8px 25px rgba(255, 255, 255, 0.6)'
                  : modal.type === 'warning'
                  ? '0 8px 25px rgba(255, 255, 255, 0.6)'
                  : '0 8px 25px rgba(255, 255, 255, 0.6)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
               Got it
             </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default WalletConnect;