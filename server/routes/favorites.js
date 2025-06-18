// favorites.js

const express = require('express');
const router = express.Router();
const { 
  addFavorite, 
  getFavorites,
  removeFavorite
} = require('../controllers/favoritesController');

router.post('/', addFavorite);
router.get('/', getFavorites);
router.delete('/', removeFavorite); // NEW: Add removal endpoint

module.exports = router;