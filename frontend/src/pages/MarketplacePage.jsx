import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import useFetch from '../hooks/useFetch';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const { data: vendors, loading } = useFetch(() => api.get(`/vendors?search=${search}`), [search]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Vendor Marketplace</h2>
      <input className="mb-5 w-full rounded border p-2" placeholder="Search location/category..." value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading ? <p>Loading...</p> : (
        <div className="grid gap-4 md:grid-cols-2">
          {vendors.map((vendor) => (
            <article key={vendor._id} className="rounded bg-white p-4 shadow">
              <h3 className="font-semibold">{vendor.user?.name}</h3>
              <p className="text-sm">{vendor.category?.name} · {vendor.location}</p>
              <p className="mt-2 text-sm">Starting at ₹{vendor.startingPrice}</p>
              <Link to={`/vendors/${vendor._id}`} className="mt-3 inline-block text-brand">View profile</Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
