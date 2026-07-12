# Plotline — Never Lose the Plot

Plotline gives your AI coding assistant a permanent memory. Everything worth keeping from a working session — decisions, fixed bugs, rules, dead ends — is saved as a short note on [Walrus](https://www.walrus.xyz/), a storage network that no single company controls, so the notes outlive any one chat, computer, or tool. At the start of the next session, the assistant searches those notes by meaning — ask "what were we working on?" and it finds the notes that answer the question, even when they use different words — and picks up exactly where the last session left off. Plotline is a Walrus Memory hackathon submission built with Node.js and the [@mysten-incubation/memwal](https://www.npmjs.com/package/@mysten-incubation/memwal) software kit.

## The problem

AI coding sessions forget. Every chat eventually ends — the window closes, the conversation is cleared, or the assistant simply runs out of room to remember — and the next session starts from zero: you re-explain the project, the assistant re-makes decisions you already settled and re-hits dead ends you already explored. The usual fix is a notes file (often called `CONTEXT.md`) that a person keeps updated by hand. It goes stale the moment someone forgets to update it, and it only exists on one computer. Plotline replaces it with durable, searchable memory that any AI assistant able to run a typed command can read and write.

## How to use it

### Setup

You'll need [Node.js](https://nodejs.org/) installed — it's free, and it's what runs Plotline's commands. Then open a terminal (the window where you type commands) in the project folder and run this once to download everything the project needs:

```
npm install
```

Next, create a file named `.env` in the project folder with your Walrus Memory account details — three lines, filling in your own values after each `=`:

```
MEMWAL_ACCOUNT_ID=...
MEMWAL_SERVER_URL=...
MEMWAL_PRIVATE_KEY=...
```

This file is effectively your login, so keep it private. The project is already set up so that Git (the tool that shares code online) will never include it when the code is published.

### The two commands

```
node memory.mjs remember "<one clear fact>"   # save a memory
node memory.mjs recall "<question>"           # find matching memories, most relevant first
```

Every successful save also adds a receipt to [`blob-receipts.md`](blob-receipts.md) automatically — the memory's text plus the two IDs that prove where it lives on Walrus.

### The protocol

[`CLAUDE.md`](CLAUDE.md) is the instruction sheet the AI assistant reads at the start of every session. It tells the assistant how to use those two commands as the project's brain. In short:

- **On session start** — recall project status, decisions, known bugs, and next steps; summarize; confirm with the user before doing any work.
- **During the session** — save a memory immediately when a decision is made (with its reason), a bug is found and fixed, a milestone ships, the user states a rule, or a dead end is hit.
- **Memory format** — one fact per memory, understandable by a stranger with zero context, and never any secrets.
- **On session end** — save a dated session snapshot with what was done and the exact next step, then list every memory saved.

The bar: the next session — possibly in a different tool — continues the project with zero re-explaining.

## How it was built

Plotline was built by a non-technical builder working with an AI coding assistant (Claude Code). The human set the direction — the problem, the protocol, and what a useful memory looks like — while the AI wrote the code and tracked down the storage-service problem documented in [`bug-report.md`](bug-report.md). Plotline was also used to build itself: the project's own development history lives in Plotline memories, saved and recalled across sessions using the exact workflow described above — including surviving a real, unplanned computer crash mid-project with nothing lost.
