import React, { useState, useRef, useEffect } from 'react';


const soundFile = '/sound.mp3';

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const [autoplayAttempted, setAutoplayAttempted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);



  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !autoplayAttempted) {
      audio.volume = volume;
      audio.muted = false;

      const startOnFirstInteraction = async (event: Event) => {
        const target = event.target as HTMLElement;
        const isStartGameButton = target && (
          target.classList.contains('start-button') ||
          target.textContent?.includes('START GAME') ||
          target.closest('.start-button')
        );

        if (isStartGameButton) {
          setAutoplayAttempted(true);
          return;
        }

        try {
          await audio.play();
          setIsPlaying(true);
          setAutoplayAttempted(true);
        } catch (playError) {
          setAutoplayAttempted(true);
        }
      };

      ['click', 'touchstart', 'keydown'].forEach(eventType => {
        document.addEventListener(eventType, startOnFirstInteraction, { once: true });
      });

      return () => {
        ['click', 'touchstart', 'keydown'].forEach(eventType => {
          document.removeEventListener(eventType, startOnFirstInteraction);
        });
      };
    }
  }, [volume, autoplayAttempted]);

  useEffect(() => {
    const handleGameStart = () => {
      const audio = audioRef.current;

      if (audio && isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    const handleGameEnd = async () => {
      const audio = audioRef.current;

      if (audio && !isPlaying) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
        }
      }
    };

    window.addEventListener('gameStarted', handleGameStart);
    window.addEventListener('gameEnded', handleGameEnd);

    return () => {
      window.removeEventListener('gameStarted', handleGameStart);
      window.removeEventListener('gameEnded', handleGameEnd);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };



  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      background: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(15px)',
      color: 'white',
      padding: '1.5rem 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
    }}>
      <div style={{
        maxWidth: 'none',
        padding: 0,
        textAlign: 'left',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          width: '100%',
        }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: 400,
          }}>
            © {currentYear} <span style={{
              color: 'white',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #8b0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Severance</span>. All rights reserved.
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1rem',
            fontWeight: 400,
          }}>
            <audio
              ref={audioRef}
              loop
              preload="none"
              playsInline
            >
              <source src={soundFile} type="audio/mpeg" />
            </audio>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(40, 40, 40, 0.8))',
                  border: '1px solid rgba(139, 0, 0, 0.6)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: '#dc143c',
                  transition: 'all 0.3s ease',
                  padding: '6px 10px',
                  marginRight: '8px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick={togglePlay}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ff4757';
                  e.currentTarget.style.borderColor = 'rgba(220, 20, 60, 0.8)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 20, 60, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#dc143c';
                  e.currentTarget.style.borderColor = 'rgba(139, 0, 0, 0.6)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  width: '70px',
                  height: '5px',
                  background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.8), rgba(40, 40, 40, 0.6))',
                  border: '1px solid rgba(139, 0, 0, 0.4)',
                  borderRadius: '3px',
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              />
            </div>

            <div style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1rem',
              fontWeight: 400,
            }}>
              Creator:<span style={{
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #8b0000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginLeft: '0.3rem',
              }}>Tenespir</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;