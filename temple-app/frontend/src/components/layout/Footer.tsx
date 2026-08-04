export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      <div className="threshold-border opacity-50" />
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 text-sm relative z-10">
        <div>
          <h3 className="font-display text-2xl font-bold text-brass mb-4">കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം</h3>
          <p className="mb-1 text-cream/60">Tripunithura, Kerala, India</p>
          <p className="mb-1 text-cream/60 hover:text-brass transition-colors cursor-pointer">Phone: +91-9999999999</p>
          <p className="hover:text-brass transition-colors cursor-pointer">Email: info@yourtemple.org</p>
        </div>
        <div>
          <h4 className="font-display text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="/poojas" className="text-cream/60 hover:text-brass transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-brass/50 mr-2 group-hover:w-3 transition-all duration-300"></span> Book a Pooja</a></li>
            <li><a href="/donate" className="text-cream/60 hover:text-brass transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-brass/50 mr-2 group-hover:w-3 transition-all duration-300"></span> Make a Donation</a></li>
            <li><a href="/schemes" className="text-cream/60 hover:text-brass transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-brass/50 mr-2 group-hover:w-3 transition-all duration-300"></span> Annual Schemes</a></li>
            <li><a href="/contact" className="text-cream/60 hover:text-brass transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-brass/50 mr-2 group-hover:w-3 transition-all duration-300"></span> Contact Us</a></li>
          </ul>
        </div>
        <div className="glass-dark p-6 rounded-2xl border-white/5">
          <h4 className="font-display text-xl font-semibold text-brass mb-4">Temple Timings</h4>
          <div className="space-y-3 text-cream/80">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Morning</span>
              <span className="font-medium text-white">5:00 AM - 12:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Evening</span>
              <span className="font-medium text-white">4:30 PM - 8:30 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs py-6 border-t border-cream/5 text-cream/40 relative z-10 font-inter">
        © {new Date().getFullYear()} കിട്ടുണ്ണിത്തമ്പുരാൻ ക്ഷേത്രം. All rights reserved.
      </div>
    </footer>
  );
}
