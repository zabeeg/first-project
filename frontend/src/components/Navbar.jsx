import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'home', icon: '⌂' },
    { path: '/workouts', label: 'workouts', icon: '❀' },
    { path: '/outfits', label: 'outfit', icon: '✧' },
    { path: '/skincare', label: 'skincare', icon: '✿' },
    { path: '/affirmations', label: 'affirmations', icon: '♡' },
    { path: '/healthy-diet', label: 'healthy diet', icon: 'apple', iconClass: 'css-apple-icon' },
    { path: '/journal', label: 'journal', icon: '✎' },
    { path: '/progress', label: 'influences', icon: '★' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-bow"></span>
          <span className="logo-text">BetterMe</span>
        </Link>

        <button 
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.iconClass ? (
                  <span className={`nav-icon ${link.iconClass}`}></span>
                ) : (
                  <span className="nav-icon">{link.icon}</span>
                )}
                <span className="nav-label-white">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-auth">
          <Link to="/settings" className={`btn btn-primary settings-btn ${location.pathname === '/settings' ? 'active' : ''}`}>
            settings ✧
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

