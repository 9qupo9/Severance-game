import React, { useState, useRef, useEffect } from 'react';
import TextScroll from '../TextScroll/TextScroll';


const fonVideo = '/fon.mp4';
const introVideo = '/intro.mp4';
const controlsImage = '/controls.png';

const Game: React.FC = () => {
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
    const [showSkipMessage, setShowSkipMessage] = useState<boolean>(false);
    const [showTextScroll, setShowTextScroll] = useState<boolean>(false);
    const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
    const [hasStartedSecondCycle, setHasStartedSecondCycle] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const backgroundVideoRef1 = useRef<HTMLVideoElement | null>(null);
    const backgroundVideoRef2 = useRef<HTMLVideoElement | null>(null);



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space' && videoPlaying) {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
                handleVideoEnd();
            }
        };

        if (videoPlaying) {
            document.addEventListener('keydown', handleKeyDown);
            setShowSkipMessage(true);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            setShowSkipMessage(false);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [videoPlaying]);

   
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
        });

      
        video1.style.opacity = activeVideoIndex === 0 ? "1" : "0";
        video2.style.opacity = activeVideoIndex === 1 ? "1" : "0";

        const handleTimeUpdate = () => {
            const timeLeft = activeVideo.duration - activeVideo.currentTime;

            if (timeLeft <= 2 && !hasStartedSecondCycle) {
                setHasStartedSecondCycle(true);
                nextVideo.currentTime = 0.1;
                nextVideo.play();

                
                nextVideo.style.opacity = "1";  
                activeVideo.style.opacity = "0"; 

                
                setTimeout(() => {
                    setActiveVideoIndex(activeVideoIndex === 0 ? 1 : 0);
                    setHasStartedSecondCycle(false);
                }, 500); 
            }
        };

        activeVideo.addEventListener("timeupdate", handleTimeUpdate);
        return () => activeVideo.removeEventListener("timeupdate", handleTimeUpdate);
    }, [activeVideoIndex, hasStartedSecondCycle]);

    const startVideo = () => {
        window.dispatchEvent(new CustomEvent('gameStarted'));
        
        setVideoPlaying(true);
        setShowSkipMessage(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleVideoEnd = () => {
        setVideoPlaying(false);
        setShowSkipMessage(false);
        setShowTextScroll(true);
    };

    const handleTextScrollEnd = () => {
        setShowTextScroll(false);
        window.dispatchEvent(new CustomEvent('gameEnded'));
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            overflow: 'hidden',
            position: 'relative',
        }}>
            <video
                ref={backgroundVideoRef1}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-5%',
                    width: '110%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center left',
                    zIndex: -1,
                    opacity: activeVideoIndex === 0 ? 1 : 0
                }}
                autoPlay
                muted
                playsInline
            >
                <source src={fonVideo} type="video/mp4" />
            </video>
            <video
                ref={backgroundVideoRef2}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '-5%',
                    width: '110%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center left',
                    zIndex: -1,
                    opacity: activeVideoIndex === 1 ? 1 : 0
                }}
                autoPlay={false}
                muted
                playsInline
            >
                <source src={fonVideo} type="video/mp4" />
            </video>
            {videoPlaying && (
                <video
                    ref={videoRef}
                    src={introVideo}
                    onEnded={handleVideoEnd}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 20,
                    }}
                    autoPlay
                />
            )}

            {videoPlaying && showSkipMessage && (
                <div style={{
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
                    zIndex: 21,
                }}>Press SPACE to skip</div>
            )}

            {showTextScroll && (
                <TextScroll onComplete={handleTextScrollEnd} />
            )}

            {!videoPlaying && !showTextScroll && (
                <div style={{
                    textAlign: 'center',
                    color: '#ffffff',
                    maxWidth: '500px',
                    padding: '0.5rem',
                    background: 'transparent',
                    borderRadius: '15px',
                    border: 'none',
                    boxShadow: 'none',
                    fontFamily: "'CustomFont', 'Inter', 'Arial', sans-serif",
                    position: 'relative',
                    zIndex: 1,
                    marginTop: '8vh',
                }}>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '-4rem',
                        marginTop: '0.5rem',
                        color: '#ffffff',
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
                        fontWeight: 300,
                        letterSpacing: '0.5px',
                        fontFamily: "'CustomFont', 'Arial', sans-serif",
                    }}>Get ready for adventure</p>
                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        marginTop: '5rem',
                        marginBottom: '-0.5rem',
                        background: 'linear-gradient(45deg, #ffffff, #cccccc, #ffffff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.8)',
                        filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
                        letterSpacing: '2px',
                        fontFamily: "'CustomFont', 'Arial', sans-serif",
                    }}>SEVERANCE</h1>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.5,
                        fontFamily: "'CustomFont', 'Arial', sans-serif",
                        marginTop: '-5rem',
                        position: 'relative',
                        display: 'inline-block',
                    }}>
                        <div style={{
                            position: 'relative',
                            display: 'inline-block',
                        }}>
                            <img 
                                src={controlsImage} 
                                alt="Game Controls" 
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    opacity: 0.9,
                                    transition: 'opacity 0.3s ease',
                                    display: 'block',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                            />
                            
                            
                            <button 
                                style={{
                                    position: 'absolute',
                                    top: '28%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ffffff',
                                    fontSize: '2.2rem',
                                    fontWeight: 'bold',
                                    padding: '1rem 2rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                                    fontFamily: "'CustomFont', 'Arial', sans-serif",
                                    zIndex: 2,
                                    whiteSpace: 'nowrap',
                                    overflow: 'visible',
                                }}
                                onClick={startVideo}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.8)';
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.7)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)';
                                }}
                            >
                                START GAME
                            </button>

                            
                            <div style={{
                                position: 'absolute',
                                top: '40%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center',
                                zIndex: 2,
                            }}>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.2rem',
                                    color: '#ffffff',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    margin: '0 0 1.2rem 0',
                                }}>CONTROLS:</h3>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.8rem',
                                    alignItems: 'center',
                                }}>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>A/D - MOVEMENT</div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>W - ATTACK</div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>S - BLOCK</div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>Q - HEALTH</div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>E - CHARACTER</div>
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                                        letterSpacing: '1px',
                                        fontWeight: 400,
                                        lineHeight: 1.4,
                                    }}>SPACE - JUMP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;