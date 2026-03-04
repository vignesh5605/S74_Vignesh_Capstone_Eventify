import { useForm } from 'react-hook-form';
import api from '../services/api';
import { categories } from '../utils/constants';

export default function EventRequirementPage() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await api.post('/events', { ...data, servicesRequired: data.servicesRequired.split(',').map((item) => item.trim()) });
    reset();
    alert('Event requirement posted successfully.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 rounded bg-white p-6 shadow md:grid-cols-2">
      <input className="rounded border p-2" placeholder="Event title" {...register('eventTitle', { required: true })} />
      <input className="rounded border p-2" placeholder="Event type" {...register('eventType', { required: true })} />
      <input className="rounded border p-2" placeholder="Location" {...register('location', { required: true })} />
      <input className="rounded border p-2" type="date" {...register('date', { required: true })} />
      <input className="rounded border p-2" type="number" placeholder="Guests" {...register('numberOfGuests', { required: true })} />
      <input className="rounded border p-2" type="number" placeholder="Budget Min" {...register('budgetMin', { required: true })} />
      <input className="rounded border p-2" type="number" placeholder="Budget Max" {...register('budgetMax', { required: true })} />
      <input className="rounded border p-2" placeholder="Services required (comma separated)" list="categories" {...register('servicesRequired', { required: true })} />
      <datalist id="categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
      <textarea className="rounded border p-2 md:col-span-2" placeholder="Description" {...register('description', { required: true })} />
      <button className="rounded bg-brand px-4 py-2 text-white md:col-span-2">Post Event Requirement</button>
    </form>
  );
}
