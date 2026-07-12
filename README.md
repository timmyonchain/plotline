# Plotline — Never Lose the Plot

Plotline gives your coding agent a permanent, portable memory backed by [Walrus](https://www.walrus.xyz/) decentralized storage. Every decision, bug fix, rule, and dead end from a coding session is saved as a small, self-contained memory via the MemWal SDK, and recalled by semantic search at the start of the next session — even if that session runs in a completely different tool. It's a Walrus Memory hackathon submission built on Node.js and [@mysten-incubation/memwal](https://www.npmjs.com/package/@mysten-incubation/memwal).

## The problem

AI coding sessions are amnesiac. Context windows end, chats get cleared, and the next session starts from zero: you re-explain the architecture, the agent re-makes decisions you already settled, and re-hits dead ends you already explored. The usual fix — a hand-maintained `CONTEXT.md` — goes stale the moment you forget to update it, and it lives in one repo checkout. Plotline replaces it with durable, queryable memory that any agent capable of running a shell command can read and write.

## How to use it

### Setup

```
npm install
```

Create a `.env` file with your MemWal credentials (never commit it — it's gitignored):

```
MEMWAL_ACCOUNT_ID=...
MEMWAL_SERVER_URL=...
MEMWAL_PRIVATE_KEY=...
```

### The two commands

```
node memory.mjs remember "<one clear fact>"   # save a memory
node memory.mjs recall "<question>"           # find matching memories, most relevant first
```

### The protocol

[`CLAUDE.md`](CLAUDE.md) instructs the agent how to use those commands as the project's brain. In short:

- **On session start** — recall project status, decisions, known bugs, and next steps; summarize; confirm with the user before doing any work.
- **During the session** — save a memory immediately when a decision is made (with its reason), a bug is found and fixed, a milestone ships, the user states a rule, or a dead end is hit.
- **Memory format** — one fact per memory, understandable by a stranger with zero context, and never any secrets.
- **On session end** — save a dated session snapshot with what was done and the exact next step, then list every memory saved.

The bar: the next session — possibly in a different tool — continues the project with zero re-explaining.
