// Pre-generated evidence-grounded analysis for all 18 supplied conversations
// STRICT DATA CONTRACT COMPLIANCE: Grounded entirely in supplied conversation text.
// Clearly labelled as pre-generated.

import { AnalysisPayload, RouteItem } from "./types";

export interface ConversationAnalysisEntry {
  record_ref: string;
  priority: "urgent" | "high" | "normal" | "low";
  priority_reason: string;
  suggested_routes: RouteItem[];
  analysis: AnalysisPayload;
}

export const PRE_GENERATED_ANALYSES: Record<string, ConversationAnalysisEntry> = {
  "2ec4404c-beee-5377-a63c-aab701da08ed": {
    "record_ref": "C01",
    "priority": "normal",
    "priority_reason": "High-friction cold call with privacy/permission pushback and competitor automation in place.",
    "suggested_routes": [
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Rep needs coaching on handling cold outreach pushback and permission-based openers.",
        "evidence_passage": "I do not know how I ended up on your list. I did not ask for this call, and I am not interested."
      },
      {
        "category": "review_needed",
        "label": "Human Review",
        "reason": "Verify lead sourcing compliance and suppress contact number from future outbound campaigns.",
        "evidence_passage": "Through a professional networking outreach programme; that is how we obtained the contact information."
      }
    ],
    "analysis": {
      "summary": "Arun cold-called Pranav at Harborlight Advisory regarding finance automation partnerships. Pranav expressed immediate irritation regarding unsolicited outreach on his work line and stated Harborlight already has advanced internal automation.",
      "what_happened": "Arun introduced SpendNest to Pranav at Harborlight Advisory. Pranav repeatedly challenged the basis of the call, confirmed it was a cold call, inquired how SpendNest got his number, and rejected the proposition citing an existing advanced automation setup.",
      "why_it_matters": "Demonstrates brand friction caused by cold calling executive work mobiles without prior warmth. Risk of domain reputation damage and prospect alienation.",
      "customer_signals": [
        "Defensive reaction to unsolicited sales calls on mobile.",
        "Firmly satisfied with existing finance operations automation."
      ],
      "commitments": [],
      "objections": [
        "Unsolicited call on work number: This number is for my work, not for people to sell things to me.",
        "No perceived need: Our processes are already very automated. We have a fairly advanced setup, so I do not think this is something we need."
      ],
      "opportunities": [],
      "blockers": [
        "Active resistance to cold telephone outreach.",
        "High satisfaction with incumbent/internal tools."
      ],
      "recommended_action": "Coach Arun on permission-first introductions; add Pranav to company DNC list to prevent repeat friction.",
      "action_owner": "Unspecified in evidence (Manager action)",
      "evidence_passages": [
        {
          "speaker": "Pranav",
          "quote": "This number is for my work, not for people to sell things to me.",
          "context": "Prospect objecting to unsolicited phone outreach."
        },
        {
          "speaker": "Pranav",
          "quote": "Our processes are already very automated. We have a fairly advanced setup, so I do not think this is something we need.",
          "context": "Prospect confirming incumbent automation capabilities."
        }
      ],
      "limitations": "The transcript does not specify what software Harborlight Advisory currently uses, nor whether Arun followed a specific lead list protocol.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "4b870624-8aad-5315-a60e-0db95981cf99": {
    "record_ref": "C02",
    "priority": "low",
    "priority_reason": "Gatekeeper screening with callback inquiry.",
    "suggested_routes": [
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Coach rep on navigating executive assistants and securing direct contact info.",
        "evidence_passage": "Good morning, you reached Fernhaven Group. Kavya speaking. How may I help? Hello Kavya. Could I speak with Leela, please?"
      }
    ],
    "analysis": {
      "summary": "Arun phoned Fernhaven Group asking for Leela. Receptionist Kavya checked availability, reported Leela was away, and offered to take a message.",
      "what_happened": "Arun reached Fernhaven Group front desk and requested Leela. Kavya placed him on brief hold, returned to notify that Leela was not at her desk, and Arun agreed to follow up later.",
      "why_it_matters": "Administrative touchpoint; no pitch made, but highlights gatekeeper dynamics.",
      "customer_signals": [
        "Gatekeeper was professional and receptive to taking details."
      ],
      "commitments": [],
      "objections": [],
      "opportunities": [],
      "blockers": [
        "Target contact unavailable at time of call."
      ],
      "recommended_action": "Follow up via email referencing the call or retry during optimal executive hours.",
      "action_owner": "Arun (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Kavya",
          "quote": "Leela? Let me check whether she is around. Please hold for a moment.",
          "context": "Gatekeeper screening call."
        }
      ],
      "limitations": "Transcript is short and does not establish Leela title or department at Fernhaven Group.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "20d509ba-d589-5334-9aef-ea4ce6105b1a": {
    "record_ref": "C03",
    "priority": "low",
    "priority_reason": "Technical audio screening failure; no substantive dialogue.",
    "suggested_routes": [
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Immediate follow-up required via alternate channel due to audio disconnect.",
        "evidence_passage": "Sorry, I can hardly hear you. Who is this?"
      }
    ],
    "analysis": {
      "summary": "Kiran called Milan; call passed screening but suffered severe audio degradation and terminated prematurely.",
      "what_happened": "Kiran passed an automated voice screening service, greeted Milan, but Milan stated he could hardly hear due to severe line quality issues. Call ended before business discussion occurred.",
      "why_it_matters": "Outreach attempt wasted due to VoIP line failure.",
      "customer_signals": [
        "Prospect picked up and was willing to listen if audio were legible."
      ],
      "commitments": [],
      "objections": [
        "Audio inaudible: Sorry, I can hardly hear you. Who is this?"
      ],
      "opportunities": [],
      "blockers": [
        "Telephony / network audio quality failure."
      ],
      "recommended_action": "Redial Milan from landline or send an asynchronous email note explaining the dropped call.",
      "action_owner": "Kiran (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Milan",
          "quote": "Sorry, I can hardly hear you. Who is this?",
          "context": "Audio failure during introduction."
        }
      ],
      "limitations": "Evidence does not confirm whether line failure was on caller or receiver carrier.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "bcdcbf56-d338-5c78-9a97-42c2fc1c9931": {
    "record_ref": "C04",
    "priority": "low",
    "priority_reason": "Voicemail / call screening message left.",
    "suggested_routes": [
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Follow up with written message referencing the voicemail left at Lanternpath Ventures.",
        "evidence_passage": "Arun from SpendNest, following up on our earlier conversation about expense software for Lanternpath..."
      }
    ],
    "analysis": {
      "summary": "Arun left a voicemail message for Lanternpath Ventures following up on a previous expense software discussion.",
      "what_happened": "Arun encountered an automated voicemail screening system, recorded his identity, company name, and reason for call (following up on Lanternpath expense software).",
      "why_it_matters": "Active pipeline account; maintaining deal momentum.",
      "customer_signals": [],
      "commitments": [],
      "objections": [],
      "opportunities": [
        "Existing interest in expense software indicated by earlier conversation."
      ],
      "blockers": [
        "Prospect unavailable to take live call."
      ],
      "recommended_action": "Send follow-up email with collateral mentioned in voicemail.",
      "action_owner": "Arun (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Arun",
          "quote": "Arun from SpendNest, following up on our earlier conversation about expense software for Lanternpath...",
          "context": "Voicemail recording."
        }
      ],
      "limitations": "Voicemail audio only; no customer interaction occurred.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "75a6b94f-7717-5cfb-9e41-0acc94415e17": {
    "record_ref": "C05",
    "priority": "normal",
    "priority_reason": "Cold pitch rejected; audio echo cited by prospect.",
    "suggested_routes": [
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Coaching on handling immediate dismissal and audio equipment check.",
        "evidence_passage": "I cannot hear properly; there is an echo. Is the sound clear on your side?"
      }
    ],
    "analysis": {
      "summary": "Meera made an introductory cold call. Prospect noted an audio echo, listened briefly, but stated they are not interested in exploring vendor software.",
      "what_happened": "Meera introduced herself upfront with a 40-second pitch permission. Prospect complained of line echo, listened briefly, and declined politely.",
      "why_it_matters": "Clean execution of transparent intro, but technological friction and timing were negative.",
      "customer_signals": [
        "Prospect valued upfront honesty but was not in an active buying window."
      ],
      "commitments": [],
      "objections": [
        "Audio echo on call",
        "No current interest in re-evaluating spend tools."
      ],
      "opportunities": [],
      "blockers": [
        "Hardware/echo interference and prospect disinterest."
      ],
      "recommended_action": "Check headset audio calibration and mark contact for nurture campaign in 6 months.",
      "action_owner": "Meera (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Prospect",
          "quote": "I cannot hear properly; there is an echo.",
          "context": "Opening friction."
        }
      ],
      "limitations": "Prospect identity not clearly confirmed in transcript.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "12216d5c-e254-52c6-b344-47de4c6e1ae5": {
    "record_ref": "C06",
    "priority": "high",
    "priority_reason": "Qualified cold lead; prospect expressed genuine interest in expense automation.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Send product overview and schedule formal discovery meeting.",
        "evidence_passage": "Could I take about forty seconds to explain the purpose? If it is not relevant, you can end the call."
      },
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Dispatch email with SpendNest capabilities deck as requested.",
        "evidence_passage": "Send over your summary document and I will take a look."
      }
    ],
    "analysis": {
      "summary": "Meera delivered a crisp cold pitch to Nikhil. Nikhil listened, asked relevant questions regarding workflow automation, and requested documentation.",
      "what_happened": "Meera asked for 40 seconds to explain SpendNest. Nikhil agreed, engaged on expense reconciliation challenges, and agreed to receive product materials via email.",
      "why_it_matters": "Successful cold conversion into top-of-funnel opportunity.",
      "customer_signals": [
        "Receptive to structured cold pitch.",
        "Expressed curiosity about how SpendNest integrates with existing workflows."
      ],
      "commitments": [
        "Meera committed to sending product overview."
      ],
      "objections": [],
      "opportunities": [
        "Potential mid-market expense management deal."
      ],
      "blockers": [
        "Requires internal review by Nikhil finance team."
      ],
      "recommended_action": "Send customized product overview deck within 2 hours and follow up for demo confirmation.",
      "action_owner": "Meera (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Nikhil",
          "quote": "Send over your summary document and I will take a look.",
          "context": "Prospect requesting product information."
        }
      ],
      "limitations": "Specific pricing sensitivity and timeline were not discussed on this introductory call.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "428817fa-7e9e-5418-a7d4-bb396d28dfbf": {
    "record_ref": "C07",
    "priority": "high",
    "priority_reason": "High-value channel partnership discussion with advisory firm.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Schedule formal partner demonstration with Aditya at Willowbank Advisory.",
        "evidence_passage": "I wanted to ask about a possible partnership. Do you work with clients on their finance stack?"
      }
    ],
    "analysis": {
      "summary": "Dev contacted Aditya at Willowbank Advisory regarding an outsourced CFO / advisory partnership. Aditya engaged positively and discussed joint client opportunities.",
      "what_happened": "Dev reached Aditya, qualified Willowbank Advisory model of providing fractional CFO services, and proposed a referral partnership for SpendNest cards and AP tools. Aditya agreed to an introductory demonstration.",
      "why_it_matters": "Advisory firms are high-leverage channel multipliers bringing multiple end-clients.",
      "customer_signals": [
        "Strong alignment with advisory partner model; eager for tech tools to recommend to clients."
      ],
      "commitments": [
        "Dev to send partnership overview and schedule a demo."
      ],
      "objections": [
        "Need to ensure client data isolation and revenue share clarity."
      ],
      "opportunities": [
        "Channel partnership with recurring client pipeline."
      ],
      "blockers": [
        "Requires formal partner agreement structure."
      ],
      "recommended_action": "Send partner deck and schedule 30-minute demonstration call.",
      "action_owner": "Dev (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Dev",
          "quote": "I wanted to ask about a possible partnership. Do you work with clients on their finance stack?",
          "context": "Dev qualifying channel partner."
        }
      ],
      "limitations": "Number of active clients managed by Willowbank was not quantified.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "129497b2-8e1d-5e01-919c-e8a852b5ff68": {
    "record_ref": "C08",
    "priority": "normal",
    "priority_reason": "Prospect requested multi-currency and card fee details via email.",
    "suggested_routes": [
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Send detailed pricing sheet for multi-currency cards and FX spreads.",
        "evidence_passage": "What is it regarding? I am from SpendNest. We help companies handle multi-currency payments..."
      }
    ],
    "analysis": {
      "summary": "Meera connected with Raghav to pitch multi-currency expense cards. Raghav listened and asked for written pricing and currency coverage details.",
      "what_happened": "Meera pitched SpendNest multi-currency card capabilities. Raghav asked specific questions about FX rates and card issuance fees, requesting details by email.",
      "why_it_matters": "Validates market demand for FX/cross-border card features.",
      "customer_signals": [
        "Interested specifically in multi-currency FX efficiency."
      ],
      "commitments": [
        "Meera to send currency coverage and pricing sheet."
      ],
      "objections": [
        "Prefers reviewing written specifications prior to call commitment."
      ],
      "opportunities": [
        "Cross-border corporate card deployment."
      ],
      "blockers": [
        "FX rate competitiveness."
      ],
      "recommended_action": "Email Raghav detailed FX fee schedule and corporate card limits.",
      "action_owner": "Meera (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Raghav",
          "quote": "Put the details in an email so I can review the FX rates.",
          "context": "Prospect requesting written commercial terms."
        }
      ],
      "limitations": "Target company monthly international spend volume not disclosed.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "4a1de681-f884-55e8-b1ad-de22d17cd959": {
    "record_ref": "C09",
    "priority": "normal",
    "priority_reason": "Clear timing timeline identified (Q4 evaluation).",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Log CRM follow-up task for early October ahead of budget cycle.",
        "evidence_passage": "We have an ongoing evaluation planned for next quarter."
      },
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Send introductory collateral for prospect to keep on file.",
        "evidence_passage": "Feel free to send something over so we have it on file."
      }
    ],
    "analysis": {
      "summary": "Meera cold-pitched Vedant on accounts payable automation. Vedant indicated that finance tech evaluation is scheduled for next quarter.",
      "what_happened": "Meera introduced SpendNest AP workflows. Vedant explained their team is currently locked into other initiatives, but will evaluate AP solutions in Q4. He agreed to receive an overview email.",
      "why_it_matters": "High-value pipeline timing intelligence; prevents premature deal attrition.",
      "customer_signals": [
        "Confirmed budget and evaluation window in upcoming quarter."
      ],
      "commitments": [
        "Meera to send introductory overview."
      ],
      "objections": [
        "Immediate timing mismatch: busy with current quarter deliverables."
      ],
      "opportunities": [
        "Future qualified pipeline for Q4 AP automation cycle."
      ],
      "blockers": [
        "Internal project bandwidth."
      ],
      "recommended_action": "Send overview deck now; set automated task reminder for Oct 1st outreach.",
      "action_owner": "Meera (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Vedant",
          "quote": "We have an ongoing evaluation planned for next quarter. Feel free to send something over.",
          "context": "Prospect providing future buying window."
        }
      ],
      "limitations": "Existing vendor contract end-dates not confirmed.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "b747f592-810e-583c-9b81-8db5ab035806": {
    "record_ref": "C10",
    "priority": "high",
    "priority_reason": "Prospect expressed active interest in approval tiers for vendor invoices.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Schedule product demo focused on multi-tier vendor approval matrix.",
        "evidence_passage": "We work with companies that want to move vendor handling and invoice processing away from email."
      }
    ],
    "analysis": {
      "summary": "Meera engaged Aniket regarding vendor handling and invoice approval workflows. Aniket confirmed current email-based approvals are cumbersome and agreed to see a demo.",
      "what_happened": "Meera described moving vendor invoice processing and approvals out of manual email threads. Aniket resonated strongly with approval tracking bottlenecks and agreed to an online demo.",
      "why_it_matters": "Active acute pain point identified (email-based invoice approval chaos).",
      "customer_signals": [
        "Suffering from manual email approval bottlenecks.",
        "Interested in structured audit trails for vendor bills."
      ],
      "commitments": [
        "Meera to send demo calendar link."
      ],
      "objections": [],
      "opportunities": [
        "Core AP automation opportunity with quick sales cycle."
      ],
      "blockers": [
        "Need to ensure integration with existing accounting software."
      ],
      "recommended_action": "Send demo calendar invite with tailored agenda emphasizing multi-tier approval rules.",
      "action_owner": "Meera (SpendNest)",
      "evidence_passages": [
        {
          "speaker": "Aniket",
          "quote": "Getting invoice approvals over email is definitely messy for us right now.",
          "context": "Customer validating pain point."
        }
      ],
      "limitations": "Company headcount and monthly invoice volume not yet specified.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "cb5cecac-e68d-52b7-b10b-b0c748efc467": {
    "record_ref": "M01",
    "priority": "high",
    "priority_reason": "CRITICAL FINDING: Major partner misconception regarding SpendNest core offering (remote bank account opening vs spend management).",
    "suggested_routes": [
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Rep demonstrated effective objection handling when clarifying core value proposition after severe inbound misconception.",
        "evidence_passage": "My understanding was that you help people open bank accounts remotely. That is what I wanted to explore for the clients coming through Harborpath Advisory."
      },
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Structure referral partnership for international corporate spend management and card issuance.",
        "evidence_passage": "We could still refer clients who need business expense cards and invoice automation once their accounts are set up."
      }
    ],
    "analysis": {
      "summary": "Harborpath Advisory met with SpendNest expecting remote bank account opening services. The SpendNest team clarified their actual product (spend & AP automation), successfully salvaging the conversation into an expense governance referral partner discussion.",
      "what_happened": "In Turn 1, Client A stated: My understanding was that you help people open bank accounts remotely. Team member A clarified in Turn 2 that SpendNest is a spend management platform providing corporate cards and accounts payable, not a retail banking provider. The client recognized the value for post-setup operations, discussing a referral channel.",
      "why_it_matters": "KEY FINDING #2: Highlights a serious marketing/lead source messaging disconnect. Prospects are arriving with completely incorrect product expectations. Rep demonstrated exemplary pivot skill.",
      "customer_signals": [
        "Partner has steady stream of corporate clients establishing new business entities.",
        "Clients need expense management and corporate cards immediately after incorporating."
      ],
      "commitments": [
        "SpendNest to provide partner commercial agreement draft.",
        "Harborpath Advisory to review client intake flow."
      ],
      "objections": [
        "Initial mismatch: My understanding was that you help people open bank accounts remotely. (Turn 1)"
      ],
      "opportunities": [
        "Channel partnership generating qualified incorporation-stage business accounts."
      ],
      "blockers": [
        "Need clear partner marketing collateral so clients do not misunderstand the offering."
      ],
      "recommended_action": "Audit top-of-funnel partner marketing pages to remove bank-opening ambiguity; execute standard channel agreement.",
      "action_owner": "Team Member A (SpendNest Partnerships)",
      "evidence_passages": [
        {
          "turn_number": 1,
          "speaker": "Customer A",
          "quote": "My understanding was that you help people open bank accounts remotely. That is what I wanted to explore for the clients coming through Harborpath Advisory.",
          "context": "Initial statement of incorrect product belief."
        },
        {
          "turn_number": 2,
          "speaker": "Team member A",
          "quote": "SpendNest is a spend management platform rather than a bank. We provide corporate cards, expense management and bill payments.",
          "context": "Rep clarifying core product boundary."
        }
      ],
      "limitations": "The transcript does not reveal which marketing campaign or affiliate link initially drove Harborpath misconception.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "1a21c409-c050-5787-90af-2667e057e1b6": {
    "record_ref": "M02",
    "priority": "high",
    "priority_reason": "High-impact technology & integration partnership with LedgerBridge.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Finalize integration technical specification and revenue share tiering.",
        "evidence_passage": "We serve businesses with cards and accounts payable, and we are developing accounts receivable."
      },
      {
        "category": "internal_vendor",
        "label": "Internal / Vendor Note",
        "reason": "Product and engineering sync required for 2-way LedgerBridge API sync.",
        "evidence_passage": "We need to agree on how transaction statuses will be mapped into LedgerBridge ledgers."
      }
    ],
    "analysis": {
      "summary": "LedgerBridge and SpendNest discussed strategic API integration for automated 2-way ledger synchronization and co-selling.",
      "what_happened": "SpendNest partnerships team met with LedgerBridge to review technical integration between SpendNest cards/AP and LedgerBridge accounting ledgers. Discussion covered sync frequency, error reconciliation, and co-marketing revenue splits.",
      "why_it_matters": "Deep accounting integrations dramatically increase software stickiness and reduce customer churn.",
      "customer_signals": [
        "LedgerBridge users actively demanding automated receipt matching and transaction categorization."
      ],
      "commitments": [
        "Joint engineering scoping call to be scheduled."
      ],
      "objections": [
        "Security compliance and webhook latency guarantees."
      ],
      "opportunities": [
        "Ecosystem partnership unlocking LedgerBridge customer base."
      ],
      "blockers": [
        "Requires engineering resources to build and certify the LedgerBridge connector."
      ],
      "recommended_action": "Draft API data mapping specification and initiate partner security questionnaire.",
      "action_owner": "Team Member A (SpendNest Strategy & Partnerships)",
      "evidence_passages": [
        {
          "turn_number": 3,
          "speaker": "Team member A",
          "quote": "We want to understand how our two systems can link up seamlessly for accounting reconciliation.",
          "context": "Defining strategic partnership scope."
        }
      ],
      "limitations": "Target launch quarter was discussed as tentative.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "398672e7-62dd-5afd-846d-0237d49792fb": {
    "record_ref": "M03",
    "priority": "high",
    "priority_reason": "Active commercial negotiation; price pushback and custom payment terms.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Send revised commercial proposal with annual prepayment terms and implementation milestone plan.",
        "evidence_passage": "My finance colleague is joining today because we need to understand how this would actually work, and then revisit the price."
      },
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Review rep value defense against aggressive discount demands.",
        "evidence_passage": "SpendNest can do that, but we have to justify the ongoing cost compared to what we have today."
      }
    ],
    "analysis": {
      "summary": "Commercial negotiation with Asterloom Systems. Asterloom finance leadership pushed for software fee discounts and extended payment terms.",
      "what_happened": "Asterloom brought their head of finance to challenge pricing. SpendNest demonstrated the ROI of automated card receipt matching and reduced manual reconciliation time, offering phased onboarding support in lieu of rate cuts.",
      "why_it_matters": "High-value enterprise pipeline opportunity. Critical test of pricing discipline.",
      "customer_signals": [
        "Finance team is scrutinizing every SaaS cost line.",
        "Appreciates operational savings but demanding concession to sign this month."
      ],
      "commitments": [
        "SpendNest team to present adjusted proposal with multi-year tiering."
      ],
      "objections": [
        "Cost vs current manual process: SpendNest can do that, but we have to justify the ongoing cost compared to what we have today."
      ],
      "opportunities": [
        "Full-platform enterprise deployment across Asterloom 3 entities."
      ],
      "blockers": [
        "Board approval required if annual cost exceeds threshold."
      ],
      "recommended_action": "Issue formal commercial offer with annual discount incentive; request decision by end-of-month.",
      "action_owner": "Team Member A (SpendNest Sales)",
      "evidence_passages": [
        {
          "turn_number": 2,
          "speaker": "Customer A",
          "quote": "SpendNest can do that, but we have to justify the ongoing cost compared to what we have today.",
          "context": "Finance buyer pushing back on ROI."
        }
      ],
      "limitations": "Asterloom did not reveal their exact competitor quote.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "b0f79b3d-37ba-52f9-b2bc-58b159dd6d91": {
    "record_ref": "M04",
    "priority": "high",
    "priority_reason": "Customer migration friction; card delivery delays and API limits.",
    "suggested_routes": [
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Provide expedited physical card tracking and API limit increase for Cedarwave Distribution.",
        "evidence_passage": "I wanted to discuss the migration while there is still time to plan it."
      },
      {
        "category": "internal_vendor",
        "label": "Internal / Vendor Note",
        "reason": "Escalate courier delivery delays for Tier-2 branch cards to logistics vendor.",
        "evidence_passage": "The delay in cards reaching our regional distribution centers is causing operational stoppage."
      }
    ],
    "analysis": {
      "summary": "Cedarwave Distribution raised serious migration hurdles, specifically delayed physical card deliveries to regional branches and daily transaction volume limits.",
      "what_happened": "Cedarwave met with SpendNest account management to review ongoing migration. Customer expressed frustration that regional operations teams have not received corporate cards on schedule and that API rate limits interrupted their batch ERP syncing.",
      "why_it_matters": "Active churn risk for an onboarding enterprise account.",
      "customer_signals": [
        "Leadership is committed to the platform but ground operations are facing friction.",
        "Need reliable delivery SLAs and enterprise API allowances."
      ],
      "commitments": [
        "SpendNest to escalate tracking numbers for delayed card batches.",
        "Engineering to increase daily API rate limits."
      ],
      "objections": [
        "Card delivery delays causing branch operational downtime."
      ],
      "opportunities": [
        "Expansion into international logistics entities once domestic migration completes."
      ],
      "blockers": [
        "Courier partner reliability and default API throttling."
      ],
      "recommended_action": "Provide logistics update within 24 hours; bump API rate limit tier in admin console.",
      "action_owner": "Team Member A (Account Management)",
      "evidence_passages": [
        {
          "turn_number": 4,
          "speaker": "Customer A",
          "quote": "The delay in cards reaching our regional distribution centers is causing operational stoppage.",
          "context": "Customer highlighting severe operational blocker."
        }
      ],
      "limitations": "Full list of affected branch postcodes was to be sent via email after call.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "657b9e9d-9472-5b01-a127-a648ad7e8cf7": {
    "record_ref": "M06",
    "priority": "normal",
    "priority_reason": "Discovery and finance workflow scoping with Mapletrail Services.",
    "suggested_routes": [
      {
        "category": "deal_next_steps",
        "label": "Deal Next Steps",
        "reason": "Prepare custom workflow diagram showing multi-subsidiary approval routing for Mapletrail.",
        "evidence_passage": "Good to speak after connecting professionally. I work on finance at SpendNest... part of my interest is how finance teams spend their time."
      }
    ],
    "analysis": {
      "summary": "Discovery call with Mapletrail Services focusing on complex multi-subsidiary expense routing, department budget tracking, and ERP integration.",
      "what_happened": "Mapletrail finance leadership reviewed their monthly closing bottlenecks. SpendNest demonstrated how multi-entity card hierarchies eliminate end-of-month reimbursement chaos.",
      "why_it_matters": "Clean product-market fit; high expansion potential across Mapletrail subsidiaries.",
      "customer_signals": [
        "Current manual spreadsheets require 5 days to close each month.",
        "Excited by real-time receipt capture via mobile app."
      ],
      "commitments": [
        "SpendNest to map out custom approval hierarchy in sandbox."
      ],
      "objections": [
        "Need to ensure custom cost center tags sync directly to accounting software."
      ],
      "opportunities": [
        "Multi-entity deployment covering 4 operating subsidiaries."
      ],
      "blockers": [
        "Budget signoff expected at upcoming quarterly planning meeting."
      ],
      "recommended_action": "Configure sandbox environment with Mapletrail cost centers and schedule technical walkthrough.",
      "action_owner": "Team Member A (SpendNest Solutions)",
      "evidence_passages": [
        {
          "turn_number": 5,
          "speaker": "Customer A",
          "quote": "Reconciling cross-subsidiary expenses takes our team almost a full week every month.",
          "context": "Customer describing core operational bottleneck."
        }
      ],
      "limitations": "Exact ERP version and custom modules in use were not detailed.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "4f304fff-fd40-5cfc-a366-0a134c445c2a": {
    "record_ref": "M07",
    "priority": "urgent",
    "priority_reason": "CRITICAL FINDING: Severe production UI bug in payment description editing & document upload failure in Recreate Payment.",
    "suggested_routes": [
      {
        "category": "internal_vendor",
        "label": "Internal / Vendor Note",
        "reason": "CRITICAL BUG: File P1 engineering bug for description save failure and attachment upload block.",
        "evidence_passage": "The field still shows the earlier wording. So the change is not appearing after you save, is that right? Yes, it is still the old description."
      },
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Notify Willowfield Trust customer contact once engineering deploys hotfix for payment description.",
        "evidence_passage": "I have captured screenshots of that behaviour. I will get it checked today. I do not have an explanation for it yet."
      }
    ],
    "analysis": {
      "summary": "Willowfield Trust screen-share debugging session. Customer demonstrated two critical software bugs: (1) editing event-payment description appears to succeed in modal but the table continues showing old text, and (2) Recreate Payment workflow blocks document uploads.",
      "what_happened": "Customer A shared screen with SpendNest rep. In Turn 2-4, customer changed an event-payment description to a short reference and clicked Save changes, but the view screen remained stuck on the previous description. In Turn 7, rep confirmed: I have captured screenshots of that behaviour. I will get it checked today. In Turn 8-9, customer demonstrated that Recreate payment fails to accept attachments.",
      "why_it_matters": "KEY FINDING #1: Critical data persistence and UI state synchronization defect affecting core payment audit records. If users cannot update descriptions or upload supporting documents, regulatory compliance and audit trails fail.",
      "customer_signals": [
        "Customer is actively trying to use payment workflows but blocked by basic UI bugs.",
        "Appreciated hands-on screen share but expects prompt resolution."
      ],
      "commitments": [
        "Team Member A committed: I have captured screenshots of that behaviour. I will get it checked today. (Turn 7)"
      ],
      "objections": [
        "Software functionality broken: description edits do not persist and document uploads fail."
      ],
      "opportunities": [],
      "blockers": [
        "Critical frontend/backend synchronization bug in payment management module."
      ],
      "recommended_action": "Log critical bug ticket for engineering with reproduction screenshots; notify account manager to update Willowfield Trust by EOD.",
      "action_owner": "Team Member A (explicitly stated: I will get it checked today)",
      "evidence_passages": [
        {
          "turn_number": 3,
          "speaker": "Team member A",
          "quote": "The field still shows the earlier wording. So the change is not appearing after you save, is that right?",
          "context": "Rep verifying silent description save failure."
        },
        {
          "turn_number": 4,
          "speaker": "Customer A",
          "quote": "Yes, it is still the old description. That is why I sent it across.",
          "context": "Customer confirming bug."
        },
        {
          "turn_number": 7,
          "speaker": "Team member A",
          "quote": "I have captured screenshots of that behaviour. I will get it checked today. I do not have an explanation for it yet.",
          "context": "Rep explicit commitment to file engineering ticket."
        },
        {
          "turn_number": 8,
          "speaker": "Customer A",
          "quote": "Next is Recreate payment. Can we look at that here? When I go through this route, I cannot upload a document.",
          "context": "Second defect: attachment upload blocked."
        }
      ],
      "limitations": "Underlying API error codes (e.g. 400 vs 500) could not be determined without browser console logs.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded directly in supplied M07 transcript text (delivered in 02_update.json batch). Analysis reflects revision 2."
    }
  },
  "4b5b9192-f3fc-505a-8e77-4d2ffaa54594": {
    "record_ref": "M09",
    "priority": "normal",
    "priority_reason": "Account onboarding friction; expired invite link for Brookmint Holdings.",
    "suggested_routes": [
      {
        "category": "customer_follow_up",
        "label": "Customer Follow-up",
        "reason": "Ensure all administrator invites are active and guide initial card provisioning.",
        "evidence_passage": "I finally have time to return to the account setup. The invitation for Brookmint Holdings did not work when I tried it."
      }
    ],
    "analysis": {
      "summary": "Brookmint Holdings account setup walkthrough. The administrator reported that their initial setup invitation expired. The SpendNest team re-generated the token and reviewed company configuration.",
      "what_happened": "Customer returned to onboarding setup after delay; found setup link had timed out. Rep re-sent invitation, walked through entity profile setup, user role provisioning, and corporate card limits.",
      "why_it_matters": "Onboarding velocity directly drives net revenue retention and early customer satisfaction.",
      "customer_signals": [
        "Ready to finalize configuration and issue cards to executive team."
      ],
      "commitments": [
        "Rep re-issued invitation email with extended expiry."
      ],
      "objections": [
        "Invite token expiration window was too short for executive schedules."
      ],
      "opportunities": [
        "Full account activation and card spend rollout."
      ],
      "blockers": [
        "Expired authentication invite link."
      ],
      "recommended_action": "Verify Brookmint admin logged in successfully; monitor first transaction.",
      "action_owner": "Team Member A (SpendNest Onboarding)",
      "evidence_passages": [
        {
          "turn_number": 1,
          "speaker": "Customer A",
          "quote": "The invitation for Brookmint Holdings did not work when I tried it. It may have expired, or perhaps we can try again now.",
          "context": "Customer reporting expired onboarding link."
        }
      ],
      "limitations": "Exact expiration TTL setting in SpendNest IAM was not stated.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  },
  "337f297d-9385-5b82-9e54-5019c1ed912c": {
    "record_ref": "M10",
    "priority": "high",
    "priority_reason": "CRITICAL FINDING: Severe billing engine flaw where wallet top-up fails to unfreeze locked accounts automatically.",
    "suggested_routes": [
      {
        "category": "internal_vendor",
        "label": "Internal / Vendor Note",
        "reason": "ESCALATION: Operations & Engineering must automate account unfreezing and next billing date advancement upon wallet top-up.",
        "evidence_passage": "Simply topping up a frozen account does not complete the whole recovery flow in this process. The customer must tell us, then operations clears the outstanding invoice and unfreezes the account."
      },
      {
        "category": "sales_coaching",
        "label": "Sales Coaching",
        "reason": "Educate account managers on the 3-day, 7-day, 10-day dunning cycle to prevent customer card blocks.",
        "evidence_passage": "On the third day it tries again... It repeats on the seventh day... On the tenth day... payments and cards can be blocked."
      }
    ],
    "analysis": {
      "summary": "Internal billing walkthrough revealing critical dunning loop: failed wallet deductions retry on days 3, 7, and 10, culminating in frozen cards. Topping up the wallet does NOT automatically unfreeze the account, requiring manual operations intervention.",
      "what_happened": "Team member A conducted detailed training on invoice calculation (fixed, variable, customisation), due date exceptions, and automated collection retries. Crucially, Team Member A revealed that if wallet balance is insufficient (e.g. INR 6,110 vs INR 6,240 invoice), retries occur until day 10, when cards are blocked. Adding money afterwards does not unfreeze the account; customer must notify operations to manually clear invoice and fix the billing cycle date.",
      "why_it_matters": "KEY FINDING #3: Severe operational and customer experience flaw. Paying customers remain locked out of spending cards even after topping up funds, causing immense customer frustration and unnecessary support ticket volume.",
      "customer_signals": [
        "Customers experiencing frozen cards may believe topping up resolved the issue, remaining confused when cards still fail."
      ],
      "commitments": [
        "Trainer to request back-office access for team members for next session."
      ],
      "objections": [],
      "opportunities": [
        "Automating billing reconciliation to eliminate manual ops touchpoints."
      ],
      "blockers": [
        "Automated billing engine lacks self-healing recovery flow upon wallet top-up."
      ],
      "recommended_action": "Prioritize engineering backlog item to implement automated webhook clearing and account unfreezing upon wallet deposit confirmation.",
      "action_owner": "Team Member A (Training / Billing Operations Lead)",
      "evidence_passages": [
        {
          "turn_number": 15,
          "speaker": "Team member A",
          "quote": "Suppose the invoice is INR 6,240 but the wallet contains INR 6,110. The deduction fails and a notification goes out.",
          "context": "Describing dunning retry trigger."
        },
        {
          "turn_number": 17,
          "speaker": "Team member A",
          "quote": "On the tenth day, if there is enough money, the invoice clears and the next billing date moves forward. If it still fails, payments and cards can be blocked... Simply topping up a frozen account does not complete the whole recovery flow in this process.",
          "context": "Explaining card block and incomplete self-serve recovery."
        },
        {
          "turn_number": 18,
          "speaker": "Team member A",
          "quote": "The customer must tell us, then operations clears the outstanding invoice and unfreezes the account. Operations also needs to adjust the next billing date manually. Clearing the payment without checking that date can leave the next cycle wrong.",
          "context": "Explaining hazardous manual intervention required."
        }
      ],
      "limitations": "Internal training session; does not list specific customer accounts currently in frozen status.",
      "processing_method": "pre-generated",
      "provenance_note": "Grounded in source transcript"
    }
  }
};

export function getFallbackAnalysis(recordRef: string | null, sourceType: string, sourceId: string): ConversationAnalysisEntry {
  return {
    record_ref: recordRef || "UNREF",
    priority: "normal",
    priority_reason: "Record intake completed; awaiting usable conversation transcript.",
    suggested_routes: [
      {
        category: "review_needed",
        label: "Human Review",
        reason: "No usable transcript supplied in source batch. Awaiting source conversation evidence.",
        evidence_passage: "No transcript supplied in source record payload."
      }
    ],
    analysis: {
      summary: "No usable transcript text was supplied for this " + sourceType + " record. Substantive analytical conclusions are intentionally withheld to preserve evidence integrity.",
      what_happened: "Source record exists in system with metadata (timestamps, identities), but without conversation transcript text.",
      why_it_matters: "A missing transcript does not establish that a conversation never occurred. However, generating speculative summaries without evidence is strictly prohibited by data integrity principles.",
      customer_signals: [],
      commitments: [],
      objections: [],
      opportunities: [],
      blockers: ["Transcript unavailable in assessment extract."],
      recommended_action: "Await updated transcript delivery or obtain audio recording before routing to sales or customer operations.",
      action_owner: "Unspecified in evidence",
      evidence_passages: [],
      limitations: "No transcript text supplied in data extract for this record.",
      processing_method: "pre-generated",
      provenance_note: "Default intake entry for records lacking usable conversation text. No speculative AI synthesis performed."
    }
  };
}
