# 📚 Wedding Website - Complete Documentation Index

Welcome! This is your complete guide to your wedding website. Start here.

## 🚀 Getting Started (Pick One)

| For | Read | Time |
|-----|------|------|
| **I want to start immediately** | [QUICK_START.md](QUICK_START.md) | 5 min |
| **I want to customize everything** | [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) | 30 min |
| **I want technical details** | [README.md](README.md) | 20 min |
| **I want an overview first** | [SETUP_COMPLETE.md](SETUP_COMPLETE.md) | 10 min |

---

## 📁 Project Structure at a Glance

```
Your Wedding Website
├── 📄 Documentation
│   ├── QUICK_START.md              ← START HERE (5 min)
│   ├── CUSTOMIZATION_GUIDE.md      ← How to change everything
│   ├── README.md                   ← Technical reference
│   ├── SETUP_COMPLETE.md           ← Project overview
│   └── INDEX.md                    ← You are here!
│
├── 🎨 Website Code
│   ├── src/
│   │   ├── App.tsx                 ← Main app (edit couple names here)
│   │   ├── countdown/              ← Timer section
│   │   ├── story/                  ← Our story & timeline
│   │   ├── gifts/                  ← Gift registry
│   │   ├── comments/               ← Messages & wishes
│   │   └── shared/                 ← Reusable components & database
│   ├── index.ts                    ← Server with API endpoints
│   └── vite.config.ts              ← Build configuration
│
├── 🖼️ Your Images
│   └── public/images/              ← Put photos here
│
├── 🗄️ Database
│   └── data/wedding.db             ← Created when you run seed.ts
│
└── ⚙️ Configuration
    ├── package.json                ← Dependencies & scripts
    ├── tsconfig.json               ← TypeScript settings
    ├── .env.example                ← Environment variables template
    └── .gitignore                  ← Files not to commit
```

---

## 🎯 What To Do Now

### Step 1: Choose Your Path

**Path A: "Just get it running"**
1. Run `bun install`
2. Run `bun run seed.ts`
3. Run the dev servers (see [QUICK_START.md](QUICK_START.md))
4. Visit http://localhost:5173

