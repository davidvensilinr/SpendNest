// Singleton SQLite database connection using Drizzle ORM + better-sqlite3
// Data Contract: persistence via local SQLite file (sufficient per DATA_CONTRACT.md rule 6)

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "revenue-intelligence.db");

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let _db: ReturnType<typeof drizzle> | null = null;
let _sqlite: Database.Database | null = null;

export function getDb() {
  if (!_db) {
    _sqlite = new Database(DB_PATH);
    _sqlite.pragma("journal_mode = WAL");
    _sqlite.pragma("foreign_keys = ON");
    _db = drizzle(_sqlite, { schema });
    initSchema(_sqlite);
  }
  return _db;
}

export function getSqlite() {
  getDb(); // ensure initialized
  return _sqlite!;
}

function initSchema(sqlite: Database.Database) {
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS source_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      record_ref TEXT,
      applied_revision INTEGER NOT NULL DEFAULT 1,
      batch_id TEXT,
      payload_json TEXT NOT NULL,
      transcript_payload_json TEXT,
      has_usable_transcript INTEGER NOT NULL DEFAULT 0,
      rep_email TEXT,
      rep_name TEXT,
      organizer_email TEXT,
      activity_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(source_type, source_id)
    );

    CREATE TABLE IF NOT EXISTS analysis_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      analysis_revision INTEGER NOT NULL DEFAULT 1,
      source_revision_at_analysis INTEGER NOT NULL DEFAULT 1,
      is_stale INTEGER NOT NULL DEFAULT 0,
      analysis_json TEXT,
      processing_method TEXT NOT NULL DEFAULT 'pre-generated',
      processed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(source_type, source_id)
    );

    CREATE TABLE IF NOT EXISTS routing_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      suggested_routes_json TEXT NOT NULL DEFAULT '[]',
      manual_routes_json TEXT,
      manual_override_note TEXT,
      manual_override_at TEXT,
      review_status TEXT NOT NULL DEFAULT 'pending',
      reviewed_at TEXT,
      priority TEXT NOT NULL DEFAULT 'normal',
      priority_reason TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(source_type, source_id)
    );

    CREATE TABLE IF NOT EXISTS import_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      batch_id TEXT NOT NULL,
      revision INTEGER NOT NULL,
      exported_at TEXT,
      total_records INTEGER NOT NULL DEFAULT 0,
      created_count INTEGER NOT NULL DEFAULT 0,
      updated_count INTEGER NOT NULL DEFAULT 0,
      unchanged_count INTEGER NOT NULL DEFAULT 0,
      skipped_count INTEGER NOT NULL DEFAULT 0,
      error_count INTEGER NOT NULL DEFAULT 0,
      errors_json TEXT,
      imported_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS export_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exported_at TEXT NOT NULL DEFAULT (datetime('now')),
      record_count INTEGER NOT NULL DEFAULT 0,
      manifest_json TEXT
    );
  `);
}
