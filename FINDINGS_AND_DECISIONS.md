# Key Findings & Rejected Decision
SpendNest Revenue Intelligence Inbox — Assessment Deliverable

---

## Part 1: Three Evidence-Backed Findings

### Finding 1: Critical UI / Payment Description Save Failure & Upload Block (M07 — Willowfield Trust)
1. **What was observed:** During a live screen-share session, Customer A demonstrated two software defects: (a) editing an event-payment description appears to succeed in the modal, but the table view persistently reverts to the old description; (b) the "Recreate payment" workflow blocks document attachments.
2. **Why it matters:** Payment descriptions and attached invoices are legally required audit artifacts in accounts payable. Silent persistence failures destroy auditability and customer trust.
3. **Exact Supporting Passage:**
   - *Turn 3 (Team Member A):* "The field still shows the earlier wording. So the change is not appearing after you save, is that right?"
   - *Turn 4 (Customer A):* "Yes, it is still the old description. That is why I sent it across."
   - *Turn 7 (Team Member A):* "I have captured screenshots of that behaviour. I will get it checked today. I do not have an explanation for it yet."
   - *Turn 8 (Customer A):* "Next is Recreate payment... When I go through this route, I cannot upload a document."
4. **Source Record Reference:** `meeting` / Source ID: `4f304fff-fd40-5cfc-a366-0a134c445c2a` (Record Ref: `M07`).
5. **Product / Route Impact:** Triggers urgent routing to `internal_vendor` (P1 engineering hotfix ticket) and `customer_follow_up` (account manager status update). Prioritized in the Attention Queue.
6. **Uncertainty / Limitation:** Client console logs and backend response status codes (e.g., 400 validation vs 500 server error) were not visible in the meeting dialogue.

---

### Finding 2: Inbound Partner Qualification Misalignment (M01 — Harborpath Advisory)
1. **What was observed:** Harborpath Advisory scheduled an introductory call under the erroneous belief that SpendNest provides remote corporate bank account opening. The representative clarified SpendNest's actual scope (spend cards and AP automation) and salvaged the meeting into an expense referral partnership.
2. **Why it matters:** Indicates severe top-of-funnel marketing or channel affiliate messaging disconnect. Prospects are booking meetings under fundamental misunderstandings of the core product.
3. **Exact Supporting Passage:**
   - *Turn 1 (Customer A):* "My understanding was that you help people open bank accounts remotely. That is what I wanted to explore for the clients coming through Harborpath Advisory."
   - *Turn 2 (Team Member A):* "SpendNest is a spend management platform rather than a bank. We provide corporate cards, expense management and bill payments."
4. **Source Record Reference:** `meeting` / Source ID: `cb5cecac-e68d-52b7-b10b-b0c748efc467` (Record Ref: `M01`).
5. **Product / Route Impact:** Routed to `sales_coaching` (educating reps on early qualification & objection pivoting) and `deal_next_steps` (drafting referral agreement for post-incorporation clients).
6. **Uncertainty / Limitation:** The transcript does not identify the specific advertising campaign or partner directory URL that originated the lead.

---

### Finding 3: Severe Billing Retry & Account Freezing Failure Loop (M10 — Billing Walkthrough)
1. **What was observed:** Internal training revealed that when customer wallet balance falls slightly short of an invoice (e.g. INR 6,110 vs INR 6,240), the automated billing engine retries on days 3, 7, and 10 before freezing cards. Crucially, simply topping up the wallet does NOT automatically unfreeze the account or advance the billing date without manual operations intervention.
2. **Why it matters:** High customer churn risk. Paying customers who top up their wallets remain locked out of spending cards, causing intense friction and unnecessary support tickets.
3. **Exact Supporting Passage:**
   - *Turn 15 (Team Member A):* "Suppose the invoice is INR 6,240 but the wallet contains INR 6,110. The deduction fails and a notification goes out. The system tries three times."
   - *Turn 17 (Team Member A):* "On the tenth day... payments and cards can be blocked, and the billing date stays stuck. Simply topping up a frozen account does not complete the whole recovery flow in this process."
   - *Turn 18 (Team Member A):* "The customer must tell us, then operations clears the outstanding invoice and unfreezes the account. Operations also needs to adjust the next billing date manually."
4. **Source Record Reference:** `meeting` / Source ID: `337f297d-9385-5b82-9e54-5019c1ed912c` (Record Ref: `M10`).
5. **Product / Route Impact:** Routed to `internal_vendor` (engineering ticket for automated webhook-driven unfreeze) and `sales_coaching` (advising account managers of dunning stages).
6. **Uncertainty / Limitation:** Internal training session; does not quantify the exact number of customer accounts currently frozen in production.

---

## Part 2: One Deliberately Rejected Decision

### Rejected Alternative: Forcing Every Conversation into Exactly One Single Route Category
- **The Alternative:** Imposing a strict 1-to-1 relationship where each conversation is categorized under only one route (e.g., either Sales Coaching, Deal Next Steps, Customer Follow-up, Internal / Vendor Note, or Human Review).
- **Why It Initially Seemed Attractive:** Simpler database schema, clean 100% pie charts, and straightforward single-folder export archives.
- **Why We Rejected It:** Real-world B2B revenue intelligence is inherently multi-faceted. In conversation `M07` (Willowfield Trust), the conversation surfaces both an urgent engineering defect (Internal / Vendor Note) and a client assurance commitment (Customer Follow-up). Forcing a single category would either fail to notify engineering of the software bug or fail to prompt the account manager to follow up with the client.
- **Trade-Off Accepted:** The dashboard metrics must track unique logical records (44) separately from route assignment counts (53 total route instances) to maintain mathematical reconciliation and prevent double-counting.
- **Where Visible in Product:** 
  1. *Screen A (Dashboard):* "Multi-Route Records" metric card and route distribution breakdown.
  2. *Screen C (Detail):* Multi-checkbox selection in Routing Studio with individual passage evidence.
  3. *Screen E (Exports):* Multi-path export manifest where single records populate multiple destination folders while maintaining identity `(source_type, source_id)`.
