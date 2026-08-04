'use client';
import { AdminPageShell } from '@/components/admin/AdminUI';

export default function AdminSettingsPage() {
  return (
    <AdminPageShell title="Settings" icon="⚙️" subtitle="System configuration and environment variables">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 backdrop-blur-md mb-6 max-w-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.05))' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xl shadow-inner text-orange-400">
              🔒
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Secure Configuration</h2>
              <p className="text-xs text-orange-200/70">Handled via environment variables</p>
            </div>
          </div>
          
          <p className="text-sm text-purple-100/70 mb-6 leading-relaxed">
            Temple identity, SMTP, and Razorpay credentials are configured securely via environment variables on the backend (<code>backend/.env</code>) to prevent accidental exposure or unauthorized changes. They are intentionally not editable from this UI.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-1 font-mono text-purple-300">TEMPLE_*</h3>
              <p className="text-xs text-purple-200/60">TEMPLE_NAME, TEMPLE_ADDRESS, TEMPLE_PHONE, TEMPLE_EMAIL — Used for dynamic receipt generation and automated emails.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-1 font-mono text-cyan-300">SMTP_*</h3>
              <p className="text-xs text-purple-200/60">SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — Connects the backend to your email provider for sending booking confirmations.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-1 font-mono text-emerald-300">RAZORPAY_*</h3>
              <p className="text-xs text-purple-200/60">RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET — Secure keys for the payment gateway integration.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
