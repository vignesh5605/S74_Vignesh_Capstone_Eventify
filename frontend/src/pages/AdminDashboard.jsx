import api from '../services/api';
import useFetch from '../hooks/useFetch';

export default function AdminDashboard() {
  const { data } = useFetch(() => api.get('/admin/analytics'), []);
  const stats = data || {};
  return (
    <div className="rounded bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded border p-3">Users: {stats.users || 0}</div>
        <div className="rounded border p-3">Vendors: {stats.vendors || 0}</div>
        <div className="rounded border p-3">Bookings: {stats.bookings || 0}</div>
        <div className="rounded border p-3">Events: {stats.events || 0}</div>
      </div>
    </div>
  );
}
