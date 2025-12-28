import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    axios.get(`http://localhost:5000/api/music/search?q=${query}`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Search Music</h1>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={search}>Search</button>
      <ul>
        {results.map(song => (
          <li key={song._id}>{song.title} by {song.artist}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;