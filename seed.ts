// Seed script to populate initial data
// Run with: bun run seed.ts

import { ensureSchema, upsertGiftCatalog } from './src/shared/db';
import { buildDefaultGifts } from './src/gifts/gift-catalog';

console.log('🌱 Seeding database...');

const gifts = buildDefaultGifts();

await ensureSchema();

const { preservedReservations } = await upsertGiftCatalog(gifts);

console.log(
	`\n✅ Database updated! ${gifts.length} gifts processed.` +
		` ${preservedReservations} reservations preserved.`
);
