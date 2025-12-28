const express = require('express');
const multer = require('multer');
const Song = require('../models/Song');

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

// Upload
router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, artist } = req.body;
  const song = new Song({ title, artist, filename: req.file.filename });
  await song.save();
  res.status(201).json(song);
});

// Get all
router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

// Search
router.get('/search', async (req, res) => {
  const { q } = req.query;
  const songs = await Song.find({ $or: [{ title: new RegExp(q, 'i') }, { artist: new RegExp(q, 'i') }] });
  res.json(songs);
});

module.exports = router;