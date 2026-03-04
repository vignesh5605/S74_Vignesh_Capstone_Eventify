import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  return <div className="rounded bg-white p-6 shadow"><h2 className="text-2xl font-semibold">Customer Dashboard</h2><p className="mt-2">Track events, quotes, bookings, and reviews.</p><Link className="text-brand" to="/bookings">Go to bookings</Link></div>;
}
