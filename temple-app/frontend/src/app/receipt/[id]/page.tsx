'use client';
import { useParams } from 'next/navigation';
import { apiBaseUrl } from '@/lib/api';

export default function ReceiptDownloadPage() {
  const params = useParams();
  const receiptId = params.id as string;
  const pdfUrl = `${apiBaseUrl}/receipts/${receiptId}/download`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-display text-3xl text-sanctum mb-2 text-center">Your Receipt</h1>
      <p className="text-ink/60 text-center mb-6">
        View it below, or{' '}
        <a href={pdfUrl} download className="text-sanctum underline">download the PDF</a>.
      </p>
      <div className="border border-brass/30 rounded-sm overflow-hidden" style={{ height: '70vh' }}>
        <iframe src={pdfUrl} title="Receipt PDF" className="w-full h-full" />
      </div>
    </div>
  );
}
