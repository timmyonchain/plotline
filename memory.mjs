import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import { MemWal } from "@mysten-incubation/memwal";

const RECEIPTS_PATH = new URL("./blob-receipts.md", import.meta.url);

// Add this save's receipt to blob-receipts.md and raise its totals by one.
// The memory is already safely stored on Walrus by the time this runs, so
// any problem here only prints a note — it never fails the save.
async function appendReceipt(memoryText, jobId, blobId) {
  let receipts;
  try {
    receipts = await readFile(RECEIPTS_PATH, "utf8");
  } catch {
    console.warn("Note: blob-receipts.md not found, so no receipt was recorded there.");
    return;
  }
  const totalMarker = "\n\n---\n\n**Total: ";
  const totalIndex = receipts.lastIndexOf(totalMarker);
  if (totalIndex === -1) {
    console.warn("Note: could not find the Total line in blob-receipts.md, so no receipt was recorded there.");
    return;
  }
  const memoryNumber = (receipts.match(/^## Memory /gm) || []).length + 1;
  const today = new Date().toISOString().slice(0, 10);
  const section = [
    `## Memory ${memoryNumber} — saved ${today} (namespace \`plotline\`)`,
    "",
    `> ${memoryText.replace(/\r?\n/g, "\n> ")}`,
    "",
    `- Job ID: \`${jobId}\``,
    `- Blob ID: \`${blobId}\``,
  ].join("\n");
  const updated = (receipts.slice(0, totalIndex) + "\n\n" + section + receipts.slice(totalIndex))
    .replace(/\*\*Total: (\d+) memories saved to Walrus\*\*/, (_, n) => `**Total: ${Number(n) + 1} memories saved to Walrus**`)
    .replace(/\((\d+) in the `plotline` namespace/, (_, n) => `(${Number(n) + 1} in the \`plotline\` namespace`);
  await writeFile(RECEIPTS_PATH, updated);
  console.log(`  Receipt added to blob-receipts.md as Memory ${memoryNumber}.`);
}

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
    try {
      await appendReceipt(text, accepted.job_id, result.blob_id);
    } catch (err) {
      console.warn(`Note: could not update blob-receipts.md (${err.message}). The memory itself was saved.`);
    }
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
