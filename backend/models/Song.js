const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  filename: String,
  source: { type: String, enum: ['local', 'spotify', 'youtube'], default: 'local' },
  url: String, // for external sources
});

module.exports = mongoose.model('Song', songSchema);