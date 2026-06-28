# Plan — E2E Testing Track

## Objective
Establish a comprehensive requirement-driven, opaque-box E2E test suite for the Cancer Intelligence Platform (CIP) v1.0.

## Plan Steps
1. **Context Initialization**: Initialize state files (BRIEFING.md, progress.md, plan.md, context.md) in `.agents/sub_orch_e2e/`.
2. **Analysis & Design (Explorer)**: Spawn Explorer agents to analyze the 11 modules and project constraints in `PROJECT.md` and `ORIGINAL_REQUEST.md`, and design the 4-tier test case suite (161+ test cases: Tier 1 Feature Coverage, Tier 2 Boundary/Edge Cases, Tier 3 Pairwise combinations, Tier 4 Real-world applications).
3. **Drafting Strategy**: Define E2E testing strategy, framework selection (e.g., Jest/Vitest + JSDOM or Playwright), and outline `TEST_INFRA.md`.
4. **Framework Setup & Strategy Document (Worker)**: Spawn a Worker agent to initialize the test directory structure, write `TEST_INFRA.md` at project root, and install necessary dependencies offline.
5. **Test Implementation (Worker)**: Spawn a Worker agent to implement the test cases in code/scripts (simulating DOM / components, layouts, theme style verification, medical disclaimer text verification, mock database bindings, and specific module interactions).
6. **Verification (Reviewer & Challenger)**: Spawn Reviewers and Challengers to verify the test suite, test runner commands, and report pass/fail output.
7. **Publishing TEST_READY.md (Worker)**: Spawn a Worker agent to write `TEST_READY.md` containing the runner command.
8. **Final Handoff**: Write `handoff.md` and notify parent.
