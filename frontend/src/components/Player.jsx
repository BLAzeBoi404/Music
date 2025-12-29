import React, { useEffect, useRef, useState } from 'react';

function formatTime(s) {
  if (!s && s !== 0) return '--:--';
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function Player({ song }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (song) {
      audioRef.current.src = `http://localhost:5000/uploads/${song.filename}`;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    const cur = audioRef.current.currentTime;
    setProgress(cur);
  };

  const onLoaded = () => {
    setDuration(audioRef.current.duration || 0);
  };

  const seek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * duration;
    setProgress(audioRef.current.currentTime);
  };

  return (
    <div className="player">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoaded} />
      <div className="player-left">
        <div className="track-info">
          <div className="track-title">{song ? song.title : 'No track selected'}</div>
          <div className="track-artist">{song ? song.artist : ''}</div>
        </div>
      </div>
      <div className="player-center">
        <button className="play-btn" onClick={togglePlay}>{playing ? '❚❚' : '▶'}</button>
        <div className="progress" onClick={seek}>
          <div className="progress-bar" style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }} />
        </div>
        <div className="time">{formatTime(progress)} / {formatTime(duration)}</div>
      </div>
      <div className="player-right">
        <input className="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} />
      </div>
    </div>
  );
}
