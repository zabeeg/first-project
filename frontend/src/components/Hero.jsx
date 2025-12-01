import './Hero.css';

function Hero({ title, subtitle, children, variant = 'default' }) {
  return (
    <section className={`hero hero-${variant}`}>
      <div className="hero-bg">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-decorations">
            <span className="hero-flower">✿</span>
            <span className="hero-line"></span>
            <span className="hero-heart">♥</span>
            <span className="hero-line"></span>
            <span className="hero-flower">✿</span>
          </div>
          
          
          <h1 className="hero-title animate-fade-in">{title}</h1>
          
          {subtitle && (
            <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {children}
            </div>
          )}
          
          <div className="hero-sparkles">
            <span style={{ '--delay': '0s' }}>·</span>
            <span style={{ '--delay': '0.3s' }}>˚</span>
            <span style={{ '--delay': '0.6s' }}>✧</span>
            <span style={{ '--delay': '0.9s' }}>·</span>
            <span style={{ '--delay': '1.2s' }}>˚</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

