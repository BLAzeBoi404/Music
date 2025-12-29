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
      <ul className="playlists">
        {playlists.map(playlist => (
          <li key={playlist._id} className="playlist-item">
            <div className="playlist-cover">
              {playlist.image ? <img src={`http://localhost:5000/uploads/${playlist.image}`} alt="cover" /> : <div className="placeholder-cover" />}
            </div>
            <div className="playlist-meta">
              <div className="playlist-name">{playlist.name}</div>
              <input type="file" onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                const fd = new FormData();
                fd.append('image', file);
                axios.post(`http://localhost:5000/api/playlists/${playlist._id}/image`, fd)
                  .then(() => {
                    // refresh playlists
                    return axios.get('http://localhost:5000/api/playlists');
                  })
                  .then(res => setPlaylists(res.data))
                  .catch(err => console.error(err));
              }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;