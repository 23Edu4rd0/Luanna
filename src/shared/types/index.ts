// Global type definitions for the wedding website

export interface Gift {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  reserved: boolean;
  reservedBy?: string;
}

export interface GiftReservation {
  id: number;
  giftId: number;
  guestName: string;
  guestEmail?: string;
  reservedAt: string;
}

export interface Comment {
  id: number;
  guestName: string;
  guestEmail?: string;
  message: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
}

export interface WeddingConfig {
  coupleNames: string;
  weddingDate: string;
  weddingDateMs: number;
  storyTitle: string;
  storyText: string;
}
