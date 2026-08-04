'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';
import { Pooja } from '@/lib/types';
import { openRazorpayCheckout } from '@/lib/razorpay';
import toast from 'react-hot-toast';

const bookingSchema = z.object({
  poojaDate: z.string().min(1, 'Please select a date'),
  devoteeName: z.string().min(2, 'Enter the devotee name'),
  nakshatra: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  address: z.string().optional(),
});
type BookingForm = z.infer<typeof bookingSchema>;

export default function PoojaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const poojaId = params.id as string;
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { data: pooja, isLoading } = useQuery<Pooja>({
    queryKey: ['pooja', poojaId],
    queryFn: () => api.get(`/poojas/${poojaId}`),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (form: BookingForm) => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      toast.error('Please log in to book a pooja.');
      router.push('/login');
      return;
    }

    setServerError(null);
    setSubmitting(true);
    try {
      // 1. Create a PENDING_PAYMENT booking on our backend.
      const booking = await api.post('/bookings', { poojaId, ...form });

      // 2. Create a Razorpay order tied to that booking (amount decided server-side).
      const order = await api.post('/payments/razorpay/order', {
        sourceType: 'BOOKING',
        sourceId: booking.id,
      });

      // 3. Open Razorpay checkout.
      await openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        keyId: order.keyId,
        name: 'Kittunni Thampuran Temple',
        description: pooja?.nameEn || 'Pooja Booking',
        prefill: { name: form.devoteeName, email: form.email, contact: form.phone },
        onSuccess: async (response) => {
          // 4. Verify signature server-side - this is the only thing that
          // actually confirms the booking; the checkout "success" alone is not trusted.
          try {
            await api.post('/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push(`/booking/success?bookingNumber=${booking.bookingNumber}`);
          } catch {
            setServerError('Payment verification failed. If money was deducted, contact the temple office with your booking number: ' + booking.bookingNumber);
          }
        },
        onFailure: () => setSubmitting(false),
      });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="max-w-3xl mx-auto px-4 py-16">Loading...</div>;
  if (!pooja) return <div className="max-w-3xl mx-auto px-4 py-16">Pooja not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-mal text-xl text-ink/70">{pooja.name}</h1>
      <h2 className="font-display text-4xl text-sanctum mb-2">{pooja.nameEn}</h2>
      <p className="text-ink/70 mb-1">{pooja.description}</p>
      <p className="font-display text-2xl text-brass-dark mb-8">₹{Number(pooja.price).toFixed(2)}</p>

      <div className="threshold-border mb-8 w-32" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white/50 border border-brass/30 rounded-sm p-6">
        <div>
          <label className="block text-sm text-ink/70 mb-1">Pooja Date *</label>
          <input type="date" {...register('poojaDate')} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
          {errors.poojaDate && <p className="text-red-700 text-xs mt-1">{errors.poojaDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-ink/70 mb-1">Devotee Name *</label>
          <input {...register('devoteeName')} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
          {errors.devoteeName && <p className="text-red-700 text-xs mt-1">{errors.devoteeName.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-ink/70 mb-1">Nakshatra (Star)</label>
          <input {...register('nakshatra')} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-ink/70 mb-1">Email *</label>
            <input type="email" {...register('email')} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
            {errors.email && <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-ink/70 mb-1">Phone *</label>
            <input {...register('phone')} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
            {errors.phone && <p className="text-red-700 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm text-ink/70 mb-1">Address</label>
          <textarea {...register('address')} rows={2} className="w-full border border-brass/40 rounded-sm px-4 py-2 focus-ring" />
        </div>

        {serverError && <p className="text-red-700 bg-red-50 border border-red-200 p-3 rounded-sm text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-sanctum text-cream py-3 rounded-sm font-semibold hover:bg-sanctum-dark transition-colors disabled:opacity-50"
        >
          {submitting ? 'Processing...' : `Pay ₹${Number(pooja.price).toFixed(2)} & Book`}
        </button>
      </form>
    </div>
  );
}
