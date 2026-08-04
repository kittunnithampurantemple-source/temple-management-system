import Link from 'next/link';

export default function HomePage() {
  const serviceCards = [
    { title: 'Book a Pooja', desc: 'Choose from Archana, Pushpanjali, Amavasi Pooja and more. Select your date, enter devotee details, and pay securely online.', href: '/poojas', cta: 'View Poojas', themeClass: 'glass-panel border-brass/30 hover:border-brass/70 hover:shadow-2xl', image: '/images/temple_pooja.png' },
    { title: 'Annual Schemes', desc: 'Enroll in a yearly Archana, Bhagavathy Pooja, or Homam plan with a single one-time payment and a renewal reminder.', href: '/schemes', cta: 'View Schemes', themeClass: 'glass-panel border-brass/30 hover:border-brass/70 hover:shadow-2xl', image: '/images/temple_deity.png' },
    { title: 'Donate', desc: 'Support general temple upkeep, festivals, development projects, or special events. Receive an instant receipt by email.', href: '/donate', cta: 'Donate Now', themeClass: 'glass-panel border-brass/30 hover:border-brass/70 hover:shadow-2xl', image: '/images/temple_offering.png' },
  ];

  const rituals = [
    { time: '5:00 AM', name: 'Nada Thurakkal', desc: 'Opening of the sanctum' },
    { time: '5:30 AM', name: 'Usha Pooja', desc: 'Morning rituals' },
    { time: '11:30 AM', name: 'Ucha Pooja', desc: 'Noon rituals' },
    { time: '12:00 PM', name: 'Nada Adakkal', desc: 'Temple closes' },
    { time: '5:00 PM', name: 'Nada Thurakkal', desc: 'Evening opening' },
    { time: '6:30 PM', name: 'Deeparadhana', desc: 'Grand lamp illumination' },
    { time: '8:00 PM', name: 'Athazha Pooja', desc: 'Night rituals' },
    { time: '8:30 PM', name: 'Nada Adakkal', desc: 'Temple closes' },
  ];

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-cream">
      {/* 12-Column Modern Grid Overlay (Global Visual Design Element) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center opacity-30 mix-blend-multiply h-full w-full">
        <div className="w-full max-w-7xl h-full grid grid-cols-12 gap-4 px-4 md:px-8 absolute top-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-[400vh] bg-brass/10" />
          ))}
        </div>
      </div>

      {/* Wavy Background Elements */}
      <div className="absolute top-[30%] w-full h-[600px] pointer-events-none z-0 opacity-40">
        <svg viewBox="0 0 1440 320" className="absolute top-0 w-full h-auto text-brass/20 fill-current">
          <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      <div className="absolute top-[65%] w-full h-[600px] pointer-events-none z-0 opacity-20">
        <svg viewBox="0 0 1440 320" className="absolute top-0 w-full h-auto text-sanctum-dark fill-current">
          <path d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,165.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-sanctum-dark text-cream py-24 md:py-36 z-10">
        
        {/* CSS for Sparks */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float-spark {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.5; }
            100% { transform: translateY(-150px) scale(0); opacity: 0; }
          }
          .animate-float-spark {
            animation: float-spark linear infinite;
          }
        `}} />

        {/* Background Gradients and Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sanctum via-sanctum-dark to-ink opacity-90" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        
        {/* Giant Glowing Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brass/15 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        {/* Rotating Subtle Mandala SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-10 pointer-events-none animate-[spin_60s_linear_infinite]">
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-brass">
            {[...Array(36)].map((_, i) => (
              <ellipse key={i} cx="50" cy="50" rx="45" ry="15" transform={`rotate(${i * 10} 50 50)`} />
            ))}
          </svg>
        </div>

        {/* Floating Divine Sparks - HARDCODED to avoid hydration errors! */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => {
            const sizes = [3, 5, 2, 4, 3, 5, 4, 2, 5, 3, 4, 2, 5, 3, 4, 5, 2, 3, 4, 2, 5, 3, 4, 2, 5];
            const lefts = [12, 45, 87, 23, 67, 34, 91, 15, 54, 76, 38, 82, 19, 61, 95, 27, 49, 73, 88, 5, 42, 68, 31, 57, 11];
            const tops = [34, 12, 56, 89, 21, 65, 43, 78, 14, 92, 47, 83, 29, 68, 11, 74, 51, 86, 25, 62, 39, 95, 17, 53, 81];
            const delays = [1.2, 4.5, 0.3, 3.1, 2.7, 4.1, 1.8, 3.5, 0.9, 2.2, 4.8, 1.5, 3.7, 2.4, 0.6, 3.9, 1.1, 2.8, 4.2, 0.4, 2.1, 3.3, 1.7, 4.6, 0.8];
            const durations = [12.5, 14.1, 18.2, 11.3, 15.6, 13.4, 16.8, 12.1, 19.4, 14.7, 10.5, 17.2, 13.9, 18.6, 11.8, 15.1, 19.9, 12.7, 16.4, 10.2, 17.5, 14.3, 11.1, 18.9, 15.4];
            return (
              <div 
                key={i}
                className="absolute bg-brass-light rounded-full opacity-0 animate-float-spark blur-[1px]"
                style={{
                  width: sizes[i] + 'px',
                  height: sizes[i] + 'px',
                  left: lefts[i] + '%',
                  top: tops[i] + '%',
                  animationDelay: delays[i] + 's',
                  animationDuration: durations[i] + 's'
                }}
              />
            );
          })}
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-brass rounded-full filter blur-[120px] opacity-20 animate-float" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-sanctum-light rounded-full filter blur-[100px] opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-[15%] w-16 h-16 rounded-full border-[3px] border-brass/20 animate-float opacity-70" />
        <div className="absolute bottom-40 right-[15%] w-20 h-20 rounded-lg border-2 border-cream/10 rotate-45 animate-float opacity-50" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-6xl mx-auto px-6 text-center animate-slide-up z-10 pt-10">
          <div className="inline-block mb-8 px-6 py-2 rounded-full glass-panel border-brass/40 shadow-[0_0_15px_rgba(201,162,39,0.2)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-brass/10 via-brass/20 to-brass/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <p className="relative font-mal text-brass-light font-bold text-sm tracking-[0.2em] uppercase z-10 drop-shadow-md">
              ഓം ഗം ഗണപതയേ നമഃ
            </p>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-cream to-brass drop-shadow-[0_4px_15px_rgba(201,162,39,0.3)] filter">
            A Sanctuary of Devotion,<br className="hidden md:block" /> Open to Every Heart
          </h1>
          
          <p className="max-w-2xl mx-auto text-cream/90 text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm">
            Book poojas, offer donations, or enroll in an annual scheme &mdash; from anywhere,
            with instant confirmation and a verified digital receipt.
          </p>
          
          <div className="mt-14 flex flex-wrap gap-6 justify-center">
            {/* Glowing Primary Button */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-brass-light via-brass to-brass-dark rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500 animate-pulse" />
              <Link href="/poojas" className="relative flex items-center justify-center overflow-hidden bg-gradient-to-r from-brass to-brass-dark text-ink px-10 py-4 rounded-full font-bold shadow-xl transition-all duration-300 focus-ring hover:-translate-y-1">
                <span className="relative z-10 text-lg uppercase tracking-wide">Book a Pooja &rarr;</span>
                <div className="absolute inset-0 h-full w-full bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Link>
            </div>
            
            {/* Elegant Secondary Button */}
            <Link href="/donate" className="glass-panel text-cream px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 focus-ring hover:-translate-y-1 border border-white/20 hover:border-white/40 shadow-lg text-lg uppercase tracking-wide flex items-center justify-center backdrop-blur-md">
              Make a Donation <span className="ml-2 text-brass">&hearts;</span>
            </Link>
          </div>
        </div>
        
        {/* Threshold bottom border */}
        <div className="absolute bottom-0 left-0 w-full threshold-border opacity-50" />
      </section>

      {/* Announcements Marquee */}
      <div className="bg-teak text-brass py-3 overflow-hidden flex whitespace-nowrap border-b border-brass/20">
        <div className="animate-marquee flex items-center space-x-8 font-medium tracking-wider text-sm">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8">
              <span>⭐ UPCOMING FESTIVAL HIGHLIGHTS</span>
              <span>•</span>
              <span>JOIN THE ANNADANAM SCHEME</span>
              <span>•</span>
              <span>NEW POOJA BOOKINGS OPEN</span>
              <span>•</span>
              <span>VOLUNTEER FOR WEEKEND SEVA</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick info strip */}
      <section className="relative z-20 max-w-5xl mx-auto px-4 w-full animate-slide-up mt-8" style={{ animationDelay: '0.2s' }}>
        <div className="glass-panel bg-cream/95 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-6 p-8 shadow-2xl border border-brass/20 backdrop-blur-xl">
          {[
            { time: '5:00 AM', label: 'Morning Opening', color: 'text-sanctum' },
            { time: '8:30 PM', label: 'Evening Closing', color: 'text-sanctum' },
            { time: '18+', label: 'Poojas Available', color: 'text-sanctum' },
            { time: 'Online', label: 'Secure Payments', color: 'text-sanctum' },
          ].map((info, idx) => (
            <div key={idx} className="text-center group">
              <p className={`font-display text-4xl font-bold ${info.color} group-hover:scale-110 group-hover:text-brass-dark transition-all duration-300`}>{info.time}</p>
              <p className="text-ink/70 font-semibold text-xs uppercase tracking-widest mt-2">{info.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Temple */}
      <section className="max-w-6xl mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative group">
            <div className="absolute inset-0 bg-brass/10 transform rotate-3 rounded-3xl" />
            <div className="absolute inset-0 bg-sanctum/5 transform -rotate-3 rounded-3xl" />
            <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-brass/20 shadow-xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brass/10 rounded-full blur-3xl group-hover:bg-brass/20 transition-all duration-500" />
              <h3 className="font-display text-3xl text-sanctum font-bold mb-4">A Legacy of Faith</h3>
              <p className="text-ink/80 leading-relaxed font-medium mb-6">
                Nestled in the heart of our community, the Kittunni Thampuran Temple (കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം) has stood as a beacon of hope and devotion for generations. Our sacred premises offer a tranquil escape from the bustling world, inviting devotees to seek blessings and find inner peace.
              </p>
              <p className="text-ink/80 leading-relaxed font-medium">
                Through our continuous charitable efforts, festivals, and daily rituals, we strive to uphold the rich traditions and spiritual values passed down by our ancestors, preserving them for the future.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="rounded-3xl overflow-hidden shadow-2xl group border border-brass/20 relative h-[450px]">
               <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/95 via-sanctum-dark/40 to-transparent z-10" />
               <img src="/images/temple_pooja.png" alt="Temple Pooja" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
               <div className="relative z-20 p-8 h-full flex flex-col justify-end text-left">
                  <h2 className="font-display text-4xl font-bold text-cream mb-4 drop-shadow-md">Embracing the Divine Presence</h2>
                  <div className="w-16 h-1 bg-brass-light mb-6 drop-shadow-sm rounded-full" />
                  <p className="text-cream/90 text-lg leading-relaxed font-medium drop-shadow-sm">
                    Every day at the temple begins with the resonant chanting of ancient mantras and the warm glow of oil lamps. Experience the profound energy that radiates from the sanctum, where faith meets eternity.
                  </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Temple Highlights Bento Box */}
      <section className="max-w-6xl mx-auto px-4 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {/* Large Card */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl glass-panel bg-white/40 border border-brass/20 p-8 flex flex-col justify-end hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/90 via-sanctum-dark/40 to-transparent z-0" />
            <div className="absolute inset-0 bg-[url('/images/temple_architecture.png')] bg-cover bg-center mix-blend-overlay group-hover:scale-105 transition-transform duration-700 -z-10" />
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-brass/20 backdrop-blur-md border border-brass/50 text-cream text-xs font-bold uppercase tracking-widest">
                Architecture
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Timeless Heritage</h3>
              <p className="text-cream/90 max-w-md">Explore the intricate carvings and centuries-old architectural marvels that make our temple a masterpiece of devotion.</p>
            </div>
          </div>
          
          {/* Medium Card 1 */}
          <div className="relative group overflow-hidden rounded-3xl glass-panel bg-sanctum-light/10 border border-brass/20 p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brass rounded-full filter blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <h3 className="font-display text-2xl font-bold text-sanctum relative z-10">Annadanam</h3>
            <p className="text-ink/70 mt-4 relative z-10 font-medium">Providing sacred food to thousands of devotees every week. Join our mission.</p>
            <Link href="/donate" className="mt-6 inline-block text-brass-dark font-bold relative z-10 hover:underline">
              Support Annadanam &rarr;
            </Link>
          </div>

          {/* Medium Card 2 */}
          <div className="relative group overflow-hidden rounded-3xl glass-panel bg-teak/5 border border-teak/20 p-8 flex flex-col justify-between hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teak rounded-full filter blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
            <h3 className="font-display text-2xl font-bold text-teak relative z-10">Veda Pathashala</h3>
            <p className="text-ink/70 mt-4 relative z-10 font-medium">Preserving ancient wisdom through free Vedic education for the next generation.</p>
            <Link href="/about" className="mt-6 inline-block text-teak font-bold relative z-10 hover:underline">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Rituals (Timings) */}
      <section className="relative bg-teak text-cream py-24 border-y-2 border-brass/30">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full threshold-border opacity-30" />
        <div className="absolute bottom-0 left-0 w-full threshold-border opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-4 z-10 text-center">
          <h2 className="font-display text-5xl font-bold mb-4 drop-shadow-md">Daily Rituals</h2>
          <p className="text-cream/80 text-lg mb-12 max-w-2xl mx-auto">Join us in our daily spiritual journey as we offer our prayers and devotion through traditional ceremonies.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {rituals.map((ritual, idx) => (
              <div key={idx} className="bg-teak-dark/50 backdrop-blur-md border border-brass/20 rounded-2xl p-6 hover:bg-teak-dark transition-colors duration-300">
                <p className="text-brass font-bold text-xl mb-2">{ritual.time}</p>
                <h4 className="font-display text-2xl font-bold mb-1">{ritual.name}</h4>
                <p className="text-cream/60 text-sm font-medium">{ritual.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-32 relative z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sanctum/5 rounded-full filter blur-[100px] -z-10" />
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl font-bold text-sanctum mb-6">Spiritual Offerings</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brass to-brass-dark mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {serviceCards.map((card, idx) => (
            <div key={card.title} className={`group ${card.themeClass} rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between border border-brass/20 shadow-xl hover:shadow-2xl bg-sanctum-dark`}>
              {/* Fully visible image with dark gradient overlay */}
              <div className="absolute inset-0 z-0">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/95 via-sanctum-dark/60 to-sanctum-dark/20 group-hover:from-sanctum-dark/90 group-hover:via-sanctum-dark/40 transition-colors duration-700" />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-6 border-2 border-brass/50 shadow-lg">
                   <img src={card.image} alt="Icon" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h3 className="font-display text-3xl font-bold text-cream mb-4 drop-shadow-md">{card.title}</h3>
                <p className="text-cream/90 leading-relaxed mb-8 font-medium min-h-[80px] drop-shadow-sm">{card.desc}</p>
                <Link href={card.href} className="inline-flex items-center text-cream font-bold px-5 py-2 rounded-full glass-panel border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all shadow-sm">
                  <span className="mr-2">{card.cta}</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Devotee Experiences (Testimonials) */}
      <section className="py-24 bg-cream-dark/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-sanctum mb-4">Devotee Experiences</h2>
            <div className="w-16 h-1 bg-brass mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              { text: "The peace I feel here is unmatched. The online booking system made planning our family's annual pooja completely stress-free.", author: "Anjali Menon" },
              { text: "A beautifully maintained temple with rituals that resonate deep within. The new Annadanam hall is a blessing to the community.", author: "Rajesh Kumar" },
              { text: "Receiving digital receipts for our monthly donations instantly has been incredibly convenient. Truly a modern approach to ancient traditions.", author: "Dr. Suresh Nair" }
            ].map((testimonial, idx) => (
              <div key={idx} className="glass-panel bg-white/60 p-8 rounded-3xl relative hover:shadow-[0_10px_40px_rgba(122,31,31,0.1)] transition-shadow duration-300">
                <div className="text-6xl text-brass/20 font-serif absolute top-4 left-6">"</div>
                <p className="text-ink/80 font-medium italic relative z-10 mt-6 mb-6">{testimonial.text}</p>
                <p className="text-sanctum font-bold font-display text-lg">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Quote */}
      <section className="bg-sanctum-dark text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-sanctum-dark to-sanctum opacity-80" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full threshold-border opacity-50" />
        <div className="absolute bottom-0 left-0 w-full threshold-border opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="font-mal text-brass text-2xl md:text-4xl font-medium leading-relaxed mb-6 opacity-90 drop-shadow-md">
            ലോകാ സമസ്താ സുഖിനോ ഭവന്തു
          </p>
          <p className="font-display text-3xl md:text-5xl italic text-cream/90 font-medium tracking-wide">
            "May all beings everywhere be happy and free"
          </p>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h3 className="font-display text-3xl font-bold text-sanctum mb-4">Stay Connected</h3>
        <p className="text-ink/70 font-medium mb-8">Subscribe to receive updates on upcoming festivals, pooja timings, and temple news.</p>
        <form className="relative group flex items-center max-w-xl mx-auto" action="#">
          <div className="absolute -inset-1 bg-gradient-to-r from-brass to-sanctum rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex w-full bg-white rounded-full p-2 ring-1 ring-black/5">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-2 outline-none text-ink placeholder:text-ink/40 font-medium"
              required
            />
            <button type="button" className="bg-sanctum text-white px-8 py-3 rounded-full font-bold hover:bg-sanctum-light transition-colors">
              Subscribe
            </button>
          </div>
        </form>
      </section>

      {/* Lookup Section */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="glass-panel bg-white/70 rounded-3xl p-12 border border-brass/30 relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-brass rounded-full filter blur-[80px] opacity-20" />
          <h2 className="font-display text-4xl font-bold text-sanctum mb-4 relative z-10">Lost a Receipt?</h2>
          <p className="text-ink/70 text-lg mb-8 relative z-10 max-w-lg mx-auto font-medium">Look up any booking using the number sent to you by email or SMS.</p>
          <Link href="/booking/success" className="relative z-10 inline-flex items-center justify-center bg-gradient-to-r from-sanctum to-sanctum-dark text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ring-2 ring-transparent hover:ring-brass/50 ring-offset-2">
            Find My Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
