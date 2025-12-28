const express = require('express');
const Playlist = require('../models/Playlist');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  const { name } = req.body;
  const playlist = new Playlist({ name });
  await playlist.save();
  res.status(201).json(playlist);
});

// Get all
router.get('/', async (req, res) => {
  const playlists = await Playlist.find().populate('songs');
  res.json(playlists);
});

module.exports = router;