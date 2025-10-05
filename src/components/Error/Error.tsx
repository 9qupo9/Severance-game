import React from 'react';
import { motion } from 'framer-motion';
import errorImage from './error.png';

const Error: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
    }}>
      <motion.img 
        src={errorImage} 
        alt="Desktop Only" 
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          objectFit: 'contain',
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default Error;