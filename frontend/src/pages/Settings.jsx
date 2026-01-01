import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import './Settings.css';

// Music track names for display
const musicTrackNames = {
  home: 'Lofi Chill Beats',
  workouts: 'Yoga & Meditation',
  outfits: 'Classical Elegance',
  skincare: 'ASMR Lofi',
  journal: 'Focus & Write',
  progress: 'Lofi Chill Beats',
};

function Settings() {
  const navigate = useNavigate();
  const { user, logout, updateUser, musicEnabled, musicVolume, setMusicEnabled, setMusicVolume } = useStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [passwordStep, setPasswordStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [saved, setSaved] = useState(false);

  // Avatar customization state
  const [avatarSettings, setAvatarSettings] = useState({
    type: user?.avatarType || 'initial', // 'initial', 'icon', 'photo'
    color: user?.avatarColor || '#ff69b4',
    font: user?.avatarFont || 'Chewy',
    icon: user?.avatarIcon || '♡',
    photo: user?.avatarPhoto || null,
  });

  // Crop state
  const [rawImage, setRawImage] = useState(null);
  const [cropSettings, setCropSettings] = useState({
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
  });
  const [showPhotoHint, setShowPhotoHint] = useState(false);

  // Zara's photo state
  const [zaraPhoto, setZaraPhoto] = useState(
    localStorage.getItem('zaraPhoto') || null
  );
  const zaraFileInputRef = useRef(null);

  const colorOptions = [
    { name: 'Pink', value: '#ff69b4' },
    { name: 'Rose', value: '#e891a8' },
    { name: 'Lavender', value: '#b8a9c9' },
    { name: 'Mint', value: '#98d8c8' },
    { name: 'Peach', value: '#ffb4a2' },
    { name: 'Sky', value: '#89cff0' },
    { name: 'Coral', value: '#ff7f7f' },
    { name: 'Gold', value: '#ffd700' },
  ];

  const fontOptions = [
    { name: 'Chewy', value: 'Chewy, cursive' },
    { name: 'Classic', value: 'Georgia, serif' },
    { name: 'Modern', value: 'Arial, sans-serif' },
    { name: 'Fancy', value: 'Brush Script MT, cursive' },
    { name: 'Bold', value: 'Impact, sans-serif' },
  ];

  const iconOptions = ['♡', '★', '✿', '✧', '♪', '☾', '☀', '♢', '❀', '✦', '◇', '❤'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSaved(false);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      username: formData.username,
      email: formData.email
    };
    updateUser(updatedUser);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/welcome');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Avatar customization functions
  const handleAvatarClick = () => {
    setShowAvatarModal(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result);
        setCropSettings({ zoom: 1, offsetX: 0, offsetY: 0 });
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = useCallback(() => {
    if (!rawImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const size = 200; // Output size
      canvas.width = size;
      canvas.height = size;
      
      // Calculate crop area
      const { zoom, offsetX, offsetY } = cropSettings;
      const minDim = Math.min(img.width, img.height);
      const cropSize = minDim / zoom;
      const centerX = img.width / 2 + (offsetX * img.width / 200);
      const centerY = img.height / 2 + (offsetY * img.height / 200);
      
      const sx = Math.max(0, Math.min(img.width - cropSize, centerX - cropSize / 2));
      const sy = Math.max(0, Math.min(img.height - cropSize, centerY - cropSize / 2));
      
      // Draw circular crop
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, size, size);
      
      const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
      setAvatarSettings({
        ...avatarSettings,
        type: 'photo',
        photo: croppedImage
      });
      setShowCropModal(false);
      setRawImage(null);
    };
    
    img.src = rawImage;
  }, [rawImage, cropSettings, avatarSettings]);

  const handleCancelCrop = () => {
    setShowCropModal(false);
    setRawImage(null);
    setCropSettings({ zoom: 1, offsetX: 0, offsetY: 0 });
  };

  // Zara photo upload handler
  const handleZaraPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setZaraPhoto(reader.result);
        localStorage.setItem('zaraPhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveZaraPhoto = () => {
    setZaraPhoto(null);
    localStorage.removeItem('zaraPhoto');
  };

  const handleSaveAvatar = () => {
    const updatedUser = {
      ...user,
      avatarType: avatarSettings.type,
      avatarColor: avatarSettings.color,
      avatarFont: avatarSettings.font,
      avatarIcon: avatarSettings.icon,
      avatarPhoto: avatarSettings.photo,
    };
    updateUser(updatedUser);
    setShowAvatarModal(false);
  };

  const renderAvatar = () => {
    const settings = avatarSettings;
    
    if (settings.type === 'photo' && settings.photo) {
      return (
        <div 
          className="profile-avatar clickable" 
          onClick={handleAvatarClick}
          style={{ backgroundImage: `url(${settings.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="avatar-edit-hint">✎</div>
        </div>
      );
    }
    
    if (settings.type === 'icon') {
      return (
        <div 
          className="profile-avatar clickable" 
          onClick={handleAvatarClick}
          style={{ background: `linear-gradient(135deg, ${settings.color} 0%, ${adjustColor(settings.color, -20)} 100%)` }}
        >
          <span style={{ fontFamily: settings.font }}>{settings.icon}</span>
          <div className="avatar-edit-hint">✎</div>
        </div>
      );
    }
    
    // Default: initial
    return (
      <div 
        className="profile-avatar clickable" 
        onClick={handleAvatarClick}
        style={{ background: `linear-gradient(135deg, ${settings.color} 0%, ${adjustColor(settings.color, -20)} 100%)` }}
      >
        <span style={{ fontFamily: settings.font }}>{user?.username?.[0]?.toUpperCase() || '♡'}</span>
        <div className="avatar-edit-hint">✎</div>
      </div>
    );
  };

  // Helper function to darken/lighten colors
  const adjustColor = (color, amount) => {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  };

  // Password Reset Functions
  const handleResetPasswordClick = () => {
    setShowPasswordModal(true);
    setPasswordStep(1);
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setPasswordSuccess(false);
  };

  const handleSendVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setPasswordStep(2);
    alert(`Demo Mode: Your verification code is ${code}\n\nIn a real app, this would be sent to ${user?.email}`);
  };

  const handleVerifyCode = () => {
    if (verificationCode === generatedCode) {
      setPasswordStep(3);
      setPasswordError('');
    } else {
      setPasswordError('incorrect verification code. please try again.');
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      setPasswordError('password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('passwords do not match');
      return;
    }
    
    setPasswordSuccess(true);
    setPasswordError('');
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess(false);
    }, 2000);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordStep(1);
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  return (
    <div className="settings-page page">
      <div className="settings-header">
        <h1>settings</h1>
        <p>customize your BetterMe experience</p>
      </div>

      <div className="settings-container">
        {/* Profile Section */}
        <section className="settings-section">
          <h2>profile</h2>
          
          <div className="settings-card">
            <div className="profile-avatar-section">
              {renderAvatar()}
              <p className="avatar-hint">click to customize your avatar</p>
            </div>

            <div className="settings-form">
              <div className="form-group">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="enter your username"
                />
              </div>

              <div className="form-group">
                <label>email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="enter your email"
                />
              </div>

              <button className="btn btn-primary save-btn" onClick={handleSave}>
                {saved ? 'saved!' : 'save changes'}
              </button>
            </div>
          </div>
        </section>

        {/* Music Settings Section */}
        <section className="settings-section">
          <h2>music & sounds</h2>
          
          <div className="settings-card">
            <div className="account-option music-toggle-option">
              <div className="option-info">
                <h3>background music</h3>
                <p>ambient music that changes based on the page you're on</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={musicEnabled} 
                  onChange={(e) => setMusicEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="volume-control">
              <div className="volume-header">
                <span className="volume-label">volume</span>
                <span className="volume-value">{Math.round(musicVolume * 100)}%</span>
              </div>
              <div className="volume-slider-container">
                <svg className="volume-icon-svg low" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ff69b4" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="volume-slider"
                  disabled={!musicEnabled}
                />
                <svg className="volume-icon-svg high" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ff69b4" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </div>
            </div>

            <div className="music-info">
              <h4>now playing:</h4>
              <div className="now-playing-track">
                <span className="track-icon-large">♪</span>
                <div className="track-details">
                  <span className="track-name-large">lofi chill beats</span>
                  <span className="track-note">same relaxing vibes on every page ♡</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="settings-section">
          <h2>security</h2>
          
          <div className="settings-card">
            <div className="account-option">
              <div className="option-info">
                <h3>reset password</h3>
                <p>change your password via email verification</p>
              </div>
              <button className="btn btn-secondary" onClick={handleResetPasswordClick}>
                reset
              </button>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="settings-section">
          <h2>account</h2>
          
          <div className="settings-card">
            <div className="account-option">
              <div className="option-info">
                <h3>log out</h3>
                <p>sign out of your BetterMe account</p>
              </div>
              <button className="btn btn-secondary logout-settings-btn" onClick={handleLogoutClick}>
                log out
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Avatar Customization Modal */}
      {showAvatarModal && (
        <div className="logout-modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
            <h3>customize your avatar</h3>
            
            {/* Avatar Preview */}
            <div className="avatar-preview-section">
              <div 
                className="avatar-preview"
                style={
                  avatarSettings.type === 'photo' && avatarSettings.photo
                    ? { backgroundImage: `url(${avatarSettings.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: `linear-gradient(135deg, ${avatarSettings.color} 0%, ${adjustColor(avatarSettings.color, -20)} 100%)` }
                }
              >
                {avatarSettings.type !== 'photo' && (
                  <span style={{ fontFamily: avatarSettings.font }}>
                    {avatarSettings.type === 'icon' ? avatarSettings.icon : user?.username?.[0]?.toUpperCase() || '♡'}
                  </span>
                )}
              </div>
            </div>

            {/* Avatar Type Selection */}
            <div className="avatar-option-section">
              <label>avatar type</label>
              <div className="avatar-type-buttons">
                <button 
                  className={`type-btn ${avatarSettings.type === 'initial' ? 'active' : ''}`}
                  onClick={() => setAvatarSettings({...avatarSettings, type: 'initial'})}
                >
                  Initial
                </button>
                <button 
                  className={`type-btn ${avatarSettings.type === 'icon' ? 'active' : ''}`}
                  onClick={() => setAvatarSettings({...avatarSettings, type: 'icon'})}
                >
                  Icon
                </button>
                <button 
                  className={`type-btn ${avatarSettings.type === 'photo' ? 'active' : ''}`}
                  onClick={() => {
                    setShowPhotoHint(true);
                    fileInputRef.current?.click();
                  }}
                >
                  Photos
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setShowPhotoHint(false);
                    handlePhotoUpload(e);
                  }}
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* Photo Hint */}
              {showPhotoHint && (
                <div className="photo-hint-box">
                  <div className="photo-hint-arrow">↓</div>
                  <div className="photo-hint-content">
                    <span className="photo-hint-icon">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ff69b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </span>
                    <p><strong>tip:</strong> look for <span className="highlight">"Photos"</span> in the left sidebar of Finder!</p>
                    <p className="photo-hint-small">click it to access your photo library</p>
                  </div>
                  <button className="photo-hint-close" onClick={() => setShowPhotoHint(false)}>✕</button>
                </div>
              )}
            </div>

            {/* Color Options */}
            {avatarSettings.type !== 'photo' && (
              <div className="avatar-option-section">
                <label>background color</label>
                <div className="color-options">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className={`color-btn ${avatarSettings.color === color.value ? 'active' : ''}`}
                      style={{ background: color.value }}
                      onClick={() => setAvatarSettings({...avatarSettings, color: color.value})}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Font Options */}
            {avatarSettings.type !== 'photo' && (
              <div className="avatar-option-section">
                <label>font style</label>
                <div className="font-options">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      className={`font-btn ${avatarSettings.font === font.value ? 'active' : ''}`}
                      style={{ fontFamily: font.value }}
                      onClick={() => setAvatarSettings({...avatarSettings, font: font.value})}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Icon Options */}
            {avatarSettings.type === 'icon' && (
              <div className="avatar-option-section">
                <label>choose an icon</label>
                <div className="icon-options">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      className={`icon-btn ${avatarSettings.icon === icon ? 'active' : ''}`}
                      onClick={() => setAvatarSettings({...avatarSettings, icon: icon})}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Buttons */}
            <div className="logout-modal-buttons">
              <button className="btn btn-secondary" onClick={() => setShowAvatarModal(false)}>
                cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveAvatar}>
                save avatar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay" onClick={handleCancelLogout}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-modal-icon">♡</div>
            <h3>are you sure you want to log out?</h3>
            <p>we'll miss you!</p>
            <div className="logout-modal-buttons">
              <button className="btn btn-secondary" onClick={handleCancelLogout}>
                stay
              </button>
              <button className="btn btn-primary" onClick={handleConfirmLogout}>
                log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <div className="logout-modal-overlay" onClick={handleClosePasswordModal}>
          <div className="password-modal" onClick={(e) => e.stopPropagation()}>
            {passwordSuccess ? (
              <>
                <div className="logout-modal-icon">✓</div>
                <h3>password updated!</h3>
                <p>your password has been changed successfully</p>
              </>
            ) : (
              <>
                {passwordStep === 1 && (
                  <>
                    <div className="logout-modal-icon">✉</div>
                    <h3>reset your password</h3>
                    <p>we'll send a verification code to:</p>
                    <p className="email-display">{user?.email}</p>
                    <div className="logout-modal-buttons">
                      <button className="btn btn-secondary" onClick={handleClosePasswordModal}>
                        cancel
                      </button>
                      <button className="btn btn-primary" onClick={handleSendVerificationCode}>
                        send code
                      </button>
                    </div>
                  </>
                )}

                {passwordStep === 2 && (
                  <>
                    <div className="logout-modal-icon">🔢</div>
                    <h3>enter verification code</h3>
                    <p>check your email for the 6-digit code</p>
                    <div className="verification-input">
                      <input
                        type="text"
                        maxLength="6"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="000000"
                        className="code-input"
                      />
                    </div>
                    {passwordError && <p className="password-error">{passwordError}</p>}
                    <div className="logout-modal-buttons">
                      <button className="btn btn-secondary" onClick={() => setPasswordStep(1)}>
                        back
                      </button>
                      <button className="btn btn-primary" onClick={handleVerifyCode}>
                        verify
                      </button>
                    </div>
                  </>
                )}

                {passwordStep === 3 && (
                  <>
                    <div className="logout-modal-icon">🔒</div>
                    <h3>create new password</h3>
                    <div className="password-inputs">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="new password"
                        className="password-input"
                      />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="confirm password"
                        className="password-input"
                      />
                    </div>
                    {passwordError && <p className="password-error">{passwordError}</p>}
                    <div className="logout-modal-buttons">
                      <button className="btn btn-secondary" onClick={() => setPasswordStep(2)}>
                        back
                      </button>
                      <button className="btn btn-primary" onClick={handleChangePassword}>
                        update
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Photo Crop Modal */}
      {showCropModal && rawImage && (
        <div className="logout-modal-overlay" onClick={handleCancelCrop}>
          <div className="crop-modal" onClick={(e) => e.stopPropagation()}>
            <h3>crop your photo</h3>
            <p>adjust your photo to fit perfectly</p>
            
            {/* Crop Preview */}
            <div className="crop-preview-container">
              <div className="crop-circle-mask">
                <img 
                  src={rawImage} 
                  alt="Crop preview"
                  className="crop-image"
                  style={{
                    transform: `scale(${cropSettings.zoom}) translate(${-cropSettings.offsetX}px, ${-cropSettings.offsetY}px)`
                  }}
                />
              </div>
            </div>

            {/* Zoom Control */}
            <div className="crop-controls">
              <label>zoom</label>
              <div className="zoom-slider-container">
                <span className="zoom-icon">🔍</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={cropSettings.zoom}
                  onChange={(e) => setCropSettings({...cropSettings, zoom: parseFloat(e.target.value)})}
                  className="zoom-slider"
                />
                <span className="zoom-value">{Math.round(cropSettings.zoom * 100)}%</span>
              </div>
            </div>

            {/* Position Controls */}
            <div className="crop-controls">
              <label>position</label>
              <div className="position-buttons">
                <button 
                  className="position-btn"
                  onClick={() => setCropSettings({...cropSettings, offsetY: cropSettings.offsetY - 10})}
                >
                  ↑
                </button>
                <div className="position-row">
                  <button 
                    className="position-btn"
                    onClick={() => setCropSettings({...cropSettings, offsetX: cropSettings.offsetX - 10})}
                  >
                    ←
                  </button>
                  <button 
                    className="position-btn reset-btn"
                    onClick={() => setCropSettings({zoom: 1, offsetX: 0, offsetY: 0})}
                  >
                    ↺
                  </button>
                  <button 
                    className="position-btn"
                    onClick={() => setCropSettings({...cropSettings, offsetX: cropSettings.offsetX + 10})}
                  >
                    →
                  </button>
                </div>
                <button 
                  className="position-btn"
                  onClick={() => setCropSettings({...cropSettings, offsetY: cropSettings.offsetY + 10})}
                >
                  ↓
                </button>
              </div>
            </div>

            {/* Hidden canvas for cropping */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* Modal Buttons */}
            <div className="logout-modal-buttons">
              <button className="btn btn-secondary" onClick={handleCancelCrop}>
                cancel
              </button>
              <button className="btn btn-primary" onClick={handleCropComplete}>
                apply crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
