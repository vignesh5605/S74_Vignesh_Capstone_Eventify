import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function VendorProfilePage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    api.get(`/vendors/${id}`).then((res) => setVendor(res.data.data));
  }, [id]);

  if (!vendor) return <p>Loading vendor profile...</p>;

  return (
    <div className="rounded bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">{vendor.user.name}</h2>
      <p>{vendor.category?.name} · {vendor.location}</p>
      <p className="mt-3">{vendor.description}</p>
      <p className="mt-2">Rating: {vendor.rating.toFixed(1)} ({vendor.reviewsCount} reviews)</p>
    </div>
  );
}
