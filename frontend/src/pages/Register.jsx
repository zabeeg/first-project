import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import useStore from '../store';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match! 💔");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters! 🔒");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setUser(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong! Please try again 💔');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-icon gold-star">★</span>
            <h1>join betterMe</h1>
            <p>start your journey to confidence & self-love</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>💔</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="your cute username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'creating account...' : 'create account 🌸'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              already have an account?{' '}
              <Link to="/login">sign in 💫</Link>
            </p>
          </div>

          <div className="auth-decoration">
            <span>💖</span>
            <span>🎀</span>
            <span>🌷</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;


