export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-sanctum mb-6">Settings</h1>
      <div className="bg-white border border-brass/20 rounded-sm p-6 max-w-xl space-y-4">
        <p className="text-sm text-ink/60">
          Temple identity, SMTP, and Razorpay credentials are configured via environment
          variables on the backend (<code>backend/.env</code>) for security - they are
          intentionally not editable from this UI. See the project README for the full list.
        </p>
        <ul className="text-sm text-ink/70 list-disc pl-5 space-y-1">
          <li>TEMPLE_NAME, TEMPLE_ADDRESS, TEMPLE_PHONE, TEMPLE_EMAIL &mdash; shown on receipts and emails</li>
          <li>SMTP_* &mdash; outgoing email configuration</li>
          <li>RAZORPAY_* &mdash; payment gateway keys</li>
          <li>STORAGE_DRIVER &mdash; local or supabase</li>
        </ul>
      </div>
    </div>
  );
}
