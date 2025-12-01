import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import api from '../api';
import './Workouts.css';

// Default data for when API isn't connected - using colored symbols not emojis
const defaultCategories = [
  { id: 1, name: 'Pilates', description: 'Low-impact exercises for flexibility and core strength', icon: '✿', color: '#ff85a2' },
  { id: 2, name: 'Yoga', description: 'Mind-body practice for flexibility and relaxation', icon: '❀', color: '#9b7bb8' },
  { id: 3, name: 'Dance', description: 'Fun cardio workouts through dance', icon: '♪', color: '#ff69b4' },
  { id: 4, name: 'Strength', description: 'Build lean muscle and tone your body', icon: '★', color: '#e87aa4' },
  { id: 5, name: 'Cardio', description: 'Get your heart pumping with energizing workouts', icon: '♡', color: '#ff6b8a' },
  { id: 6, name: 'Stretching', description: 'Improve flexibility and prevent injury', icon: '✧', color: '#ffb6c1' }
];

const defaultWorkouts = [
  { id: 1, category_id: 1, title: 'Morning Glow Pilates', description: 'Start your day with this energizing 20-minute pilates routine', difficulty: 'beginner', duration_minutes: 20, calories_burned: 150 },
  { id: 2, category_id: 1, title: 'Slim Waist Sculpt', description: 'Target your core and waist for that hourglass figure', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 200 },
  { id: 3, category_id: 2, title: 'Sunrise Flow', description: 'A gentle yoga flow to wake up your body', difficulty: 'beginner', duration_minutes: 15, calories_burned: 80 },
  { id: 4, category_id: 3, title: 'Dance Cardio Party', description: 'Fun dance moves to your favorite songs', difficulty: 'beginner', duration_minutes: 25, calories_burned: 250 },
  { id: 5, category_id: 4, title: 'Booty Sculpt', description: 'Build a peachy booty with these targeted exercises', difficulty: 'intermediate', duration_minutes: 20, calories_burned: 180 },
  { id: 6, category_id: 5, title: 'Hot Girl Walk Treadmill', description: 'Indoor walking workout for when you cant go outside', difficulty: 'beginner', duration_minutes: 30, calories_burned: 200 }
];

function Workouts() {
  const [categories, setCategories] = useState(defaultCategories);
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, workoutsRes] = await Promise.all([
        api.get('/workouts/categories'),
        api.get('/workouts')
      ]);
      setCategories(categoriesRes.data.length > 0 ? categoriesRes.data : defaultCategories);
      setWorkouts(workoutsRes.data.length > 0 ? workoutsRes.data : defaultWorkouts);
    } catch (error) {
      console.log('Using default data');
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = selectedCategory
    ? workouts.filter(w => w.category_id === selectedCategory)
    : workouts;

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: '🌱 beginner',
      intermediate: '🌸 intermediate',
      advanced: '🔥 advanced'
    };
    return badges[difficulty] || difficulty;
  };

  return (
    <div className="workouts-page page">
      <Hero
        variant="small"
        title={<><span className="white-text">feel</span> <span className="neon-pink">STRONG</span> <span className="white-text">&</span> <span className="white-text">confident</span></>}
        subtitle="pilates, yoga, dance & more workouts designed to make you feel amazing"
      />

      <div className="container">
        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            all workouts
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon" style={{ color: category.color }}>{category.icon}</span> {category.name}
            </button>
          ))}
        </div>

        {/* Workouts Grid */}
        <div className="workouts-grid stagger-children">
          {filteredWorkouts.map((workout) => (
            <Card
              key={workout.id}
              title={workout.title}
              description={workout.description}
              badge={getDifficultyBadge(workout.difficulty)}
              className="workout-card"
            >
              <div className="workout-meta">
                <span className="workout-stat">
                  <span className="stat-icon timer-icon"></span>
                  {workout.duration_minutes} min
                </span>
                <span className="workout-stat">
                  <span className="stat-icon fire-icon"></span>
                  {workout.calories_burned} cal
                </span>
              </div>
              <button className="btn btn-primary btn-start">
                start workout <span className="btn-star-icon"></span>
              </button>
            </Card>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🧘‍♀️</span>
            <p>no workouts found in this category yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;

