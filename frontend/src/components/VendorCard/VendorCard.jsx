import { Link } from 'react-router-dom';
import './VendorCard.css';

const VendorCard = ({ vendor }) => {
  const { _id, name, category, description, location, priceRange } = vendor;

  const getPriceRangeClass = (range) => {
    const classes = {
      'Budget': 'price-budget',
      'Standard': 'price-standard',
      'Premium': 'price-premium',
      'Luxury': 'price-luxury'
    };
    return classes[range] || '';
  };

  return (
    <article className="vendor-card card">
      <div className="vendor-card-header">
        <span className="badge badge-category">{category}</span>
        <span className={`price-badge ${getPriceRangeClass(priceRange)}`}>
          {priceRange}
        </span>
      </div>

      <div className="vendor-card-body">
        <h3 className="vendor-name">{name}</h3>
        
        <div className="vendor-location">
          <span className="location-icon">📍</span>
          <span>{location}</span>
        </div>
        
        <p className="vendor-description">
          {description.length > 120 
            ? `${description.substring(0, 120)}...` 
            : description}
        </p>
      </div>

      <div className="vendor-card-footer">
        <Link to={`/vendors/${_id}`} className="btn btn-outline">
          View Details
        </Link>
        <Link to={`/vendors/${_id}/quote`} className="btn btn-primary">
          Get Quote
        </Link>
      </div>
    </article>
  );
};

export default VendorCard;
