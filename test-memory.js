import "dotenv/config";
import { MemWal } from "@mysten-incubation/memwal";

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
  namespace: "plotline-test",
});

try {
  console.log("Storing test memory...");
  const accepted = await memwal.remember(
    "TEST: Never Lose the Plot project initialized by Shepherd on July 8 2026. Stack is Node.js + MemWal SDK. RULE: always test locally before pushing.",
  );
  console.log(`Remember job accepted (job_id: ${accepted.job_id}), waiting for completion...`);

  const result = await memwal.waitForRememberJob(accepted.job_id, {
    timeoutMs: 300_000,
  });
  console.log(`Remember job complete (blob_id: ${result.blob_id})`);

  console.log('\nRecalling with query: "What are the rules for this project?"');
  const recalled = await memwal.recall({
    query: "What are the rules for this project?",
  });

  if (recalled.results.length === 0) {
    console.log("No memories recalled.");
  } else {
    console.log(`Recalled ${recalled.results.length} memor${recalled.results.length === 1 ? "y" : "ies"}:\n`);
    recalled.results.forEach((memory, i) => {
      console.log(`  ${i + 1}. ${memory.text}`);
      console.log(`     (distance: ${memory.distance})\n`);
    });
  }
} finally {
  memwal.destroy();
}
