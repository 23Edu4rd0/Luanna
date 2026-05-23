import { readFileSync } from 'fs';
import { join } from 'path';
import postgres from 'postgres';
import type { Comment, Gift } from '../types';

// Prefer DIRECT_URL (port 5432) over DATABASE_URL (pgbouncer).
// pgbouncer in transaction mode does not support explicit transactions (BEGIN/COMMIT),
// which are required by db.begin() used in reserve/unreserve operations.
const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('Missing database connection string. Set DIRECT_URL or DATABASE_URL.');
}

export const db = postgres(databaseUrl, {
	prepare: false,
	ssl: 'require',
	max: 10,
});

export type GiftRow = {
	id: number | string;
	category: string;
	name: string;
	description: string | null;
	price: number | string;
	image_url: string | null;
	reserved: boolean;
	reserved_by: string | null;
	created_at: string;
};

export type CommentRow = {
	id: number | string;
	guest_name: string;
	guest_email: string | null;
	message: string;
	created_at: string;
};

const schemaPath = join(import.meta.dir, 'schema.sql');
const schemaStatements = readFileSync(schemaPath, 'utf8')
	.split(';')
	.map((statement) => statement.trim())
	.filter(Boolean);

export async function ensureSchema() {
	for (const statement of schemaStatements) {
		await db.unsafe(statement);
	}
}

export function mapGiftRow(row: GiftRow): Gift {
	return {
		id: Number(row.id),
		category: row.category,
		name: row.name,
		description: row.description ?? '',
		price: typeof row.price === 'string' ? Number(row.price) : row.price,
		imageUrl: row.image_url ?? '',
		reserved: Boolean(row.reserved),
		reservedBy: row.reserved_by ?? undefined,
	};
}

export function mapCommentRow(row: CommentRow): Comment {
	return {
		id: Number(row.id),
		guestName: row.guest_name,
		guestEmail: row.guest_email ?? undefined,
		message: row.message,
		createdAt: row.created_at,
	};
}

export function toGiftInsertRow(gift: Omit<Gift, 'id'>) {
	return {
		category: gift.category,
		name: gift.name,
		description: gift.description || null,
		price: gift.price,
		image_url: gift.imageUrl || null,
		reserved: gift.reserved,
		reserved_by: gift.reservedBy || null,
	};
}

export async function listGifts(): Promise<Gift[]> {
	const rows = await db<GiftRow[]>`select * from gifts order by id asc`;
	return rows.map(mapGiftRow);
}

export async function getGiftById(giftId: number): Promise<Gift | undefined> {
	const rows = await db<GiftRow[]>`select * from gifts where id = ${giftId}`;
	return rows[0] ? mapGiftRow(rows[0]) : undefined;
}

export async function clearGiftData() {
	await db.begin(async (transaction) => {
		await transaction`delete from gift_reservations`;
		await transaction`delete from gifts`;
	});
}

export async function clearComments() {
	await db`delete from comments`;
}

export async function insertGiftCatalog(gifts: Omit<Gift, 'id'>[]) {
	await db.begin(async (transaction) => {
		for (const gift of gifts) {
			await transaction`
				insert into gifts (category, name, description, price, image_url, reserved, reserved_by)
				values (${gift.category}, ${gift.name}, ${gift.description || null}, ${gift.price}, ${gift.imageUrl || null}, ${gift.reserved}, ${gift.reservedBy || null})
			`;
		}
	});
}

export async function reserveGift(
	giftId: number,
	guestName: string,
	guestEmail?: string
): Promise<Gift | undefined> {
	return db.begin(async (transaction) => {
		const rows = await transaction<GiftRow[]>`
			update gifts
			set reserved = true, reserved_by = ${guestName}
			where id = ${giftId} and reserved = false
			returning *
		`;

		if (!rows[0]) {
			return undefined;
		}

		await transaction`
			insert into gift_reservations (gift_id, guest_name, guest_email)
			values (${giftId}, ${guestName}, ${guestEmail || null})
		`;

		return mapGiftRow(rows[0]);
	});
}

export async function unreserveGift(giftId: number): Promise<Gift | undefined> {
	return db.begin(async (transaction) => {
		const rows = await transaction<GiftRow[]>`
			update gifts
			set reserved = false, reserved_by = null
			where id = ${giftId} and reserved = true
			returning *
		`;

		if (!rows[0]) {
			return undefined;
		}

		await transaction`delete from gift_reservations where gift_id = ${giftId}`;

		return mapGiftRow(rows[0]);
	});
}

export async function listComments(): Promise<Comment[]> {
	const rows = await db<CommentRow[]>`select * from comments order by created_at desc limit 100`;
	return rows.map(mapCommentRow);
}

export async function createComment(
	guestName: string,
	message: string,
	guestEmail?: string
): Promise<Comment> {
	const rows = await db<CommentRow[]>`
		insert into comments (guest_name, guest_email, message)
		values (${guestName}, ${guestEmail || null}, ${message})
		returning *
	`;

	return mapCommentRow(rows[0]);
}
