import { useState, useRef, useEffect } from 'react';
import useStore from '../store';
import './Progress.css';

function Progress() {
  const { user } = useStore();
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('progressPosts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [category, setCategory] = useState('general');
  const [followers, setFollowers] = useState(() => {
    const saved = localStorage.getItem('progressFollowers');
    return saved ? JSON.parse(saved) : 127; // Start with some followers
  });
  const [isFollowing, setIsFollowing] = useState(() => {
    return localStorage.getItem('isFollowing') === 'true';
  });
  const [commentingOn, setCommentingOn] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContentTip, setShowContentTip] = useState(false);
  const [editingComment, setEditingComment] = useState(null); // { postId, commentId }
  const [editCommentText, setEditCommentText] = useState('');
  const [reportingComment, setReportingComment] = useState(null); // { postId, commentId, username, commentText }
  const [reportReason, setReportReason] = useState('');
  const [reportCategory, setReportCategory] = useState('rude');
  const [showReportSuccess, setShowReportSuccess] = useState(false);
  const [bannedUsers, setBannedUsers] = useState(() => {
    const saved = localStorage.getItem('bannedUsers');
    return saved ? JSON.parse(saved) : [];
  });
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('userReports');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [deleteConfirmPost, setDeleteConfirmPost] = useState(null); // Post ID to confirm deletion
  const fileInputRef = useRef(null);
  
  // Admin users who can access the admin panel - ONLY Zabeeg.Creator1! has access
  const adminUsers = ['Zabeeg.Creator1!'];

  // Sample accounts for search
  const sampleAccounts = [
    { id: 1, username: 'sparkle.girl', followers: 1243, bio: 'living my best life ✨', color: '#ff69b4' },
    { id: 2, username: 'glow.queen', followers: 892, bio: 'skincare obsessed 💕', color: '#ffb6c1' },
    { id: 3, username: 'fitness.babe', followers: 2105, bio: 'pilates & positivity', color: '#dda0dd' },
    { id: 4, username: 'style.inspo', followers: 3421, bio: 'outfit ideas daily', color: '#f0a1c2' },
    { id: 5, username: 'mindful.me', followers: 567, bio: 'journaling & growth', color: '#e6a8d7' },
    { id: 6, username: 'healthy.habits', followers: 1890, bio: 'nutrition tips 🥗', color: '#ffb7c5' },
    { id: 7, username: 'dance.dreams', followers: 4231, bio: 'dancing through life', color: '#ffc0cb' },
    { id: 8, username: 'yoga.vibes', followers: 1567, bio: 'namaste bestie 🧘‍♀️', color: '#db7093' },
  ];

  const filteredAccounts = sampleAccounts.filter(account => 
    account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    account.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [
    { id: 'general', label: 'general', icon: '✧' },
    { id: 'workout', label: 'workout', icon: '❀' },
    { id: 'skincare', label: 'skincare', icon: '✿' },
    { id: 'style', label: 'style', icon: '♡' },
    { id: 'mindset', label: 'mindset', icon: '☆' },
  ];

  useEffect(() => {
    localStorage.setItem('progressPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('progressFollowers', JSON.stringify(followers));
  }, [followers]);

  useEffect(() => {
    localStorage.setItem('isFollowing', isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    localStorage.setItem('bannedUsers', JSON.stringify(bannedUsers));
  }, [bannedUsers]);

  useEffect(() => {
    localStorage.setItem('userReports', JSON.stringify(reports));
  }, [reports]);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith('video/')) {
          setSelectedVideo(reader.result);
          setSelectedImage(null);
          setMediaType('video');
        } else {
          setSelectedImage(reader.result);
          setSelectedVideo(null);
          setMediaType('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPost.trim() && !selectedImage && !selectedVideo) return;

    const post = {
      id: Date.now(),
      text: newPost,
      image: selectedImage,
      video: selectedVideo,
      mediaType: mediaType,
      category: category,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit' 
      }),
      username: user?.username || 'anonymous',
      avatar: user?.avatarPhoto || null,
      avatarType: user?.avatarType || 'initial',
      avatarColor: user?.avatarColor || '#ff69b4',
      avatarIcon: user?.avatarIcon || '♡',
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false,
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setSelectedImage(null);
    setSelectedVideo(null);
    setMediaType(null);
    setCategory('general');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.liked) {
          return { ...post, likes: post.likes - 1, liked: false };
        } else {
          return { 
            ...post, 
            likes: post.likes + 1, 
            liked: true,
            dislikes: post.disliked ? post.dislikes - 1 : post.dislikes,
            disliked: false 
          };
        }
      }
      return post;
    }));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (post.disliked) {
          return { ...post, dislikes: post.dislikes - 1, disliked: false };
        } else {
          return { 
            ...post, 
            dislikes: post.dislikes + 1, 
            disliked: true,
            likes: post.liked ? post.likes - 1 : post.likes,
            liked: false 
          };
        }
      }
      return post;
    }));
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const comment = {
          id: Date.now(),
          text: newComment,
          username: user?.username || 'anonymous',
          avatar: user?.avatarPhoto || null,
          avatarType: user?.avatarType || 'initial',
          avatarColor: user?.avatarColor || '#ff69b4',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          likes: 0,
          liked: false,
        };
        return { ...post, comments: [...(post.comments || []), comment] };
      }
      return post;
    }));
    setNewComment('');
    setCommentingOn(null);
  };

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              if (comment.liked) {
                return { ...comment, likes: (comment.likes || 1) - 1, liked: false };
              } else {
                return { ...comment, likes: (comment.likes || 0) + 1, liked: true };
              }
            }
            return comment;
          })
        };
      }
      return post;
    }));
  };

  const handleStartEditComment = (postId, comment) => {
    setEditingComment({ postId, commentId: comment.id });
    setEditCommentText(comment.text);
  };

  const handleSaveEditComment = () => {
    if (!editCommentText.trim() || !editingComment) return;
    
    setPosts(posts.map(post => {
      if (post.id === editingComment.postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === editingComment.commentId) {
              return { ...comment, text: editCommentText, edited: true };
            }
            return comment;
          })
        };
      }
      return post;
    }));
    setEditingComment(null);
    setEditCommentText('');
  };

  const handleCancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText('');
  };

  const handleReportComment = (postId, comment) => {
    setReportingComment({ 
      postId, 
      commentId: comment.id, 
      username: comment.username,
      commentText: comment.text 
    });
    setReportReason('');
    setReportCategory('rude');
  };

  const handleSubmitReport = () => {
    if (!reportingComment || !reportReason.trim()) return;
    
    // Create report for admin review
    const newReport = {
      id: Date.now(),
      reportedUser: reportingComment.username,
      reportedComment: reportingComment.commentText,
      reportedBy: user?.username || 'anonymous',
      reason: reportReason,
      category: reportCategory,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }),
      status: 'pending', // pending, reviewed, banned, dismissed
      postId: reportingComment.postId,
      commentId: reportingComment.commentId
    };
    
    setReports([newReport, ...reports]);
    
    // Show success message
    setReportingComment(null);
    setReportReason('');
    setReportCategory('rude');
    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 3000);
  };

  const handleCancelReport = () => {
    setReportingComment(null);
    setReportReason('');
    setReportCategory('rude');
  };

  const handleBanUser = (username) => {
    if (!bannedUsers.includes(username)) {
      setBannedUsers([...bannedUsers, username]);
      // Update reports status
      setReports(reports.map(r => 
        r.reportedUser === username ? { ...r, status: 'banned' } : r
      ));
      // Remove their comments
      setPosts(posts.map(post => ({
        ...post,
        comments: post.comments?.filter(c => c.username !== username) || []
      })));
    }
  };

  const handleUnbanUser = (username) => {
    setBannedUsers(bannedUsers.filter(u => u !== username));
    setReports(reports.map(r => 
      r.reportedUser === username ? { ...r, status: 'unbanned' } : r
    ));
  };

  const handleDismissReport = (reportId) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'dismissed' } : r
    ));
  };

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter(r => r.id !== reportId));
  };

  const isUserBanned = (username) => {
    return bannedUsers.includes(username);
  };

  const isAdmin = () => {
    return adminUsers.some(admin => 
      admin?.toLowerCase() === user?.username?.toLowerCase()
    );
  };

  const pendingReportsCount = reports.filter(r => r.status === 'pending').length;

  const handleFollow = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
      setIsFollowing(false);
    } else {
      setFollowers(followers + 1);
      setIsFollowing(true);
    }
  };

  const handleDeletePost = (postId) => {
    setDeleteConfirmPost(postId);
  };

  const confirmDeletePost = () => {
    if (deleteConfirmPost) {
      setPosts(posts.filter(post => post.id !== deleteConfirmPost));
      setDeleteConfirmPost(null);
    }
  };

  const cancelDeletePost = () => {
    setDeleteConfirmPost(null);
  };

  const removeSelectedMedia = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
    setMediaType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategoryIcon = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.icon : '✧';
  };

  const renderAvatar = (post) => {
    if (post.avatarType === 'photo' && post.avatar) {
      return (
        <div 
          className="post-avatar"
          style={{ 
            backgroundImage: `url(${post.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      );
    } else if (post.avatarType === 'icon') {
      return (
        <div 
          className="post-avatar"
          style={{ background: `linear-gradient(135deg, ${post.avatarColor} 0%, ${post.avatarColor}dd 100%)` }}
        >
          <span>{post.avatarIcon}</span>
        </div>
      );
    } else {
      return (
        <div 
          className="post-avatar"
          style={{ background: `linear-gradient(135deg, ${post.avatarColor} 0%, ${post.avatarColor}dd 100%)` }}
        >
          <span>{post.username?.charAt(0).toUpperCase() || '?'}</span>
        </div>
      );
    }
  };

  return (
    <div className="progress-page page">
      <div className="progress-header">
        <h1>my progress</h1>
        <p>share your journey and celebrate your wins!</p>
        
        {/* Followers Section */}
        <div className="followers-section">
          <div className="followers-count">
            <span className="followers-number">{followers}</span>
            <span className="followers-label">followers</span>
          </div>
          <button 
            className={`follow-btn ${isFollowing ? 'following' : ''}`}
            onClick={handleFollow}
          >
            {isFollowing ? '✓ following' : '+ follow'}
          </button>
          <button 
            className="search-accounts-btn"
            onClick={() => setShowSearch(true)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            find friends
          </button>
        </div>
      </div>

      {/* Content Tip Modal */}
      {showContentTip && (
        <div className="content-tip-overlay">
          <div className="content-tip-modal">
            <div className="content-tip-icon">
              <svg viewBox="0 0 24 24" width="80" height="80" fill="white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h2>ready to share?</h2>
            <p>after you tap "okay", your files will pop up — just scroll down to find your fave photos & videos, then tap to select!</p>
            <div className="content-tip-hearts">♡ ♡ ♡</div>
            <button 
              className="content-tip-okay-btn"
              onClick={() => {
                setShowContentTip(false);
                fileInputRef.current?.click();
              }}
            >
              okay, let's go!
            </button>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingComment && (
        <div className="report-modal-overlay" onClick={handleCancelReport}>
          <div className="report-modal" onClick={e => e.stopPropagation()}>
            <div className="report-modal-header">
              <div className="report-icon">⚠️</div>
              <h2>report comment</h2>
              <button className="close-report-btn" onClick={handleCancelReport}>✕</button>
            </div>
            <div className="report-modal-body">
              <p className="report-info">
                you're reporting a comment by <strong>@{reportingComment.username}</strong>
              </p>
              <p className="report-warning">
                ⚡ rude or harmful behavior is not tolerated on BetterMe. if reported, this user will be <strong>banned</strong> from the community.
              </p>
              <label className="report-label">why are you reporting this?</label>
              <select 
                className="report-select"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="">select a reason...</option>
                <option value="rude">rude or mean comments</option>
                <option value="bullying">bullying or harassment</option>
                <option value="inappropriate">inappropriate content</option>
                <option value="spam">spam or self-promotion</option>
                <option value="hate">hate speech</option>
                <option value="other">other</option>
              </select>
              <div className="report-actions">
                <button className="cancel-report-btn" onClick={handleCancelReport}>
                  cancel
                </button>
                <button 
                  className="submit-report-btn"
                  onClick={handleSubmitReport}
                  disabled={!reportReason}
                >
                  🚫 report & ban user
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Success Toast */}
      {showReportSuccess && (
        <div className="report-success-toast">
          <span className="toast-icon">✓</span>
          <span>report submitted! admins will review it soon</span>
        </div>
      )}

      {/* Delete Post Confirmation Modal */}
      {deleteConfirmPost && (
        <div className="delete-confirm-overlay" onClick={cancelDeletePost}>
          <div className="delete-confirm-modal" onClick={e => e.stopPropagation()}>
            <h3>are you sure you want to delete your post?</h3>
            <p>this action cannot be undone.</p>
            <div className="delete-confirm-actions">
              <button className="btn-cancel-delete" onClick={cancelDeletePost}>
                cancel
              </button>
              <button className="btn-confirm-delete" onClick={confirmDeletePost}>
                delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingComment && (
        <div className="report-modal-overlay" onClick={handleCancelReport}>
          <div className="report-modal" onClick={e => e.stopPropagation()}>
            <div className="report-modal-header">
              <div className="report-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
              </div>
              <h2>report user</h2>
              <p>help us keep BetterMe safe and kind</p>
            </div>
            
            <div className="report-modal-body">
              <div className="report-user-info">
                <span className="report-label">reporting:</span>
                <span className="report-username">@{reportingComment.username}</span>
              </div>
              
              <div className="report-comment-preview">
                <span className="report-label">their comment:</span>
                <p>"{reportingComment.commentText}"</p>
              </div>
              
              <div className="report-category-section">
                <span className="report-label">what's wrong?</span>
                <div className="report-categories">
                  <button 
                    className={`report-category-btn ${reportCategory === 'rude' ? 'active' : ''}`}
                    onClick={() => setReportCategory('rude')}
                  >
                    rude/mean
                  </button>
                  <button 
                    className={`report-category-btn ${reportCategory === 'harassment' ? 'active' : ''}`}
                    onClick={() => setReportCategory('harassment')}
                  >
                    harassment
                  </button>
                  <button 
                    className={`report-category-btn ${reportCategory === 'inappropriate' ? 'active' : ''}`}
                    onClick={() => setReportCategory('inappropriate')}
                  >
                    inappropriate
                  </button>
                  <button 
                    className={`report-category-btn ${reportCategory === 'spam' ? 'active' : ''}`}
                    onClick={() => setReportCategory('spam')}
                  >
                    spam
                  </button>
                  <button 
                    className={`report-category-btn ${reportCategory === 'other' ? 'active' : ''}`}
                    onClick={() => setReportCategory('other')}
                  >
                    other
                  </button>
                </div>
              </div>
              
              <div className="report-reason-section">
                <span className="report-label">tell us more (required)</span>
                <textarea
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="explain what happened and why this comment is inappropriate..."
                  rows={4}
                />
              </div>
            </div>
            
            <div className="report-modal-footer">
              <button className="btn-cancel-report" onClick={handleCancelReport}>
                cancel
              </button>
              <button 
                className="btn-submit-report" 
                onClick={handleSubmitReport}
                disabled={!reportReason.trim()}
              >
                submit report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="admin-panel-overlay" onClick={() => setShowAdminPanel(false)}>
          <div className="admin-panel" onClick={e => e.stopPropagation()}>
            <div className="admin-panel-header">
              <h2>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                admin panel
              </h2>
              <button className="close-admin-btn" onClick={() => setShowAdminPanel(false)}>✕</button>
            </div>
            
            <div className="admin-tabs">
              <div className="admin-tab active">
                reports ({reports.filter(r => r.status === 'pending').length} pending)
              </div>
            </div>
            
            <div className="admin-panel-body">
              {reports.length === 0 ? (
                <div className="admin-empty">
                  <span className="admin-empty-icon">✓</span>
                  <h3>no reports yet!</h3>
                  <p>all is well in BetterMe land</p>
                </div>
              ) : (
                <div className="reports-list">
                  {reports.map(report => (
                    <div key={report.id} className={`report-item ${report.status}`}>
                      <div className="report-item-header">
                        <span className={`report-status ${report.status}`}>
                          {report.status}
                        </span>
                        <span className="report-date">{report.date}</span>
                      </div>
                      
                      <div className="report-item-user">
                        <span className="reported-user">@{report.reportedUser}</span>
                        <span className="report-category-tag">{report.category}</span>
                      </div>
                      
                      <div className="report-item-comment">
                        "{report.reportedComment}"
                      </div>
                      
                      <div className="report-item-reason">
                        <strong>reason:</strong> {report.reason}
                      </div>
                      
                      <div className="report-item-by">
                        reported by @{report.reportedBy}
                      </div>
                      
                      <div className="report-item-actions">
                        {!isUserBanned(report.reportedUser) ? (
                          <button 
                            className="btn-ban"
                            onClick={() => handleBanUser(report.reportedUser)}
                          >
                            ban user
                          </button>
                        ) : (
                          <button 
                            className="btn-unban"
                            onClick={() => handleUnbanUser(report.reportedUser)}
                          >
                            unban user
                          </button>
                        )}
                        {report.status === 'pending' && (
                          <button 
                            className="btn-dismiss"
                            onClick={() => handleDismissReport(report.id)}
                          >
                            dismiss
                          </button>
                        )}
                        <button 
                          className="btn-delete-report"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {bannedUsers.length > 0 && (
                <div className="banned-users-section">
                  <h3>banned users ({bannedUsers.length})</h3>
                  <div className="banned-users-list">
                    {bannedUsers.map(username => (
                      <div key={username} className="banned-user-item">
                        <span>@{username}</span>
                        <button onClick={() => handleUnbanUser(username)}>unban</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <div className="search-modal-header">
              <h2>find friends</h2>
              <button className="close-search-btn" onClick={() => setShowSearch(false)}>✕</button>
            </div>
            <div className="search-input-container">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ff69b4" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="search by username or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="search-results">
              {filteredAccounts.length === 0 ? (
                <p className="no-results">no accounts found</p>
              ) : (
                filteredAccounts.map(account => (
                  <div key={account.id} className="account-card">
                    <div 
                      className="account-avatar"
                      style={{ background: `linear-gradient(135deg, ${account.color} 0%, ${account.color}dd 100%)` }}
                    >
                      <span>{account.username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="account-info">
                      <span className="account-username">@{account.username}</span>
                      <span className="account-bio">{account.bio}</span>
                      <span className="account-followers">{account.followers.toLocaleString()} followers</span>
                    </div>
                    <button className="follow-account-btn">follow</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="progress-container">
        {/* New Post Section */}
        <div className="new-post-card">
          <div className="new-post-header">
            <div className="post-avatar-small">
              {user?.avatarType === 'photo' && user?.avatarPhoto ? (
                <div 
                  className="avatar-img"
                  style={{ 
                    backgroundImage: `url(${user.avatarPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              ) : (
                <div 
                  className="avatar-img"
                  style={{ background: `linear-gradient(135deg, ${user?.avatarColor || '#ff69b4'} 0%, ${user?.avatarColor || '#ff69b4'}dd 100%)` }}
                >
                  <span>{user?.avatarType === 'icon' ? user?.avatarIcon : user?.username?.charAt(0).toUpperCase() || '?'}</span>
                </div>
              )}
            </div>
            <span className="post-prompt">what's your progress today, {user?.username || 'bestie'}?</span>
          </div>

          <textarea
            className="post-input"
            placeholder="share your wins, goals, or just how you're feeling..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={3}
          />

          {(selectedImage || selectedVideo) && (
            <div className="media-preview">
              {selectedImage && <img src={selectedImage} alt="Preview" />}
              {selectedVideo && (
                <video controls>
                  <source src={selectedVideo} />
                </video>
              )}
              <button className="remove-media-btn" onClick={removeSelectedMedia}>✕</button>
            </div>
          )}

          <div className="post-actions">
            <div className="post-options">
              <div className="content-btn-wrapper">
                <button 
                  className="add-photo-btn"
                  onClick={() => setShowContentTip(true)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  content
                </button>
              </div>
              
              {/* Admin Panel Button */}
              {isAdmin() && (
                <button 
                  className="admin-panel-btn"
                  onClick={() => setShowAdminPanel(true)}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  admin
                  {pendingReportsCount > 0 && (
                    <span className="admin-badge">{pendingReportsCount}</span>
                  )}
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                style={{ display: 'none' }}
              />

              <div className="category-selector">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                    title={cat.label}
                  >
                    {cat.icon}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary post-btn"
              onClick={handlePost}
              disabled={!newPost.trim() && !selectedImage && !selectedVideo}
            >
              post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="posts-feed">
          {posts.length === 0 ? (
            <div className="no-posts">
              <div className="no-posts-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ff69b4" strokeWidth="1.5">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3>no posts yet!</h3>
              <p>be the first to share your progress</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  {renderAvatar(post)}
                  <div className="post-info">
                    <span className="post-username">{post.username}</span>
                    <span className="post-meta">
                      {getCategoryIcon(post.category)} {post.category} • {post.date} at {post.time}
                    </span>
                  </div>
                  <button 
                    className="delete-post-btn"
                    onClick={() => handleDeletePost(post.id)}
                    title="Delete post"
                  >
                    ✕
                  </button>
                </div>

                {post.text && <p className="post-text">{post.text}</p>}
                
                {post.image && (
                  <div className="post-media">
                    <img src={post.image} alt="Post" />
                  </div>
                )}

                {post.video && (
                  <div className="post-media post-video">
                    <video controls>
                      <source src={post.video} />
                      Your browser does not support videos.
                    </video>
                  </div>
                )}

                <div className="post-footer">
                  <div className="post-reactions">
                    <button 
                      className={`reaction-btn like-btn ${post.liked ? 'active' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      {/* Smiley Face SVG */}
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={post.liked ? "#ff69b4" : "#ffb6c1"} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span>{post.likes || 0}</span>
                    </button>
                    <button 
                      className={`reaction-btn dislike-btn ${post.disliked ? 'active' : ''}`}
                      onClick={() => handleDislike(post.id)}
                    >
                      {/* Sad Face SVG */}
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={post.disliked ? "#b8a9c9" : "#d4c4e0"} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      <span>{post.dislikes || 0}</span>
                    </button>
                    <button 
                      className="reaction-btn comment-btn"
                      onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#d4748a" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>{post.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {commentingOn === post.id && (
                  <div className="comments-section">
                    <div className="add-comment">
                      <input
                        type="text"
                        placeholder="write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      />
                      <button onClick={() => handleAddComment(post.id)}>post</button>
                    </div>
                    
                    {post.comments && post.comments.length > 0 && (
                      <div className="comments-list">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="comment">
                            <div 
                              className="comment-avatar"
                              style={
                                comment.avatarType === 'photo' && comment.avatar
                                  ? { backgroundImage: `url(${comment.avatar})`, backgroundSize: 'cover' }
                                  : { background: `linear-gradient(135deg, ${comment.avatarColor} 0%, ${comment.avatarColor}dd 100%)` }
                              }
                            >
                              {comment.avatarType !== 'photo' && (
                                <span>{comment.username?.charAt(0).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="comment-content">
                              <span className="comment-username">
                                {comment.username}
                                {comment.edited && <span className="edited-label">(edited)</span>}
                              </span>
                              {editingComment?.postId === post.id && editingComment?.commentId === comment.id ? (
                                <div className="edit-comment-form">
                                  <input
                                    type="text"
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEditComment()}
                                    autoFocus
                                  />
                                  <div className="edit-comment-actions">
                                    <button className="save-edit-btn" onClick={handleSaveEditComment}>save</button>
                                    <button className="cancel-edit-btn" onClick={handleCancelEditComment}>cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <p className="comment-text">{comment.text}</p>
                              )}
                              <div className="comment-footer">
                                <span className="comment-time">{comment.time}</span>
                                <button 
                                  className={`comment-like-btn ${comment.liked ? 'liked' : ''}`}
                                  onClick={() => handleLikeComment(post.id, comment.id)}
                                >
                                  <svg viewBox="0 0 24 24" width="14" height="14" fill={comment.liked ? "#ff69b4" : "none"} stroke="#ff69b4" strokeWidth="2">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                  <span>{comment.likes || 0}</span>
                                </button>
                                {comment.username === user?.username && !editingComment && (
                                  <button 
                                    className="comment-edit-btn"
                                    onClick={() => handleStartEditComment(post.id, comment)}
                                  >
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d4748a" strokeWidth="2">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    edit
                                  </button>
                                )}
                                <button 
                                    className="comment-report-btn"
                                    onClick={() => handleReportComment(post.id, comment)}
                                    title="Report this comment"
                                  >
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                      <line x1="4" y1="22" x2="4" y2="15"/>
                                    </svg>
                                  </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;

