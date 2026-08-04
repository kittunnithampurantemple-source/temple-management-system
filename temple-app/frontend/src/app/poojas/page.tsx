'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Pooja } from '@/lib/types';
import React from 'react';

const CornerMandala = ({ className, color, reverse }: { className: string, color: string, reverse?: boolean }) => (
  <div className={`fixed pointer-events-none z-[40] w-[400px] h-[400px] ${className}`}>
    <div className={`w-full h-full ${color} ${reverse ? 'animate-[spin_120s_linear_infinite_reverse]' : 'animate-[spin_120s_linear_infinite]'}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl opacity-40" fill="none" stroke="currentColor">
         {/* Concentric rings */}
         <circle cx="100" cy="100" r="95" strokeWidth="1" strokeDasharray="2 6" />
         <circle cx="100" cy="100" r="80" strokeWidth="2" opacity="0.6" />
         <circle cx="100" cy="100" r="65" strokeWidth="10" opacity="0.15" />
         <circle cx="100" cy="100" r="50" strokeWidth="1" />
         <circle cx="100" cy="100" r="25" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
         
         {/* Inner Lotus Petals */}
         {[...Array(12)].map((_, i) => (
           <path key={`petal1-${i}`} d="M100,50 Q115,75 100,100 Q85,75 100,50" transform={`rotate(${i * 30} 100 100)`} fill="currentColor" opacity="0.2" />
         ))}
         
         {/* Outer Diamond Accents */}
         {[...Array(24)].map((_, i) => (
           <path key={`diamond-${i}`} d="M100,5 L104,15 L100,20 L96,15 Z" transform={`rotate(${i * 15} 100 100)`} fill="currentColor" opacity="0.5" />
         ))}
      </svg>
    </div>
  </div>
);

export default function PoojasPage() {
  const { data, isLoading, error } = useQuery<Pooja[]>({
    queryKey: ['poojas'],
    queryFn: () => api.get('/poojas'),
  });

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pb-32">
      {/* Fixed Geometric Mandala Corners */}
      <CornerMandala className="-top-48 -left-48" color="text-brass" />
      <CornerMandala className="-top-48 -right-48" color="text-sanctum-dark" reverse />
      <CornerMandala className="-bottom-48 -left-48" color="text-sanctum" reverse />
      <CornerMandala className="-bottom-48 -right-48" color="text-brass" />

      {/* Background Animated Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brass/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-sanctum-dark/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 pt-24 md:pt-32">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
          <div className="relative bg-sanctum-dark rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row items-center border border-brass/20 p-10 md:p-16 lg:p-24">
             {/* Decorative Background Elements in Hero */}
             <div className="absolute inset-0 bg-gradient-to-br from-sanctum/20 via-transparent to-ink/40" />
             <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-brass rounded-full filter blur-[80px] opacity-20 animate-pulse" style={{ animationDuration: '8s' }} />
             
             <div className="w-full lg:w-1/2 relative z-10 mb-12 lg:mb-0 lg:pr-12">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-brass/30 bg-brass/10 backdrop-blur-md">
                  <p className="font-mal text-brass-light font-bold tracking-[0.2em] uppercase text-xs">വഴിപാടുകൾ</p>
                </div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-8">
                  Sacred Offerings <br/>
                  <span className="text-brass">& Spiritual Blessings</span>
                </h1>
                <p className="text-cream/80 text-lg md:text-xl font-medium leading-relaxed mb-10 drop-shadow-sm">
                  Connecting with the divine through ancient rituals. Offering a pooja is a profound way to express gratitude, seek guidance, and invite positive energy into your life. Select from our sacred offerings below to have the priests perform the ritual on your behalf.
                </p>
             </div>

             <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-square rounded-full border-8 border-brass/20 p-4 animate-[spin_120s_linear_infinite]">
                   <div className="w-full h-full rounded-full border border-cream/20 border-dashed overflow-hidden animate-[spin_60s_linear_infinite_reverse]">
                      {/* Using the temple pooja image, masking it circularly */}
                      <img src="/images/temple_pooja.png" alt="Pooja Ritual" className="w-full h-full object-cover rounded-full scale-110" />
                      <div className="absolute inset-0 bg-sanctum-dark/20 mix-blend-multiply rounded-full" />
                   </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute top-[20%] right-[-5%] w-16 h-16 bg-cream rounded-2xl rotate-12 opacity-80 animate-float shadow-lg backdrop-blur-md border border-white/40 flex items-center justify-center" style={{ animationDelay: '1s' }}>
                   <span className="text-2xl text-sanctum-dark">🕉️</span>
                </div>
                <div className="absolute bottom-[10%] left-[10%] w-20 h-20 bg-brass rounded-full opacity-90 animate-float shadow-2xl flex items-center justify-center border-4 border-white/20" style={{ animationDelay: '3s' }}>
                   <span className="text-3xl">✨</span>
                </div>
             </div>
          </div>
        </div>

        {/* Pooja Grid Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
          
          {/* Moving Background Elements: Grid Wave Design */}
          <div className="absolute inset-0 overflow-visible pointer-events-none z-0">
             {/* Background Dot Grid */}
             <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #4a1f1f 1.5px, transparent 0)', backgroundSize: '40px 40px' }} />
             
             {/* Sweeping Solid Wave 1 (Sanctum) */}
             <div className="absolute -top-[10%] -left-[20%] w-[140%] h-[80%] bg-sanctum-dark/5 rounded-[100%] blur-[60px] transform -rotate-12 animate-wave-slow" />
             
             {/* Sweeping Solid Wave 2 (Brass) */}
             <div className="absolute top-[30%] -right-[20%] w-[130%] h-[70%] bg-brass/10 rounded-[100%] blur-[80px] transform rotate-6 animate-wave-slow-reverse" />
             
             {/* Wireframe Wave 1 (Brass SVG) */}
             <svg className="absolute top-[10%] left-0 w-full h-[800px] opacity-20 animate-float" viewBox="0 0 1440 600" preserveAspectRatio="none">
               {[...Array(12)].map((_, i) => (
                 <path 
                   key={i} 
                   d={`M-100,${300 + i * 15} C300,${50 - i * 20} 800,${550 + i * 20} 1540,${250 - i * 15}`} 
                   stroke="currentColor" 
                   className="text-brass" 
                   strokeWidth="1.5" 
                   fill="none" 
                 />
               ))}
             </svg>
             
             {/* Wireframe Wave 2 (Sanctum SVG) - intersecting */}
             <svg className="absolute top-[40%] left-0 w-full h-[800px] opacity-[0.07] animate-float" style={{ animationDelay: '4s' }} viewBox="0 0 1440 600" preserveAspectRatio="none">
               {[...Array(10)].map((_, i) => (
                 <path 
                   key={i} 
                   d={`M-100,${150 + i * 20} C400,${550 + i * 15} 900,${50 - i * 10} 1540,${450 + i * 20}`} 
                   stroke="currentColor" 
                   className="text-sanctum-dark" 
                   strokeWidth="2" 
                   fill="none" 
                 />
               ))}
             </svg>
          </div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="font-display text-4xl md:text-5xl text-sanctum-dark font-bold mb-4 drop-shadow-sm">Available Poojas</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brass to-brass-dark mx-auto rounded-full mb-6" />
            <p className="text-ink/60 font-medium text-lg max-w-2xl mx-auto">Browse our list of daily and special poojas. Click on any offering to read its significance, view availability, and book online.</p>
          </div>

          {isLoading && (
             <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brass"></div>
             </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-sanctum p-6 rounded-r-xl shadow-md max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-sanctum" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-sanctum-dark">Connection Error</h3>
                  <div className="mt-2 text-sm text-sanctum-dark/80">
                    <p>Could not load poojas from the server. Ensure the backend API is running.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {data && data.length === 0 && (
             <div className="text-center py-20 bg-white/50 rounded-3xl border border-brass/20 shadow-inner">
                <p className="text-ink/60 text-lg font-medium">No poojas are currently published. Please check back later.</p>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {data?.map((pooja, index) => {
              // Cycle through 8 distinct, vibrant color themes
              const colorThemes = [
                { // 1. Deep Red
                  bg: "bg-gradient-to-br from-sanctum-dark via-sanctum to-sanctum-dark border-brass/40",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                },
                { // 2. Brass Gold
                  bg: "bg-gradient-to-br from-brass-dark via-brass to-brass-light border-white/40",
                  primary: "text-sanctum-dark",
                  secondary: "text-sanctum-dark/90",
                  tertiary: "text-sanctum-dark/70",
                  price: "text-sanctum-dark",
                  btn: "text-sanctum group-hover:text-sanctum-dark",
                  badge: "text-sanctum-dark bg-sanctum-dark/10 border-sanctum-dark/20",
                  glow: "bg-white"
                },
                { // 3. Deep Ink Blue
                  bg: "bg-gradient-to-br from-ink via-ink/90 to-teak-dark border-brass/30",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                },
                { // 4. Forest Emerald
                  bg: "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950 border-brass/30",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                },
                { // 5. Marigold Orange
                  bg: "bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 border-white/40",
                  primary: "text-sanctum-dark",
                  secondary: "text-sanctum-dark/90",
                  tertiary: "text-sanctum-dark/80",
                  price: "text-sanctum-dark",
                  btn: "text-sanctum group-hover:text-sanctum-dark",
                  badge: "text-sanctum-dark bg-sanctum-dark/10 border-sanctum-dark/20",
                  glow: "bg-white"
                },
                { // 6. Royal Purple
                  bg: "bg-gradient-to-br from-purple-900 via-fuchsia-900 to-indigo-950 border-brass/30",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                },
                { // 7. Rich Rose
                  bg: "bg-gradient-to-br from-rose-700 via-pink-700 to-rose-950 border-brass/30",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                },
                { // 8. Deep Cyan
                  bg: "bg-gradient-to-br from-cyan-900 via-sky-800 to-blue-950 border-brass/30",
                  primary: "text-brass",
                  secondary: "text-cream",
                  tertiary: "text-cream/70",
                  price: "text-brass",
                  btn: "text-brass group-hover:text-brass-light",
                  badge: "text-cream bg-white/10 border-white/20",
                  glow: "bg-brass"
                }
              ];
              const theme = colorThemes[index % 8];

              return (
                <div key={pooja.id} className="animate-slow-bob" style={{ animationDelay: `${(index % 8) * 0.4}s` }}>
                  <Link
                    href={`/poojas/${pooja.id}`}
                    className={`group relative ${theme.bg} backdrop-blur-md rounded-3xl p-8 border shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col min-h-[280px] animate-slide-up hover:-translate-y-2 block h-full`}
                    style={{ animationDelay: `${(index % 9) * 0.1}s`, animationFillMode: 'both' }}
                  >
                  {/* Subtle Noise Texture overlay */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                  
                  {/* Hover Background Glow */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 z-0 pointer-events-none" />
                  <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-0 pointer-events-none ${theme.glow}`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h2 className={`font-mal text-lg ${theme.primary} mb-1 font-bold drop-shadow-sm`}>{pooja.name}</h2>
                      <h3 className={`font-display text-2xl ${theme.secondary} font-bold transition-colors drop-shadow-md`}>{pooja.nameEn}</h3>
                    </div>
                    
                    {pooja.description && (
                      <p className={`text-sm ${theme.tertiary} flex-1 mb-6 line-clamp-3 font-medium leading-relaxed`}>
                        {pooja.description}
                      </p>
                    )}
                    
                    <div className={`flex items-center justify-between mt-auto pt-6 border-t border-white/10`}>
                      <span className={`font-display text-2xl font-bold ${theme.price} drop-shadow-sm`}>
                        ₹{Number(pooja.price).toFixed(2)}
                      </span>
                      
                      {pooja.isAvailable ? (
                          <div className={`flex items-center ${theme.btn} font-bold text-sm group-hover:translate-x-1 transition-transform`}>
                            Book Now <span className="ml-1">&rarr;</span>
                          </div>
                      ) : (
                          <span className={`text-xs font-bold ${theme.badge} px-3 py-1.5 rounded-full border`}>
                            Unavailable
                          </span>
                      )}
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-up {
          0% { translate: 0 40px; opacity: 0; }
          100% { translate: 0 0; opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes float {
          0% { translate: 0 0px; }
          50% { translate: 0 -15px; }
          100% { translate: 0 0px; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes slow-bob {
          0% { translate: 0 0px; }
          50% { translate: 0 -10px; }
          100% { translate: 0 0px; }
        }
        .animate-slow-bob {
          animation: slow-bob 5s ease-in-out infinite;
        }

        @keyframes wave-slow {
          0% { transform: translateX(-2%) translateY(0) rotate(-12deg) scale(1); }
          50% { transform: translateX(2%) translateY(2%) rotate(-10deg) scale(1.02); }
          100% { transform: translateX(-2%) translateY(0) rotate(-12deg) scale(1); }
        }
        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite;
        }

        @keyframes wave-slow-reverse {
          0% { transform: translateX(2%) translateY(0) rotate(6deg) scale(1); }
          50% { transform: translateX(-2%) translateY(-2%) rotate(8deg) scale(1.02); }
          100% { transform: translateX(2%) translateY(0) rotate(6deg) scale(1); }
        }
        .animate-wave-slow-reverse {
          animation: wave-slow-reverse 18s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
