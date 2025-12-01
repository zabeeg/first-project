const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get skin types
router.get('/skin-types', async (req, res) => {
  try {
    const skinTypes = await db('skin_types').select('*');
    res.json(skinTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch skin types 💔' });
  }
});

// Get skincare categories (cleanser, moisturizer, serum, etc.)
router.get('/categories', async (req, res) => {
  try {
    const categories = await db('skincare_categories').select('*');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch categories 💔' });
  }
});

// Get all skincare products/tips
router.get('/', async (req, res) => {
  try {
    const { skinType, category } = req.query;
    let query = db('skincare_items').select('*');
    
    if (skinType) {
      query = query.where('skin_type_id', skinType);
    }
    if (category) {
      query = query.where('category_id', category);
    }
    
    const items = await query;
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch skincare items 💔' });
  }
});

// Get single skincare item
router.get('/:id', async (req, res) => {
  try {
    const item = await db('skincare_items').where('id', req.params.id).first();
    if (!item) {
      return res.status(404).json({ error: 'Item not found 💫' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch item 💔' });
  }
});

// Save skincare routine
router.post('/routines', authenticateToken, async (req, res) => {
  try {
    const { name, items, timeOfDay } = req.body;
    const [routine] = await db('skincare_routines')
      .insert({
        user_id: req.user.id,
        name,
        time_of_day: timeOfDay
      })
      .returning('*');

    // Add items to routine
    if (items && items.length > 0) {
      const routineItems = items.map((itemId, index) => ({
        routine_id: routine.id,
        skincare_item_id: itemId,
        order: index + 1
      }));
      await db('routine_items').insert(routineItems);
    }

    res.json({ message: 'Skincare routine saved! Glow up time! ✨', routine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save routine 💔' });
  }
});

// Get user's routines
router.get('/routines/me', authenticateToken, async (req, res) => {
  try {
    const routines = await db('skincare_routines')
      .where('user_id', req.user.id)
      .select('*');
    res.json(routines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch routines 💔' });
  }
});

module.exports = router;



