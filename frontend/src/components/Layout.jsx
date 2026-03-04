import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-brand">Eventify</Link>
          <div className="flex gap-4 text-sm">
            <NavLink to="/marketplace">Marketplace</NavLink>
            <NavLink to="/events/new">Post Event</NavLink>
            <NavLink to="/dashboard/customer">Customer</NavLink>
            <NavLink to="/dashboard/vendor">Vendor</NavLink>
            <NavLink to="/dashboard/admin">Admin</NavLink>
          </div>
          {user ? <button onClick={logout}>Logout</button> : <Link to="/auth/login">Login</Link>}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
