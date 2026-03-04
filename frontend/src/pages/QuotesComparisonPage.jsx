import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function QuotesComparisonPage() {
  const { eventId } = useParams();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    api.get(`/quotes/event/${eventId}`).then((res) => setQuotes(res.data.data));
  }, [eventId]);

  const acceptQuote = async (id) => {
    await api.patch(`/quotes/${id}/accept`);
    setQuotes((prev) => prev.map((q) => ({ ...q, status: q._id === id ? 'accepted' : 'rejected' })));
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">Compare Quotes</h2>
      {quotes.map((quote) => (
        <div key={quote._id} className="rounded bg-white p-4 shadow">
          <p className="font-medium">{quote.vendor.name} — ₹{quote.price}</p>
          <p>{quote.serviceBreakdown}</p>
          <p className="text-sm text-slate-600">Timeline: {quote.timeline}</p>
          <p className="text-sm">Status: {quote.status}</p>
          {quote.status === 'pending' && <button onClick={() => acceptQuote(quote._id)} className="mt-2 rounded bg-brand px-3 py-1 text-white">Accept Quote</button>}
        </div>
      ))}
    </div>
  );
}
