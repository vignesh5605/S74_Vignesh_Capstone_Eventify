import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getVendorById } from '../../services/api';
import './VendorDetailPage.css';

const VendorDetailPage = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendor();
  }, [id]);

  const fetchVendor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getVendorById(id);
      setVendor(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPriceRangeClass = (range) => {
    const classes = {
      'Budget': 'price-budget',
      'Standard': 'price-standard',
      'Premium': 'price-premium',
      'Luxury': 'price-luxury'
    };
    return classes[range] || '';
  };

  if (loading) {
    return (
      <div className="vendor-detail-page">
        <div className="container page-content">
          <Loader text="Loading vendor details..." />
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="vendor-detail-page">
        <div className="container page-content">
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Vendor Not Found</h3>
            <p>{error || 'The vendor you are looking for does not exist.'}</p>
            <Link to="/vendors" className="btn btn-primary">
              Back to Vendors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vendor-detail-page">
      <div className="page-header">
        <div className="container">
          <Link to="/vendors" className="back-link">
            ← Back to Vendors
          </Link>
          <div className="vendor-header">
            <div className="vendor-header-info">
              <span className="badge badge-category">{vendor.category}</span>
              <h1>{vendor.name}</h1>
              <div className="vendor-meta">
                <span className="location">📍 {vendor.location}</span>
                <span className={`price-badge ${getPriceRangeClass(vendor.priceRange)}`}>
                  {vendor.priceRange}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container page-content">
        <div className="detail-grid">
          <div className="vendor-details">
            <div className="detail-card">
              <h2>About</h2>
              <p className="vendor-description">{vendor.description}</p>
            </div>

            <div className="detail-card">
              <h2>Quick Info</h2>
              <ul className="info-list">
                <li>
                  <span className="info-label">Category</span>
                  <span className="info-value">{vendor.category}</span>
                </li>
                <li>
                  <span className="info-label">Location</span>
                  <span className="info-value">{vendor.location}</span>
                </li>
                <li>
                  <span className="info-label">Price Range</span>
                  <span className="info-value">{vendor.priceRange}</span>
                </li>
                <li>
                  <span className="info-label">Member Since</span>
                  <span className="info-value">
                    {new Date(vendor.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="quote-sidebar">
            <div className="quote-card">
              <h3>Interested in this vendor?</h3>
              <p>Request a personalized quote for your event.</p>
              <Link 
                to={`/vendors/${vendor._id}/quote`} 
                className="btn btn-primary btn-block"
              >
                Request Quote
              </Link>
              <p className="quote-note">
                Free • No obligation • Quick response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
