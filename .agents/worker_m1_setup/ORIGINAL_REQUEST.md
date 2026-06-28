## 2026-06-25T17:20:09Z
You are a Worker. Your working directory is c:\Users\Thoufiq\Downloads\OncoAI\.agents\worker_m1_setup\.
Your task is to initialize the project and dependencies in the workspace c:\Users\Thoufiq\Downloads\OncoAI\:
1. Initialize a temporary React + TypeScript + Vite project using `npx create-vite temp-app --template react-ts`.
2. Move all files from `temp-app` to the root workspace using PowerShell commands:
   `Move-Item -Path temp-app\* -Destination . -Force`
   `Move-Item -Path temp-app\.* -Destination . -Force -ErrorAction SilentlyContinue`
3. Clean up the `temp-app` folder.
4. Install core dependencies: `npm install gsap framer-motion recharts lucide-react --legacy-peer-deps`.
5. Install styling and build tooling: `npm install tailwindcss @tailwindcss/vite --legacy-peer-deps` and `npm install -D @types/node --legacy-peer-deps`.
6. Configure Vite by modifying `vite.config.ts` to include Tailwind CSS (@tailwindcss/vite) and a path alias (`@/` mapping to `./src`).
7. Update `tsconfig.app.json` to support the `@/*` alias path routing:
   `"baseUrl": ".", "paths": { "@/*": ["./src/*"] }` inside compilerOptions.
8. Set up `src/index.css` with the Tailwind v4 imports and color theme:
   - Deep Cobalt: bg-[#0B192C]
   - Slate Card: bg-[#1E3E62]
   - Seafoam Green: text-[#00D2C4] / bg-[#00D2C4]
   - Cerulean Blue: text-[#008DDA] / bg-[#008DDA]
9. Verify the project builds successfully by running `npm run build`.

MANDATORY INTEGRITY WARNING — DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report containing compilation and build verification results to c:\Users\Thoufiq\Downloads\OncoAI\.agents\worker_m1_setup\handoff.md and notify me when complete.
