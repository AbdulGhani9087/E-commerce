import React, { useState, useEffect } from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "collections for everyone";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className='hero'>
        <div className="hero-left">
            <h2 className="hero-subtitle">NEW ARRIVALS ONLY</h2>
            <div className="hero-text">
                <div className="hero-hand-icon">
                    <p className="hero-new">new</p>
                    <img src={hand_icon} alt="hand icon" className="hand-wave" />
                </div>
                <p className="hero-main-text typing-animation">{currentText}</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="arrow icon" className="btn-arrow" />
                <div className="sparkle">✨</div>
            </div>
            
            {/* Floating elements */}
            <div className="floating-tag discount-tag">50% OFF</div>
            <div className="floating-tag free-shipping">Free Shipping</div>
        </div>
        
        <div className="hero-right">
            <img src={hero_image} alt="hero fashion" className="hero-main-image" />
            <div className="floating-card card-1">
                <span>🔥 Trending</span>
            </div>
            <div className="floating-card card-2">
                <span>⭐ 4.8/5</span>
            </div>
            <div className="image-glow"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
    </div>
  )
}

export default Hero