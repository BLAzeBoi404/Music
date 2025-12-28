import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Playlist from './components/Playlist';
import Upload from './components/Upload';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/upload">Upload</a></li>
            <li><a href="/playlist">Playlist</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;