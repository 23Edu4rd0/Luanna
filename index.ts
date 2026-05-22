import 'dotenv/config';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { db } from './src/shared/db';
import { Gift, Comment } from './src/shared/types';
import { buildDefaultGifts } from './src/gifts/gift-catalog';

const app = new Hono();

// ✏️ EDITAR: Configure no arquivo .env
const COUPLE_NAMES = process.env.COUPLE_NAMES || 'Casal Feliz';
const WEDDING_DATE = process.env.WEDDING_DATE || '2026-10-25';
const PORT = process.env.PORT || 3000;

async function syncGiftCatalog() {
  const existingGifts = db.query('SELECT name FROM gifts ORDER BY id ASC').all() as Array<{ name: string }>;
  const defaultGifts = buildDefaultGifts();

  const isOutdated =
    existingGifts.length !== defaultGifts.length ||
    existingGifts.some((gift, index) => gift.name !== defaultGifts[index]?.name);

  if (!isOutdated) {
    return;
  }

  db.exec('DELETE FROM gift_reservations');
  db.exec('DELETE FROM gifts');

  const insertGift = db.query(
    'INSERT INTO gifts (category, name, description, price, imageUrl, reserved) VALUES (?, ?, ?, ?, ?, 0)'
  );

  for (const gift of defaultGifts) {
    insertGift.run(gift.category, gift.name, gift.description, gift.price, gift.imageUrl);
  }

  console.log(`🌿 Gift catalog synced with ${defaultGifts.length} options.`);
}

await syncGiftCatalog();

// ============================================
// HTML TEMPLATE RENDERING
// ============================================

async function getIndexHtmlWithConfig(): Promise<string> {
  try {
    const distHtmlFile = Bun.file('./dist/index.html');
    const sourceHtmlFile = Bun.file('./index.html');
    const htmlFile = await (
      (await distHtmlFile.exists()) ? distHtmlFile : sourceHtmlFile
    ).text();
    return htmlFile
      .replace(/{{COUPLE_NAMES}}/g, COUPLE_NAMES)
      .replace(/{{WEDDING_DATE}}/g, WEDDING_DATE);
  } catch (error) {
    console.error('Error reading index.html:', error);
    return '<html><body>Error loading page</body></html>';
  }
}

// Serve index.html with dynamic content
app.get('/', async (ctx) => {
  const html = await getIndexHtmlWithConfig();
  ctx.header('Content-Type', 'text/html; charset=utf-8');
  return ctx.html(html);
});

// ============================================
// CONFIGURATION ENDPOINT
// ============================================

// GET wedding configuration (for frontend)
app.get('/api/config', (ctx) => {
  return ctx.json({
    coupleNames: COUPLE_NAMES,
    weddingDate: WEDDING_DATE,
  });
});

// ============================================

// GET all gifts
app.get('/api/gifts', (ctx) => {
  try {
    const selectAllGifts = db.query('SELECT * FROM gifts ORDER BY id ASC');
    const gifts = selectAllGifts.all() as Gift[];
    return ctx.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return ctx.json({ error: 'Failed to fetch gifts' }, 500);
  }
});

// GET single gift
app.get('/api/gifts/:id', (ctx) => {
  try {
    const giftId = parseInt(ctx.req.param('id'));
    const selectGiftById = db.query('SELECT * FROM gifts WHERE id = ?');
    const gift = selectGiftById.get(giftId) as Gift | undefined;

    if (!gift) {
      return ctx.json({ error: 'Gift not found' }, 404);
    }

    return ctx.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    return ctx.json({ error: 'Failed to fetch gift' }, 500);
  }
});

// POST: Reserve a gift
app.post('/api/gifts/:id/reserve', async (ctx) => {
  try {
    const giftId = parseInt(ctx.req.param('id'));
    const { guestName, guestEmail } = await ctx.req.json();

    if (!guestName || !guestName.trim()) {
      return ctx.json({ error: 'Guest name is required' }, 400);
    }

    // Check if gift exists and is available
    const selectGiftForReservation = db.query('SELECT * FROM gifts WHERE id = ?');
    const gift = selectGiftForReservation.get(giftId) as Gift | undefined;

    if (!gift) {
      return ctx.json({ error: 'Gift not found' }, 404);
    }

    if (gift.reserved) {
      return ctx.json({ error: 'Gift is already reserved' }, 409);
    }

    // Reserve the gift
    const updateGiftReservation = db.query(
      'UPDATE gifts SET reserved = 1, reservedBy = ? WHERE id = ?'
    );
    updateGiftReservation.run(guestName, giftId);

    // Record reservation
    const insertGiftReservationRecord = db.query(
      'INSERT INTO gift_reservations (giftId, guestName, guestEmail) VALUES (?, ?, ?)'
    );
    insertGiftReservationRecord.run(giftId, guestName, guestEmail || null);

    // Return updated gift
    const updatedGift = selectGiftForReservation.get(giftId) as Gift;
    return ctx.json(updatedGift);
  } catch (error) {
    console.error('Error reserving gift:', error);
    return ctx.json({ error: 'Failed to reserve gift' }, 500);
  }
});

// ============================================
// COMMENTS API ENDPOINTS
// ============================================

// GET all comments
app.get('/api/comments', (ctx) => {
  try {
    const selectAllComments = db.query(
      'SELECT * FROM comments ORDER BY createdAt DESC LIMIT 100'
    );
    const comments = selectAllComments.all() as Comment[];
    return ctx.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return ctx.json({ error: 'Failed to fetch comments' }, 500);
  }
});

// POST: Create a new comment
app.post('/api/comments', async (ctx) => {
  try {
    const { guestName, message, guestEmail } = await ctx.req.json();

    if (!guestName || !guestName.trim()) {
      return ctx.json({ error: 'Guest name is required' }, 400);
    }

    if (!message || !message.trim() || message.length > 500) {
      return ctx.json({ error: 'Message must be 1-500 characters' }, 400);
    }

    const insertNewComment = db.query(
      'INSERT INTO comments (guestName, guestEmail, message) VALUES (?, ?, ?)'
    );
    const insertResult = insertNewComment.run(guestName, guestEmail || null, message);

    // Fetch and return the new comment
    const selectCommentById = db.query('SELECT * FROM comments WHERE id = ?');
    const comment = selectCommentById.get(insertResult.lastInsertRowid) as Comment;

    return ctx.json(comment, 201);
  } catch (error) {
    console.error('Error creating comment:', error);
    return ctx.json({ error: 'Failed to create comment' }, 500);
  }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get('/api/health', (ctx) => {
  return ctx.json({
    status: 'ok',
    coupleNames: COUPLE_NAMES,
    weddingDate: WEDDING_DATE,
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend in production
// Serve admin path as SPA (return index.html) to avoid 404 on direct /admin requests
app.get('/admin', async (ctx) => {
  const html = await getIndexHtmlWithConfig();
  ctx.header('Content-Type', 'text/html; charset=utf-8');
  return ctx.html(html);
});

app.get('/admin/*', async (ctx) => {
  const html = await getIndexHtmlWithConfig();
  ctx.header('Content-Type', 'text/html; charset=utf-8');
  return ctx.html(html);
});

// Serve other static files from dist
app.use('/*', serveStatic({ root: './dist' }));

// ============================================
// START SERVER
// ============================================

export default {
  port: PORT,
  fetch: app.fetch,
};

console.log(`💍 Wedding website running on http://localhost:${PORT}`);
console.log(`👰 ${COUPLE_NAMES}`);
console.log(`📅 Wedding Date: ${WEDDING_DATE}`);
