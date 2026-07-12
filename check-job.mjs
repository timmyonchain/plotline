import "dotenv/config";
import { MemWal } from "@mysten-incubation/memwal";

const jobId = process.argv[2];

const memwal = MemWal.create({
  key: process.env.MEMWAL_PRIVATE_KEY,
  accountId: process.env.MEMWAL_ACCOUNT_ID,
  serverUrl: process.env.MEMWAL_SERVER_URL,
  namespace: "plotline-test",
});

try {
  const status = await memwal.getRememberStatus(jobId);
  console.log("Job status:", JSON.stringify(status, null, 2));
} finally {
  memwal.destroy();
}
