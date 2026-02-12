import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getQuoteRequests } from '../../services/api';
import './QuotesPage.css';

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getQuoteRequests();
      setQuotes(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="quotes-page">
      <div className="page-header">
        <div className="container">
          <h1>My Quote Requests</h1>
          <p>Track all your quotation requests in one place</p>
        </div>
      </div>

      <div className="container page-content">
        {loading ? (
          <Loader text="Loading your quotes..." />
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchQuotes}>
              Try Again
            </button>
          </div>
        ) : quotes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No Quote Requests Yet</h3>
            <p>You haven't submitted any quote requests. Start exploring vendors to request your first quote!</p>
            <Link to="/vendors" className="btn btn-primary">
              Browse Vendors
            </Link>
          </div>
        ) : (
          <>
            <div className="results-info">
              <p>You have <strong>{quotes.length}</strong> quote request{quotes.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="quotes-list">
              {quotes.map((quote) => (
                <div key={quote._id} className="quote-item">
                  <div className="quote-header">
                    <div className="quote-vendor">
                      <span className="badge badge-category">
                        {quote.vendorId?.category || 'Unknown'}
                      </span>
                      <h3>{quote.vendorId?.name || 'Vendor'}</h3>
                    </div>
                    <span className={`status-badge status-${quote.status}`}>
                      {quote.status}
                    </span>
                  </div>

                  <div className="quote-body">
                    <div className="quote-details">
                      <div className="detail-item">
                        <span className="detail-label">Event Type</span>
                        <span className="detail-value">{quote.eventType}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Event Date</span>
                        <span className="detail-value">{formatDate(quote.eventDate)}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Submitted</span>
                        <span className="detail-value">{formatDate(quote.createdAt)}</span>
                      </div>
                    </div>

                    <div className="quote-requirements">
                      <span className="detail-label">Requirements</span>
                      <p>{quote.requirements}</p>
                    </div>
                  </div>

                  <div className="quote-footer">
                    <span className="requester">Requested by: {quote.userName}</span>
                    {quote.vendorId && (
                      <Link 
                        to={`/vendors/${quote.vendorId._id}`} 
                        className="btn btn-outline btn-sm"
                      >
                        View Vendor
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuotesPage;
