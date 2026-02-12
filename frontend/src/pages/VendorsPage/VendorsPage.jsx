import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VendorCard from '../../components/VendorCard/VendorCard';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import Loader from '../../components/Loader/Loader';
import { getVendors } from '../../services/api';
import './VendorsPage.css';

const VendorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    fetchVendors();
  }, [selectedCategory]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getVendors(selectedCategory);
      setVendors(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="vendors-page">
      <div className="page-header">
        <div className="container">
          <h1>Find Your Perfect Vendor</h1>
          <p>Browse our curated selection of verified event vendors</p>
        </div>
      </div>

      <div className="container page-content">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading ? (
          <Loader text="Loading vendors..." />
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchVendors}>
              Try Again
            </button>
          </div>
        ) : vendors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No vendors found</h3>
            <p>No vendors match your current filter. Try selecting a different category.</p>
            <button 
              className="btn btn-primary" 
              onClick={() => handleCategoryChange('')}
            >
              View All Vendors
            </button>
          </div>
        ) : (
          <>
            <div className="results-info">
              <p>
                Showing <strong>{vendors.length}</strong> vendor{vendors.length !== 1 ? 's' : ''}
                {selectedCategory && <> in <strong>{selectedCategory}</strong></>}
              </p>
            </div>

            <div className="vendors-grid">
              {vendors.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorsPage;
