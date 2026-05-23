import 'dotenv/config';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import {
  clearGiftData,
  createComment,
  ensureSchema,
  getGiftById,
  insertGiftCatalog,
  listComments,
  listGifts,
  reserveGift as reserveGiftById,
  unreserveGift,
} from './src/shared/db';
import { buildDefaultGifts } from './src/gifts/gift-catalog';

const app = new Hono();

// ✏️ EDITAR: Configure no arquivo .env
const COUPLE_NAMES = process.env.COUPLE_NAMES || 'Casal Feliz';
const WEDDING_DATE = process.env.WEDDING_DATE || '2026-10-25';
const PORT = process.env.PORT || 3000;

async function syncGiftCatalog() {
  const existingGifts = await listGifts();
  const defaultGifts = buildDefaultGifts();

  // Build a lookup key (category + name) for existing gifts to detect new ones
  const existingKeys = new Set(
    existingGifts.map((g) => `${g.category}::${g.name}`)
  );

  const newGifts = defaultGifts.filter(
    (g) => !existingKeys.has(`${g.category}::${g.name}`)
  );

  if (newGifts.length > 0) {
    await insertGiftCatalog(newGifts);
    console.log(`🌿 Gift catalog synced: ${newGifts.length} new items added.`);
  } else {
    console.log(`✅ Gift catalog is up to date (${existingGifts.length} items).`);
  }
}

await ensureSchema();
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
  return (async () => {
    try {
      return ctx.json(await listGifts());
    } catch (error) {
      console.error('Error fetching gifts:', error);
      return ctx.json({ error: 'Failed to fetch gifts' }, 500);
    }
  })();
});

// GET single gift
app.get('/api/gifts/:id', (ctx) => {
  return (async () => {
    try {
      const giftId = parseInt(ctx.req.param('id'));
	  const gift = await getGiftById(giftId);

	  if (!gift) {
		return ctx.json({ error: 'Gift not found' }, 404);
	  }

	  return ctx.json(gift);
    } catch (error) {
      console.error('Error fetching gift:', error);
      return ctx.json({ error: 'Failed to fetch gift' }, 500);
    }
  })();
});

// POST: Reserve a gift
app.post('/api/gifts/:id/reserve', async (ctx) => {
  try {
    const giftId = parseInt(ctx.req.param('id'));
    const { guestName } = await ctx.req.json();

    if (!guestName || !guestName.trim()) {
      return ctx.json({ error: 'Guest name is required' }, 400);
    }

	const existingGift = await getGiftById(giftId);

	if (!existingGift) {
      return ctx.json({ error: 'Gift not found' }, 404);
    }

    if (existingGift.reserved) {
      return ctx.json({ error: 'Gift is already reserved' }, 409);
    }

	const updatedGift = await reserveGiftById(giftId, guestName);

	if (!updatedGift) {
      return ctx.json({ error: 'Gift is already reserved' }, 409);
    }

	return ctx.json(updatedGift);
  } catch (error) {
    console.error('Error reserving gift:', error);
    return ctx.json({ error: 'Failed to reserve gift' }, 500);
  }
});

app.post('/api/gifts/:id/unreserve', async (ctx) => {
  try {
    const giftId = parseInt(ctx.req.param('id'));
    const gift = await unreserveGift(giftId);

    if (!gift) {
      return ctx.json({ error: 'Gift is not reserved' }, 409);
    }

    return ctx.json(gift);
  } catch (error) {
    console.error('Error canceling gift reservation:', error);
    return ctx.json({ error: 'Failed to cancel reservation' }, 500);
  }
});

// ============================================
// COMMENTS API ENDPOINTS
// ============================================

// GET all comments
app.get('/api/comments', (ctx) => {
  return (async () => {
    try {
	  return ctx.json(await listComments());
    } catch (error) {
      console.error('Error fetching comments:', error);
      return ctx.json({ error: 'Failed to fetch comments' }, 500);
    }
  })();
});

// POST: Create a new comment
app.post('/api/comments', async (ctx) => {
  try {
    const { guestName, message } = await ctx.req.json();

    if (!guestName || !guestName.trim()) {
      return ctx.json({ error: 'Guest name is required' }, 400);
    }

    if (!message || !message.trim() || message.length > 500) {
      return ctx.json({ error: 'Message must be 1-500 characters' }, 400);
    }

	return ctx.json(await createComment(guestName, message), 201);
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