**Path B: "I want to customize first"**
1. Read [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
2. Make changes in the code (marked with `// ✏️ EDIT:`)
3. Follow Path A

### Step 2: Personalize Your Content

✏️ Edit these files:

| Change | File | Line |
|--------|------|------|
| Names & date | `src/App.tsx` | 7-8 |
| Love story | `src/story/story.service.ts` | 32-35 |
| Timeline events | `src/story/story.service.ts` | 4-28 |
| Gift list | `src/gifts/gifts.service.ts` | 4-44 |
| PIX keys | `index.ts` | 10 |
| Colors | `src/index.css` | 4-9 |

### Step 3: Add Images

1. Create photos (recommended: 800x600px for timeline, 400x400px for gifts)
2. Save to `/public/images/`
3. Update file paths in the code

### Step 4: Test & Deploy

- Test on mobile, tablet, desktop
- Share with friends for review
- Deploy to Vercel, Railway, or your server

---

## 🔍 Find What You Need

### Features & How to Use Them

| Feature | File | Purpose |
|---------|------|---------|
| **Countdown Timer** | `src/countdown/` | Shows days until wedding |
| **Our Story** | `src/story/` | Tell your love story with timeline |
| **Gift Registry** | `src/gifts/` | List gifts with PIX payment |
| **Messages** | `src/comments/` | Guests leave congratulations |

### Code You'll Edit Most

```
🔥 MOST EDITS HERE:
src/App.tsx                     ← Names, date, footer text
src/story/story.service.ts      ← Your love story
src/gifts/gifts.service.ts      ← Your gifts
index.ts                        ← PIX keys

📁 ALSO EDIT:
src/index.css                   ← Colors & fonts
seed.ts                         ← Alternative: seed gifts here
public/images/                  ← Put your photos here
```

### API Endpoints (for developers)

```
GET  /api/gifts                  ← List all gifts
GET  /api/gifts/:id              ← Get one gift
POST /api/gifts/:id/reserve      ← Reserve a gift

GET  /api/comments               ← List all messages
POST /api/comments               ← Add a message

GET  /api/health                 ← Server status
```

### Database Tables

```sql
-- Gifts for registry
CREATE TABLE gifts (...)

-- Track who reserved what
CREATE TABLE gift_reservations (...)

-- Guest messages
CREATE TABLE comments (...)

-- Timeline events
CREATE TABLE timeline_events (...)
```

---

## 📝 Common Tasks

### "I want to change the couple names"

1. Open: `src/App.tsx`
2. Find line 7: `const coupleNames = 'Luanna & Wendell'`
3. Change to your names
4. Save. Done! ✅

### "I want to add a gift"

1. Open: `src/gifts/gifts.service.ts`
2. Find: `DEFAULT_GIFTS` array
3. Add a new object:
   ```typescript
   {
     name: 'Gift Name',
     description: 'Description',
     price: 200,
     imageUrl: '/images/gift-7.jpg',
     pixKey: 'your-pix-key@domain.com',
   }
   ```
4. Save & refresh browser ✅

### "I want to add timeline event"

1. Open: `src/story/story.service.ts`
2. Find: `TIMELINE_EVENTS` array
3. Add a new event object (copy format from existing ones)
4. Save & refresh ✅

### "I want to change colors"

1. Open: `src/index.css`
2. Find: `@theme { ... }`
3. Change hex colors (e.g., `#c5b358` to your color)
4. Save & refresh ✅

### "I want to add my photos"

1. Put images in `/public/images/`
2. Update paths in code:
   - Timeline: `/images/timeline-1.jpg`
   - Gifts: `/images/gift-1.jpg`
3. Save & refresh ✅

---

## 🛠️ Helpful Commands

```bash
# Setup
bun install                  # Install dependencies
bun run seed.ts             # Setup database

# Development
bun run index.ts            # Start Bun server (Terminal 1)
bun run vite                # Start dev server (Terminal 2)

# Production
bun run build               # Build for production
bun run start               # Start production server
```

---

## 📱 Responsive Design

Your website automatically adapts to all screen sizes:

```
📱 Mobile      (320px+)  - Single column, touch-friendly
📱 Tablet      (768px+)  - 2 columns
🖥️ Desktop    (1024px+)  - 3 columns, full experience
```

No special configuration needed!

---

## 🎨 Design System

**Color Palette**:
- `#faf9f6` - Off-white (background)
- `#f5f0eb` - Beige (sections)
- `#c5b358` - Gold (accents) ← Main color
- `#2c2c2c` - Dark (headings)
- `#4a4a4a` - Gray (text)

**Typography**:
- Headings: Playfair Display (elegant serif)
- Body: Inter (clean sans-serif)

**Spacing**:
- Generous whitespace
- Minimal clutter
- Breathing room between sections

---

## ❓ Frequently Asked Questions

**Q: How do I add more images?**  
A: Put them in `/public/images/` and reference in code: `/images/photo.jpg`

**Q: Can I have different PIX keys for different gifts?**  
A: Yes! Each gift has its own `pixKey` field.

**Q: How many guests can the website handle?**  
A: Unlimited! SQLite can handle thousands of messages and reservations.

**Q: Where's my data stored?**  
A: In `data/wedding.db` - a file-based SQLite database.

**Q: Can guests delete their messages?**  
A: Not currently, but you can add this feature. Check the code for ideas.

**Q: How do I back up my data?**  
A: Copy `data/wedding.db` to a safe location.

**Q: What if the website crashes?**  
A: All your data is safe in `data/wedding.db`. Just restart and it works.

**Q: Can I add my own sections?**  
A: Yes! Follow the pattern from existing sections and add to `src/App.tsx`.

---

## 🚀 Next Steps

1. ✅ Read this document (you're doing it!)
2. ⏭️ Go to [QUICK_START.md](QUICK_START.md)
3. 📝 Customize your content (see [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md))
4. 🖼️ Add your photos
5. 🎨 Customize colors/fonts (optional)
6. 🧪 Test on all devices
7. 📤 Deploy and share!

---

## 💾 File Reference

| File | Purpose | Edit? |
|------|---------|-------|
| `src/App.tsx` | Main app component | ✅ YES |
| `src/countdown/` | Timer section | ⚠️ Rarely |
| `src/story/` | Story & timeline | ✅ YES |
| `src/gifts/` | Gift registry | ✅ YES |
| `src/comments/` | Messages section | ⚠️ Rarely |
| `src/shared/` | Reusable code | ❌ NO |
| `index.ts` | API server | ✅ PIX keys |
| `seed.ts` | Database setup | ✅ Add gifts |
| `vite.config.ts` | Build config | ❌ NO |
| `src/index.css` | Styles & colors | ✅ YES |

---

## 🎓 Learning Path

**If you're new to web development:**
1. Learn about React: Components, Props, State (30 min)
2. Learn TypeScript basics: Types, Interfaces (15 min)
3. Look at `src/countdown/CountdownSection.tsx` as simple example
4. Copy patterns from existing components

**If you know React/TypeScript:**
1. Check the component structure
2. Notice the service/component separation
3. API endpoints are in `index.ts`
4. Database queries use `bun:sqlite`

---

## 📞 Support

- **Getting started?** → Read [QUICK_START.md](QUICK_START.md)
- **Need to customize?** → Read [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- **Technical issues?** → Check [README.md](README.md)
- **Want to understand the project?** → Read [SETUP_COMPLETE.md](SETUP_COMPLETE.md)

---

## ✨ You're All Set!

Everything is ready. Your wedding website is built and waiting for your personal touch.

**Start with**: [QUICK_START.md](QUICK_START.md) (5 minutes to get running!)

---

**Built with 💕 for Luanna & Wendell**  
*Last updated: May 13, 2026*
