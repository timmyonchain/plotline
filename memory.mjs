import "dotenv/config";
import { MemWal } from "@mysten-incubation/memwal";

const USAGE = `Usage:
  node memory.mjs remember "some text"   Save a memory
  node memory.mjs recall "some question" Find matching memories`;

const [command, text] = process.argv.slice(2);

if (!["remember", "recall"].includes(command) || !text || !text.trim()) {
  console.error(USAGE);
  process.exit(1);
}

const { MEMWAL_ACCOUNT_ID, MEMWAL_SERVER_URL, MEMWAL_PRIVATE_KEY } = process.env;

const missing = [
  ["MEMWAL_ACCOUNT_ID", MEMWAL_ACCOUNT_ID],
  ["MEMWAL_SERVER_URL", MEMWAL_SERVER_URL],
  ["MEMWAL_PRIVATE_KEY", MEMWAL_PRIVATE_KEY],
]
  .filter(([, value]) => !value || value === "PASTE_ME")
  .map(([name]) => name);

if (missing.length > 0) {
  console.error(`Missing or placeholder values in .env: ${missing.join(", ")}`);
  process.exit(1);
}

const memwal = MemWal.create({
  key: MEMWAL_PRIVATE_KEY,
  accountId: MEMWAL_ACCOUNT_ID,
  serverUrl: MEMWAL_SERVER_URL,
  namespace: "plotline",
});

try {
  if (command === "remember") {
    console.log("Saving memory...");
    const accepted = await memwal.remember(text);
    console.log(`Accepted (job ID: ${accepted.job_id}), waiting for it to finish...`);

    const result = await memwal.waitForRememberJob(accepted.job_id, {
      timeoutMs: 300_000,
    });
    console.log("Memory saved.");
    console.log(`  Job ID:  ${accepted.job_id}`);
    console.log(`  Blob ID: ${result.blob_id}`);
  } else {
    console.log(`Recalling memories for: "${text}"\n`);
    const recalled = await memwal.recall({ query: text });

    if (recalled.results.length === 0) {
      console.log("No memories found.");
    } else {
      console.log(`Found ${recalled.results.length} memor${recalled.results.length === 1 ? "y" : "ies"} (most relevant first):\n`);
      const sorted = [...recalled.results].sort((a, b) => a.distance - b.distance);
      sorted.forEach((memory, i) => {
        console.log(`${i + 1}. ${memory.text}\n`);
      });
    }
  }
} finally {
  memwal.destroy();
}
