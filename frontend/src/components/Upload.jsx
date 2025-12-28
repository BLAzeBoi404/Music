import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('artist', artist);
    axios.post('http://localhost:5000/api/music/upload', formData)
      .then(res => alert('Uploaded'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Upload MP3</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default Upload;