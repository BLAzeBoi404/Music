import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Player from './Player';
import '../index.css';

function Home() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/music')
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="home">
      <aside className="sidebar">
        <h2>Music</h2>
      </aside>
      <main className="library">
        <h1>Music Library</h1>
        <ul className="song-list">
          {songs.map(song => (
            <li key={song._id} className="song-item" onClick={() => playSong(song)}>
              <div className="song-thumb" />
              <div className="song-meta">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Player song={currentSong} />
    </div>
  );
}

export default Home;