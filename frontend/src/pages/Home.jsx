import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import api from '../api';
import useStore from '../store';
import './Home.css';

function Home() {
  const { user } = useStore();
  const [affirmation, setAffirmation] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);
  const [zaraPhoto, setZaraPhoto] = useState(localStorage.getItem('zaraPhoto') || null);

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
    },
    {
      icon: 'apple',
      iconClass: 'css-apple-icon',
      title: 'Healthy Diet',
      description: 'Delicious and nutritious meal ideas to fuel your wellness journey',
      path: '/healthy-diet',
      color: 'rose'
    },
    {
      icon: '✎',
      title: 'Journal',
      description: 'Track your mood, gratitude, and daily reflections on your journey',
      path: '/journal',
      color: 'lavender'
    }
  ];

  return (
    <div className="home-page">
      {user && (
        <Link to="/settings" className="user-welcome">
          <span className="welcome-text">hi, {user.username} ♡</span>
        </Link>
      )}
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
                  iconClass={section.iconClass}
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

      {/* About the Creators Section */}
      <section className="creators-section">
        <div className="container">
          <div className="creators-header">
            <span className="creators-icon">✿</span>
            <h2>about the creators!</h2>
            <p>the girls behind betterMe</p>
          </div>
          
          <div className="creators-grid">
            <div className="creator-card zabelle-card">
              <Link to="/settings" className="creator-avatar-link" title="Click to edit your photo">
                <div 
                  className="creator-avatar"
                  style={
                    user?.avatarType === 'photo' && user?.avatarPhoto
                      ? { 
                          backgroundImage: `url(${user.avatarPhoto})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center' 
                        }
                      : user?.avatarColor
                      ? { background: `linear-gradient(135deg, ${user.avatarColor} 0%, ${user.avatarColor}dd 100%)` }
                      : {}
                  }
                >
                  {/* Show icon/initial if not photo type, OR if photo type but no photo data */}
                  {(user?.avatarType !== 'photo' || !user?.avatarPhoto) && (
                    <span style={user?.avatarFont ? { fontFamily: user.avatarFont } : {}}>
                      {user?.avatarType === 'icon' ? user?.avatarIcon : '♡'}
                    </span>
                  )}
                  <div className="avatar-edit-hint">✎</div>
                </div>
            </Link>
              <h3>Zabelle Gulesserian</h3>
              <p className="creator-role">founder & designer</p>
              <p className="creator-bio zabelle-bio">
                Welcome to BetterMe! I'm Zabelle, the founder of BetterMe. I started this as a fun project; and grew to working on it with my sister almost every day. I believe BetterMe can become a place of comfort for many girls, and I hope that becomes a reality! Sometimes we are all in need of a spa day or a little bit of extra self-care; and that's what BetterMe is here to do!
              </p>
              {showFullBio && (
                <>
                  <p className="creator-bio zabelle-bio">
                    It all started when one day, my dad had called me up from my room. He wanted to try to make a game with AI! At the time, when I was at school, we were learning about long division and I started to understand it right away. Every quiz, test, ditto — 100%! So he wanted me to make a game about long division practice. I wasn't really into it because it was a weekend, and I just wanted to chill and get my mind off of school! But I did it for my dad, because he loves AI and has a company himself, called "EyeSense.AI."
                  </p>
                  <p className="creator-bio zabelle-bio">
                    So, we made a game to help kids like me in long division! I have to say, the art and details wasn't very impressive but I got into coding right away. So, I decided one night, I wanted to make my own app. My family and I went to a restaurant. I asked my older sister, Zara what I should name it? I was already thinking of making this app a workout app situation. But that's when the name came to her head. "What about BetterMe?" my sister asked. And that's when I was fully into it!
                  </p>
                  <p className="creator-bio zabelle-bio">
                    I asked my dad to make me a platform where I could make BetterMe and within 10 minutes, this game came to life!! Except, there was lots and lots of editing to do. This surprisingly took about 5 days with lots and lots of coding, though. After I did everything I could, I asked my older sister for more ideas, and she made some of your favorite things in this app!
                  </p>
                  <p className="creator-bio zabelle-bio creator-signature">
                    Thank you for reading about me and my game's history.
                    <br />— Zabelle G
                  </p>
                </>
              )}
              <button 
                className="read-more-btn" 
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? '(read less)' : '(read more)'}
              </button>
            </div>
            
            <div className="creator-card">
              <div 
                className="creator-avatar"
                style={zaraPhoto ? { 
                  backgroundImage: `url(${zaraPhoto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {}}
              >
                {!zaraPhoto && <span>✧</span>}
              </div>
              <h3>Zara Gulesserian</h3>
              <p className="creator-role">co-founder & developer</p>
              <p className="creator-bio zara-bio">
                Hey besties! I'm Zara, the co-founder of BetterMe. Being a teenager myself, I understand the struggle of sorting out life sometimes; and that's what we're here to help you do! At BetterMe, I hope to create a community where girls can achieve their goals together, and where your glow-up dreams can become a reality. We hope to see you visiting us often; please feel free to explore our site and email us with any questions or concerns!
              </p>
            </div>
          </div>
          
          <div className="creators-message">
            <p>"we created betterMe because we believe every girl deserves to feel amazing. this app is our love letter to self-care and confidence!" ♡</p>
          </div>
        </div>
      </section>

      {/* Floating Shop Button */}
      <Link to="/shop" className="floating-shop-btn">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span className="shop-btn-tooltip">shop merch</span>
      </Link>

      {/* Floating Chat Button */}
      <Link to="/chat" className="floating-chat-btn">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span className="chat-btn-tooltip">chat with bestie</span>
      </Link>
    </div>
  );
}

export default Home;

