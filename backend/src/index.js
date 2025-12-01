require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const workoutsRoutes = require('./routes/workouts');
const outfitsRoutes = require('./routes/outfits');
const skincareRoutes = require('./routes/skincare');
const affirmationsRoutes = require('./routes/affirmations');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/outfits', outfitsRoutes);
app.use('/api/skincare', skincareRoutes);
app.use('/api/affirmations', affirmationsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '💖 betterMe API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong! 💔' });
});

app.listen(PORT, () => {
  console.log(`✨ betterMe server running on port ${PORT}`);
});



