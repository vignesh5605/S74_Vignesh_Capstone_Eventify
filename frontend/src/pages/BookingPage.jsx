import api from '../services/api';
import useFetch from '../hooks/useFetch';

export default function BookingPage() {
  const { data: bookings, loading } = useFetch(() => api.get('/bookings'), []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Bookings</h2>
      {loading ? <p>Loading...</p> : bookings.map((booking) => (
        <div key={booking._id} className="mb-3 rounded bg-white p-4 shadow">
          <p className="font-medium">{booking.eventRequest?.eventTitle}</p>
          <p>Vendor: {booking.vendor?.name}</p>
          <p>Status: {booking.status}</p>
          <p>Final Price: ₹{booking.finalPrice}</p>
        </div>
      ))}
    </div>
  );
}
