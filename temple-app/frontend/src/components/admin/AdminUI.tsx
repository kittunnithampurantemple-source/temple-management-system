// Shared reusable components for admin pages

// Page shell with header
export function AdminPageShell({
  title, icon, subtitle, action, children
}: {
  title: string;
  icon: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-2xl shadow-xl shadow-violet-500/30">
            {icon}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white drop-shadow-lg">{title}</h1>
            {subtitle && <p className="text-sm text-purple-200/70 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
      {/* Decorative line */}
      <div className="h-px w-full bg-gradient-to-r from-purple-500 via-pink-400 to-violet-400 opacity-60 rounded-full" />
      {children}
    </div>
  );
}

// Glassmorphic form card
export function AdminFormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-md mb-6"
      style={{ background: 'rgba(255,255,255,0.05)' }}>
      <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.05))' }} />
      <div className="relative z-10 grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

// Modern dark table
export function AdminTable({
  headers, children, isEmpty, emptyMessage = 'No records found.'
}: {
  headers: string[];
  children: React.ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md overflow-x-auto"
      style={{ background: 'rgba(255,255,255,0.04)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'rgba(139,92,246,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {headers.map((h) => (
              <th key={h} className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-purple-200/80">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="px-5 py-12 text-center text-purple-200/40 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : children}
        </tbody>
      </table>
    </div>
  );
}

// Table row
export function AdminTr({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <tr
      className="transition-colors duration-200 hover:bg-white/5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
    >
      {children}
    </tr>
  );
}

// Table cell
export function AdminTd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-5 py-4 text-white/80 ${className}`}>{children}</td>
  );
}

// Status badges
export function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; dot: string; text: string }> = {
    CONFIRMED:       { bg: 'bg-emerald-500/20 border-emerald-500/40', dot: 'bg-emerald-400', text: 'text-emerald-300' },
    COMPLETED:       { bg: 'bg-blue-500/20 border-blue-500/40',       dot: 'bg-blue-400',   text: 'text-blue-300' },
    SCHEDULED:       { bg: 'bg-violet-500/20 border-violet-500/40',   dot: 'bg-violet-400', text: 'text-violet-300' },
    PENDING_PAYMENT: { bg: 'bg-amber-500/20 border-amber-500/40',     dot: 'bg-amber-400',  text: 'text-amber-300' },
    CANCELLED:       { bg: 'bg-red-500/20 border-red-500/40',         dot: 'bg-red-400',    text: 'text-red-300' },
    ACTIVE:          { bg: 'bg-emerald-500/20 border-emerald-500/40', dot: 'bg-emerald-400', text: 'text-emerald-300' },
    INACTIVE:        { bg: 'bg-slate-500/20 border-slate-500/40',     dot: 'bg-slate-400',  text: 'text-slate-300' },
    OVERDUE:         { bg: 'bg-red-500/20 border-red-500/40',         dot: 'bg-red-400',    text: 'text-red-300' },
    GENERAL:         { bg: 'bg-cyan-500/20 border-cyan-500/40',       dot: 'bg-cyan-400',   text: 'text-cyan-300' },
    FESTIVAL:        { bg: 'bg-pink-500/20 border-pink-500/40',       dot: 'bg-pink-400',   text: 'text-pink-300' },
    TEMPLE_DEVELOPMENT: { bg: 'bg-orange-500/20 border-orange-500/40', dot: 'bg-orange-400', text: 'text-orange-300' },
    SPECIAL_EVENT:   { bg: 'bg-purple-500/20 border-purple-500/40',   dot: 'bg-purple-400', text: 'text-purple-300' },
    ADMIN:           { bg: 'bg-rose-500/20 border-rose-500/40',       dot: 'bg-rose-400',   text: 'text-rose-300' },
    STAFF:           { bg: 'bg-indigo-500/20 border-indigo-500/40',   dot: 'bg-indigo-400', text: 'text-indigo-300' },
  };
  const c = cfg[status] ?? { bg: 'bg-slate-500/20 border-slate-500/40', dot: 'bg-slate-400', text: 'text-slate-300' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status.replace(/_/g, ' ')}
    </span>
  );
}

// Action button
export function AdminBtn({
  children, onClick, variant = 'default', className = '', href
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'danger' | 'success' | 'ghost';
  className?: string;
  href?: string;
}) {
  const variants = {
    default: 'bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 border-violet-500/40',
    danger:  'bg-red-500/20 hover:bg-red-500/40 text-red-300 border-red-500/40',
    success: 'bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 border-emerald-500/40',
    ghost:   'bg-white/5 hover:bg-white/10 text-white/70 border-white/10',
  };
  const cls = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 cursor-pointer ${variants[variant]} ${className}`;
  if (href) return <a href={href} target="_blank" className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

// Primary action button (header CTA)
export function AdminPrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl border border-white/20"
      style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)' }}
    >
      {children}
    </button>
  );
}

// Input for forms
export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/5 border border-white/10 focus:outline-none focus:border-violet-400/60 focus:bg-white/10 placeholder-white/30 transition-all duration-200"
    />
  );
}

export function AdminSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/10 border border-white/10 focus:outline-none focus:border-violet-400/60 transition-all duration-200"
    >
      {children}
    </select>
  );
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/5 border border-white/10 focus:outline-none focus:border-violet-400/60 focus:bg-white/10 placeholder-white/30 transition-all duration-200 md:col-span-2"
    />
  );
}
