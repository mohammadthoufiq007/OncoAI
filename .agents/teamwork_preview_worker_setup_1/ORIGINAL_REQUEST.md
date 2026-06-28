## 2026-06-25T17:20:00Z
<USER_REQUEST>
You are a teamwork_preview_worker. Your working directory is c:\Users\Thoufiq\Downloads\OncoAI\.agents\teamwork_preview_worker_setup_1\.
We are the E2E Testing Track Orchestrator. We need to:
1. Create c:\Users\Thoufiq\Downloads\OncoAI\TEST_INFRA.md outlining the E2E testing strategy, features mapped, and the 161 test cases designed. Read c:\Users\Thoufiq\Downloads\OncoAI\.agents\teamwork_preview_explorer_e2edesign_1\test_cases_design.md to get the detailed list of test cases.
2. Inspect the system environment by checking if node, npm, and any E2E testing frameworks (like Playwright, Jest, Vitest, JSDOM) are installed globally or available. Check if we have internet connection (e.g. run a fast ping or npm lookup) or if we are restricted to offline npm packages.
3. Establish the directory structure for E2E tests. Decide on a suitable E2E testing framework based on environment findings (e.g. if Playwright is available and runnable, use it; if we must use a lightweight Node + JSDOM script due to offline constraints, we can set up a custom node-based DOM simulation test runner or configure Jest/Vitest).
4. Report back your findings, path to TEST_INFRA.md, and recommendations for the test framework implementation in handoff.md and send a message.

MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
</USER_REQUEST>
