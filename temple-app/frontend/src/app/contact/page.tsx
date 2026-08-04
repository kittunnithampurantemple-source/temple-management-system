export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-cream overflow-hidden pb-32">
      
      {/* Background Mandala Watermark & Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
        <div className="absolute w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] animate-[spin_120s_linear_infinite] text-brass/20">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current" preserveAspectRatio="xMidYMid meet">
            <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
          </svg>
        </div>
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-brass/10 blur-[100px] animate-ambient-drift" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-sanctum/10 blur-[100px] animate-ambient-drift" style={{ animationDelay: '-5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 md:pt-32 pb-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-2xl md:text-3xl text-brass font-medium mb-2 tracking-wide uppercase">Namaskaram</h2>
          <h1 className="font-display text-5xl md:text-7xl text-sanctum-dark font-bold mb-6 drop-shadow-sm">Contact Us</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-sanctum to-brass mx-auto rounded-full mb-8 shadow-sm" />
          <p className="text-ink/80 font-medium text-lg max-w-2xl mx-auto backdrop-blur-md bg-white/40 p-4 rounded-xl border border-brass/20 shadow-sm">
            Whether you wish to offer a pooja, volunteer, or simply seek guidance, we are here to assist you on your spiritual journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT: INFO CARDS & IMAGE GRID */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/70 backdrop-blur-xl border border-brass/30 p-6 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform group">
                <div className="w-12 h-12 bg-sanctum/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
                  📍
                </div>
                <h3 className="font-display text-xl text-sanctum-dark font-bold mb-2">Temple Office</h3>
                <p className="text-ink/70 font-medium text-sm">Kittunni Thampuran Temple (കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം)<br/>Tripunithura, Kerala, India</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl border border-brass/30 p-6 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform group">
                <div className="w-12 h-12 bg-brass/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
                  📞
                </div>
                <h3 className="font-display text-xl text-sanctum-dark font-bold mb-2">Reach Out</h3>
                <p className="text-ink/70 font-medium text-sm">+91-9999999999<br/>info@yourtemple.org</p>
              </div>

              <div className="sm:col-span-2 bg-gradient-to-br from-brass/20 to-sanctum/10 backdrop-blur-xl border border-brass/40 p-6 rounded-3xl shadow-xl flex items-center group">
                 <div className="w-12 h-12 bg-white/50 rounded-2xl flex items-center justify-center mr-6 group-hover:rotate-12 transition-transform text-2xl">
                  🛕
                </div>
                <div>
                  <h3 className="font-display text-xl text-sanctum-dark font-bold">Darshan Timings</h3>
                  <p className="text-ink/80 font-medium text-sm mt-1">Morning: 5:00 AM - 11:30 AM <br/> Evening: 5:00 PM - 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Masonry Image Grid */}
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group h-full">
                <img src="/images/temple_pooja.png" alt="Pooja" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl group">
                  <img src="/images/festival_vishu.png" alt="Festival" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-xl group">
                  <img src="/images/temple_deepam.png" alt="Deepam" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <form className="bg-white/80 backdrop-blur-2xl border-2 border-brass/30 rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-brass/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-sanctum/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <h2 className="text-3xl font-display text-sanctum-dark font-bold mb-2">Send a Message</h2>
                  <p className="text-ink/60 font-medium text-sm">We will get back to you as soon as possible.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-wider">Your Name *</label>
                  <input className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-4 text-ink focus:outline-none focus:ring-4 focus:ring-brass/20 focus:border-brass transition-all shadow-sm font-medium" placeholder="Enter your full name" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-wider">Email or Phone *</label>
                  <input className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-4 text-ink focus:outline-none focus:ring-4 focus:ring-brass/20 focus:border-brass transition-all shadow-sm font-medium" placeholder="How can we reach you?" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink/60 mb-2 uppercase tracking-wider">Message *</label>
                  <textarea rows={5} className="w-full bg-white border-2 border-brass/20 rounded-xl px-4 py-4 text-ink focus:outline-none focus:ring-4 focus:ring-brass/20 focus:border-brass transition-all shadow-sm font-medium resize-none" placeholder="What would you like to ask or share?" />
                </div>

                <button type="button" className="w-full bg-gradient-to-r from-sanctum to-sanctum-dark text-cream py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_25px_rgba(153,27,27,0.4)] transition-all duration-300 transform hover:-translate-y-1 border border-sanctum-dark/50 flex items-center justify-center group mt-4">
                  <span className="mr-2 group-hover:rotate-12 transition-transform">🕊️</span>
                  Send Message
                </button>
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
