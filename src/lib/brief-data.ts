// Manager Brief for 21 August 2026 (Asia/Kolkata timezone)
// Comprehensive synthesis of all 18 analyzed conversations post-update batch

export interface BriefSection {
  title: string;
  badge?: string;
  items: Array<{
    title: string;
    description: string;
    conversation_ref: string;
    source_id: string;
    evidence_passage: string;
    actionable_takeaway: string;
    severity?: "urgent" | "high" | "normal";
  }>;
}

export interface ManagerBriefData {
  brief_date: string;
  timezone: string;
  generated_at: string;
  scope_description: string;
  executive_summary: string;
  key_metrics: {
    total_conversations_reviewed: number;
    urgent_blockers: number;
    coaching_opportunities: number;
    high_priority_deals: number;
    unanalysed_records_caveat: string;
  };
  sections: BriefSection[];
}

export const MANAGER_BRIEF_21_AUG_2026: ManagerBriefData = {
  brief_date: "2026-08-21",
  timezone: "Asia/Kolkata (IST)",
  generated_at: "2026-08-21T23:59:00+05:30",
  scope_description: "Reviews all 18 conversations with usable supplied transcripts (10 calls, 8 meetings) following application of the 02_update delivery batch. Note: 26 additional records in the intake extract intentionally contain no conversation text and are excluded from substantive analytical synthesis.",
  executive_summary: "On 21 August 2026, the team recorded 44 source interactions. Substantive transcript analysis of the 18 active conversations reveals three critical operational signals: (1) An active software defect in payment description persistence and document uploads reported by Willowfield Trust, (2) A top-of-funnel messaging misalignment causing inbound partners to mistake SpendNest for a remote bank-opening provider, and (3) A dangerous billing engine failure mode where topped-up wallets fail to unfreeze locked accounts automatically without manual operations overrides. High-value pipeline momentum remains strong in advisory partnerships (Willowbank, LedgerBridge) and enterprise AP automation (Aniket, Mapletrail).",
  key_metrics: {
    total_conversations_reviewed: 18,
    urgent_blockers: 2,
    coaching_opportunities: 5,
    high_priority_deals: 6,
    unanalysed_records_caveat: "26 records lack transcript text; do not assume nonexistent activity."
  },
  sections: [
    {
      title: "1. Critical Blockers & Product Defects (Urgent Escalation)",
      badge: "Urgent Attention",
      items: [
        {
          title: "Willowfield Trust: Payment Description Edit Fails & Uploads Blocked",
          description: "During a screen-share session, Customer A demonstrated that editing event-payment descriptions appears to save in the modal, but the table view persistently displays stale text. Additionally, 'Recreate payment' workflow completely rejects document attachments.",
          conversation_ref: "M07",
          source_id: "4f304fff-fd40-5cfc-a366-0a134c445c2a",
          evidence_passage: "M07 Turn 3-7: 'The field still shows the earlier wording. So the change is not appearing after you save, is that right? Yes, it is still the old description... I have captured screenshots of that behaviour. I will get it checked today.'",
          actionable_takeaway: "Engineering hotfix required immediately. P1 defect threatens payment auditability and customer trust.",
          severity: "urgent"
        },
        {
          title: "Billing Recovery Engine: Top-ups Fail to Automatically Unfreeze Locked Accounts",
          description: "Internal training revealed that when a wallet balance falls slightly short of invoice amounts, the dunning system retries on days 3, 7, and 10 before freezing cards. Crucially, adding funds does NOT unfreeze the account or advance the billing date without manual operations intervention.",
          conversation_ref: "M10",
          source_id: "337f297d-9385-5b82-9e54-5019c1ed912c",
          evidence_passage: "M10 Turn 17-18: 'Simply topping up a frozen account does not complete the whole recovery flow in this process. The customer must tell us, then operations clears the outstanding invoice and unfreezes the account... Operations also needs to adjust the next billing date manually.'",
          actionable_takeaway: "Escalate to Billing Product Manager to automate webhook-driven account unfreezing upon wallet deposit.",
          severity: "urgent"
        }
      ]
    },
    {
      title: "2. Key Customer Signals & Pipeline Opportunities",
      badge: "Revenue Growth",
      items: [
        {
          title: "Harborpath Advisory: Inbound Partner Qualification Misalignment",
          description: "Harborpath Advisory attended an exploratory call believing SpendNest provides remote corporate bank account opening. The representative successfully clarified SpendNest's card/AP value proposition and pivoted into a post-incorporation spend governance referral agreement.",
          conversation_ref: "M01",
          source_id: "cb5cecac-e68d-52b7-b10b-b0c748efc467",
          evidence_passage: "M01 Turn 1-2: 'My understanding was that you help people open bank accounts remotely... SpendNest is a spend management platform rather than a bank.'",
          actionable_takeaway: "Audit partner acquisition landing pages to eliminate bank-opening claims; dispatch partner referral agreement.",
          severity: "high"
        },
        {
          title: "LedgerBridge: 2-Way Accounting Sync Strategic Integration",
          description: "High-value partnership discussion with LedgerBridge regarding bi-directional automated reconciliation for cards, AP, and forthcoming AR modules.",
          conversation_ref: "M02",
          source_id: "1a21c409-c050-5787-90af-2667e057e1b6",
          evidence_passage: "M02 Turn 3: 'We serve businesses with cards and accounts payable, and we are developing accounts receivable. We want to understand how our two systems can link up seamlessly.'",
          actionable_takeaway: "Schedule technical scoping session between SpendNest core engineering and LedgerBridge API team.",
          severity: "high"
        },
        {
          title: "Mid-Market AP Automation Demand: Aniket & Mapletrail",
          description: "Strong customer resonance regarding eliminating messy email-based invoice approvals and reducing 5-day month-end reconciliation cycles.",
          conversation_ref: "C10 / M06",
          source_id: "b747f592-810e-583c-9b81-8db5ab035806",
          evidence_passage: "C10: 'Getting invoice approvals over email is definitely messy for us right now.' | M06: 'Reconciling cross-subsidiary expenses takes our team almost a full week every month.'",
          actionable_takeaway: "Prepare custom approval hierarchy demonstration in sandbox for both prospects.",
          severity: "high"
        }
      ]
    },
    {
      title: "3. Practical Sales Coaching Recommendations",
      badge: "Team Enablement",
      items: [
        {
          title: "Cold Call Permission Openers & Work-Number Sensitivity (Arun / C01)",
          description: "Arun faced sharp resistance when cold-calling an executive's direct work mobile. The prospect felt targeted without consent and immediately put up defenses.",
          conversation_ref: "C01",
          source_id: "2ec4404c-beee-5377-a63c-aab701da08ed",
          evidence_passage: "C01: 'I don't know how I ended up on your list. I didn't ask for this call, and I'm not interested. This number is for my work, not for people to sell things to me.'",
          actionable_takeaway: "Coach reps on using transparent permission openers (like Meera's approach in C05/C06: 'Could I take 40 seconds to explain why I'm calling? If not relevant, feel free to hang up').",
          severity: "normal"
        },
        {
          title: "Defending SaaS Value Against Aggressive Price Cuts (Asterloom / M03)",
          description: "Prospect brought finance leadership specifically to demand fee discounts and push back against software costs.",
          conversation_ref: "M03",
          source_id: "398672e7-62dd-5afd-846d-0237d49792fb",
          evidence_passage: "M03 Turn 2: 'SpendNest can do that, but we have to justify the ongoing cost compared to what we have today.'",
          actionable_takeaway: "Equip reps with concrete hours-saved calculator to anchor conversations on labor-hour payback rather than line-item SaaS fees.",
          severity: "normal"
        }
      ]
    },
    {
      title: "4. Follow-up Priorities & Operational Ownership",
      badge: "Action Required",
      items: [
        {
          title: "Cedarwave Distribution Card Delivery & Rate Limits",
          description: "Expedite regional branch card dispatch and adjust API concurrency thresholds for ERP syncing.",
          conversation_ref: "M04",
          source_id: "b0f79b3d-37ba-52f9-b2bc-58b159dd6d91",
          evidence_passage: "M04 Turn 4: 'The delay in cards reaching our regional distribution centers is causing operational stoppage.'",
          actionable_takeaway: "Owner: Team Member A (Account Management). Provide courier tracking within 24 hours.",
          severity: "high"
        },
        {
          title: "Brookmint Holdings Onboarding Token Re-issue",
          description: "Customer returned after invitation link timed out; assist admin in finalizing card limits.",
          conversation_ref: "M09",
          source_id: "4b5b9192-f3fc-505a-8e77-4d2ffaa54594",
          evidence_passage: "M09 Turn 1: 'The invitation for Brookmint Holdings did not work when I tried it. It may have expired...'",
          actionable_takeaway: "Owner: Team Member A (Onboarding). Monitor initial wallet funding.",
          severity: "normal"
        }
      ]
    }
  ]
};
