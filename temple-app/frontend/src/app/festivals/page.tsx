"use client";
import React from 'react';

export default function FestivalsPage() {
  const cards = [
    {
      title: "Annual Utsavam",
      image: "/images/timing_festival.png",
      tag: "10 Days",
      date: "April - May",
      desc: "The grand 10-day festival featuring Kodiyettam (flag hoisting), caparisoned elephant processions, traditional percussion (Chenda Melam), and the spectacular Arattu ceremony."
    },
    {
      title: "Vishu Festival",
      image: "/images/festival_vishu.png",
      tag: "1 Day",
      date: "April 14/15",
      desc: "Experience the auspicious Vishu Kani darshan at dawn. The temple is adorned with golden Konna flowers, and devotees receive Vishukkaineetam from the Melshanthi."
    },
    {
      title: "Navarathri",
      image: "/images/temple_pooja.png",
      tag: "9 Nights",
      date: "September - October",
      desc: "Nine nights of devotion to the Divine Mother. The festival culminates in Vidyarambham on Vijayadashami, where children are initiated into the world of learning."
    },
    {
      title: "Thai Pooyam",
      image: "/images/timing_festival.png",
      tag: "1 Day",
      date: "January - February",
      desc: "A spectacular display of devotion featuring vibrant Kavadi processions. Devotees offer milk and carry ornate wooden structures in a trance-like rhythmic dance."
    }
  ];

  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pb-32">
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brass/10 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sanctum-dark/5 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 md:px-8 pt-32">
        
        {/* 1. Hero Card */}
        <div className="relative bg-sanctum-dark rounded-[2.5rem] shadow-2xl p-10 md:p-20 overflow-visible mb-16 flex flex-col md:flex-row items-center border border-brass/20">
           <div className="absolute top-10 right-1/4 w-12 h-12 bg-cream rounded-xl rotate-12 opacity-80 animate-float" style={{ animationDelay: '1s' }} />
           <div className="absolute bottom-20 left-1/2 w-20 h-10 bg-brass rounded-t-full -rotate-45 opacity-80 animate-float" style={{ animationDelay: '3s' }} />
           <div className="absolute -top-6 -right-6 w-32 h-32 bg-sanctum rounded-bl-full opacity-50 animate-float" style={{ animationDelay: '5s' }} />

           <div className="w-full xl:w-3/5 relative z-10">
              <p className="font-mal text-brass font-bold tracking-[0.3em] uppercase mb-6 text-sm">ഉത്സവങ്ങൾ</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-cream leading-tight mb-8">
                Divine Celebrations <br/>& Festivals
              </h1>
              <p className="text-cream/80 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
                Immerse yourself in the vibrant spiritual energy of our grand festivals. Experience the rhythmic beats of the chenda, the glow of a thousand lamps, and the profound devotion of our community.
              </p>
              <div className="flex items-center space-x-6">
                <div className="bg-white text-sanctum-dark rounded-full px-6 py-3 flex items-center font-bold shadow-lg w-72 justify-between">
                  <span className="opacity-50">Search Festivals...</span>
                  <svg className="w-5 h-5 text-sanctum" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
           </div>

           <div className="hidden xl:block absolute right-[5%] top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-[16px] border-cream bg-white shadow-2xl overflow-hidden z-20 animate-glow-pulse">
              <img src="/images/festival_hero.png" alt="Festival Deity" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
           </div>
        </div>

        {/* 2. Join 2000+ devotees Banner - REDESIGNED */}
        <div className="border border-brass/20 py-10 mb-24 text-center bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-sanctum/5 via-brass/10 to-sanctum/5" />
           <p className="text-sanctum-dark font-display text-2xl font-bold mb-8 tracking-wide relative z-10">
             JOIN THOUSANDS OF DEVOTEES DURING OUR ANNUAL CELEBRATIONS
           </p>
           <div className="flex flex-wrap justify-center gap-6 md:gap-12 relative z-10 px-4">
             {/* Colorful Badges instead of grey shapes */}
             <div className="flex flex-col items-center justify-center bg-gradient-to-br from-brass to-brass-dark text-sanctum-dark w-40 h-40 rounded-full shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
               <span className="font-display text-4xl font-bold">1k+</span>
               <span className="text-sm font-bold tracking-widest uppercase mt-1">Devotees</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sanctum to-sanctum-dark text-cream w-40 h-40 rounded-full shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
               <span className="font-display text-4xl font-bold">3</span>
               <span className="text-sm font-bold tracking-widest uppercase mt-1">Elephants</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-gradient-to-br from-cream to-white text-sanctum-dark w-40 h-40 rounded-full shadow-2xl border border-brass/30 animate-float" style={{ animationDelay: '2s' }}>
               <span className="font-display text-4xl font-bold">25+</span>
               <span className="text-sm font-bold tracking-widest uppercase mt-1">Artists</span>
             </div>
             <div className="flex flex-col items-center justify-center bg-gradient-to-br from-brass-dark to-sanctum text-cream w-40 h-40 rounded-full shadow-2xl animate-float" style={{ animationDelay: '3s' }}>
               <span className="font-display text-4xl font-bold">5k+</span>
               <span className="text-sm font-bold tracking-widest uppercase mt-1">Lamps</span>
             </div>
           </div>
        </div>

        {/* 3. Fast Moving Carousel Section */}
        <div className="mb-32 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 relative px-4">
             <div className="absolute -top-10 right-0 w-32 h-32 bg-cream-dark rounded-bl-full" />
             <div className="w-full">
               <h2 className="font-display text-4xl md:text-5xl font-bold text-sanctum-dark mb-4">Discover upcoming <br/>auspicious events</h2>
               
               <div className="flex space-x-8 border-b border-brass/20 mt-8 overflow-x-auto hide-scrollbar w-full">
                 <button className="pb-4 font-bold text-sanctum-dark border-b-2 border-sanctum-dark whitespace-nowrap">Major Festivals</button>
                 <button className="pb-4 font-bold text-ink/40 hover:text-ink/80 transition-colors whitespace-nowrap">Monthly Observances</button>
                 <button className="pb-4 font-bold text-ink/40 hover:text-ink/80 transition-colors whitespace-nowrap">Special Poojas</button>
               </div>
             </div>
          </div>

          {/* Infinite Marquee Container */}
          <div className="w-full overflow-hidden relative py-4">
            {/* Left and Right fade overlays for smooth entrance/exit */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-cream to-transparent z-10" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-cream to-transparent z-10" />
            
            <div className="animate-marquee flex gap-8 w-max hover:[animation-play-state:paused]">
               {/* Original Cards */}
               {cards.map((card, idx) => (
                 <div key={`orig-${idx}`} className="shrink-0 w-[400px] bg-white rounded-3xl border border-brass/20 shadow-xl overflow-hidden group">
                   <div className="h-48 relative overflow-hidden">
                     <img src={card.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={card.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <span className="absolute bottom-4 left-4 bg-brass text-sanctum-dark font-bold text-xs px-3 py-1 rounded-full shadow-md">{card.tag}</span>
                   </div>
                   <div className="p-6">
                     <h3 className="font-display text-2xl font-bold text-sanctum-dark mb-4">{card.title}</h3>
                     <p className="text-ink/70 text-sm font-medium leading-relaxed mb-6">{card.desc}</p>
                     <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                       <span className="text-xs font-bold text-ink/50 uppercase">{card.date}</span>
                       <button className="text-sanctum font-bold hover:text-sanctum-dark">View Details &rarr;</button>
                     </div>
                   </div>
                 </div>
               ))}
               {/* Duplicated Cards for Infinite Loop effect */}
               {cards.map((card, idx) => (
                 <div key={`dup-${idx}`} className="shrink-0 w-[400px] bg-white rounded-3xl border border-brass/20 shadow-xl overflow-hidden group">
                   <div className="h-48 relative overflow-hidden">
                     <img src={card.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={card.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                     <span className="absolute bottom-4 left-4 bg-brass text-sanctum-dark font-bold text-xs px-3 py-1 rounded-full shadow-md">{card.tag}</span>
                   </div>
                   <div className="p-6">
                     <h3 className="font-display text-2xl font-bold text-sanctum-dark mb-4">{card.title}</h3>
                     <p className="text-ink/70 text-sm font-medium leading-relaxed mb-6">{card.desc}</p>
                     <div className="flex items-center justify-between border-t border-brass/10 pt-4">
                       <span className="text-xs font-bold text-ink/50 uppercase">{card.date}</span>
                       <button className="text-sanctum font-bold hover:text-sanctum-dark">View Details &rarr;</button>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 4. "How Festival Works" Grid */}
        <div className="relative mb-20 bg-cream-dark rounded-[3rem] p-10 md:p-16 border border-brass/20 shadow-xl">
           <div className="absolute -top-8 right-20 w-16 h-16 bg-sanctum rounded-tl-full rounded-br-full rotate-45 shadow-lg" />
           
           <div className="text-center mb-16">
             <h2 className="font-display text-4xl md:text-5xl font-bold text-sanctum-dark mb-4">The Festival Experience</h2>
             <p className="text-ink/70 font-medium max-w-2xl mx-auto">Our grand festivals are a symphony of rituals, art, and community. Here is what makes them truly extraordinary.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {/* Grid Card 1 */}
              <div className="bg-white rounded-3xl p-8 border border-brass/10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                 <div className="w-14 h-14 bg-sanctum/10 rounded-2xl flex items-center justify-center mb-6 border border-sanctum/20">
                   <svg className="w-6 h-6 text-sanctum" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                 </div>
                 <h4 className="font-display font-bold text-2xl text-sanctum-dark mb-3 relative z-10">Kodiyettam</h4>
                 <p className="text-ink/60 font-medium text-sm leading-relaxed relative z-10">The hoisting of the temple flag marks the divine commencement of the festival, infusing the entire region with spiritual energy.</p>
              </div>
              
              {/* Grid Card 2 */}
              <div className="bg-white rounded-3xl p-8 border border-brass/10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                 <div className="w-14 h-14 bg-sanctum/10 rounded-2xl flex items-center justify-center mb-6 border border-sanctum/20">
                   <svg className="w-6 h-6 text-sanctum" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                 </div>
                 <h4 className="font-display font-bold text-2xl text-sanctum-dark mb-3 relative z-10">Chenda Melam</h4>
                 <p className="text-ink/60 font-medium text-sm leading-relaxed relative z-10">Experience the heart-pounding rhythm of traditional Kerala percussion ensembles, elevating the mind to a state of joyous trance.</p>
              </div>

              {/* Grid Card 3 */}
              <div className="bg-white rounded-3xl p-8 border border-brass/10 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brass/5 rounded-bl-full group-hover:scale-150 transition-transform duration-700" />
                 <div className="w-14 h-14 bg-sanctum/10 rounded-2xl flex items-center justify-center mb-6 border border-sanctum/20">
                   <svg className="w-6 h-6 text-sanctum" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                 </div>
                 <h4 className="font-display font-bold text-2xl text-sanctum-dark mb-3 relative z-10">Annadanam</h4>
                 <p className="text-ink/60 font-medium text-sm leading-relaxed relative z-10">The grand feast where thousands of devotees sit together to partake in the sacred Prasadam, embodying the spirit of community and equality.</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Styles for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(calc(-50% - 1rem)); } 
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
          50% { box-shadow: 0 0 60px rgba(201, 162, 39, 0.5), 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
          100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 4s infinite;
        }
      `}} />
    </div>
  );
}
