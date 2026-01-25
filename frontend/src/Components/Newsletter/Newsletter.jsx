import React, { useState } from 'react'
import './Newsletter.css'

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className='newsletter'>
        <div className="newsletter-content">
            <h1 className="newsletter-title">Get Exclusive Offers On Your Email</h1>
            <p className="newsletter-subtitle">Subscribe to our newsletter and stay updated</p>
            
            {!isSubscribed ? (
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input 
                            type="email" 
                            placeholder='Enter your email address' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="newsletter-input"
                        />
                        <button type="submit" className="subscribe-btn">
                            <span className="btn-text">Subscribe</span>
                            <span className="btn-icon">→</span>
                            <span className="btn-glow"></span>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="success-message">
                    <div className="success-icon">✓</div>
                    <p>Thank you for subscribing! 🎉</p>
                    <p className="success-subtext">Check your email for exclusive offers</p>
                </div>
            )}
            
            <div className="newsletter-features">
                <div className="feature">
                    <span className="feature-icon">🎁</span>
                    <span>Exclusive Deals</span>
                </div>
                <div className="feature">
                    <span className="feature-icon">⚡</span>
                    <span>Early Access</span>
                </div>
                <div className="feature">
                    <span className="feature-icon">📧</span>
                    <span>Weekly Updates</span>
                </div>
            </div>
        </div>

        {/* Animated Background Elements */}
        <div className="newsletter-bg-circle circle-1"></div>
        <div className="newsletter-bg-circle circle-2"></div>
        <div className="newsletter-bg-circle circle-3"></div>
        <div className="floating-envelope">✉️</div>
    </div>
  )
}

export default Newsletter