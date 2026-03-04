import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import VendorProfilePage from './pages/VendorProfilePage';
import EventRequirementPage from './pages/EventRequirementPage';
import QuotesComparisonPage from './pages/QuotesComparisonPage';
import BookingPage from './pages/BookingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/vendors/:id" element={<VendorProfilePage />} />
        <Route path="/events/new" element={<ProtectedRoute role="customer"><EventRequirementPage /></ProtectedRoute>} />
        <Route path="/quotes/:eventId" element={<ProtectedRoute role="customer"><QuotesComparisonPage /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path="/dashboard/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
}
