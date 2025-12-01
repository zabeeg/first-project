import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import api from '../api';
import './Home.css';

function Home() {
  const [affirmation, setAffirmation] = useState(null);

  useEffect(() => {
    fetchAffirmation();
  }, []);

  const fetchAffirmation = async () => {
    try {
      const response = await api.get('/affirmations/daily');
      setAffirmation(response.data);
    } catch (error) {
      setAffirmation({
        text: "You are beautiful, strong, and capable of achieving anything you set your mind to! ☺",
        category: "motivation"
      });
    }
  };

  const sections = [
    {
      icon: '❀',
      title: 'Workouts',
      description: 'Pilates, yoga, dance & more to help you feel strong and confident',
      path: '/workouts',
      color: 'rose'
    },
    {
      icon: '✧',
      title: 'Outfit Inspo',
      description: 'Coquette, trendy, and cute outfit ideas for every occasion',
      path: '/outfits',
      color: 'blush'
    },
    {
      icon: '✿',
      title: 'Skincare',
      description: 'Glow up with personalized skincare routines for your skin type',
      path: '/skincare',
      color: 'champagne'
    },
    {
      icon: '♡',
      title: 'Affirmations',
      description: 'Daily reminders of how amazing and worthy you are',
      path: '/affirmations',
      color: 'pink'
    }
  ];

  return (
    <div className="home-page">
      <Hero 
        title={<><span className="white-text">become your</span> <span className="hot-pink-text">best self</span><div className="hero-star-container"><span className="hero-star">★</span></div></>}
        subtitle="workouts, style inspiration, skincare tips & daily affirmations to help you feel confident and beautiful"
      >
        <Link to="/workouts" className="btn btn-primary">
          start your journey ✿
        </Link>
        <Link to="/affirmations" className="btn btn-secondary">
          daily affirmation
        </Link>
      </Hero>

      {/* Daily Affirmation Card */}
      {affirmation && (
        <section className="affirmation-highlight">
          <div className="container">
            <div className="affirmation-card">
              <div className="affirmation-bow">✿</div>
              <p className="affirmation-text">{affirmation.text}</p>
              <span className="affirmation-category">{affirmation.category}</span>
            </div>
          </div>
        </section>
      )}

      {/* Sections Grid */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>explore betterMe</h2>
            <p>everything you need to feel confident, happy & beautiful</p>
          </div>

          <div className="bow-divider">✧</div>

          <div className="sections-grid stagger-children">
            {sections.map((section) => (
              <Link to={section.path} key={section.path} className="section-link">
                <Card
                  icon={section.icon}
                  title={section.title}
                  description={section.description}
                  className={`section-card section-card-${section.color}`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">✦</span>
              <h3>feel strong</h3>
              <p>workouts designed to make you feel powerful</p>
            </div>
            <div className="feature">
              <span className="feature-icon">✧</span>
              <h3>glow up</h3>
              <p>skincare routines for radiant, healthy skin</p>
            </div>
            <div className="feature">
              <span className="feature-icon">♡</span>
              <h3>love yourself</h3>
              <p>affirmations to boost your confidence daily</p>
            </div>
            <div className="feature">
              <span className="feature-icon">❀</span>
              <h3>slay style</h3>
              <p>outfit ideas that match your aesthetic</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>ready to become your best self? ♡</h2>
            <p>join thousands of girls on their journey to confidence</p>
            <Link to="/register" className="btn btn-primary">
              create free account ✧
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

