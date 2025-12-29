const express = require('express');
const multer = require('multer');
const Playlist = require('../models/Playlist');

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

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

// Upload/replace playlist image
router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).send('Playlist not found');
    playlist.image = req.file.filename;
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});