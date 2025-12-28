import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
    <div>
      <h1>Music Library</h1>
      <ul>
        {songs.map(song => (
          <li key={song._id} onClick={() => playSong(song)}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
      {currentSong && (
        <AudioPlayer
          autoPlay
          src={`http://localhost:5000/uploads/${currentSong.filename}`}
          onPlay={e => console.log("onPlay")}
        />
      )}
    </div>
  );
}

export default Home;