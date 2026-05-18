# 🎨 Wedding Website Customization Guide

This guide shows you exactly where and how to customize your wedding website.

---

## 👥 Couple Names & Wedding Date

**Where to edit**: `src/App.tsx`

```tsx
// Line 7-8
const coupleNames = 'Luanna & Wendell'; // ✏️ CHANGE THIS
const weddingDate = '2026-10-25T18:00:00'; // ✏️ CHANGE THIS (YYYY-MM-DDTHH:mm:ss)
```

The wedding date should be in ISO format. For example:
- `2026-10-25T18:00:00` = October 25, 2026 at 6:00 PM
- `2026-10-25T00:00:00` = October 25, 2026 at midnight

---

## 📖 Our Story Section

**Where to edit**: `src/story/story.service.ts`

### Update the main story text

```typescript
// Lines 32-35
export const COUPLE_STORY =
  'Every love story is unique, and ours began with a single moment of fate...'; // ✏️ EDIT THIS
```

### Add timeline events

Edit the `TIMELINE_EVENTS` array:

```typescript
export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    date: '2018',                           // ✏️ Year or date
    title: 'The Beginning',                 // ✏️ Event title
    description: 'We first met at...',      // ✏️ Event description
    imageUrl: '/images/timeline-1.jpg',     // ✏️ Path to image
    order: 1,
  },
  // Add more events following this pattern
];
```

**Tips**:
- Add as many timeline events as you want
- Use `.jpg`, `.png`, or `.webp` images
- Keep descriptions short and heartfelt

---

## 🎁 Gift Registry

### Option A: Edit in Code

**Where to edit**: `src/gifts/gifts.service.ts`

Edit the `DEFAULT_GIFTS` array:

```typescript
export const DEFAULT_GIFTS: Omit<Gift, 'id'>[] = [
  {
    name: 'Crystal Champagne Glasses Set',        // ✏️ Gift name
    description: 'Elegant hand-blown...',         // ✏️ Description
    price: 150,                                    // ✏️ Price in R$
    imageUrl: '/images/gift-1.jpg',               // ✏️ Image path
    reserved: false,
    pixKey: '00020126580014br.gov.bcb.pix...', // ✏️ Your PIX key
  },
  // Add more gifts
];
```

### Option B: Use the Seed Script

**Where to edit**: `seed.ts`

```typescript
const gifts = [
  {
    name: 'Your Gift Name',
    description: 'Your gift description',
    price: 200,
    imageUrl: '/images/gift-1.jpg',
    pixKey: 'your-pix-key@domain.com',  // ✏️ Your PIX key
  },
  // Add more gifts
];
```

After editing, run:
```bash
bun run seed.ts
```

