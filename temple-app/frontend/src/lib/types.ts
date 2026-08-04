export interface Pooja {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  price: string | number;
  durationMinutes: number;
  imageUrl?: string;
  isAvailable: boolean;
  isActive: boolean;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  poojaDate: string;
  devoteeName: string;
  email: string;
  phone: string;
  status: string;
  amount: string | number;
  pooja?: Pooja;
}
