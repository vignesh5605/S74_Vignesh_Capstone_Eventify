import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import VendorsPage from './pages/VendorsPage/VendorsPage';
import VendorDetailPage from './pages/VendorDetailPage/VendorDetailPage';
import QuoteRequestPage from './pages/QuoteRequestPage/QuoteRequestPage';
import QuotesPage from './pages/QuotesPage/QuotesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/vendors" element={<VendorsPage />} />
            
            <Route path="/vendors/:id" element={<VendorDetailPage />} />
            
            <Route path="/vendors/:id/quote" element={<QuoteRequestPage />} />
            
            <Route path="/quotes" element={<QuotesPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </div>
  );
}

export default App;
