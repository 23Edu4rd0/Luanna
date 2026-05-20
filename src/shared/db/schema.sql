-- ✏️ EDIT: you can change the DB schema if needed

-- Gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL DEFAULT 'Geral',
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  imageUrl TEXT,
  reserved INTEGER DEFAULT 0,
  reservedBy TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Gift reservations table for audit trail
CREATE TABLE IF NOT EXISTS gift_reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  giftId INTEGER NOT NULL,
  guestName TEXT NOT NULL,
  guestEmail TEXT,
  reservedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (giftId) REFERENCES gifts(id) ON DELETE CASCADE
);

-- Comments/messages table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guestName TEXT NOT NULL,
  guestEmail TEXT,
  message TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Timeline events table
CREATE TABLE IF NOT EXISTS timeline_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  imageUrl TEXT,
  "order" INTEGER DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_gifts_reserved ON gifts(reserved);
CREATE INDEX IF NOT EXISTS idx_comments_createdAt ON comments(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_gift_reservations_giftId ON gift_reservations(giftId);
CREATE INDEX IF NOT EXISTS idx_timeline_order ON timeline_events("order");
