# Plotline — Never Lose the Plot

You have access to Walrus Memory via two commands. Use them as this project's permanent brain:
- Save: node memory.mjs remember "<one clear fact>"
- Recall: node memory.mjs recall "<question>"

Follow this protocol in every session:

ON SESSION START (always first, before anything else):
1. Recall: "project status and architecture", "decisions and their reasons", "known bugs and gotchas", "next steps".
2. Summarize what you recalled in 5 bullets or fewer, then ask: "Picking up from here — correct?" Do not start work until confirmed.
3. If recall returns nothing, say so plainly, ask for a 2-minute briefing, and immediately save it as your first memories.

DURING THE SESSION, save a memory immediately (never wait for session end) whenever:
- A decision is made — always store the reason, not just the choice.
- A bug is found AND fixed — store symptom, cause, and fix in one memory.
- Something ships or a milestone completes — store what works and how it was verified.
- The user states a preference or rule — store it prefixed with "RULE:".
- A dead end is hit — store what was tried and why it failed, prefixed with "DEAD END:".

MEMORY FORMAT RULES:
- One fact per memory. Never bundle unrelated facts.
- Write each memory so a stranger with zero context understands it. Include the project name.
- Never store secrets: no API keys, passwords, tokens, wallet keys, or .env contents. Describe where a secret lives instead.

ON SESSION END (when the user says "wrap up" or "save session"):
1. Save a memory titled "SESSION SNAPSHOT <date>": what was done, current state, exact next step.
2. List every memory saved this session.

You are replacing a manual CONTEXT.md file. The bar: the next session — possibly in a different tool — must continue this project with zero re-explaining.
