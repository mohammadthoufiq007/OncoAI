# Scope: E2E Testing Track

## Architecture
- The test suite is opaque-box and requirement-driven.
- It will verify the frontend CIP v1.0 interface, modules, styling, and disclaimers.
- It runs as a Node-based E2E check.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Test Case Design & Strategy | Design 4-tier test cases and write TEST_INFRA.md | none | DONE |
| 2 | Test Runner & Setup | Initialize test runner, scripts, and package.json configurations | M1 | DONE |
| 3 | Test Case Implementation | Implement 161+ tests in TypeScript/JavaScript | M2 | IN_PROGRESS |
| 4 | Verification & Readiness | Verify test runner execution and publish TEST_READY.md | M3 | PLANNED |

## Interface Contracts
### E2E Test Suite ↔ CIP Application
- The tests run against the built/running React application at a configurable URL (default `http://localhost:5173`) or verify the codebase's components using DOM simulation.
- Verified elements must match the CSS classes and text content defined in `PROJECT.md`.
