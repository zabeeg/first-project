import { Link } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  return (
    <div className="welcome-page">
      {/* Floating decorations */}
      <div className="welcome-decorations">
        <span className="floating-heart" style={{ '--delay': '0s', '--x': '10%', '--y': '20%' }}>♡</span>
        <span className="floating-heart" style={{ '--delay': '1s', '--x': '85%', '--y': '15%' }}>♡</span>
        <span className="floating-heart" style={{ '--delay': '2s', '--x': '75%', '--y': '70%' }}>♡</span>
        <span className="floating-heart" style={{ '--delay': '0.5s', '--x': '15%', '--y': '75%' }}>♡</span>
        <span className="floating-star" style={{ '--delay': '0.3s', '--x': '20%', '--y': '40%' }}>✧</span>
        <span className="floating-star" style={{ '--delay': '1.5s', '--x': '80%', '--y': '45%' }}>✧</span>
        <span className="floating-star" style={{ '--delay': '2.5s', '--x': '50%', '--y': '85%' }}>✧</span>
        <span className="floating-flower" style={{ '--delay': '0.8s', '--x': '5%', '--y': '50%' }}>✿</span>
        <span className="floating-flower" style={{ '--delay': '1.8s', '--x': '92%', '--y': '35%' }}>✿</span>
        <span className="floating-bow" style={{ '--delay': '1.2s', '--x': '25%', '--y': '10%' }}></span>
        <span className="floating-bow" style={{ '--delay': '2.2s', '--x': '70%', '--y': '88%' }}></span>
      </div>

      {/* Main content */}
      <div className="welcome-container">
        <div className="welcome-card">
          {/* Logo */}
          <div className="welcome-logo">
            <span className="welcome-bow"></span>
            <h1 className="welcome-title">BetterMe</h1>
          </div>

          {/* Tagline */}
          <p className="welcome-tagline">
            your journey to becoming your <span className="highlight">best self</span> starts here
          </p>

          {/* Features preview */}
          <div className="welcome-features">
            <span className="feature-item">✿ workouts</span>
            <span className="feature-dot">·</span>
            <span className="feature-item">✧ style</span>
            <span className="feature-dot">·</span>
            <span className="feature-item">♡ skincare</span>
            <span className="feature-dot">·</span>
            <span className="feature-item">❀ affirmations</span>
          </div>

          {/* Decorative line */}
          <div className="welcome-divider">
            <span className="divider-line"></span>
            <span className="divider-star">★</span>
            <span className="divider-line"></span>
          </div>

          {/* Auth buttons */}
          <div className="welcome-actions">
            <Link to="/login" className="btn-welcome btn-signin">
              sign in
              <span className="btn-sparkle">✧</span>
            </Link>
            <Link to="/register" className="btn-welcome btn-register">
              create account
              <span className="btn-heart">♡</span>
            </Link>
          </div>

          {/* Bottom text */}
          <p className="welcome-footer">
            join thousands of girls on their confidence journey
          </p>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="welcome-gradient-bottom"></div>
    </div>
  );
}

export default Welcome;



















