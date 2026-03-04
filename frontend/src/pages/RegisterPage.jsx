import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm({ defaultValues: { role: 'customer' } });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await api.post('/auth/register', data);
    navigate('/auth/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-3 rounded bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">Register</h2>
      <input className="w-full rounded border p-2" placeholder="Name" {...register('name', { required: true })} />
      <input className="w-full rounded border p-2" placeholder="Email" {...register('email', { required: true })} />
      <input className="w-full rounded border p-2" type="password" placeholder="Password" {...register('password', { required: true })} />
      <select className="w-full rounded border p-2" {...register('role')}>
        <option value="customer">Customer</option>
        <option value="vendor">Vendor</option>
      </select>
      <button className="w-full rounded bg-brand py-2 text-white">Create account</button>
    </form>
  );
}
