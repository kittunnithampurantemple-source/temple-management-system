export default function TimingsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-cream overflow-hidden pb-20">
      {/* Massive Diagonal Geometric Background - Fixed so it stays behind all content while scrolling */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute w-[200vw] h-[50vh] bg-brass/10 -rotate-45 transform origin-center shadow-[0_0_100px_rgba(201,162,39,0.2)]" />
        <div className="absolute w-[150vw] h-[30vh] bg-sanctum-dark/5 rotate-45 transform origin-center -translate-y-[20vh]" />
        <div className="absolute w-[100vw] h-[20vh] bg-white/40 rotate-[30deg] transform origin-center translate-y-[30vh]" />
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>
    
      {/* 1. Dashboard Container Wrapper */}
      <div className="relative z-10 w-full flex justify-center pt-32 pb-16 px-4 md:px-8">
        {/* Main Dashboard Container */}
        <div className="w-full max-w-[90rem] bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white/60 shadow-[0_40px_100px_rgba(45,43,85,0.15)] flex flex-col xl:flex-row overflow-hidden min-h-[800px] animate-slide-up">
          
          {/* Left Pane - Hero & Intro */}
          <div className="w-full xl:w-2/5 bg-cream-dark/40 p-10 md:p-16 flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-brass/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brass/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sanctum/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10">
              <div className="inline-block mb-8 px-4 py-1.5 rounded-full glass-panel border border-brass/40 shadow-sm bg-white/50">
                 <p className="font-mal text-sanctum font-bold text-sm tracking-widest uppercase">സമയക്രമം</p>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-sanctum-dark leading-tight mb-8 drop-shadow-sm">Daily Rituals <br/>& Timings</h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-brass to-brass-dark rounded-full mb-10 shadow-sm" />
              <p className="text-ink/80 text-xl leading-relaxed font-medium">Experience the divine rhythm of the temple. From the tranquil morning Nirmalya to the grand evening Deeparadhana, our doors are open for you to find peace and solace.</p>
            </div>
      
            <div className="relative z-10 mt-16 p-8 rounded-3xl bg-white/60 border border-brass/20 shadow-md">
               <h4 className="font-display text-2xl font-bold text-sanctum mb-3">Plan Your Visit</h4>
               <p className="text-ink/70 font-medium">Timings may vary during auspicious festival days and special lunar occasions. Please check our announcements for changes.</p>
            </div>
          </div>
      
          {/* Right Pane - Visual Grid Schedule */}
          <div className="w-full xl:w-3/5 p-10 md:p-16 bg-white/30 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
               
               {/* Morning Block */}
               <div className="md:row-span-2 rounded-3xl overflow-hidden relative group border border-brass/20 shadow-xl bg-white/80 flex flex-col">
                  <div className="h-64 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/80 via-sanctum-dark/20 to-transparent z-10 mix-blend-multiply" />
                    <img src="/images/timing_morning.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Morning Sunrise" />
                    <h3 className="absolute bottom-6 left-6 z-20 font-display text-4xl font-bold text-cream drop-shadow-md">Morning</h3>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center space-y-6">
                     <div className="flex justify-between items-center border-b border-brass/10 pb-4">
                       <div><h4 className="font-bold text-xl text-sanctum-dark">Nirmalya</h4><p className="text-ink/60 text-sm font-medium">Temple Opens</p></div>
                       <span className="font-display font-bold text-2xl text-brass-dark bg-brass/10 px-4 py-1 rounded-full">5:00 AM</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-brass/10 pb-4">
                       <div><h4 className="font-bold text-xl text-sanctum-dark">Usha Pooja</h4><p className="text-ink/60 text-sm font-medium">Morning Rituals</p></div>
                       <span className="font-display font-bold text-2xl text-brass-dark bg-brass/10 px-4 py-1 rounded-full">6:00 AM</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-brass/10 pb-4">
                       <div><h4 className="font-bold text-xl text-sanctum-dark">Pantheeradi</h4><p className="text-ink/60 text-sm font-medium">Special Offerings</p></div>
                       <span className="font-display font-bold text-2xl text-brass-dark bg-brass/10 px-4 py-1 rounded-full">8:00 AM</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <div><h4 className="font-bold text-xl text-sanctum-dark">Ucha Pooja</h4><p className="text-ink/60 text-sm font-medium">Noon Closes</p></div>
                       <span className="font-display font-bold text-2xl text-brass-dark bg-brass/10 px-4 py-1 rounded-full">12:00 PM</span>
                     </div>
                  </div>
               </div>
      
               {/* Evening Block */}
               <div className="rounded-3xl overflow-hidden relative group border border-brass/20 shadow-xl bg-white/80 flex flex-col">
                  <div className="h-40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/90 via-sanctum-dark/30 to-transparent z-10 mix-blend-multiply" />
                    <img src="/images/timing_evening.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Evening Ceremony" />
                    <h3 className="absolute bottom-5 left-6 z-20 font-display text-3xl font-bold text-cream drop-shadow-md">Evening</h3>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-center">
                     <div className="flex justify-between items-center border-b border-brass/10 pb-3">
                       <div><h4 className="font-bold text-lg text-sanctum-dark">Temple Reopens</h4></div>
                       <span className="font-display font-bold text-xl text-brass-dark">4:30 PM</span>
                     </div>
                     <div className="flex justify-between items-center border-b border-brass/10 pb-3">
                       <div><h4 className="font-bold text-lg text-sanctum-dark">Deeparadhana</h4><p className="text-ink/60 text-xs font-medium">Grand Lamp Ceremony</p></div>
                       <span className="font-display font-bold text-xl text-brass-dark">6:30 PM</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <div><h4 className="font-bold text-lg text-sanctum-dark">Athazha Pooja</h4><p className="text-ink/60 text-xs font-medium">Temple Closes</p></div>
                       <span className="font-display font-bold text-xl text-brass-dark">8:30 PM</span>
                     </div>
                  </div>
               </div>
               
               {/* Booking Call to Action */}
               <div className="rounded-3xl overflow-hidden relative group border border-brass/20 shadow-xl bg-gradient-to-br from-sanctum to-sanctum-dark p-8 flex flex-col justify-center text-center items-center hover:shadow-2xl transition-all duration-300">
                   <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                   <div className="absolute -top-10 -right-10 w-32 h-32 bg-brass rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity" />
                   <svg className="w-12 h-12 text-brass-light mb-4 relative z-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   <h3 className="font-display text-3xl font-bold text-cream mb-3 relative z-10 drop-shadow-md">Book a Pooja</h3>
                   <p className="text-cream/80 text-sm font-medium mb-6 relative z-10">Reserve your special pooja online ahead of time.</p>
                   <a href="/poojas" className="relative z-10 inline-block px-6 py-3 rounded-full bg-white text-sanctum font-bold hover:bg-brass-light hover:text-sanctum-dark transition-colors shadow-lg">View All Poojas</a>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Special Timings Section */}
      <div className="relative z-10 w-full bg-white/40 border-y border-white/60 backdrop-blur-md py-24 my-10">
         <div className="max-w-[90rem] mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl md:text-5xl font-bold text-sanctum-dark mb-4">Special Auspicious Days</h2>
               <p className="text-ink/70 font-medium text-lg max-w-2xl mx-auto">Certain days of the lunar calendar carry profound spiritual significance. Join us for these special extended ceremonies.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {/* Pournami */}
               <div className="rounded-3xl overflow-hidden relative group border border-brass/20 shadow-xl bg-sanctum-dark flex flex-col h-96">
                  <div className="absolute inset-0 z-0">
                     <img src="/images/timing_fullmoon.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" alt="Full Moon Pooja" />
                     <div className="absolute inset-0 bg-gradient-to-t from-sanctum-dark/95 via-sanctum-dark/40 to-transparent" />
                  </div>
                  <div className="relative z-10 p-10 flex-1 flex flex-col justify-end">
                     <div className="inline-block px-4 py-1 mb-4 rounded-full bg-brass/20 border border-brass/50 text-cream text-xs font-bold uppercase tracking-widest w-max backdrop-blur-md">Monthly</div>
                     <h3 className="font-display text-4xl font-bold text-cream mb-2 drop-shadow-md">Pournami Vilakku</h3>
                     <p className="text-cream/80 font-medium mb-4 drop-shadow-sm">Full Moon Evening Ceremonies</p>
                     <div className="flex items-center text-brass font-display text-2xl font-bold drop-shadow-md">
                        <span>6:30 PM - 9:30 PM</span>
                     </div>
                  </div>
               </div>
    
               {/* Pradosham */}
               <div className="rounded-3xl overflow-hidden relative group border border-brass/20 shadow-xl bg-cream-dark flex flex-col h-96">
                  <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-[0.05]" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brass/20 rounded-full blur-[80px]" />
                  <div className="relative z-10 p-10 flex-1 flex flex-col justify-between">
                     <div>
                       <div className="inline-block px-4 py-1 mb-4 rounded-full bg-sanctum/10 border border-sanctum/20 text-sanctum-dark text-xs font-bold uppercase tracking-widest w-max backdrop-blur-md">Bi-Monthly</div>
                       <h3 className="font-display text-4xl font-bold text-sanctum-dark mb-2">Pradosham Pooja</h3>
                       <p className="text-ink/70 font-medium">Sacred twilight offering to Lord Shiva</p>
                     </div>
                     <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-brass/20 pb-4">
                          <div><h4 className="font-bold text-lg text-sanctum">Pradosha Abhishekam</h4></div>
                          <span className="font-display font-bold text-2xl text-brass-dark">5:30 PM</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div><h4 className="font-bold text-lg text-sanctum">Deeparadhana</h4></div>
                          <span className="font-display font-bold text-2xl text-brass-dark">6:30 PM</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Etiquette Section */}
      <div className="relative z-10 w-full bg-sanctum-dark py-24 overflow-hidden shadow-2xl my-10">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent" />
         <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brass/10 rounded-full blur-[120px] -translate-y-1/2" />
         
         <div className="max-w-[90rem] mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
               <div className="w-full md:w-1/3">
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-6">Temple Etiquette</h2>
                  <div className="w-16 h-1 bg-brass rounded-full mb-8" />
                  <p className="text-cream/70 font-medium leading-relaxed">
                     To maintain the sanctity and spiritual purity of the temple premises, we humbly request all devotees to follow our traditional guidelines.
                  </p>
               </div>
               <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                     </div>
                     <h4 className="font-display font-bold text-2xl text-cream mb-3">Dress Code</h4>
                     <p className="text-cream/60 text-sm leading-relaxed">Traditional attire is mandatory. Men are requested to wear Mundu (Dhoti) and bare their upper body. Women are requested to wear Sarees, long skirts, or Salwar Kameez.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors">
                     <div className="w-12 h-12 rounded-full bg-brass/20 flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     </div>
                     <h4 className="font-display font-bold text-2xl text-cream mb-3">Photography</h4>
                     <p className="text-cream/60 text-sm leading-relaxed">Mobile phones and cameras must be kept in silent mode. Photography is strictly prohibited inside the inner circumambulation path (Chuttambalam).</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 4. Festival Banner Section */}
      <div className="relative z-10 w-full py-10 mb-10">
         <div className="max-w-[90rem] mx-auto px-4 md:px-8">
            <div className="rounded-[3rem] overflow-hidden relative shadow-2xl h-[400px] flex items-center group bg-sanctum-dark">
               <div className="absolute inset-0 z-0">
                 <img src="/images/timing_festival.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" alt="Temple Festival" />
                 <div className="absolute inset-0 bg-gradient-to-r from-sanctum-dark/95 via-sanctum-dark/70 to-transparent" />
               </div>
               
               <div className="relative z-10 p-10 md:p-20 max-w-3xl">
                  <div className="inline-block px-4 py-1 mb-6 rounded-full bg-brass text-sanctum-dark font-bold uppercase tracking-widest text-xs shadow-md">Upcoming Event</div>
                  <h2 className="font-display text-4xl md:text-6xl font-bold text-cream mb-4 drop-shadow-lg">Annual Utsavam</h2>
                  <p className="text-cream/90 text-lg md:text-xl font-medium mb-8 max-w-xl drop-shadow-sm">During the 10-day annual festival, the temple remains open continuously from 4:00 AM to 11:30 PM with special extended poojas and cultural programs.</p>
                  <button className="px-8 py-3 rounded-full bg-cream text-sanctum-dark font-bold hover:bg-brass transition-colors shadow-xl">
                     View Festival Schedule
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
