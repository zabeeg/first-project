const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get outfit categories (e.g., casual, gym, date night)
router.get('/categories', async (req, res) => {
  try {
    const categories = await db('outfit_categories').select('*');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch categories 💔' });
  }
});

// Get all outfit inspirations
router.get('/', async (req, res) => {
  try {
    const { category, style } = req.query;
    let query = db('outfits').select('*');
    
    if (category) {
      query = query.where('category_id', category);
    }
    if (style) {
      query = query.where('style', style);
    }
    
    const outfits = await query;
    res.json(outfits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch outfits 💔' });
  }
});

// Get single outfit
router.get('/:id', async (req, res) => {
  try {
    const outfit = await db('outfits').where('id', req.params.id).first();
    if (!outfit) {
      return res.status(404).json({ error: 'Outfit not found 💫' });
    }
    res.json(outfit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch outfit 💔' });
  }
});

// Save favorite outfit
router.post('/favorites', authenticateToken, async (req, res) => {
  try {
    const { outfitId } = req.body;
    await db('user_favorite_outfits').insert({
      user_id: req.user.id,
      outfit_id: outfitId
    });
    res.json({ message: 'Outfit saved! So cute! 💖' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save favorite 💔' });
  }
});

// Get user's favorite outfits
router.get('/favorites/me', authenticateToken, async (req, res) => {
  try {
    const favorites = await db('user_favorite_outfits')
      .join('outfits', 'user_favorite_outfits.outfit_id', 'outfits.id')
      .where('user_favorite_outfits.user_id', req.user.id)
      .select('outfits.*');
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch favorites 💔' });
  }
});

module.exports = router;



