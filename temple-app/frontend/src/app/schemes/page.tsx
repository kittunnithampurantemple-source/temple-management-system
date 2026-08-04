'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/lib/api';
import { openRazorpayCheckout } from '@/lib/razorpay';

const schemes = [
  { name: 'Annual Archana', amount: 1001, desc: 'Daily Archana performed in your name for one full year.' },
  { name: 'Annual Bhagavathy Pooja', amount: 2501, desc: 'Monthly Bhagavathy Pooja for one year, with prasadam by post on request.' },
  { name: 'Annual Homam', amount: 5001, desc: 'Quarterly Homam performed for prosperity and protection, for one year.' },
];

const schemeSchema = z.object({
  schemeName: z.string().min(1),
  devoteeName: z.string().min(2, 'Enter the devotee name'),
  nakshatra: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  address: z.string().optional(),
  amount: z.coerce.number(),
  startDate: z.string().min(1, 'Select a start date'),
});
type SchemeForm = z.infer<typeof schemeSchema>;

export default function SchemesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(schemes[0]);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SchemeForm>({
    resolver: zodResolver(schemeSchema),
    defaultValues: { schemeName: schemes[0].name, amount: schemes[0].amount },
  });

  const selectScheme = (s: typeof schemes[0]) => {
    setSelected(s);
    setValue('schemeName', s.name);
    setValue('amount', s.amount);
  };

  const onSubmit = async (form: SchemeForm) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const scheme = await api.post('/schemes', form);
      const order = await api.post('/payments/razorpay/order', {
        sourceType: 'ANNUAL_SCHEME',
        sourceId: scheme.id,
      });
      await openRazorpayCheckout({
        orderId: order.orderId,
        amount: order.amount,
        keyId: order.keyId,
        name: 'Kittunni Thampuran Temple',
        description: form.schemeName,
        prefill: { name: form.devoteeName, email: form.email, contact: form.phone },
        onSuccess: async (response) => {
          try {
            await api.post('/payments/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push(`/booking/success?schemeNumber=${scheme.schemeNumber}`);
          } catch {
            setServerError('Payment verification failed. Reference: ' + scheme.schemeNumber);
          }
        },
        onFailure: () => setSubmitting(false),
      });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong.');
      setSubmitting(false);
    }
  };

  const colorThemes = [
    { 
      bg: "bg-gradient-to-br from-sanctum-dark via-sanctum to-sanctum-dark border-brass/40",
      primary: "text-brass", secondary: "text-cream", tertiary: "text-cream/70", price: "text-brass", glow: "bg-brass"
    },
    { 
      bg: "bg-gradient-to-br from-brass-dark via-brass to-brass-light border-white/40",
      primary: "text-sanctum-dark", secondary: "text-sanctum-dark/90", tertiary: "text-sanctum-dark/70", price: "text-sanctum-dark", glow: "bg-white"
    },
    { 
      bg: "bg-gradient-to-br from-ink via-ink/90 to-teak-dark border-brass/30",
      primary: "text-brass", secondary: "text-cream", tertiary: "text-cream/70", price: "text-brass", glow: "bg-brass"
    }
  ];

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pb-32 pt-24 md:pt-32">
      {/* 3D Glowing Wave Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply">
        <svg viewBox="0 0 1440 800" className="w-full h-full object-cover" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ffcc" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0066ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9900ff" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#33ccff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#cc00ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff0066" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff3366" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ff9933" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#33ccff" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <g filter="url(#glow3d)">
            {/* Thick translucent ribbon paths with SVG animation */}
            <path fill="none" stroke="url(#wave1)" strokeWidth="60" strokeLinecap="round" opacity="0.7">
              <animate attributeName="d" dur="15s" repeatCount="indefinite"
                values="
                  M -200 400 C 200 600, 400 200, 800 400 C 1200 600, 1400 200, 1800 400;
                  M -200 500 C 300 200, 500 700, 900 300 C 1300 600, 1500 100, 1800 500;
                  M -200 400 C 200 600, 400 200, 800 400 C 1200 600, 1400 200, 1800 400
                " />
            </path>
            <path fill="none" stroke="url(#wave2)" strokeWidth="80" strokeLinecap="round" opacity="0.5">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="
                  M -200 300 C 300 100, 500 700, 900 400 C 1300 100, 1500 500, 1800 300;
                  M -200 200 C 200 700, 600 200, 1000 600 C 1200 200, 1600 700, 1800 200;
                  M -200 300 C 300 100, 500 700, 900 400 C 1300 100, 1500 500, 1800 300
                " />
            </path>
            <path fill="none" stroke="url(#wave3)" strokeWidth="40" strokeLinecap="round" opacity="0.6">
              <animate attributeName="d" dur="18s" repeatCount="indefinite"
                values="
                  M -200 500 C 250 300, 450 600, 850 400 C 1250 200, 1450 500, 1800 300;
                  M -200 400 C 350 700, 550 200, 950 600 C 1150 100, 1350 700, 1800 400;
                  M -200 500 C 250 300, 450 600, 850 400 C 1250 200, 1450 500, 1800 300
                " />
            </path>
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
         {/* HEADER */}
         <div className="text-center mb-16 animate-slide-up">
           <h1 className="font-display text-5xl md:text-6xl text-sanctum-dark font-bold mb-4 drop-shadow-sm">Annual Pooja Schemes</h1>
           <div className="w-24 h-1.5 bg-gradient-to-r from-sanctum to-brass mx-auto rounded-full mb-6" />
           <p className="text-ink/80 font-medium text-lg max-w-2xl mx-auto backdrop-blur-md bg-white/40 p-4 rounded-xl border border-brass/20 shadow-sm">
             A one-time yearly payment for uninterrupted spiritual blessings. We will remind you before renewal.
           </p>
         </div>

         {/* SCHEME CARDS */}
         <div className="grid md:grid-cols-3 gap-8 mb-16">
           {schemes.map((s, index) => {
             const theme = colorThemes[index % 3];
             const isSelected = selected.name === s.name;
             
             return (
               <button
                 key={s.name}
                 onClick={() => selectScheme(s)}
                 type="button"
                 className={`group relative text-left ${theme.bg} backdrop-blur-xl rounded-3xl p-8 border shadow-xl transition-all duration-500 overflow-hidden min-h-[260px] animate-slide-up hover:-translate-y-2 flex flex-col ${isSelected ? 'ring-4 ring-sanctum/50 scale-105 z-20' : 'opacity-90 hover:opacity-100 scale-100 z-10'}`}
                 style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
               >
                 <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                 
                 {isSelected && (
                   <div className="absolute inset-0 bg-white/20 pointer-events-none mix-blend-overlay" />
                 )}
                 <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${theme.glow}`} />
                 
                 <div className="relative z-10 flex-1 flex flex-col">
                   <h3 className={`font-display text-3xl ${theme.secondary} font-bold mb-3 drop-shadow-md`}>{s.name}</h3>
                   <p className={`text-sm ${theme.tertiary} flex-1 mb-6 font-medium leading-relaxed`}>{s.desc}</p>
                   
                   <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                     <span className={`font-display text-3xl font-bold ${theme.price} drop-shadow-sm`}>
                       ₹{s.amount}<span className="text-sm opacity-60">/yr</span>
                     </span>
                     
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isSelected ? 'border-white bg-white/20' : 'border-white/30'}`}>
                        {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                     </div>
                   </div>
                 </div>
               </button>
             );
           })}
         </div>
      
         {/* FORM */}
         <div className="max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/60 backdrop-blur-xl border border-brass/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
             
             {/* Form background glow */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-brass/10 rounded-full blur-[80px] pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-sanctum/10 rounded-full blur-[80px] pointer-events-none" />

             <div className="relative z-10">
               <h2 className="text-2xl font-display text-sanctum-dark font-bold mb-8 flex items-center">
                 <span className="w-8 h-8 rounded-full bg-gradient-to-br from-sanctum to-brass text-cream flex items-center justify-center mr-3 text-sm">₹</span>
                 Complete Enrollment for {selected.name}
               </h2>

               <input type="hidden" {...register('schemeName')} />
               <input type="hidden" {...register('amount')} />

               <div className="grid md:grid-cols-2 gap-6 mb-6">
                 <div>
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Devotee Name *</label>
                   <input {...register('devoteeName')} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all shadow-sm" placeholder="Enter name" />
                   {errors.devoteeName && <p className="text-red-600 text-xs mt-2">{errors.devoteeName.message}</p>}
                 </div>
                 <div>
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Nakshatra (Star)</label>
                   <input {...register('nakshatra')} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all shadow-sm" placeholder="Optional" />
                 </div>
                 <div>
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Email *</label>
                   <input type="email" {...register('email')} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all shadow-sm" placeholder="your@email.com" />
                   {errors.email && <p className="text-red-600 text-xs mt-2">{errors.email.message}</p>}
                 </div>
                 <div>
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Phone *</label>
                   <input {...register('phone')} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all shadow-sm" placeholder="Mobile number" />
                   {errors.phone && <p className="text-red-600 text-xs mt-2">{errors.phone.message}</p>}
                 </div>
                 <div className="md:col-span-2">
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Address</label>
                   <textarea {...register('address')} rows={2} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink placeholder-ink/40 focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all resize-none shadow-sm" placeholder="Full postal address" />
                 </div>
                 <div>
                   <label className="block text-sm text-ink/80 mb-2 font-medium">Start Date *</label>
                   <input type="date" {...register('startDate')} className="w-full bg-white/80 border border-brass/40 rounded-xl px-5 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-sanctum/50 focus:border-sanctum/50 transition-all shadow-sm" />
                   {errors.startDate && <p className="text-red-600 text-xs mt-2">{errors.startDate.message}</p>}
                 </div>
               </div>

               {serverError && <p className="text-red-100 bg-red-900/50 border border-red-500/50 p-4 rounded-xl text-sm mb-6">{serverError}</p>}

               <button
                 type="submit"
                 disabled={submitting}
                 className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(153,27,27,0.3)] transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-1 relative overflow-hidden group border border-sanctum-dark/50"
               >
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                 {submitting ? 'Processing Secure Payment...' : `Enroll & Pay ₹${selected.amount}`}
               </button>
             </div>
           </form>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          0% { translate: 0 40px; opacity: 0; }
          100% { translate: 0 0; opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}} />
    </div>
  );
}
