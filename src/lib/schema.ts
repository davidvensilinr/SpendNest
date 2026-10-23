// Database schema using Drizzle ORM with SQLite
// Identity key is always (source_type, source_id)

import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const sourceRecords = sqliteTable("source_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  source_type: text("source_type").notNull(),
  source_id: text("source_id").notNull(),
  record_ref: text("record_ref"),
  applied_revision: integer("applied_revision").notNull().default(1),
  batch_id: text("batch_id"),
  payload_json: text("payload_json").notNull(),
  transcript_payload_json: text("transcript_payload_json"),
  has_usable_transcript: integer("has_usable_transcript", { mode: "boolean" }).notNull().default(false),
  rep_email: text("rep_email"),
  rep_name: text("rep_name"),
  organizer_email: text("organizer_email"),
  activity_at: text("activity_at").notNull(),
  created_at: text("created_at").notNull().default("(datetime(''now''))"),
  updated_at: text("updated_at").notNull().default("(datetime(''now''))"),
});

export const analysisRecords = sqliteTable("analysis_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  source_type: text("source_type").notNull(),
  source_id: text("source_id").notNull(),
  analysis_revision: integer("analysis_revision").notNull().default(1),
  source_revision_at_analysis: integer("source_revision_at_analysis").notNull().default(1),
  is_stale: integer("is_stale", { mode: "boolean" }).notNull().default(false),
  analysis_json: text("analysis_json"),
  processing_method: text("processing_method").notNull().default("pre-generated"),
  processed_at: text("processed_at"),
  created_at: text("created_at").notNull().default("(datetime(''now''))"),
  updated_at: text("updated_at").notNull().default("(datetime(''now''))"),
});

export const routingRecords = sqliteTable("routing_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  source_type: text("source_type").notNull(),
  source_id: text("source_id").notNull(),
  suggested_routes_json: text("suggested_routes_json").notNull().default("[]"),
  manual_routes_json: text("manual_routes_json"),
  manual_override_note: text("manual_override_note"),
  manual_override_at: text("manual_override_at"),
  review_status: text("review_status").notNull().default("pending"),
  reviewed_at: text("reviewed_at"),
  priority: text("priority").notNull().default("normal"),
  priority_reason: text("priority_reason"),
  created_at: text("created_at").notNull().default("(datetime(''now''))"),
  updated_at: text("updated_at").notNull().default("(datetime(''now''))"),
});

export const importHistory = sqliteTable("import_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  batch_id: text("batch_id").notNull(),
  revision: integer("revision").notNull(),
  exported_at: text("exported_at"),
  total_records: integer("total_records").notNull().default(0),
  created_count: integer("created_count").notNull().default(0),
  updated_count: integer("updated_count").notNull().default(0),
  unchanged_count: integer("unchanged_count").notNull().default(0),
  skipped_count: integer("skipped_count").notNull().default(0),
  error_count: integer("error_count").notNull().default(0),
  errors_json: text("errors_json"),
  imported_at: text("imported_at").notNull().default("(datetime(''now''))"),
});

export const exportHistory = sqliteTable("export_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  exported_at: text("exported_at").notNull().default("(datetime(''now''))"),
  record_count: integer("record_count").notNull().default(0),
  manifest_json: text("manifest_json"),
});

export type SourceRecord = typeof sourceRecords.$inferSelect;
export type NewSourceRecord = typeof sourceRecords.$inferInsert;
export type AnalysisRecord = typeof analysisRecords.$inferSelect;
export type RoutingRecord = typeof routingRecords.$inferSelect;
export type ImportHistoryRecord = typeof importHistory.$inferSelect;
