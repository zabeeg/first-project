const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all workout categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db('workout_categories').select('*');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch categories 💔' });
  }
});

// Get all workouts (optionally filtered by category)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = db('workouts').select('*');
    
    if (category) {
      query = query.where('category_id', category);
    }
    
    const workouts = await query;
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch workouts 💔' });
  }
});

// Get single workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await db('workouts').where('id', req.params.id).first();
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found 💫' });
    }
    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch workout 💔' });
  }
});

// Save favorite workout (authenticated)
router.post('/favorites', authenticateToken, async (req, res) => {
  try {
    const { workoutId } = req.body;
    await db('user_favorite_workouts').insert({
      user_id: req.user.id,
      workout_id: workoutId
    });
    res.json({ message: 'Workout saved to favorites! 💖' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save favorite 💔' });
  }
});

// Get user's favorite workouts
router.get('/favorites/me', authenticateToken, async (req, res) => {
  try {
    const favorites = await db('user_favorite_workouts')
      .join('workouts', 'user_favorite_workouts.workout_id', 'workouts.id')
      .where('user_favorite_workouts.user_id', req.user.id)
      .select('workouts.*');
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch favorites 💔' });
  }
});

module.exports = router;





















