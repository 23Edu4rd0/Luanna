# 💍 Wedding Website - Luanna & Wendell

A modern, minimalist, and delicate wedding website built with React, TypeScript, Tailwind CSS, Bun, and direct Postgres on Supabase.

## Features

✨ **Countdown Timer** - Days, hours, minutes, and seconds to the big day  
📖 **Our Story** - Timeline of key moments in your relationship  
🎁 **Gift Registry** - Items with names, photos, prices, and PIX payment integration  
💬 **Messages & Wishes** - Guests can leave messages and congratulations  
📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop  

## Tech Stack

- **Runtime**: Bun (no npm)
- **Language**: TypeScript
- **Frontend**: React 19 + Tailwind CSS 4
- **Backend**: Hono + Bun native HTTP server
- **Database**: Direct Postgres connection to Supabase
- **Build**: Vite

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Set Up the Database Connection

Set these environment variables in `.env`:

- `DATABASE_URL` for the pooler connection used by the app
- `DIRECT_URL` for migrations and direct DB tooling

Then run the seed script to populate the tables:

```bash
bun run seed.ts
```

This creates the tables if needed, clears the gift registry tables, and repopulates them with the default catalog.

### 3. Start Development Server

In one terminal, run the Bun server:

```bash
bun run index.ts
```

In another terminal, run Vite dev server:

```bash
bun run vite
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
bun run vite build
bun run index.ts
```

The built website will be available at `http://localhost:3000`

## Customization Guide

### ✏️ Edit Couple Information

**File**: `src/App.tsx`

```typescript
const coupleNames = 'Luanna & Wendell'; // ✏️ Change names
const weddingDate = '2026-10-25T18:00:00'; // ✏️ Change date
```

### ✏️ Edit the Story

**File**: `src/story/story.service.ts`

Update `COUPLE_STORY` text and `TIMELINE_EVENTS` array with your milestones:

```typescript
export const COUPLE_STORY = 'Your love story here...';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: '2018',
    title: 'We Met',
    description: 'How you met...',
    imageUrl: '/images/timeline-1.jpg',
    order: 1,
  },
  // Add more events...
];
```

### ✏️ Edit Gift Registry

**File**: `src/gifts/gifts.service.ts`

Modify the `DEFAULT_GIFTS` array or edit `seed.ts`:

```typescript
export const DEFAULT_GIFTS = [
  {
    name: 'Gift Name',
    description: 'Gift description',
    price: 150,
    imageUrl: '/images/gift-1.jpg',
    pixKey: 'your-pix-key@domain.com', // ✏️ Add your PIX key
  },
];
```

### ✏️ Configure PIX Payment

**File**: `index.ts`

```typescript
const PIX_KEY = 'your-pix-key@domain.com'; // CPF, email, phone, or random key
```

Each gift can have its own PIX key. Update in `src/gifts/gifts.service.ts`.

### ✏️ Add Images

Place images in the `/public/images/` directory:

- `timeline-1.jpg`, `timeline-2.jpg`, etc. - Story timeline photos
- `gift-1.jpg`, `gift-2.jpg`, etc. - Gift photos

Update image paths in the respective service files.

### ✏️ Edit Colors

**File**: `src/index.css`

```css
@theme {
  --color-brand-offwhite: #faf9f6;
  --color-brand-beige: #f5f0eb;
  --color-brand-gold: #c5b358;
  --color-brand-gold-light: #e6dfb8;
  --color-brand-dark: #2c2c2c;
  --color-brand-text: #4a4a4a;
}
```

Change these hex values to customize the color palette.

## File Structure

```
/src
  /countdown
    CountdownSection.tsx
    countdown.service.ts
  /story
    StorySection.tsx
    story.service.ts
  /gifts
    GiftsSection.tsx
    GiftCard.tsx
    PixOption.tsx
    gifts.service.ts
  /comments
    CommentsSection.tsx
    CommentCard.tsx
    comments.service.ts
  /shared
    /components
    /hooks
    /types
    /db
  App.tsx
  main.tsx
  index.css

/public
  /images

index.ts           # Bun server with API endpoints
seed.ts            # Database seeding script
vite.config.ts     # Vite configuration
```

## API Endpoints

### Gifts

- `GET /api/gifts` - List all gifts
- `GET /api/gifts/:id` - Get a specific gift
- `POST /api/gifts/:id/reserve` - Reserve a gift

### Comments

- `GET /api/comments` - List all comments
- `POST /api/comments` - Create a new comment

### Health

- `GET /api/health` - Server health check

## Troubleshooting

**Database connection failed**: Check `DATABASE_URL` and `DIRECT_URL`  
**Images not loading**: Ensure files are in `/public/images/`  
**API not responding**: Check that Bun server is running on port 3000  
**Build failing**: Run `bun install` to install all dependencies  

## Created with 💕

Built with React, TypeScript, Tailwind CSS, and Bun for your special day!
