import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

let eventifyLogo;
try {
  eventifyLogo = new URL('../../assets/eventify-logo.png', import.meta.url).href;
} catch (e) {
  eventifyLogo = null;
}

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Eventify - Go to homepage">
          {eventifyLogo ? (
            <img 
              src={eventifyLogo} 
              alt="Eventify logo" 
              className="navbar-logo"
            />
          ) : (
            <span className="brand-text">✦ Eventify</span>
          )}
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/vendors" 
              className={`nav-link ${isActive('/vendors') ? 'active' : ''}`}
            >
              Vendors
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/quotes" 
              className={`nav-link ${isActive('/quotes') ? 'active' : ''}`}
            >
              My Quotes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
