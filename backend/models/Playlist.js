const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
});

module.exports = mongoose.model('Playlist', playlistSchema);