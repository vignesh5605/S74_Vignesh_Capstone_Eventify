import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuoteRequest } from '../../services/api';
import './QuoteForm.css';

const QuoteForm = ({ vendorId, vendorName }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    eventType: '',
    eventDate: '',
    requirements: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const eventTypes = [
    'Wedding',
    'Birthday',
    'Corporate Event',
    'Private Function'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitQuoteRequest({
        ...formData,
        vendorId
      });
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/quotes');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <div className="quote-form-success">
        <div className="success-icon">✓</div>
        <h3>Quote Request Submitted!</h3>
        <p>Your request has been sent to {vendorName}.</p>
        <p className="redirect-msg">Redirecting to your quotes...</p>
      </div>
    );
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Request a Quote from {vendorName}</h3>
      
      {error && (
        <div className="form-error">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label" htmlFor="userName">
          Your Name *
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          className="form-input"
          value={formData.userName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="eventType">
          Event Type *
        </label>
        <select
          id="eventType"
          name="eventType"
          className="form-select"
          value={formData.eventType}
          onChange={handleChange}
          required
        >
          <option value="">Select event type</option>
          {eventTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="eventDate">
          Event Date *
        </label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          className="form-input"
          value={formData.eventDate}
          onChange={handleChange}
          min={getMinDate()}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="requirements">
          Requirements & Details *
        </label>
        <textarea
          id="requirements"
          name="requirements"
          className="form-textarea"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Describe your event requirements, guest count, specific needs, etc."
          required
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-submit"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Quote Request'}
      </button>
    </form>
  );
};

export default QuoteForm;
