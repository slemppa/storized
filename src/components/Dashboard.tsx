import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

interface User {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  subscription_status: 'free' | 'pro' | 'enterprise';
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface Content {
  id: string;
  record_id: string | null;
  idea: string;
  type: 'Photo' | 'Carousel' | 'Reels' | 'Blog' | 'Newsletter' | 'LinkedIn' | null;
  platform: string | null;
  status: 'Draft' | 'In Progress' | 'Under Review' | 'Scheduled' | 'Done' | 'Deleted' | 'Published';
  user_id: string | null;
  created_at: string;
  updated_at: string;
  caption: string | null;
  media_urls: string[] | null;
  hashtags: string | null;
  blog_url: string | null;
  meta_description: string | null;
  publish_date: string | null;
  blog_post: string | null;
}

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps): React.JSX.Element {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContent = async (): Promise<void> => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContent(data || []);
        setFilteredContent(data || []);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [user.id]);

  // ESC-napin toiminnallisuus modaalin sulkemiseen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  // Suodata sisältöä platformin mukaan
  useEffect(() => {
    if (!selectedPlatform) {
      setFilteredContent(content);
    } else {
      const filtered = content.filter(item => {
        // Suodata platform-kentän perusteella
        switch (selectedPlatform) {
          case 'Uutiskirje':
            return item.platform === 'Uutiskirje';
          case 'Blogi':
            return item.platform === 'Blog';
          case 'Instagram':
            return item.platform === 'Instagram';
          case 'LinkedIn':
            return item.platform === 'LinkedIn';
          case 'Facebook':
            return item.platform === 'Facebook';
          default:
            return true;
        }
      });
      setFilteredContent(filtered);
    }
  }, [selectedPlatform, content]);

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleViewContent = (contentItem: Content): void => {
    setSelectedContent(contentItem);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
    setSelectedContent(null);
  };

  // Hae platform-kenttä suoraan
  const getPlatform = (platform: string | null): string => {
    return platform || 'Tuntematon';
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">STORIZED</span>
          </div>
          
          <nav className="main-nav">
          </nav>
          
          <div className="header-actions">
            <div className="language-selector">
              <span className="flag">🇬🇧</span>
            </div>
            <div className="user-info">
              <span className="user-name">{user.full_name || user.email}</span>
              <span className={`subscription-badge ${user.subscription_status}`}>
                {user.subscription_status.toUpperCase()}
              </span>
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <div className="sidebar-section">
              <h3>Content</h3>
              <div className="sidebar-nav">
                <button className="nav-item active">My Posts</button>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Platforms</h3>
              <div className="platform-list">
                <div 
                  className={`platform-item ${selectedPlatform === null ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(null)}
                >
                  <span className="platform-icon">📱</span>
                  <span>Kaikki</span>
                </div>
                <div 
                  className={`platform-item ${selectedPlatform === 'Uutiskirje' ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform('Uutiskirje')}
                >
                  <span className="platform-icon">📧</span>
                  <span>Uutiskirje</span>
                </div>
                <div 
                  className={`platform-item ${selectedPlatform === 'Blogi' ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform('Blogi')}
                >
                  <span className="platform-icon">📝</span>
                  <span>Blogi</span>
                </div>
                <div 
                  className={`platform-item ${selectedPlatform === 'Instagram' ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform('Instagram')}
                >
                  <span className="platform-icon">📷</span>
                  <span>Instagram</span>
                </div>
                <div 
                  className={`platform-item ${selectedPlatform === 'LinkedIn' ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform('LinkedIn')}
                >
                  <span className="platform-icon">💼</span>
                  <span>LinkedIn</span>
                </div>
                <div 
                  className={`platform-item ${selectedPlatform === 'Facebook' ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform('Facebook')}
                >
                  <span className="platform-icon">📘</span>
                  <span>Facebook</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Your Social Media Content</h1>
              <p>View and share your personalized social media content across all platforms.</p>
            </div>


            <div className="content-sections">
              <div className="section">
                <div className="section-header">
                  <h2>Available Content</h2>
                  <button className="section-action">View All</button>
                </div>
                
                {loading ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading content...</p>
                  </div>
                ) : filteredContent.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📱</div>
                    <h3>No content available yet</h3>
                    <p>Your personalized social media content will appear here once it's ready.</p>
                  </div>
                ) : (
                  <div className="content-grid">
                    {filteredContent.map((item) => (
                      <div key={item.id} className="content-card">
                        <div className="content-header">
                          <div className="content-type-badge">
                            {item.type}
                          </div>
                          <div className={`content-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                            {item.status}
                          </div>
                        </div>
                        
                        <div className="content-platform">
                          <span className="platform-label">Platform:</span>
                          <span className="platform-value">{getPlatform(item.platform)}</span>
                        </div>
                        
                        <div className="content-body">
                          {item.media_urls && item.media_urls.length > 0 && (
                            <div className="content-media">
                              {item.media_urls.slice(0, 3).map((url, index) => (
                                <img 
                                  key={index} 
                                  src={url} 
                                  alt={`Media ${index + 1}`}
                                  className="content-image"
                                />
                              ))}
                              {item.media_urls.length > 3 && (
                                <div className="more-images">
                                  +{item.media_urls.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                          <h3 className="content-idea">{item.idea}</h3>
                          {item.caption && (
                            <p className="content-caption">{item.caption}</p>
                          )}
                          {item.hashtags && (
                            <div className="content-hashtags">
                              {item.hashtags.split(' ').map((tag, index) => (
                                <span key={index} className="hashtag">#{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="content-footer">
                          <div className="content-date">
                            {new Date(item.created_at).toLocaleDateString('fi-FI')}
                          </div>
                          <div className="content-actions">
                            <button className="action-btn share-btn">Share</button>
                            <button 
                              className="action-btn view-btn"
                              onClick={() => handleViewContent(item)}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* View Modal */}
      {showModal && selectedContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedContent.idea}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-media">
                {selectedContent.media_urls && selectedContent.media_urls.length > 0 ? (
                  <div className="modal-images">
                    {selectedContent.media_urls.map((url, index) => (
                      <img 
                        key={index} 
                        src={url} 
                        alt={`Media ${index + 1}`}
                        className="modal-image"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-media">
                    <span className="no-media-icon">📷</span>
                    <p>No media available</p>
                  </div>
                )}
              </div>
              
              <div className="modal-details">
                <div className="modal-info">
                  <div className="info-row">
                    <label>Type:</label>
                    <span className="content-type-badge">{selectedContent.type}</span>
                  </div>
                  <div className="info-row">
                    <label>Platform:</label>
                    <span className="platform-value">{getPlatform(selectedContent.platform)}</span>
                  </div>
                  <div className="info-row">
                    <label>Status:</label>
                    <span className={`content-status ${selectedContent.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedContent.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <label>Created:</label>
                    <span>{new Date(selectedContent.created_at).toLocaleDateString('fi-FI')}</span>
                  </div>
                </div>
                
                {selectedContent.caption && (
                  <div className="modal-caption">
                    <h4>Caption:</h4>
                    <p>{selectedContent.caption}</p>
                  </div>
                )}
                
                {selectedContent.hashtags && (
                  <div className="modal-hashtags">
                    <h4>Hashtags:</h4>
                    <div className="hashtag-list">
                      {selectedContent.hashtags.split(' ').map((tag, index) => (
                        <span key={index} className="hashtag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedContent.blog_post && (
                  <div className="modal-blog">
                    <h4>Blog Content:</h4>
                    <div className="blog-content">
                      {selectedContent.blog_post}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="action-btn share-btn">Share</button>
              <button className="action-btn view-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






