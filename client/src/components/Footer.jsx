import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <Link to="/" className="footer__brand">
              <svg className="footer__logo-svg" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L2 16L16 30L30 16L16 2Z" fill="#0EA5E9"/>
                <path d="M16 8L8 16L16 24L24 16L16 8Z" fill="white"/>
              </svg>
              <span>SkyTrail</span>
            </Link>
            <p className="footer__tagline">
              Redefining the way you explore the world with AI-powered itineraries and seamless bookings.
            </p>
            <div className="footer__socials">
              <a href="#" className="social-link">𝕏</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🎬</a>
            </div>
          </div>
          
          <div className="footer__nav-col">
            <h4 className="footer__heading">Platform</h4>
            <ul className="footer__list">
              <li><Link to="/destinations">Explore Places</Link></li>
              <li><Link to="/planner">AI Trip Planner</Link></li>
              <li><Link to="/transport">Transport</Link></li>
              <li><Link to="/itinerary">My Bookings</Link></li>
            </ul>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer__newsletter-col">
            <h4 className="footer__heading">Stay Updated</h4>
            <p>Subscribe to get travel tips and exclusive offers.</p>
            <form className="footer__form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} SkyTrail Inc. Built for the modern traveler.</p>
          <div className="footer__bottom-links">
            <span>English (US)</span>
            <span>USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
