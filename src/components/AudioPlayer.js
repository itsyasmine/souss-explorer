// src/components/AudioPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import '../styles/AudioPlayer.css';
import playIcon from '../assets/icons/play-icon.svg';
import pauseIcon from '../assets/icons/pause-icon.svg';

function AudioPlayer({ audioUrl, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  
  useEffect(() => {
    // Add event listeners to the audio element
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    // Set up event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);
    
    // Clean up
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);
  
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  
  // Format time in minutes and seconds
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return '0:00';
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata"></audio>
      
      <div className="audio-info">
        <div className="audio-title">{title} - Guide Audio</div>
        <div className="audio-controls">
          <button className="play-button" onClick={togglePlay}>
            <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? "Pause" : "Play"} />
          </button>
          
          <div className="progress-container">
            <input
              type="range"
              ref={progressRef}
              className="progress-bar"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              step="0.01"
            />
            <div className="time-display">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="duration">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;