import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
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
      <motion.div
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
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
      >
        <OptimizedImage
          src={errorImage}
          alt="Desktop Only"
          loading="eager"
          placeholder="Загрузка..."
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </motion.div>
    </div>
  );
};

export default Error;