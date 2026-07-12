**Summary**
On the hosted relayer (relayer.memory.walrus.xyz), `remember()` jobs are accepted but fail server-side when the relayer's funding wallet has insufficient WAL. From the SDK, `waitForRememberJob` times out with a generic timeout error while the job is stuck retrying — even though the job-status endpoint already reports the underlying failure reason at that point. The real error only surfaces through the SDK once the job reaches terminal `failed`, which can be days later.

**Environment**
- @mysten-incubation/memwal (latest as of July 2026), Node.js v24.15.0 on Windows
- Hosted relayer: relayer.memory.walrus.xyz

**What happened**
1. Called `remember()` — job accepted (job ID: ec9a91dd-0113-4332-a13c-9709ba7a9bc2).
2. `waitForRememberJob` timed out at 60s with no error detail.
3. Querying the job directly via `getRememberStatus` revealed: `walrus upload failed: Insufficient balance of ...::wal::WAL for owner 0xd406fe30a0659762aca80dce9ffaa913800cf73e183cbdc93fdff5062c7dd2df. Required: 74570769, Available: 64829647`
4. The wallet balance stayed unchanged for ~3 days; the job then reached terminal `failed` state.
5. Workaround: I manually sent 0.2 WAL to the relayer's wallet address from my own wallet. A fresh remember then succeeded (job b1d6ff99-5597-4650-86e6-50f2d8be1fef).

**Why this matters**
As a non-technical user, "it times out" is indistinguishable from "my code is broken." I only found the real cause because my coding agent wrote a custom job-status script.

**Suggestions**
1. Monitor/auto-top-up the hosted relayer's funding wallet, or fail fast with a clear "relayer out of funds" status.
2. Include the last-polled job status/error in `waitForRememberJob`'s timeout error. The polling loop already fetches it from the status endpoint — right now the timeout message discards it and reports only the job ID.
3. Docs: state clearly whether hosted-relayer users are expected to fund anything, and what happens when the relayer wallet is empty.
