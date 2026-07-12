# Blob Receipts — every Plotline memory saved to Walrus

This is the complete list of memories Plotline has saved to Walrus, compiled on July 12, 2026.

A quick explanation of the two IDs, for anyone new to the project:

- **Job ID** — a temporary ticket number the Walrus Memory service hands back the moment it accepts a save. It's only used to check on the save while it's in progress.
- **Blob ID** — the permanent address of the memory once it's stored on Walrus. This is the "receipt" that proves the memory exists and where it lives.

How this list was rebuilt: the blob IDs came straight from Walrus (the recall service returns them with each memory). The job IDs were recovered from saved session transcripts and the bug report, because the service itself doesn't keep a lookup from memory back to job ID. One job ID (memory 2) could not be recovered — its session left no records — and is marked honestly rather than guessed.

---

## Memory 1 — the test memory (July 8, 2026, namespace `plotline-test`)

> TEST: Never Lose the Plot project initialized by Shepherd on July 8 2026. Stack is Node.js + MemWal SDK. RULE: always test locally before pushing.

- Job ID: `b1d6ff99-5597-4650-86e6-50f2d8be1fef`
- Blob ID: `1kyqVWzPJgSQF6geeJ-KywdDGyZXMr198p2xDlZB80w`

*Note: the first attempt to save this memory (job ID `ec9a91dd-0113-4332-a13c-9709ba7a9bc2`) failed because the relayer's wallet ran out of WAL tokens — that's the bug documented in bug-report.md. The failed job stored nothing, so it isn't counted below.*

## Memory 2 — the CLI decision (namespace `plotline`)

> Plotline decision: memories are saved via a memory.mjs CLI wrapper instead of a Claude Code plugin, because a plain CLI works with ANY coding agent that can run shell commands — portability is the point of Plotline.

- Job ID: **not recoverable** — this memory was saved in an earlier session whose transcript no longer exists, and the service offers no way to look a job ID up after the fact
- Blob ID: `o_-vBceVvLC9j9HwYf_FsdiJZn0VOfP2tif5_v-5R1A`

## Memory 3 — project status (July 12, 2026, namespace `plotline`)

> Plotline status as of 2026-07-12: the MVP is complete and committed (commit f2a14e4). The project is a Walrus Memory hackathon submission consisting of memory.mjs (a remember/recall CLI built on the @mysten-incubation/memwal SDK, namespace 'plotline'), a CLAUDE.md protocol telling coding agents when to save and recall memories, a README, and bug-report.md documenting a hosted-relayer issue.

- Job ID: `044e696a-7439-48f3-a1a4-ba622e65e99b`
- Blob ID: `6xcnUneCF6Uz9H_WTSFYL9ncewGQHoSbo6UtUiCJbuY`

## Memory 4 — the relayer bug (July 12, 2026, namespace `plotline`)

> Plotline bug (found and fixed 2026-07): on the hosted MemWal relayer (relayer.memory.walrus.xyz), remember() jobs get accepted but silently time out when the relayer's own funding wallet runs out of WAL tokens. Symptom: waitForRememberJob times out with no error detail. Cause: insufficient WAL in the relayer wallet, visible only via getRememberStatus. Workaround: manually sent 0.2 WAL to the relayer wallet, after which saves succeeded. Full writeup lives in bug-report.md in the Plotline repo.

- Job ID: `bfd84f59-37f6-43dd-8dca-d88f762dcdd5`
- Blob ID: `oRWWkbmDOsdSURExdtV8VjDBWxIvNAloCg181JYkksE`

## Memory 5 — the README milestone (July 12, 2026, namespace `plotline`)

> Plotline milestone (2026-07-12, commit 359b4a4): the README gained a 'How it was built' section stating the project was built by a non-technical builder directing an AI coding assistant (Claude Code), and that Plotline dogfoods itself — its own development history is stored in Plotline memories. This framing is part of the Walrus Memory hackathon submission story.

- Job ID: `98b89768-1be5-4279-9cf3-d0a6eb08c081`
- Blob ID: `wzq6x6--8BI3G8n4sZIkNbhEXj6HNH44xGzRuPQJTCY`

## Memory 6 — RULE: plain-language docs (July 12, 2026, namespace `plotline`)

> RULE: all Plotline documentation (README, CLAUDE.md, bug reports, any future docs) must be readable by someone with zero coding experience. Stated by the project owner on 2026-07-12. When writing or editing Plotline docs, avoid unexplained jargon and assume the reader has never programmed.

- Job ID: `1e085d1a-7146-494f-ad11-ccaf4bfee03f`
- Blob ID: `u2h0k2-dEu17-HfZy2A8yo38HA4B6FTcCE6djmUsDd0`

## Memory 7 — RULE: no secrets in memories (July 12, 2026, namespace `plotline`)

