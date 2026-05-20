// Seed script to populate initial data
// Run with: bun run seed.ts

import { db } from './src/shared/db';
import { buildDefaultGifts } from './src/gifts/gift-catalog';

console.log('🌱 Seeding database...');

const gifts = buildDefaultGifts();

// Clear existing gifts
db.exec('DELETE FROM gifts');
db.exec('DELETE FROM gift_reservations');
db.exec('DELETE FROM comments');

// Insert gifts
const insertGift = db.query(
  'INSERT INTO gifts (category, name, description, price, imageUrl, reserved) VALUES (?, ?, ?, ?, ?, 0)'
);

for (const gift of gifts) {
  insertGift.run(gift.category, gift.name, gift.description, gift.price, gift.imageUrl);
  console.log(`✓ Added gift: ${gift.name}`);
}

console.log(`\n✅ Database seeded! ${gifts.length} gifts added.`);
