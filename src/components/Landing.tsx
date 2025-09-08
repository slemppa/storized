export default function Landing(): React.JSX.Element {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">ASTORIZED</span>
          </div>
          
          <nav className="main-nav">
          </nav>
          
          <div className="header-actions">
            <div className="language-selector">
              <span className="flag">🇬🇧</span>
            </div>
            <button className="auth-button">Log In</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="hero-section">
          <div className="hero-logo">
            <div className="hero-logo-icon">A</div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1>Content for Your Brand. Instantly.</h1>
              <div className="hero-badges">
                <span className="hero-badge">NO SUBSCRIPTION NEEDED</span>
              </div>
              <p className="hero-subtitle">High-quality, on-brand content delivered directly to your inbox — no commitment, just results.</p>
              <button className="cta-button">Try Now</button>
            </div>
            <div className="hero-visuals">
              <div className="robot-illustration">
                <div className="robot-body">
                  <div className="robot-head">
                    <div className="robot-antenna">📡</div>
                    <div className="robot-eyes">👀</div>
                  </div>
                  <div className="robot-chest">⚡</div>
                </div>
              </div>
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-packs-section">
          <div className="section-header">
            <h2>Explore Our Content Packs</h2>
            <p>Pick from three storytelling journeys: Spark, Flow, or Luminary. Each one is crafted to match your brand's voice, style, and growth ambitions — whether you're just starting out or scaling to new heights.</p>
          </div>
          
          <div className="content-packs">
            <div className="pack-card spark">
              <div className="pack-icon">✈️</div>
              <h3>Spark</h3>
              <p>The Story Begins</p>
              <div className="pack-description">Perfect for startups and new brands looking to make their first impact.</div>
            </div>
            
            <div className="pack-card flow">
              <div className="pack-icon">🎤</div>
              <h3>Flow</h3>
              <p>The Story Unfolds</p>
              <div className="pack-description">Ideal for growing businesses that need consistent, engaging content.</div>
            </div>
            
            <div className="pack-card luminary">
              <div className="pack-icon">🏮</div>
              <h3>Luminary</h3>
              <p>The Content Beacon</p>
              <div className="pack-description">For established brands ready to lead their industry with thought leadership.</div>
            </div>
          </div>
        </div>

        <div className="pricing-section">
          <div className="section-header">
            <h2>Choose your pricing plan</h2>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-robot">🤖</div>
              <h3>Basic</h3>
              <div className="price">$29<span>/month</span></div>
              <ul className="features">
                <li>5 content pieces</li>
                <li>Basic templates</li>
                <li>Email support</li>
              </ul>
              <button className="pricing-button">Get Started</button>
            </div>
            
            <div className="pricing-card featured">
              <div className="best-value">Best Value</div>
              <div className="pricing-robot">🤖</div>
              <h3>Pro</h3>
              <div className="price">$79<span>/month</span></div>
              <ul className="features">
                <li>20 content pieces</li>
                <li>Premium templates</li>
                <li>Priority support</li>
                <li>Custom branding</li>
              </ul>
              <button className="pricing-button">Get Started</button>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-robot">🤖</div>
              <h3>Enterprise</h3>
              <div className="price">$199<span>/month</span></div>
              <ul className="features">
                <li>Unlimited content</li>
                <li>Custom templates</li>
                <li>Dedicated support</li>
                <li>White-label solution</li>
              </ul>
              <button className="pricing-button">Contact Sales</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
