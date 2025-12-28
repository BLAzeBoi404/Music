import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/playlists')
      .then(res => setPlaylists(res.data))
      .catch(err => console.error(err));
    axios.get('http://localhost:5000/api/music')
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  const createPlaylist = () => {
    axios.post('http://localhost:5000/api/playlists', { name })
      .then(res => setPlaylists([...playlists, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Playlists</h1>
      <input type="text" placeholder="Playlist Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={createPlaylist}>Create Playlist</button>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist._id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;