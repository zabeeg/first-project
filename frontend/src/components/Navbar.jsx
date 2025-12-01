import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'home', icon: '⌂' },
    { path: '/workouts', label: 'workouts', icon: '❀' },
    { path: '/outfits', label: 'outfit', icon: '✧' },
    { path: '/skincare', label: 'skincare', icon: '✿' },
    { path: '/affirmations', label: 'affirmations', icon: '♡' },
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
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label-white">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">hi, {user.username} ♡</span>
              <button onClick={logout} className="btn btn-secondary">
                logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              sign in ✧
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

