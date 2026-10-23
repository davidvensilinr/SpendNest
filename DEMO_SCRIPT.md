# Three-Minute Continuous Screen Recording Script
SpendNest Revenue Intelligence Inbox — Demo Narration

**Target Duration:** 3 minutes (180 seconds)  
**Format:** Continuous single-take screen recording with candidate spoken narration.

---

### [00:00 - 00:35] Part 1: Product Overview & Manager Problem
- **Visual:** Manager Dashboard (`/overview`).
- **Spoken Narration:**
  > "Hello! This is SpendNest Revenue Intelligence Inbox, built for the Volopay hiring assignment. As a revenue manager, you have dozens of daily interactions across calls and meetings, but raw CRM logs don't tell you what happened. On August 21, 2026, the team logged 44 interactions. Notice our headline metrics: 44 unique records, 30 calls, and 14 meetings. Importantly, our transcript coverage is explicitly defined as 40.9%—that is exactly 18 conversations with usable text, while 26 intentionally lack transcripts. We segregate call reps like Arun and Meera from meeting organisers like team06 and team08, because organisers are administrative hosts, not necessarily sales reps."

---

### [00:35 - 01:25] Part 2: Difficult Routing Decision & Detail Inspection
- **Visual:** Navigate to Conversation Inbox (`/inbox`), filter by `M07`, click into `inbox/4f304fff-fd40-5cfc-a366-0a134c445c2a`.
- **Spoken Narration:**
  > "Let's inspect our most complex case: M07 with Willowfield Trust. In Section A, we see the 27 meeting turns. Customer A shares screen and shows that editing event-payment descriptions fails to save, and document uploads fail. In Section B, our grounded intelligence links this directly to Turn 7, where the rep commits: 'I will get it checked today.' Now look at Section C: Routing Studio. This was a difficult decision—is it support or engineering? We rejected forcing a single category. M07 is routed to BOTH 'Internal/Vendor Note' for engineering, and 'Customer Follow-up' for the account manager. If I want to manually override, I can toggle routes, type a manager rationale, and click 'Save Manual Override.' The system immediately records the manager override while preserving the original system suggestion."

---

### [00:25 - 02:25] Part 3: Data Contract Replay & Preserving Judgment
- **Visual:** Navigate to Imports Console (`/imports`).
- **Spoken Narration:**
  > "Now, let's verify Data Contract compliance. In our Imports console, we see our live audit log. Watch what happens when I click 'Replay Scrambled': the system processes 01_initial in reverse order. Exactly 44 records remain, 0 duplicates are created, proving idempotency and order independence. Next, I apply the update batch: M07 receives revision 2, lifting usable transcripts from 17 to 18. Crucially, look at M07: our manual route override survived the update completely untouched! In accordance with Rule 4, an incoming source update refreshes evidence but never erases a human manager's judgment."

---

### [02:25 - 03:00] Part 4: Manager Brief & Verified Exports
- **Visual:** Navigate to `/brief`, then `/exports`, and trigger ZIP download.
- **Spoken Narration:**
  > "Finally, the Manager Brief for 21 August provides ranked executive findings, highlighting the M07 payment bug, the M01 partner bank-opening misconception, and the M10 billing dunning loop. On the Exports screen, clicking 'Download Complete Export ZIP' generates our deliverable archive. The manifest links every one of the 44 records to verified files inside category folders, with zero broken paths. Thank you!"
