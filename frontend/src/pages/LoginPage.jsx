import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await api.post('/auth/login', data);
    login({ token: response.data.token, user: response.data.data.user });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-3 rounded bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">Login</h2>
      <input className="w-full rounded border p-2" placeholder="Email" {...register('email', { required: true })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" {...register('password', { required: true })} />
      <button className="w-full rounded bg-brand py-2 text-white">Login</button>
      <p className="text-sm">New user? <Link className="text-brand" to="/auth/register">Register</Link></p>
    </form>
  );
}
