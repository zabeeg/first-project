import { useState, useEffect } from 'react';
import useStore from '../store';
import './Journal.css';

function Journal() {
  const { user } = useStore();
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    mood: '',
    gratitude: '',
    goals: '',
    thoughts: ''
  });
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { 
      icon: (
        <svg viewBox="0 0 36 36" className="mood-svg">
          <circle cx="18" cy="18" r="16" fill="currentColor" opacity="0.2"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
          <circle cx="24" cy="14" r="2" fill="currentColor"/>
          <path d="M10 22 Q18 30 26 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 12 L10 10 L12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M24 12 L26 10 L28 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="8" cy="16" r="2" fill="#ff69b4" opacity="0.6"/>
          <circle cx="28" cy="16" r="2" fill="#ff69b4" opacity="0.6"/>
        </svg>
      ),
      label: 'amazing', 
      color: '#ff69b4' 
    },
    { 
      icon: (
        <svg viewBox="0 0 36 36" className="mood-svg">
          <circle cx="18" cy="18" r="16" fill="currentColor" opacity="0.2"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
          <circle cx="24" cy="14" r="2" fill="currentColor"/>
          <path d="M11 22 Q18 28 25 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'good', 
      color: '#ffb6c1' 
    },
    { 
      icon: (
        <svg viewBox="0 0 36 36" className="mood-svg">
          <circle cx="18" cy="18" r="16" fill="currentColor" opacity="0.2"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M10 14 L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 14 L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 23 L24 23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'okay', 
      color: '#dda0dd' 
    },
    { 
      icon: (
        <svg viewBox="0 0 36 36" className="mood-svg">
          <circle cx="18" cy="18" r="16" fill="currentColor" opacity="0.2"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
          <circle cx="24" cy="14" r="2" fill="currentColor"/>
          <path d="M11 25 Q18 20 25 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'meh', 
      color: '#c9a0dc' 
    },
    { 
      icon: (
        <svg viewBox="0 0 36 36" className="mood-svg">
          <circle cx="18" cy="18" r="16" fill="currentColor" opacity="0.2"/>
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="14" r="2" fill="currentColor"/>
          <circle cx="24" cy="14" r="2" fill="currentColor"/>
          <path d="M11 26 Q18 20 25 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M10 18 L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
          <path d="M26 18 L26 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        </svg>
      ),
      label: 'sad', 
      color: '#b0a4c9' 
    },
  ];

  useEffect(() => {
    // Load entries from localStorage
    const saved = localStorage.getItem('journal-entries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    if (!selectedMood && !newEntry.gratitude && !newEntry.goals && !newEntry.thoughts) {
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      mood: selectedMood,
      ...newEntry
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));

    // Reset form
    setNewEntry({ mood: '', gratitude: '', goals: '', thoughts: '' });
    setSelectedMood(null);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
  };

  return (
    <div className="journal-page page">
      <div className="journal-header">
        <h1>my journal ✎</h1>
        <p>a safe space for your thoughts, dreams & gratitude</p>
      </div>

      {/* New Entry Form */}
      <section className="new-entry-section">
        <div className="container">
          <div className="entry-card new-entry-card">
            <div className="entry-date">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            {/* Mood Selection */}
            <div className="mood-section">
              <label>how are you feeling today?</label>
              <div className="mood-options">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    className={`mood-btn ${selectedMood?.label === mood.label ? 'selected' : ''}`}
                    onClick={() => setSelectedMood(mood)}
                    style={{ '--mood-color': mood.color }}
                  >
                    <span className="mood-icon" style={{ color: mood.color }}>{mood.icon}</span>
                    <span className="mood-label">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gratitude */}
            <div className="journal-field">
              <label>
                <svg className="field-icon" viewBox="0 0 24 24" fill="#ff69b4" width="16" height="16">
                  <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"/>
                  <path d="M12 5L10.09 9.26L5.5 9.63L8.97 12.64L7.82 17L12 14.54L16.18 17L15.03 12.64L18.5 9.63L13.91 9.26L12 5Z" fill="#ffb6c1"/>
                </svg>
                today i'm grateful for...
              </label>
              <textarea
                value={newEntry.gratitude}
                onChange={(e) => setNewEntry({ ...newEntry, gratitude: e.target.value })}
                placeholder="three things that made you smile today"
                rows="3"
              />
            </div>

            {/* Goals */}
            <div className="journal-field">
              <label>
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="#ff69b4" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2" fill="#ff69b4"/>
                </svg>
                my intentions for today...
              </label>
              <textarea
                value={newEntry.goals}
                onChange={(e) => setNewEntry({ ...newEntry, goals: e.target.value })}
                placeholder="what do you want to accomplish or focus on?"
                rows="3"
              />
            </div>

            {/* Free Thoughts */}
            <div className="journal-field">
              <label>
                <svg className="field-icon" viewBox="0 0 24 24" fill="#ff69b4" width="16" height="16">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" opacity="0.3"/>
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"/>
                  <circle cx="8" cy="10" r="1.5"/>
                  <circle cx="12" cy="10" r="1.5"/>
                  <circle cx="16" cy="10" r="1.5"/>
                </svg>
                thoughts & reflections...
              </label>
              <textarea
                value={newEntry.thoughts}
                onChange={(e) => setNewEntry({ ...newEntry, thoughts: e.target.value })}
                placeholder="write freely, this is your safe space ♡"
                rows="5"
              />
            </div>

            <button className="btn btn-primary save-entry-btn" onClick={saveEntry}>
              save entry ♡
            </button>
          </div>
        </div>
      </section>

      {/* Past Entries */}
      <section className="past-entries-section">
        <div className="container">
          <h2>past entries ♡</h2>
          
          {entries.length === 0 ? (
            <div className="no-entries">
              <svg className="no-entries-icon" viewBox="0 0 24 24" fill="#ff69b4" width="48" height="48">
                <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z" opacity="0.3"/>
                <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM6 4H11V12L8.5 10.5L6 12V4Z"/>
                <path d="M6 4H11V12L8.5 10.5L6 12V4Z" fill="#ffb6c1"/>
              </svg>
              <p>no entries yet! start journaling to see your thoughts here</p>
            </div>
          ) : (
            <div className="entries-grid">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card past-entry">
                  <div className="entry-header">
                    <span className="entry-date">{entry.date}</span>
                    {entry.mood && (
                      <span className="entry-mood" style={{ color: entry.mood.color }}>
                        {entry.mood.icon}
                      </span>
                    )}
                  </div>
                  
                  {entry.gratitude && (
                    <div className="entry-section">
                      <span className="entry-label">grateful for</span>
                      <p className="entry-answer">{entry.gratitude}</p>
                    </div>
                  )}
                  
                  {entry.goals && (
                    <div className="entry-section">
                      <span className="entry-label">intentions</span>
                      <p className="entry-answer">{entry.goals}</p>
                    </div>
                  )}
                  
                  {entry.thoughts && (
                    <div className="entry-section">
                      <span className="entry-label">thoughts</span>
                      <p className="entry-answer">{entry.thoughts}</p>
                    </div>
                  )}

                  <button 
                    className="delete-entry-btn"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Journal;

