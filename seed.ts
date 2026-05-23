// Seed script to populate initial data
// Run with: bun run seed.ts

import { clearComments, clearGiftData, ensureSchema, insertGiftCatalog } from './src/shared/db';
import { buildDefaultGifts } from './src/gifts/gift-catalog';

console.log('🌱 Seeding database...');

const gifts = buildDefaultGifts();

await ensureSchema();
await clearGiftData();

await clearComments();
await insertGiftCatalog(gifts);

console.log(`\n✅ Database seeded! ${gifts.length} gifts added.`);
