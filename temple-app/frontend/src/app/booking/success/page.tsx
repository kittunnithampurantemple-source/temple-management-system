import { Suspense } from 'react';
import BookingSuccessContent from './BookingSuccessContent';

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto px-4 py-20 text-center text-ink/50">Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
