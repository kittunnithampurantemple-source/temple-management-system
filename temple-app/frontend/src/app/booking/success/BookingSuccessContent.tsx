'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { api, apiBaseUrl } from '@/lib/api';

export default function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const bookingNumberFromUrl = searchParams.get('bookingNumber');
  const donationNumber = searchParams.get('donationNumber');
  const schemeNumber = searchParams.get('schemeNumber');

  const [lookupInput, setLookupInput] = useState('');
  const [activeLookup, setActiveLookup] = useState(bookingNumberFromUrl || '');

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking-lookup', activeLookup],
    queryFn: () => api.get(`/bookings/lookup/${activeLookup}`),
    enabled: !!activeLookup,
  });

  if (donationNumber) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-sanctum mb-3">Thank You for Your Donation</h1>
        <p className="text-ink/70 mb-2">Your donation reference number is:</p>
        <p className="font-display text-2xl text-brass-dark mb-6">{donationNumber}</p>
        <p className="text-sm text-ink/60">A receipt has been emailed to you. Keep this reference number for future correspondence.</p>
      </div>
    );
  }

  if (schemeNumber) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-sanctum mb-3">Scheme Enrollment Confirmed</h1>
        <p className="text-ink/70 mb-2">Your scheme reference number is:</p>
        <p className="font-display text-2xl text-brass-dark mb-6">{schemeNumber}</p>
        <p className="text-sm text-ink/60">We will remind you before your renewal date.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      <h1 className="font-display text-3xl text-sanctum mb-3 text-center">
        {bookingNumberFromUrl ? 'Booking Confirmed' : 'Find My Booking'}
      </h1>

      {!activeLookup && (
        <div className="mt-6">
          <label className="block text-sm text-ink/70 mb-1">Enter your Booking Number</label>
          <div className="flex gap-2">
            <input
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              placeholder="TMP-2026-123456"
              className="flex-1 border border-brass/40 rounded-sm px-4 py-2 focus-ring"
            />
            <button
              onClick={() => setActiveLookup(lookupInput.trim())}
              className="bg-sanctum text-cream px-5 py-2 rounded-sm hover:bg-sanctum-dark"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {isLoading && <p className="text-center text-ink/60 mt-6">Looking up booking...</p>}
      {error && <p className="text-center text-red-700 mt-6">Booking not found. Please check the number and try again.</p>}

      {booking && (
        <div className="mt-8 border border-brass/30 rounded-sm p-6 bg-white/50">
          <p className="text-sm text-ink/60 mb-1">Booking Number</p>
          <p className="font-display text-xl text-sanctum mb-4">{booking.bookingNumber}</p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-ink/50">Pooja</p><p>{booking.pooja?.nameEn}</p></div>
            <div><p className="text-ink/50">Date</p><p>{new Date(booking.poojaDate).toLocaleDateString('en-IN')}</p></div>
            <div><p className="text-ink/50">Devotee</p><p>{booking.devoteeName}</p></div>
            <div><p className="text-ink/50">Status</p><p className="font-semibold text-sanctum">{booking.status}</p></div>
            <div><p className="text-ink/50">Amount</p><p>₹{Number(booking.amount).toFixed(2)}</p></div>
          </div>

          {booking.receipt && (
            <Link
              href={`/receipt/${booking.receipt.id}`}
              className="inline-block mt-5 bg-brass text-ink px-5 py-2 rounded-sm font-semibold hover:bg-brass-light"
            >
              View / Download Receipt
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