> RULE: Plotline memories must never contain secrets — no API keys, passwords, tokens, or wallet private keys. If a fact involves a secret, describe where the secret lives (for example: 'the MemWal credentials are in the .env file in the Plotline repo, which is never committed') instead of the secret itself. Stated by the project owner on 2026-07-12.

- Job ID: `e7d41f04-cc8d-46ea-985d-5fa10adafb92`
- Blob ID: `mRWqiLCfLzcBRMHpK0Y2WuL95hjBgU1V2VZNQuu5GjY`

## Memory 8 — the hackathon deadline (July 12, 2026, namespace `plotline`)

> Plotline deadline: the Walrus Prompt Jam hackathon submission deadline is July 13, 2026 at 2pm UTC. Plotline is being submitted to this hackathon.

- Job ID: `9b625707-b977-4430-bab2-9e1e407cfda5`
- Blob ID: `NwSBVPEllJ2SbazNmBheR6TRll76paxKgrlOfgCGoKQ`

## Memory 9 — bug filed upstream (July 12, 2026, namespace `plotline`)

> Plotline: the relayer bug writeup (hosted MemWal relayer wallet running out of WAL, documented in bug-report.md in the Plotline repo) was submitted upstream as issue #402 on the MemWal repository.

- Job ID: `ceecc5f6-50ec-4aeb-925d-f1dc8e4a55f9`
- Blob ID: `O_5zT4wjrrRRnLeYV5R8tzyvCde6uKQbUN_PqBwoa5k`

## Memory 10 — session snapshot (July 12, 2026, namespace `plotline`)

> SESSION SNAPSHOT 2026-07-12: Plotline session recap. Done: backfilled project memory (status, relayer bug), added a 'How it was built' section to the README crediting a non-technical builder directing an AI assistant (commit 359b4a4), and recorded two owner rules (docs readable with zero coding experience; never store secrets in memories) plus two facts (Walrus Prompt Jam deadline July 13 2026 2pm UTC; relayer bug filed as MemWal issue #402). Current state: MVP complete and committed, git tree clean, all memories verified recallable. Exact next step: before the July 13 2pm UTC deadline, do a plain-language pass over the README to satisfy the zero-coding-experience rule, then complete the hackathon submission.

- Job ID: `3ed6cdfd-75c5-4973-b412-503313abda14`
- Blob ID: `JOwtNTq0W6VfnqwSJIDsbC0Bc-L-mgXm2U7gWpWB868`

## Memory 11 — this receipts file (July 12, 2026, namespace `plotline`)

> Plotline: blob-receipts.md in the repo root (created 2026-07-12) lists every memory saved to Walrus — 10 total: 9 in the 'plotline' namespace and 1 test memory in 'plotline-test' — each with its memory text, job ID, and blob ID. Job IDs were recovered from session transcripts and bug-report.md; the CLI-decision memory's job ID was unrecoverable (its session left no records) and is marked as such rather than guessed.

- Job ID: `e0bf3069-9875-450a-b323-8ba5b5a4201b`
- Blob ID: `XtMxsysASGCTOnK9VE0rzKr8LH5m6bo4qvx9hIXHraE`

*(This memory was saved right after this file was first written, so its own text says "10 total" — this file's count below includes it and is the up-to-date number.)*

## Memory 12 — where the receipts live (July 12, 2026, namespace `plotline`)

> Plotline evidence: the complete list of memory receipts (job IDs and blob IDs) is maintained in blob-receipts.md in the repo at github.com/timmyonchain/plotline.

- Job ID: `c125274c-ddd0-4608-a6e2-6cc538e9f6fe`
- Blob ID: `TlErHr2vc7hHY_60aAmrNbQ-xP-sq6tGpcz7EigYGWY`

## Memory 13 — the demo recording (July 12, 2026, namespace `plotline`)

> Plotline demo: a screen-recorded demo session was completed on July 12 2026, showing the full protocol — recall on session start, memories saved during work, session snapshot on wrap-up, and successful recall in a fresh session after a full restart.

- Job ID: `568e4629-1b33-4aed-9f6d-6d19206d1afc`
- Blob ID: `z7Uo0s7ITZlTZZM8hTzeh2q4JpE7FmQcfcRRxnL7BE0`

## Memory 14 — saved 2026-07-12 (namespace `plotline`)

> RULE: Plotline is in submission freeze as of July 12 2026 — no new features or tasks until the Walrus Prompt Jam hackathon submission (deadline July 13 2026 2pm UTC) is complete. Only the two agreed closing tasks were allowed: auto-appending save receipts to blob-receipts.md, and a plain-language README pass. Stated by the project owner on 2026-07-12.

- Job ID: `211f4c57-2fab-4852-8bfe-d594fedf649c`
- Blob ID: `ukKGAW4XFZayb1n39T_qmbQJRPuFVnJ0FU8beRc_Lhw`

---

**Total: 14 memories saved to Walrus** (13 in the `plotline` namespace, 1 in the `plotline-test` namespace). Job IDs recovered for all except one — the CLI-decision memory (Memory 2), marked not recoverable above.