**Tips**:
- Add 4-8 gifts (don't overwhelm guests)
- Use high-quality images (450x450px recommended)
- Keep prices realistic
- Each gift can have a different PIX key

---

## 💬 Messages & Wishes

The comments section works automatically once the website is live. Guests can add their messages without any editing needed.

**View comments in the database**: `data/wedding.db`

---

## 🌐 Add Images

### Where to put images

Place all images in: `/public/images/`

### Required images

1. **Timeline photos**: `timeline-1.jpg`, `timeline-2.jpg`, etc.
2. **Gift photos**: `gift-1.jpg`, `gift-2.jpg`, etc.

### How to reference them

In the code, always use paths like:
```
/images/timeline-1.jpg
/images/gift-1.jpg
```

### Image recommendations

- **Timeline photos**: 800x600px or larger
- **Gift photos**: 400x400px or larger
- **Format**: JPG, PNG, or WebP
- **File size**: Keep under 200KB for faster loading

---

## 💳 PIX Payment Configuration

### Step 1: Get your PIX key

You need ONE PIX key from your bank account. It can be:
- Email: `seu.email@domain.com`
- Phone: `+55 11 99999-9999`
- CPF: `12345678901`
- Random key: (provided by your bank)

### Step 2: Add to code

**File**: `index.ts` (line 10)

```typescript
const PIX_KEY = 'your-pix-key@domain.com'; // ✏️ EDIT THIS
```

You can also give different PIX keys to different gifts:

**File**: `src/gifts/gifts.service.ts`

```typescript
{
  name: 'Gift 1',
  pixKey: 'key1@email.com',  // ✏️ Different key
},
{
  name: 'Gift 2',
  pixKey: 'key2@email.com',  // ✏️ Different key
}
```

### Step 3: Add QR Code (optional)

If your gift has a PIX QR code image:

```typescript
{
  name: 'Gift Name',
  pixQrCode: '/images/pix-qr-code.jpg',  // ✏️ Path to QR code image
  pixKey: 'your-pix-key',
}
```

---

## 🎨 Change Colors

**Where to edit**: `src/index.css`

```css
@theme {
  --color-brand-offwhite: #faf9f6;      /* ✏️ Main background */
  --color-brand-beige: #f5f0eb;         /* ✏️ Light sections */
  --color-brand-gold: #c5b358;          /* ✏️ Accent color */
  --color-brand-gold-light: #e6dfb8;    /* ✏️ Light accent */
  --color-brand-dark: #2c2c2c;          /* ✏️ Dark text */
  --color-brand-text: #4a4a4a;          /* ✏️ Regular text */
}
```

### Color palette suggestions

**Romantic**:
- `#faf9f6` `#f5f0eb` `#d4a574` `#e6dfb8` `#2c2c2c` `#4a4a4a`

**Modern**:
- `#ffffff` `#f5f5f5` `#2a8f9e` `#d0f0f5` `#1a1a1a` `#333333`

**Elegant**:
- `#fefdf9` `#f3ede5` `#8b7355` `#d9cfc2` `#1f1f1f` `#404040`

---

## ✍️ Change Fonts

**Where to edit**: `src/index.css`

```css
@theme {
  --font-sans: "Inter", sans-serif;           /* ✏️ Body font */
  --font-serif: "Playfair Display", serif;    /* ✏️ Heading font */
}
```

### Popular font combinations

**Classic**:
- Sans: "Lato", "Open Sans", "Roboto"
- Serif: "Playfair Display", "Cormorant Garamond", "Crimson Text"

**Modern**:
- Sans: "Inter", "Poppins", "DM Sans"
- Serif: "Fraunces", "Abril Fatface", "Archivo Narrow"

Note: Make sure fonts are available via Google Fonts or another CDN.

---

## 📱 Header & Footer Text

**Where to edit**: `src/App.tsx`

```tsx
// Header (line 22-23)
<h1>Luanna & Wendell</h1>  {/* ✏️ Couple names */}
<p>25 . 10 . 2026</p>      {/* ✏️ Wedding date */}

// Footer (line 37-40)
<p>Thank you for sharing this special day with us ✨</p>  {/* ✏️ Footer text */}
```

---

## 🚀 Deploy Your Website

### Option 1: Vercel / Railway

1. Push your code to GitHub
2. Connect to Vercel or Railway
3. Deploy (they'll auto-detect Bun)

### Option 2: Your own server

1. Run: `bun run vite build && bun run index.ts`
2. Website available at: `http://your-domain.com`

---

## 📋 Customization Checklist

- [ ] Change couple names and wedding date
- [ ] Update "Our Story" with your narrative
- [ ] Add timeline events with photos
- [ ] Customize gift list
- [ ] Add your PIX key(s)
- [ ] Upload timeline images to `/public/images/`
- [ ] Upload gift images to `/public/images/`
- [ ] (Optional) Change colors
- [ ] (Optional) Change fonts
- [ ] Test on mobile and desktop
- [ ] Deploy to production

---

## ❓ FAQ

**Q: Can I have more than one section?**  
A: Yes! Add more timeline events, gifts, or messages sections as needed.

**Q: Can I add custom sections?**  
A: Follow the pattern from existing sections and add them to `src/App.tsx`.

**Q: Where is my data stored?**  
A: In `data/wedding.db` (SQLite database). Don't commit this to Git.

**Q: Can I change the number of columns in the gift grid?**  
A: Yes, edit `src/gifts/GiftsSection.tsx` line 50: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Q: How do I reset the database?**  
A: Run `bun run seed.ts` to reset and reseed with default data.

---

## 💬 Need Help?

Check the `README.md` for technical setup instructions and troubleshooting.

---

**Built with 💕 for your special day!**
