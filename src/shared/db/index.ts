import { Database } from 'bun:sqlite';
import { readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Ensure data directory exists
mkdirSync('./data', { recursive: true });

export const db = new Database('./data/wedding.db', { create: true });

// Initialize schema
const schemaPath = join(import.meta.dir, 'schema.sql');
const schema = readFileSync(schemaPath, 'utf8');

db.exec(schema);

const giftColumns = db.query('PRAGMA table_info(gifts)').all() as Array<{ name: string }>;

if (!giftColumns.some((column) => column.name === 'category')) {
	db.exec("ALTER TABLE gifts ADD COLUMN category TEXT NOT NULL DEFAULT 'Geral'");
}

console.log('📦 Database initialized.');
