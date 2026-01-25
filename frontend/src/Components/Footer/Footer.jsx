import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container">
            <div className="footer-logo">
                <img src={footer_logo} alt="Shopper Logo" className="logo-img" />
                <p className="logo-text">SHOPPER - Fashion Redefined</p>
            </div>
            
            <ul className="footer-links">
                <li><a href="#" className="footer-link">Company</a></li>
                <li><a href="#" className="footer-link">Products</a></li>
                <li><a href="#" className="footer-link">Offices</a></li>
                <li><a href="#" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
            
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="#" className="social-link">
                        <img src={instagram_icon} alt="Instagram" />
                        <div className="social-hover"></div>
                    </a>
                    <a href="#" className="social-link">
                        <img src={pintester_icon} alt="Pinterest" />
                        <div className="social-hover"></div>
                    </a>
                    <a href="#" className="social-link">
                        <img src={whatsapp_icon} alt="WhatsApp" />
                        <div className="social-hover"></div>
                    </a>
                </div>
            </div>
            
            <div className="footer-copyright">
                <hr className="copyright-line" />
                <p className="copyright-text">
                    Copyright © 2024 Shopper. All rights reserved.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer