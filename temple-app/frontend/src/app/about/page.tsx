export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-cream to-cream-dark overflow-hidden">
      
      {/* Animated Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[800px] h-[800px] bg-brass/10 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-[10%] right-[-10%] w-[700px] h-[700px] bg-sanctum-dark/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '20s', animationDelay: '5s' }} />
      </div>

      {/* 12-Column Modern Grid Overlay (Visual Design Element) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center opacity-40 mix-blend-multiply">
        <div className="w-full max-w-7xl h-full grid grid-cols-12 gap-4 px-4 md:px-8">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full bg-brass/10" />
          ))}
        </div>
      </div>

      {/* Animated Wavy Background Elements */}
      <div className="absolute top-[20%] w-[200%] h-[600px] pointer-events-none z-0 opacity-40 animate-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute top-0 w-full h-full text-brass/20 fill-current">
          <path d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="absolute top-[50%] left-[-100%] w-[200%] h-[600px] pointer-events-none z-0 opacity-20 animate-wave-reverse">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute top-0 w-full h-full text-sanctum-dark fill-current">
          <path d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,165.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 text-center animate-slide-up">
          <div className="inline-block mb-6 px-6 py-2 rounded-full glass-panel border border-brass/30 shadow-md bg-white/50">
             <p className="font-mal text-sanctum font-bold text-sm tracking-widest uppercase">
              പാരമ്പര്യം
            </p>
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold leading-tight mb-6 text-sanctum-dark">
            Our Heritage & History
          </h1>
          <p className="max-w-2xl mx-auto text-ink/80 text-xl font-medium leading-relaxed">
            A spiritual haven standing as a testament to faith, ancient architecture, and generations of unwavering devotion.
          </p>
        </div>

        {/* Modern Bento Grid Content */}
        <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6">
            
            {/* Wide Card 1: History */}
            <div className="md:col-span-3 md:row-span-1 rounded-3xl glass-panel bg-white/70 border-brass/20 p-10 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl flex flex-col justify-center">
              <h2 className="font-display text-4xl font-bold text-sanctum mb-4">A Sanctuary Since Antiquity</h2>
              <p className="text-ink/80 text-lg leading-relaxed font-medium">
                The Kittunni Thampuran Temple (കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം) has served devotees for generations as a center of worship, culture, and community life in Kerala. The temple follows traditional Kerala customs, including intricate Thantric rituals, daily poojas, and vibrant seasonal festivals under the guidance of hereditary priests.
              </p>
            </div>

            {/* Square Image Card */}
            <div className="md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden relative group border border-brass/20 hover:shadow-2xl transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/90 via-sanctum-dark/20 to-transparent z-10" />
               <img src="/images/temple_deepam.png" alt="Temple Deepam" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
               <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                 <p className="text-brass-light font-bold uppercase tracking-widest text-sm drop-shadow-md">Divine Light</p>
               </div>
            </div>

            {/* Tall Image Card */}
            <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden relative group border border-brass/20 hover:shadow-2xl transition-all duration-500 h-[400px] md:h-auto">
               <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/95 via-sanctum-dark/40 to-transparent z-10" />
               <img src="/images/temple_architecture.png" alt="Temple Architecture" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
               <div className="relative z-20 p-10 h-full flex flex-col justify-end">
                 <div className="w-16 h-1.5 bg-brass rounded-full mb-6 drop-shadow-md" />
                 <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Temple Architecture</h3>
                 <p className="text-cream/90 font-medium text-lg drop-shadow-sm">
                   Constructed using ancient Vastu Shastra principles, the temple features exquisite woodwork, intricate stone carvings, and a majestic copper-plated roof that reflects the morning sun.
                 </p>
               </div>
            </div>

            {/* Medium Card: Deity */}
            <div className="md:col-span-2 md:row-span-1 rounded-3xl glass-panel bg-cream-dark/60 border-brass/20 p-10 hover:bg-white/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-display text-3xl font-bold text-sanctum mb-4">The Presiding Deity</h3>
              <p className="text-ink/80 font-medium leading-relaxed text-lg">
                The sacred sannidhanam houses our beloved deity, radiating peace and spiritual energy. Thousands of devotees visit daily to seek blessings, perform archana, and find solace in the divine presence.
              </p>
            </div>

            {/* Medium Card: Administration */}
            <div className="md:col-span-2 md:row-span-1 rounded-3xl glass-panel bg-white/60 border-brass/20 p-10 hover:bg-white/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-display text-3xl font-bold text-sanctum-dark mb-4">Trust Administration</h3>
              <p className="text-ink/75 font-medium leading-relaxed text-lg">
                Our managing trust and committee members are dedicated to preserving centuries-old traditions, maintaining the temple grounds, and organizing community welfare programs like the Annadanam scheme.
              </p>
            </div>

          </div>
        </div>
      </div>
      
      {/* Styles for Wave Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: translateX(0%); }
          50% { transform: translateX(-25%); }
          100% { transform: translateX(0%); }
        }
        .animate-wave {
          animation: wave 30s ease-in-out infinite;
        }
        .animate-wave-reverse {
          animation: wave 40s ease-in-out infinite reverse;
        }
      `}} />
    </div>
  );
}
