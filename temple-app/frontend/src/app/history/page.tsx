export default function HistoryPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-cream overflow-hidden">
      {/* 12-Column Modern Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center opacity-30 mix-blend-multiply h-full w-full">
        <div className="w-full max-w-7xl h-full grid grid-cols-12 gap-4 px-4 md:px-8 absolute top-0">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full bg-brass/10" />
          ))}
        </div>
      </div>

      {/* Undulating Landscape Waves (Bottom) */}
      <div className="absolute bottom-0 w-full h-[800px] pointer-events-none z-0 flex flex-col justify-end">
        {/* Back hill */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-32 w-full h-auto text-brass/20 fill-current translate-y-32">
          <path d="M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,85.3C960,85,1056,139,1152,170.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        {/* Middle hill */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-16 w-full h-auto text-sanctum-light/15 fill-current translate-y-16 drop-shadow-[0_-10px_20px_rgba(122,31,31,0.05)]">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,218.7C960,192,1056,128,1152,112C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        {/* Front hill */}
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-sanctum/15 fill-current drop-shadow-[0_-20px_30px_rgba(45,43,85,0.1)]">
          <path d="M0,128L60,149.3C120,171,240,213,360,208C480,203,600,149,720,138.7C840,128,960,160,1080,186.7C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      {/* Main Content Area - Floating Framed Window */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 md:px-8 py-24 mb-40 min-h-screen">
        
        {/* Outer Glowing Frosted Border */}
        <div className="w-full max-w-5xl rounded-[3rem] p-3 md:p-5 bg-white/40 border border-white/60 shadow-[0_40px_80px_rgba(45,43,85,0.15)] backdrop-blur-xl animate-slide-up">
          
          {/* Inner Screen/Tablet Container */}
          <div className="rounded-[2rem] bg-cream-dark/95 border border-brass/30 shadow-inner relative overflow-hidden flex flex-col">
            
            {/* Top Header inside Frame */}
            <div className="pt-16 pb-10 text-center px-6 border-b border-brass/10 bg-gradient-to-b from-white/60 to-transparent">
              <p className="font-mal text-sanctum font-bold text-sm tracking-widest uppercase mb-4 drop-shadow-sm">ചരിത്രം</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-sanctum-dark drop-shadow-md">Temple History</h1>
            </div>

            {/* Timeline Content */}
            <div className="p-8 md:p-16 space-y-20 relative">
               {/* Center Timeline line */}
               <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-brass via-brass-dark to-transparent -translate-x-1/2" />

               {/* Block 1 */}
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                 <div className="md:w-1/2 md:text-right relative">
                   <div className="hidden md:block absolute right-[-3.1rem] top-1/2 -translate-y-1/2 w-5 h-5 bg-cream border-4 border-brass rounded-full shadow-lg z-10" />
                   <h3 className="font-display text-3xl font-bold text-sanctum mb-2">800 AD</h3>
                   <h4 className="font-bold text-xl text-ink/90 mb-4">The Divine Genesis</h4>
                   <p className="text-ink/80 leading-relaxed font-medium">Legend speaks of a wandering sage who felt an undeniable spiritual pull at this very spot. Beneath a sprawling banyan tree, a divine manifestation (Swayambhu) appeared, marking the beginning of our sacred sanctuary.</p>
                 </div>
                 <div className="md:w-1/2 relative group w-full">
                   <div className="rounded-2xl overflow-hidden border border-brass/30 shadow-xl relative aspect-[4/3] bg-white/50">
                     <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/60 to-transparent z-10 mix-blend-multiply opacity-50 group-hover:opacity-20 transition-opacity duration-700" />
                     <img src="/images/history_genesis.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Divine Genesis" />
                   </div>
                 </div>
               </div>

               {/* Block 2 */}
               <div className="flex flex-col md:flex-row-reverse items-center gap-10 relative z-10">
                 <div className="md:w-1/2 md:text-left relative">
                   <div className="hidden md:block absolute left-[-3.1rem] top-1/2 -translate-y-1/2 w-5 h-5 bg-cream border-4 border-brass rounded-full shadow-lg z-10" />
                   <h3 className="font-display text-3xl font-bold text-sanctum mb-2">16th Century</h3>
                   <h4 className="font-bold text-xl text-ink/90 mb-4">The Royal Patronage</h4>
                   <p className="text-ink/80 leading-relaxed font-medium">Under the patronage of local kings, the temple underwent a massive architectural expansion. Master artisans were brought in to carve the exquisite wooden pillars and lay the magnificent copper-plated roof that still stands today.</p>
                 </div>
                 <div className="md:w-1/2 relative group w-full">
                   <div className="rounded-2xl overflow-hidden border border-brass/30 shadow-xl relative aspect-[4/3] bg-white/50">
                     <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/60 to-transparent z-10 mix-blend-multiply opacity-50 group-hover:opacity-20 transition-opacity duration-700" />
                     <img src="/images/history_renovation.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt="Royal Patronage" />
                   </div>
                 </div>
               </div>

               {/* Block 3 */}
               <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                 <div className="md:w-1/2 md:text-right relative">
                   <div className="hidden md:block absolute right-[-3.1rem] top-1/2 -translate-y-1/2 w-5 h-5 bg-cream border-4 border-brass rounded-full shadow-lg z-10" />
                   <h3 className="font-display text-3xl font-bold text-sanctum mb-2">1985</h3>
                   <h4 className="font-bold text-xl text-ink/90 mb-4">The Great Renovation</h4>
                   <p className="text-ink/80 leading-relaxed font-medium">Decades of weathering led to the historic Punarudharanam (re-consecration). Thousands of devotees from across the state came together, donating time and resources to restore the sanctum and rebuild the outer walls.</p>
                 </div>
                 <div className="md:w-1/2 relative group w-full">
                   <div className="rounded-2xl overflow-hidden border border-brass/30 shadow-xl relative aspect-[4/3] bg-white/60 flex flex-col items-center justify-center">
                     <svg className="w-12 h-12 text-brass mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"/></svg>
                     <p className="text-ink/40 font-bold uppercase tracking-widest text-sm">Archival Photo Placeholder</p>
                   </div>
                 </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
