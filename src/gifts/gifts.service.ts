import { Gift } from '../shared/types';
import { buildDefaultGifts } from './gift-catalog';

export const DEFAULT_GIFTS: Omit<Gift, 'id'>[] = buildDefaultGifts('sua-chave-pix@domain.com');

export async function getGifts(): Promise<Gift[]> {
  return DEFAULT_GIFTS as Gift[];
}

export async function reserveGift(
  giftId: number,
  guestName: string,
  guestEmail?: string
): Promise<Gift | null> {
  return null;
}

export function isGiftAvailable(gift: Gift): boolean {
  return !gift.reserved;
}
