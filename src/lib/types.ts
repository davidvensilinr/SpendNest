// Core Types for Revenue Intelligence Inbox

export type SourceType = "call" | "meeting";

export type RouteCategory = 
  | "sales_coaching"
  | "deal_next_steps"
  | "customer_follow_up"
  | "internal_vendor"
  | "review_needed";

export interface RouteItem {
  category: RouteCategory;
  label: string;
  reason: string;
  evidence_passage?: string;
  turn_number?: number;
}

export interface AnalysisPayload {
  summary: string;
  what_happened: string;
  why_it_matters: string;
  customer_signals: string[];
  commitments: string[];
  objections: string[];
  opportunities: string[];
  blockers: string[];
  recommended_action: string;
  action_owner: string; // explicitly stated or 'Unspecified in evidence'
  action_deadline?: string;
  evidence_passages: Array<{
    turn_number?: number;
    speaker?: string;
    quote: string;
    context: string;
  }>;
  limitations: string;
  processing_method: "pre-generated" | "dynamic";
  provenance_note: string;
}

export interface FullRecordView {
  id: number;
  source_type: SourceType;
  source_id: string;
  record_ref: string | null;
  applied_revision: number;
  batch_id: string | null;
  has_usable_transcript: boolean;
  rep_email: string | null;
  rep_name: string | null;
  organizer_email: string | null;
  activity_at: string;
  created_at: string;
  updated_at: string;
  
  // Payload & Transcript
  payload: any;
  transcript_payload: any;
  
  // Analysis
  analysis?: {
    id: number;
    analysis_revision: number;
    source_revision_at_analysis: number;
    is_stale: boolean;
    analysis_json: AnalysisPayload;
    processing_method: string;
    processed_at: string;
  } | null;
  
  // Routing
  routing?: {
    id: number;
    suggested_routes: RouteItem[];
    manual_routes: RouteItem[] | null;
    effective_routes: RouteItem[];
    is_manually_overridden: boolean;
    manual_override_note: string | null;
    manual_override_at: string | null;
    review_status: "pending" | "reviewed" | "escalated";
    reviewed_at: string | null;
    priority: "urgent" | "high" | "normal" | "low";
    priority_reason: string | null;
  } | null;
}

export interface DashboardMetrics {
  total_records: number; // 44
  total_calls: number; // 30
  total_meetings: number; // 14
  usable_transcripts_count: number; // 17 initially, 18 after update
  usable_transcripts_percentage: number; // 38.6% initially, 40.9% after update
  records_needing_review: number;
  multi_route_records_count: number;
  manually_corrected_count: number;
  updated_source_records_count: number;
  stale_analysis_count: number;
  
  route_counts: Record<RouteCategory, number>;
  activity_by_person: {
    call_reps: Array<{ email: string; name: string; count: number; with_transcript: number }>;
    meeting_organizers: Array<{ email: string; name: string; count: number; with_transcript: number }>;
  };
  activity_by_day: Array<{ date: string; calls: number; meetings: number; total: number }>;
  
  attention_queue: Array<{
    id: string;
    source_type: SourceType;
    source_id: string;
    record_ref: string;
    title: string;
    reason: string;
    severity: "urgent" | "warning" | "info";
    badge: string;
    created_at: string;
  }>;
}

export interface ImportResult {
  batch_id: string;
  revision: number;
  exported_at: string;
  total_records: number;
  created_count: number;
  updated_count: number;
  unchanged_count: number;
  skipped_count: number;
  error_count: number;
  errors: string[];
}
