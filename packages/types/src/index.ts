// ─── Common API Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Temple Types ─────────────────────────────────────────────────────────────

export interface Temple {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  timings: TempleTimings;
  highlights: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TempleTimings {
  morning: { open: string; close: string };
  evening: { open: string; close: string };
}

export interface Deity {
  id: string;
  templeId: string;
  name: string;
  role: 'MAIN' | 'CONSORT' | 'SECONDARY';
  description: string;
  imageUrl: string;
}

export interface Event {
  id: string;
  templeId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrl?: string;
}

// ─── Offering / Booking Types ─────────────────────────────────────────────────

export interface Offering {
  id: string;
  templeId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SPECIAL';
  imageUrl?: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  offeringId: string;
  templeId: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  scheduledDate: Date;
  devoteeNames: string[];
  amount: number;
  paymentId?: string;
  createdAt: Date;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'DEVOTEE' | 'ADMIN';
  preferredLanguage: 'en' | 'ta';
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Payment Types ────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'INITIATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  gateway: 'RAZORPAY' | 'STRIPE';
  gatewayTransactionId?: string;
  createdAt: Date;
}
