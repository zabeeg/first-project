import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useStore from '../store';

// Same lofi chill beats for all pages - consistent vibe throughout the app
const LOFI_TRACK_URL = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3';

const pageMusicMap = {
  home: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  workouts: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  outfits: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  skincare: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  affirmations: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  diet: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  journal: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  progress: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  settings: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  welcome: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  login: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL },
  register: { name: 'Lofi Chill Beats', url: LOFI_TRACK_URL }
};

function AudioPlayer() {
  const location = useLocation();
  const audioRef = useRef(null);
  const { musicEnabled, musicVolume, setCurrentPage } = useStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Get current page from path
  const getPageFromPath = (path) => {
    const pageName = path.split('/')[1] || 'home';
    return pageName;
  };

  // Update current page in store and change music
  useEffect(() => {
    const page = getPageFromPath(location.pathname);
    setCurrentPage(page);
    
    const trackInfo = pageMusicMap[page] || pageMusicMap.home;
    
    if (currentTrack !== trackInfo.url) {
      setCurrentTrack(trackInfo.url);
      setIsLoaded(false);
    }
  }, [location.pathname, setCurrentPage, currentTrack]);

  // Handle audio source change
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack;
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Handle play/pause based on musicEnabled
  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled && isLoaded) {
        audioRef.current.play().catch(err => {
          // Auto-play was prevented, user needs to interact first
          console.log('Auto-play prevented:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled, isLoaded]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Handle audio loaded
  const handleCanPlay = () => {
    setIsLoaded(true);
    if (musicEnabled && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
      });
    }
  };

  // Handle audio ended - loop
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Loop play prevented:', err);
      });
    }
  };

  return (
    <audio
      ref={audioRef}
      onCanPlay={handleCanPlay}
      onEnded={handleEnded}
      loop
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}

export default AudioPlayer;

