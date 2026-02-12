import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteForm from '../../components/QuoteForm/QuoteForm';
import Loader from '../../components/Loader/Loader';
import { getVendorById } from '../../services/api';
import './QuoteRequestPage.css';

const QuoteRequestPage = () => {
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

  if (loading) {
    return (
      <div className="quote-request-page">
        <div className="container page-content">
          <Loader text="Loading..." />
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="quote-request-page">
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
    <div className="quote-request-page">
      <div className="page-header">
        <div className="container">
          <Link to={`/vendors/${vendor._id}`} className="back-link">
            ← Back to {vendor.name}
          </Link>
          <h1>Request a Quote</h1>
          <p>Fill in your event details to get a personalized quote</p>
        </div>
      </div>

      <div className="container page-content">
        <div className="quote-grid">
          <div className="quote-form-section">
            <QuoteForm vendorId={vendor._id} vendorName={vendor.name} />
          </div>

          <div className="vendor-sidebar">
            <div className="vendor-info-card">
              <h3>Selected Vendor</h3>
              <div className="vendor-summary">
                <span className="badge badge-category">{vendor.category}</span>
                <h4>{vendor.name}</h4>
                <p className="vendor-location">📍 {vendor.location}</p>
                <p className="vendor-price">Price Range: {vendor.priceRange}</p>
              </div>
              <Link to="/vendors" className="change-vendor-link">
                Choose a different vendor →
              </Link>
            </div>

            <div className="tips-card">
              <h3>Tips for a Good Quote</h3>
              <ul>
                <li>Be specific about your requirements</li>
                <li>Include expected guest count</li>
                <li>Mention any special requests</li>
                <li>Provide accurate event date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestPage;
