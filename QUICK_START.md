# ⚡ Quick Start Guide

Get your wedding website running in 5 minutes!

## Step 1: Install (1 minute)

```bash
bun install
```

## Step 2: Setup Database (1 minute)

```bash
bun run seed.ts
```

This creates the database and adds sample gifts.

## Step 3: Start Servers (in two terminals)

**Terminal 1** - Bun Server:
```bash
bun run index.ts
```

**Terminal 2** - Vite Dev Server:
```bash
bun run vite
```

## Step 4: Visit Website (1 minute)

Open your browser and go to: **http://localhost:5173**

✅ **Your wedding website is now live!**

---

## Quick Edits to Personalize

### Change Names & Date

Open `src/App.tsx` and edit lines 7-8:

```tsx
const coupleNames = 'Luanna & Wendell';
const weddingDate = '2026-10-25T18:00:00';
```

### Add Your Story

Open `src/story/story.service.ts` and edit `COUPLE_STORY` and `TIMELINE_EVENTS`.

### Add Gifts

Open `src/gifts/gifts.service.ts` and edit the `DEFAULT_GIFTS` array. Then reseed:

```bash
bun run seed.ts
```

### Add Your PIX Key

Open `index.ts` and edit line 10:

```ts
const PIX_KEY = 'your-pix-key@domain.com';
```

---

## Image Setup

1. Create a `/public/images/` folder (if it doesn't exist)
2. Add your images:
   - Timeline photos: `timeline-1.jpg`, `timeline-2.jpg`, etc.
   - Gift photos: `gift-1.jpg`, `gift-2.jpg`, etc.
3. Reference them in the code as: `/images/timeline-1.jpg`

---

## Production Build

When ready to deploy:

```bash
bun run build
bun run start
```

Visit **http://localhost:3000** to see the production version.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Database not found" | Run `bun run seed.ts` |
| Images not showing | Make sure files are in `/public/images/` |
| Server won't start | Check if port 3000 is already in use |
| Changes not appearing | Try hard refresh (Ctrl+Shift+R) |

---

## Next Steps

For more detailed customization, see [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md).

**Enjoy building your wedding website! 💍✨**
