import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import api from '../api';
import './Affirmations.css';

// Default affirmations
const defaultAffirmations = [
  { id: 1, text: 'You are beautiful inside and out. Your worth is not determined by your appearance. 💖', category: 'beauty' },
  { id: 2, text: 'You are stronger than you think. Every challenge makes you more powerful. 💪', category: 'strength' },
  { id: 3, text: 'You deserve love, happiness, and all the good things coming your way. ✨', category: 'self-love' },
  { id: 4, text: 'Your body is incredible. Thank it for carrying you through each day. 🌸', category: 'body-positivity' },
  { id: 5, text: 'You are capable of achieving anything you set your mind to. Dream big! 🌟', category: 'motivation' },
  { id: 6, text: "It's okay to rest. Taking care of yourself is productive. 💤", category: 'self-care' },
  { id: 7, text: 'You are worthy of respect and kindness, especially from yourself. 💕', category: 'self-love' },
  { id: 8, text: 'Your uniqueness is your superpower. Embrace what makes you different! 🦋', category: 'confidence' },
  { id: 9, text: 'Today is a fresh start. You can do hard things. 🌅', category: 'motivation' },
  { id: 10, text: 'You radiate confidence and grace. Others are inspired by your energy. ✨', category: 'confidence' },
  { id: 11, text: 'Progress, not perfection. Every small step counts!', category: 'motivation' },
  { id: 12, text: 'You are allowed to take up space and be seen. Shine bright! 💫', category: 'confidence' }
];

function Affirmations() {
  const [affirmations, setAffirmations] = useState(defaultAffirmations);
  const [dailyAffirmation, setDailyAffirmation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [affirmationsRes, dailyRes] = await Promise.all([
        api.get('/affirmations'),
        api.get('/affirmations/daily')
      ]);
      setAffirmations(affirmationsRes.data.length > 0 ? affirmationsRes.data : defaultAffirmations);
      setDailyAffirmation(dailyRes.data);
    } catch (error) {
      // Set a random default daily affirmation
      const randomIndex = Math.floor(Math.random() * defaultAffirmations.length);
      setDailyAffirmation(defaultAffirmations[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(affirmations.map(a => a.category))];

  const filteredAffirmations = selectedCategory
    ? affirmations.filter(a => a.category === selectedCategory)
    : affirmations;

  const getCategoryIcon = (category) => {
    const icons = {
      'beauty': <span className="css-lipstick"></span>,
      'strength': <span className="css-strength"></span>,
      'self-love': <span className="css-love-hearts"></span>,
      'body-positivity': <span className="css-cherry-blossom"></span>,
      'motivation': <span className="css-star-gold"></span>,
      'self-care': <span className="css-bath"></span>,
      'confidence': <span className="css-sparkles"></span>
    };
    return icons[category] || <span className="css-heart-pink"></span>;
  };

  const getNewDaily = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setDailyAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className="affirmations-page page">
      <Hero
        variant="small"
        title={<><span className="white-text">daily</span> <span className="pink-text">affirmations</span> <span className="css-pink-heart"></span></>}
        subtitle="reminders of how amazing, beautiful, and worthy you truly are"
      />

      <div className="container">
        {/* Daily Affirmation Feature */}
        {dailyAffirmation && (
          <div className="daily-section">
            <div className="daily-card">
              <div className="daily-ribbon">today's affirmation</div>
              <div className="daily-bow">
                <span className="css-coquette-bow">
                  <span className="ribbon-tail-left"></span>
                  <span className="ribbon-tail-right"></span>
                  <span className="bow-knot"></span>
                </span>
              </div>
              <p className="daily-text">{dailyAffirmation.text}</p>
              <span className="daily-category">
                {getCategoryIcon(dailyAffirmation.category)} {dailyAffirmation.category}
              </span>
              <button className="btn btn-secondary refresh-btn" onClick={getNewDaily}>
                get new affirmation <span className="css-star-small"></span>
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="affirmation-filter">
          <span className="filter-title">browse by feeling:</span>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              all 💖
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>
        </div>

        {/* Affirmations Grid */}
        <div className="affirmations-grid stagger-children">
          {filteredAffirmations.map((affirmation, index) => (
            <div 
              key={affirmation.id} 
              className={`affirmation-card affirmation-card-${index % 4}`}
            >
              <p className="affirmation-text">{affirmation.text}</p>
              <span className="affirmation-category">
                {getCategoryIcon(affirmation.category)} {affirmation.category}
              </span>
            </div>
          ))}
        </div>

        {/* Self-love reminder */}
        <div className="self-love-section">
          <div className="self-love-content">
            <span className="self-love-icon"><span className="css-tulip-icon"></span></span>
            <h3>remember, beautiful</h3>
            <p>
              You are worthy of love, especially from yourself. Take a moment today 
              to appreciate how far you've come and celebrate the amazing person you are.
            </p>
            <div className="hearts">
              <span className="css-heart-1"></span>
              <span className="css-heart-2"></span>
              <span className="css-heart-3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Affirmations;



