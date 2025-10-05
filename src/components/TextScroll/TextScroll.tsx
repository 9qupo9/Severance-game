import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';


const backgroundVideo = '/fon2.mp4';
const introAudio = '/intro.mp3';

interface TextScrollProps {
    onComplete?: () => void;
}

const TextScroll: React.FC<TextScrollProps> = ({ onComplete }) => {
    const [showSkipMessage, setShowSkipMessage] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);
    const controls = useAnimation();

    useEffect(() => {
      
        controls.start({
            bottom: '120%',
            opacity: [0, 1, 1, 0],
            transition: {
                duration: 80,
                ease: 'linear',
                opacity: {
                    times: [0, 0.1, 0.9, 1],
                    duration: 80,
                }
            }
        });
    }, [controls]);

    const storyText = `The world is already burned. This is not a crusade for glory, but an exile into darkness.

Fire and war have scorched entire kingdoms, and now the wastelands teem with twisted monsters, fragments of once-living people, and beasts.

The Order is no more; only monasteries remain, fortresses of faith among the ashes.

Every recruit, before calling himself a paladin, must undertake the SEVERANCE venture beyond the monastery walls and survive the night outside.

Only then will he learn what it means to carry light where even the gods have turned away.`;

    const handleComplete = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            try {
                audio.pause();
                audio.currentTime = 0;
            } catch (error) {
                console.warn('Ошибка при остановке аудио:', error);
            }
        }
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    const handleSkip = useCallback(() => {
        setShowSkipMessage(false);
        controls.stop(); 
        handleComplete();
    }, [controls, handleComplete]);

    useEffect(() => {
        let isComponentMounted = true;
        let playPromise: Promise<void> | undefined;

        const handleCanPlay = () => {
            const audio = audioRef.current;
            if (isComponentMounted && audio) {
                playPromise = audio.play();
                if (playPromise) {
                    playPromise.catch((error) => {
                        if (isComponentMounted) {
                            console.error('Ошибка воспроизведения музыки:', error);
                        }
                    });
                }
            }
        };

        const handleError = (error: Event) => {
            if (isComponentMounted) {
                console.error('Ошибка загрузки аудио файла:', error);
            }
        };

        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.7;
            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('error', handleError);
            audio.load();
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                handleSkip();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const timer = setTimeout(() => {
            handleComplete();
        }, 75000);

        return () => {
            isComponentMounted = false;
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
            
            if (audio) {
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('error', handleError);
                
                if (playPromise) {
                    playPromise.then(() => {
                        if (audio) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                    }).catch(() => {
                    });
                } else {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        };
    }, [handleComplete, handleSkip]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
            overflow: 'hidden',
            zIndex: 998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <video 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                    opacity: 0.3,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    willChange: 'transform',
                    imageRendering: 'pixelated',
                    pointerEvents: 'none'
                }}
                autoPlay 
                loop 
                muted 
                playsInline
                preload="auto"
                disablePictureInPicture
                controls={false}
                src={backgroundVideo}
            >
                Your browser does not support the video element.
            </video>
            
            <audio ref={audioRef} loop src={introAudio} preload="auto">
                Your browser does not support the audio element.
            </audio>
            
            <div style={{
                position: 'relative',
                width: '80%',
                maxWidth: '800px',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}>
                <motion.div 
                    animate={controls}
                    initial={{
                        bottom: '-330%',
                        opacity: 0
                    }}
                    style={{
                        fontFamily: "'Exocet', serif",
                        fontSize: '50px',
                        lineHeight: 1.8,
                        color: '#8B0000',
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                        letterSpacing: '1px',
                        wordSpacing: '2px',
                        position: 'absolute',
                        width: '100%',
                        padding: '40px',
                        boxSizing: 'border-box',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {storyText}
                </motion.div>
            </div>

            {showSkipMessage && (
                <motion.div 
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        fontFamily: "'Exocet', serif",
                        fontSize: '16px',
                        color: '#cccccc',
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: '1px solid #444',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                        zIndex: 999,
                    }}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                >
                    Press SPACE to skip
                </motion.div>
            )}
        </div>
    );
};

export default TextScroll;