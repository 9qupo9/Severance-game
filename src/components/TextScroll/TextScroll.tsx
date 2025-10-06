import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';


const backgroundVideo = '/fon2.mp4';
const introAudio = '/intro.mp3';

interface TextScrollProps {
    onComplete?: () => void;
}

const TextScroll: React.FC<TextScrollProps> = ({ onComplete }) => {
    const [showSkipMessage, setShowSkipMessage] = useState(true);
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [hasStartedSecondCycle, setHasStartedSecondCycle] = useState(false);
    const backgroundVideoRef1 = useRef<HTMLVideoElement>(null);
    const backgroundVideoRef2 = useRef<HTMLVideoElement>(null);
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

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const playAudio = async () => {
            try {
                audio.load();
                await audio.play();
            } catch (error) {
                console.log('Audio autoplay prevented:', error);
            }
        };

        playAudio();

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        const video1 = backgroundVideoRef1.current;
        const video2 = backgroundVideoRef2.current;
        if (!video1 || !video2) return;

        const activeVideo = activeVideoIndex === 0 ? video1 : video2;
        const nextVideo = activeVideoIndex === 0 ? video2 : video1;

        [video1, video2].forEach((v) => {
            v.style.position = "absolute";
            v.style.top = "0";
            v.style.left = "0";
            v.style.width = "100%";
            v.style.height = "100%";
            v.style.objectFit = "cover";
            v.style.transition = "opacity 2s ease-in-out";
            v.style.zIndex = "-1";
            v.style.opacity = "0.3";
            v.style.transform = "translateZ(0)";
            v.style.backfaceVisibility = "hidden";
            v.style.perspective = "1000px";
            v.style.willChange = "transform";
            v.style.imageRendering = "pixelated";
            v.style.pointerEvents = "none";
        });

        
        video1.style.opacity = activeVideoIndex === 0 ? "0.3" : "0";
        video2.style.opacity = activeVideoIndex === 1 ? "0.3" : "0";

        const handleTimeUpdate = () => {
            const timeLeft = activeVideo.duration - activeVideo.currentTime;

            if (timeLeft <= 2 && !hasStartedSecondCycle) {
                setHasStartedSecondCycle(true);
                nextVideo.currentTime = 0.1;
                nextVideo.play();

                nextVideo.style.opacity = "0.3";
                activeVideo.style.opacity = "0";

                setTimeout(() => {
                    setActiveVideoIndex(activeVideoIndex === 0 ? 1 : 0);
                    setHasStartedSecondCycle(false);
                }, 500);
            }
        };

        activeVideo.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            activeVideo.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [activeVideoIndex, hasStartedSecondCycle]);

    const storyText = `The world is already burned. This is not a crusade for glory, but an exile into darkness.

Fire and war have scorched entire kingdoms, and now the wastelands teem with twisted monsters, fragments of once-living people, and beasts.

The Order is no more; only monasteries remain, fortresses of faith among the ashes.

Every recruit, before calling himself a paladin, must undertake the SEVERANCE venture beyond the monastery walls and survive the night outside.

Only then will he learn what it means to carry light where even the gods have turned away.`;

    const handleComplete = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
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
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
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
                ref={backgroundVideoRef1}
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
                preload="none"
                disablePictureInPicture
                controls={false}
                src={backgroundVideo}
            >
                Your browser does not support the video element.
            </video>
            
            <video 
                ref={backgroundVideoRef2}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                    opacity: 0,
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                    willChange: 'transform',
                    imageRendering: 'pixelated',
                    pointerEvents: 'none'
                }}
                loop 
                muted 
                playsInline
                preload="none"
                disablePictureInPicture
                controls={false}
                src={backgroundVideo}
            >
                Your browser does not support the video element.
            </video>
            
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
            
            <audio 
                ref={audioRef}
                src={introAudio}
                loop
                preload="auto"
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default TextScroll;