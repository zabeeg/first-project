const express = require('express');
const db = require('../db');

const router = express.Router();

// Get random daily affirmation
router.get('/daily', async (req, res) => {
  try {
    const affirmations = await db('affirmations').select('*');
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const affirmation = affirmations[randomIndex] || {
      text: "You are beautiful, strong, and capable of achieving anything! 💖",
      category: "motivation"
    };
    res.json(affirmation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch affirmation 💔' });
  }
});

// Get all affirmations by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = db('affirmations').select('*');
    
    if (category) {
      query = query.where('category', category);
    }
    
    const affirmations = await query;
    res.json(affirmations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch affirmations 💔' });
  }
});

// Get affirmation categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db('affirmations')
      .distinct('category')
      .select('category');
    res.json(categories.map(c => c.category));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch categories 💔' });
  }
});

module.exports = router;





















