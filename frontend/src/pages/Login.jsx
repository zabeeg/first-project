import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import useStore from '../store';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
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
            <span className="auth-icon">🎀</span>
            <h1>welcome back, beautiful</h1>
            <p>sign in to continue your journey</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>💔</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
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

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? 'signing in...' : 'sign in 💫'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              don't have an account?{' '}
              <Link to="/register">create one ✨</Link>
            </p>
          </div>

          <div className="auth-decoration">
            <span>💖</span>
            <span>🌸</span>
            <span>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



