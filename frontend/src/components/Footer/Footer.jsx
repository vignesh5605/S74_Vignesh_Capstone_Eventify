import { Link } from 'react-router-dom';
import './Footer.css';

let eventifyLogo;
try {
  eventifyLogo = new URL('../../assets/eventify-logo.png', import.meta.url).href;
} catch (e) {
  eventifyLogo = null;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link" aria-label="Eventify - Go to homepage">
            {eventifyLogo ? (
              <img 
                src={eventifyLogo} 
                alt="Eventify logo" 
                className="footer-logo-img"
              />
            ) : (
              <span className="footer-brand-text">✦ Eventify</span>
            )}
          </Link>
          <p className="footer-tagline">
            Discover the perfect vendors for your special events.
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vendors">Browse Vendors</Link></li>
            <li><Link to="/quotes">My Quotes</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Categories</h4>
          <ul>
            <li><Link to="/vendors?category=Photographer">Photographers</Link></li>
            <li><Link to="/vendors?category=Caterer">Caterers</Link></li>
            <li><Link to="/vendors?category=Decorator">Decorators</Link></li>
            <li><Link to="/vendors?category=Venue">Venues</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Contact</h4>
          <ul>
            <li>support@eventify.com</li>
            <li>+91 98765 43210</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {currentYear} Eventify. All rights reserved.</p>
          <p className="footer-credit">Built with ❤️ for Capstone Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
