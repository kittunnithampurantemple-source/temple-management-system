// Loads the Razorpay Checkout script once and opens the payment widget.
// Amount/order id always come from our backend - never computed client-side.
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface OpenCheckoutArgs {
  orderId: string;
  amount: number;
  keyId: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  onSuccess: (response: any) => void;
  onFailure?: () => void;
}

export async function openRazorpayCheckout(args: OpenCheckoutArgs) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert('Unable to load payment gateway. Please check your connection.');
    return;
  }
  const rzp = new (window as any).Razorpay({
    key: args.keyId,
    amount: args.amount,
    currency: 'INR',
    order_id: args.orderId,
    name: args.name,
    description: args.description,
    prefill: args.prefill,
    theme: { color: '#7A1F1F' },
    handler: args.onSuccess,
    modal: { ondismiss: args.onFailure },
  });
  rzp.open();
}
