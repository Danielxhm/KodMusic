import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        // Event listeners para el objeto Audio
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => { 
            setIsPlaying(false);
           
        };

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        
        
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    const playTrack = (track) => {
        const audio = audioRef.current;
        if (currentTrack?.id === track.id) {
            
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        } else {
           
            setCurrentTrack(track);
            audio.src = track.preview; // La API de Deezer que proporciona una vista previa de 30s
            audio.play();
        }
    };

    const togglePlay = () => {
        if (!currentTrack) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const value = {
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};