import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <section className="rounded-xl bg-white p-10 shadow">
      <h1 className="text-4xl font-bold text-slate-800">Plan smarter events with Eventify</h1>
      <p className="mt-4 text-slate-600">Post requirements, receive multiple quotes, compare vendors, and book confidently.</p>
      <div className="mt-6 flex gap-4">
        <Link className="rounded bg-brand px-4 py-2 text-white" to="/events/new">Post Requirement</Link>
        <Link className="rounded border px-4 py-2" to="/marketplace">Explore Vendors</Link>
      </div>
    </section>
  );
}
