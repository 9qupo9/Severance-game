import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const globalStyles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
  },

  btn: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
  },

  btnPrimary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },

  btnPrimaryHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
  },

  btnOutline: {
    background: 'transparent',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },

  btnOutlineHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
};


export const globalCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'CustomFont', 'Exocet', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'CustomFont', 'Exocet', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #2a0a0a 0%, #1a0505 50%, #2a0a0a 100%);
    min-height: 100vh;
    color: #333;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .btn:hover.btn-primary {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .btn:hover.btn-outline {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;


export const applyGlobalStyles = (element: string): CSSProperties => {
  return globalStyles[element] || {};
};


export const injectGlobalStyles = (): void => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = globalCSS;
    document.head.appendChild(styleElement);
  }
};


injectGlobalStyles();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);