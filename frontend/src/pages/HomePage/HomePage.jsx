import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import VendorCard from '../../components/VendorCard/VendorCard';
import Loader from '../../components/Loader/Loader';
import { getVendors } from '../../services/api';
import './HomePage.css';

const HomePage = () => {
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedVendors();
  }, []);

  const fetchFeaturedVendors = async () => {
    try {
      setLoading(true);
      const response = await getVendors();
      setFeaturedVendors(response.data.slice(0, 6));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { 
      name: 'Photographers', 
      link: '/vendors?category=Photographer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
      )
    },
    { 
      name: 'Caterers', 
      link: '/vendors?category=Caterer',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      )
    },
    { 
      name: 'Decorators', 
      link: '/vendors?category=Decorator',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      )
    },
    { 
      name: 'Venues', 
      link: '/vendors?category=Venue',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      name: 'Event Managers', 
      link: '/vendors?category=Event Manager',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    }
  ];

  return (
    <div className="home-page">
      <Hero />

      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find the right vendors for every aspect of your event</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.link} 
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <span className="category-name">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Vendors</h2>
            <p>Discover our handpicked selection of top-rated vendors</p>
          </div>

          {loading ? (
            <Loader text="Loading vendors..." />
          ) : error ? (
            <div className="error-message">
              <p>Failed to load vendors. Please try again.</p>
            </div>
          ) : (
            <>
              <div className="vendors-grid">
                {featuredVendors.map((vendor) => (
                  <VendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
              
              <div className="section-footer">
                <Link to="/vendors" className="btn btn-primary">
                  View All Vendors
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How Eventify Works</h2>
            <p>Get quotes from vendors in 3 simple steps</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Browse Vendors</h3>
              <p>Explore our curated list of verified vendors across multiple categories.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Request Quotes</h3>
              <p>Submit your event details and requirements to get personalized quotes.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Compare & Choose</h3>
              <p>Review quotes, compare options, and select the best fit for your event.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
