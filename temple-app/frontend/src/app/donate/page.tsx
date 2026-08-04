'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';
import { openRazorpayCheckout } from '@/lib/razorpay';
import toast from 'react-hot-toast';

const donationSchema = z.object({
  donationType: z.enum(['GENERAL', 'FESTIVAL', 'TEMPLE_DEVELOPMENT', 'SPECIAL_EVENT']),
  donorName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  panNumber: z.string().optional(),
  amount: z.coerce.number().min(10, 'Minimum donation is ₹10'),
  message: z.string().optional(),
});
type DonationForm = z.infer<typeof donationSchema>;

const typeLabels: Record<string, string> = {
  GENERAL: 'General Offering',
  FESTIVAL: 'Festival Support',
  TEMPLE_DEVELOPMENT: 'Temple Renovation',
  SPECIAL_EVENT: 'Annadanam (Meals)',
};

const typeIcons: Record<string, string> = {
  GENERAL: '🙏',
  FESTIVAL: '🪔',
  TEMPLE_DEVELOPMENT: '🏛️',
  SPECIAL_EVENT: '🍚',
};

const presetAmounts = [101, 501, 1001, 5001];

export default function DonatePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DonationForm>({
    resolver: zodResolver(donationSchema),
    defaultValues: { donationType: 'GENERAL', amount: 501 },
  });
  const amount = watch('amount');
  const selectedType = watch('donationType');

  const onSubmit = async (form: DonationForm) => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      toast.error('Please log in to make a donation.');
      router.push('/login');
      return;
    }

    setServerError(null);
    setSubmitting(true);
    try {
      const donation = await api.post('/donations', { ...form, email: form.email || undefined });
      const order = await api.post('/payments/razorpay/order', {
        sourceType: 'DONATION',
        sourceId: donation.id,
      });
      await openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        keyId: order.keyId,
        name: 'Kittunni Thampuran Temple',
        description: typeLabels[form.donationType],
        prefill: { name: form.donorName, email: form.email || '', contact: form.phone || '' },
        onSuccess: async (response) => {
          try {
            await api.post('/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push(`/booking/success?donationNumber=${donation.donationNumber}`);
          } catch {
            setServerError('Payment verification failed. Reference: ' + donation.donationNumber);
          }
        },
        onFailure: () => setSubmitting(false),
      });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong.');
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pb-32">
      {/* Elegant Floating Ambient Orbs Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Right Brass Glow */}
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-brass/15 blur-[120px] animate-ambient-drift" />
        {/* Bottom Left Sanctum Glow */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-sanctum/10 blur-[120px] animate-ambient-drift" style={{ animationDelay: '-5s', animationDirection: 'reverse' }} />
        {/* Center Accent */}
        <div className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-orange-500/5 blur-[100px] animate-ambient-drift" style={{ animationDelay: '-10s' }} />
        
        {/* Subtle Noise Texture overlay to make it look premium */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center mb-20 animate-slide-up">
          <h1 className="font-display text-5xl md:text-7xl text-sanctum-dark font-bold mb-6 drop-shadow-sm">Support the Divine</h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-sanctum to-brass mx-auto rounded-full mb-8 shadow-sm" />
          <p className="text-ink/80 font-medium text-lg md:text-xl max-w-3xl mx-auto backdrop-blur-md bg-white/40 p-6 rounded-2xl border border-brass/20 shadow-xl leading-relaxed">
            Your generous contributions sustain our ancient heritage. From providing daily free meals (Annadanam) to thousands, to maintaining the sacred temple architecture and running Vedic schools, every donation makes a profound impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: CONTENT & IMAGES */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl group">
                <img src="/images/temple_deepam.png" alt="Diyas" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white font-display text-2xl font-bold">Festivals</h3>
                </div>
              </div>
              <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-2xl group mt-12">
                <img src="/images/temple_architecture.png" alt="Temple Architecture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-white font-display text-2xl font-bold">Heritage</h3>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-brass/30 p-8 rounded-[2rem] shadow-xl">
              <h3 className="font-display text-3xl text-sanctum-dark font-bold mb-6">Impact of Your Giving</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-4">🍚</span>
                  <div>
                    <h4 className="font-bold text-ink">Annadanam (Food Distribution)</h4>
                    <p className="text-sm text-ink/70">Feeding thousands of devotees and those in need every single day.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-4">🐄</span>
                  <div>
                    <h4 className="font-bold text-ink">Goshala (Cow Sanctuary)</h4>
                    <p className="text-sm text-ink/70">Providing shelter, medical care, and lifelong protection for sacred cows.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-4">📚</span>
                  <div>
                    <h4 className="font-bold text-ink">Veda Patashala</h4>
                    <p className="text-sm text-ink/70">Offering free education in ancient Vedic scriptures to young students.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* RIGHT: DONATION FORM */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white/70 backdrop-blur-2xl border-2 border-brass/30 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-brass/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-sanctum/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl font-display text-sanctum-dark font-bold mb-2">Secure Donation</h2>
                <p className="text-ink/60 mb-8 font-medium">All donations are eligible for 80G tax exemption.</p>

                {/* Donation Type Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-ink/80 mb-3">Where should your donation go?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(typeLabels).map(([value, label]) => {
                      const isSelected = selectedType === value;
                      return (
                        <label key={value} className={`relative flex items-center p-4 cursor-pointer rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'border-sanctum bg-sanctum/10 shadow-md transform -translate-y-1' : 'border-brass/30 bg-white/50 hover:bg-white/80'}`}>
                          <input type="radio" value={value} {...register('donationType')} className="sr-only" />
                          <span className="text-2xl mr-3">{typeIcons[value]}</span>
                          <span className={`font-semibold text-sm ${isSelected ? 'text-sanctum-dark' : 'text-ink/80'}`}>{label}</span>
                          {isSelected && <div className="absolute inset-0 border-2 border-sanctum rounded-2xl animate-pulse opacity-50 pointer-events-none" />}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-ink/80 mb-3">Select or Enter Amount (₹)</label>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {presetAmounts.map((a) => {
                      const isSelected = Number(amount) === a;
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setValue('amount', a)}
                          className={`py-3 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${isSelected ? 'bg-gradient-to-br from-brass to-brass-dark border-transparent text-white shadow-lg transform -translate-y-1' : 'bg-white/50 border-brass/30 text-ink/80 hover:bg-brass/10'}`}
                        >
                          ₹{a}
                        </button>
                      );
                    })}
                  </div>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-ink/50 text-xl">₹</span>
                    <input type="number" {...register('amount')} className="w-full bg-white border-2 border-brass/40 rounded-2xl pl-12 pr-5 py-4 text-xl font-bold text-sanctum-dark focus:outline-none focus:ring-4 focus:ring-sanctum/20 focus:border-sanctum transition-all shadow-sm" placeholder="Other amount" />
                  </div>
                  {errors.amount && <p className="text-red-600 text-sm mt-2 font-medium">{errors.amount.message}</p>}
                </div>

                {/* Personal Details */}
                <div className="space-y-5 mb-8 p-6 bg-white/40 rounded-3xl border border-white/60 shadow-sm">
                  <h3 className="font-bold text-ink/80 mb-2 border-b border-brass/20 pb-2">Donor Details</h3>
                  <div>
                    <label className="block text-xs font-bold text-ink/60 mb-1 uppercase tracking-wider">Full Name *</label>
                    <input {...register('donorName')} className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm" />
                    {errors.donorName && <p className="text-red-600 text-xs mt-1">{errors.donorName.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink/60 mb-1 uppercase tracking-wider">Email</label>
                      <input type="email" {...register('email')} className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink/60 mb-1 uppercase tracking-wider">Phone</label>
                      <input {...register('phone')} className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink/60 mb-1 uppercase tracking-wider">PAN Number (For 80G Receipt) - Optional</label>
                    <input {...register('panNumber')} className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-3 text-ink uppercase focus:outline-none focus:ring-2 focus:ring-brass focus:border-transparent transition-all shadow-sm" />
                  </div>
                </div>

                {serverError && <p className="text-red-700 bg-red-50 border-2 border-red-200 p-4 rounded-xl text-sm mb-6 font-bold">{serverError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_25px_rgba(153,27,27,0.4)] transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-1 border border-sanctum-dark/50 flex items-center justify-center group"
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform">🤍</span>
                  {submitting ? 'Processing Securely...' : `Donate ₹${Number(amount || 0).toFixed(0)} Now`}
                </button>
                <p className="text-center text-xs text-ink/50 mt-4 font-medium flex items-center justify-center">
                  <span className="mr-1">🔒</span> 100% Secure Encrypted Payment
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes ambient-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3% , -5%) scale(1.05); }
          66% { transform: translate(-2%, 4%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-ambient-drift {
          animation: ambient-drift 20s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
