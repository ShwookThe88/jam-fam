import {integer,sqliteTable,text} from 'drizzle-orm/sqlite-core';
export const rooms=sqliteTable('jam_rooms',{code:text('code').primaryKey(),data:text('data').notNull(),rev:integer('rev').notNull().default(0)});
export const songs=sqliteTable('jam_songs',{id:text('id').primaryKey(),data:text('data').notNull(),rev:integer('rev').notNull().default(0)});
