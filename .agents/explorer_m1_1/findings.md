# Exploration Findings & Initialization Recommendations

This document contains the findings of the environment investigation at `c:\Users\Thoufiq\Downloads\OncoAI\` and the recommended setup steps to initialize the React + Vite + TS project with its required dependencies.

---

## 1. Environment & Tooling Investigation

### Workspace Structure
- **Root Directory**: `c:\Users\Thoufiq\Downloads\OncoAI\`
- **Files/Directories Found**:
  - `.agents/` (Directory containing agent configurations and plans)
  - `ORIGINAL_REQUEST.md` (Original project specifications and requirements)
  - `PROJECT.md` (High-level architecture, theme palette, and code layout guidelines)
- **Hidden Structure**:
  - No local `.git` repository was found in the workspace root.
  - The workspace is nested inside a parent Git repository initialized at `C:\Users\Thoufiq\`.
  - No other hidden files or pre-existing project structures exist. The workspace is clean and ready for initialization.

### Installed Tooling Versions
- **Node.js**: `v24.14.0`
- **NPM**: `11.9.0`
- **Git**: `2.53.0.windows.2`
- **Package Managers**: Only standard `npm` is available (no `yarn` or `pnpm` detected).

---

## 2. Initialization & Dependency Recommendations

Since the workspace already contains `.agents/`, `PROJECT.md`, and `ORIGINAL_REQUEST.md`, initializing Vite directly using `npm create vite@latest .` is not recommended because the directory is not empty and Vite will prompt to clear the directory, which could delete vital agent files.

Instead, we recommend initializing in a temporary directory and moving the files.

### Recommended Command Sequence (PowerShell)

Run the following commands in the workspace root (`c:\Users\Thoufiq\Downloads\OncoAI\`) to initialize the project safely:

```powershell
# 1. Initialize a temporary React + TypeScript + Vite project
npx create-vite temp-app --template react-ts

# 2. Move all project files to the workspace root directory (overwriting default files if necessary)
Move-Item -Path temp-app\* -Destination . -Force
Move-Item -Path temp-app\.* -Destination . -Force -ErrorAction SilentlyContinue

# 3. Clean up the temporary folder
Remove-Item -Path temp-app -Recurse -Force
```

### Dependency Installation Command

After successfully initializing the project, run the following command to install the required production dependencies and development tools:

```powershell
# Install GSAP, Framer Motion, Recharts, and Lucide React (for UI icons)
npm install gsap framer-motion recharts lucide-react

# Install Tailwind CSS and its Vite integration (v4 setup)
npm install tailwindcss @tailwindcss/vite

# Install path resolution types for Node/Vite config
npm install -D @types/node
```

*Note on React 19 Compatibility:*
If the latest Vite template initializes with React 19, some older versions of dependencies (like Recharts) might raise peer dependency warnings. If npm fails due to dependency conflicts, append the `--legacy-peer-deps` flag:
```powershell
npm install gsap framer-motion recharts lucide-react --legacy-peer-deps
```

---

## 3. Configuration Setup Recommendations

### A. Vite Configuration (`vite.config.ts`)
To configure Vite to use Tailwind CSS (v4) and support path aliases (like `@/`), update `vite.config.ts` as follows:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### B. Tailwind CSS Setup (`src/index.css`)
In Tailwind CSS v4, configuration is done directly in the CSS file using `@theme`. Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  /* Maritime Clinical Observatory Theme Palette */
  --color-cobalt: #0B192C;       /* Main dashboard background */
  --color-slate-card: #1E3E62;   /* Cards, sidebar, header background */
  --color-seafoam: #00D2C4;      /* Positive/Success accents */
  --color-cerulean: #008DDA;     /* Interactive/Focus accents */
  
  /* Additional UI Palette */
  --color-dark-obsidian: #050C16;
}

body {
  background-color: var(--color-cobalt);
  color: #f3f4f6; /* Slate 100 for default high-contrast text */
  font-family: ui-sans-serif, system-ui, sans-serif;
}
```

### C. TypeScript Configuration (`tsconfig.json` & `tsconfig.app.json`)
To support the `@/*` path alias in TypeScript, update the `compilerOptions` in `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
