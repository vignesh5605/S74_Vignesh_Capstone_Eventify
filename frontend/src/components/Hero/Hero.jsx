import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Find the Perfect Vendors for Your 
            <span className="highlight"> Special Events</span>
          </h1>
          <p className="hero-subtitle">
            Discover top-rated photographers, caterers, decorators, and venues. 
            Request quotes, compare prices, and make informed decisions — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/vendors" className="btn btn-primary btn-lg">
              Explore Vendors
            </Link>
            <Link to="/vendors" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Verified Vendors</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free to Use</span>
          </div>
        </div>
      </div>

      <div className="hero-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
      </div>
    </section>
  );
};

export default Hero;
