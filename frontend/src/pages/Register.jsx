import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import useStore from '../store';
import './Auth.css';

function Register() {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [step, setStep] = useState(1); // 1: form, 2: verify email
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Check if form is complete
  const isFormComplete = formData.username.trim() !== '' && 
                         formData.email.trim() !== '' && 
                         formData.password.length >= 6 && 
                         formData.confirmPassword.trim() !== '' &&
                         formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if username is banned
    const bannedUsers = JSON.parse(localStorage.getItem('bannedUsers')) || [];
    
    if (bannedUsers.includes(formData.username)) {
      setError({ text: "This username has been banned from BetterMe. Please choose a different username.", type: "heart" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError({ text: "Passwords don't match!", type: "heart" });
      return;
    }

    if (formData.password.length < 6) {
      setError({ text: "Password must be at least 6 characters!", type: "key" });
      return;
    }

    // Generate verification code and move to step 2
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setStep(2);
    
    // In demo mode, show the code in an alert
    alert(`Demo Mode: Your verification code is ${code}\n\nIn a real app, this would be sent to ${formData.email}`);
  };

  const handleVerify = () => {
    if (verificationCode === generatedCode) {
    setLoading(true);

      // Check if username is banned
      const bannedUsers = JSON.parse(localStorage.getItem('bannedUsers')) || [];
      
      if (bannedUsers.includes(formData.username)) {
        setLoading(false);
        setError({ text: "This username has been banned from BetterMe. Please choose a different username.", type: "heart" });
        return;
      }
      
      // Also check if email prefix matches a banned username
      const emailUsername = formData.email.split('@')[0];
      if (bannedUsers.includes(emailUsername)) {
        setLoading(false);
        setError({ text: "This account has been banned from BetterMe due to community guideline violations.", type: "heart" });
        return;
      }
      
      // Demo mode: register directly without backend
      const demoUser = { 
        id: Date.now(), 
        username: formData.username,
        email: formData.email,
        avatarType: 'initial',
        avatarColor: '#ff69b4',
        avatarIcon: '♡'
      };
      
      // Save to registered users list for persistence
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {};
      registeredUsers[formData.email.toLowerCase()] = demoUser;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      setUser(demoUser, 'demo-token');
      setLoading(false);
      navigate('/');
    } else {
      setError({ text: "Incorrect verification code. Please try again.", type: "key" });
    }
  };

  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setVerificationCode('');
    setError('');
    alert(`Demo Mode: Your new verification code is ${code}\n\nIn a real app, this would be sent to ${formData.email}`);
  };

  return (
    <div className="auth-page page">
      <div className="auth-container">
        <div className="auth-card">
          {step === 1 ? (
            <>
          <div className="auth-header">
            <span className="auth-icon gold-star">★</span>
            <h1>join betterMe</h1>
            <p>start your journey to confidence & self-love</p>
          </div>

          {error && (
            <div className="auth-error">
                  {error.type === "heart" ? (
                    <svg className="error-icon broken-heart" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      <path d="M12 5L8 12h3l-2 7 6-8h-3.5L12 5z" fill="white" opacity="0.9"/>
                    </svg>
                  ) : (
                    <svg className="error-icon key-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  )}
                  {error.text}
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

                <button type="submit" className={`btn btn-primary auth-btn ${isFormComplete ? 'ready' : ''}`} disabled={loading}>
                  {loading ? 'creating account...' : (
                    <>
                      continue{' '}
                      <svg className="btn-flower-icon" viewBox="0 0 24 24" fill="#ff69b4" width="16" height="16">
                        <circle cx="12" cy="12" r="3" fill="#ffb6c1"/>
                        <ellipse cx="12" cy="5" rx="3" ry="4" fill="#ff69b4"/>
                        <ellipse cx="12" cy="19" rx="3" ry="4" fill="#ff69b4"/>
                        <ellipse cx="5" cy="12" rx="4" ry="3" fill="#ff69b4"/>
                        <ellipse cx="19" cy="12" rx="4" ry="3" fill="#ff69b4"/>
                        <ellipse cx="7" cy="7" rx="3" ry="3.5" transform="rotate(-45 7 7)" fill="#ff85a2"/>
                        <ellipse cx="17" cy="7" rx="3" ry="3.5" transform="rotate(45 17 7)" fill="#ff85a2"/>
                        <ellipse cx="7" cy="17" rx="3" ry="3.5" transform="rotate(45 7 17)" fill="#ff85a2"/>
                        <ellipse cx="17" cy="17" rx="3" ry="3.5" transform="rotate(-45 17 17)" fill="#ff85a2"/>
                      </svg>
                    </>
                  )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              already have an account?{' '}
                  <Link to="/login" className="sign-in-link">sign in <svg className="star-icon" viewBox="0 0 24 24" fill="#ff69b4" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></Link>
            </p>
            <Link to="/welcome" className="back-to-welcome">← back to welcome</Link>
          </div>
            </>
          ) : (
            <>
              <div className="auth-header">
                <span className="auth-icon">✉</span>
                <h1>verify your email</h1>
                <p>we sent a 6-digit code to</p>
                <p className="email-highlight">{formData.email}</p>
              </div>

              {error && (
                <div className="auth-error">
                  <svg className="error-icon key-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                  {error.text}
                </div>
              )}

              <div className="verification-section">
                <div className="code-input-container">
                  <input
                    type="text"
                    maxLength="6"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    className="verification-code-input"
                  />
                </div>

                <button 
                  className={`btn btn-primary auth-btn ${verificationCode.length === 6 ? 'ready' : ''}`}
                  onClick={handleVerify}
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? 'verifying...' : 'verify & create account'}
                </button>

                <div className="resend-section">
                  <p>didn't receive the code?</p>
                  <button className="resend-btn" onClick={handleResendCode}>
                    resend code
                  </button>
                </div>

                <button className="back-btn" onClick={() => { setStep(1); setError(''); }}>
                  ← back to form
                </button>
              </div>
            </>
          )}

          <div className="auth-decoration">
            <svg className="deco-icon heart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg className="deco-icon bow-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              <path d="M5.5 7C3.57 7 2 8.57 2 10.5c0 1.38.79 2.57 1.94 3.15-.12.36-.19.74-.19 1.15 0 1.93 1.57 3.5 3.5 3.5.41 0 .79-.07 1.15-.19C9.43 19.21 10.62 20 12 20s2.57-.79 3.15-1.94c.36.12.74.19 1.15.19 1.93 0 3.5-1.57 3.5-3.5 0-.41-.07-.79-.19-1.15C20.71 13.07 21.5 11.88 21.5 10.5c0-1.93-1.57-3.5-3.5-3.5-.41 0-.79.07-1.15.19C15.57 5.79 14.38 5 13 5h-2c-1.38 0-2.57.79-3.15 1.94C7.29 6.57 6.41 6.5 6 6.5c-.17 0-.34.02-.5.05V7zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
            <svg className="deco-icon tulip-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.58.82 2.97 2.05 3.77L9 11.5c-.28.46-.5 1-.5 1.5v1c0 .55.45 1 1 1h1v6c0 .55.45 1 1 1s1-.45 1-1v-6h1c.55 0 1-.45 1-1v-1c0-.5-.22-1.04-.5-1.5l-.55-1.23C14.68 9.47 15.5 8.08 15.5 6.5 15.5 4 13.5 2 12 2z"/>
              <path d="M7.5 6.5c0-1.25.5-2.38 1.31-3.21C7.58 3.1 6.5 3 5.5 3 3.57 3 2 4.57 2 6.5c0 1.5.94 2.78 2.26 3.29.17-.31.37-.6.6-.87-.55-.64-.86-1.5-.86-2.42 0-1.38.79-2.57 1.94-3.15.17.36.38.69.63.99.26-.56.65-1.06 1.12-1.45-.74.8-1.19 1.87-1.19 3.06z" opacity="0.6"/>
              <path d="M16.5 6.5c0-1.19-.45-2.26-1.19-3.06.47.39.86.89 1.12 1.45.25-.3.46-.63.63-.99C18.21 3.93 19 5.12 19 6.5c0 .92-.31 1.78-.86 2.42.23.27.43.56.6.87C20.06 9.28 21 8 21 6.5 21 4.57 19.43 3 17.5 3c-1 0-2.08.1-3.31.29.81.83 1.31 1.96 1.31 3.21z" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
