import { expect, Locator } from '@playwright/test';

/**
 * Asserts that the element has the Deep Cobalt background color (#0B192C) typical of the dashboard layout.
 */
export async function assertDeepCobaltBackground(locator: Locator) {
  // Check for the class name bg-[#0B192C]
  await expect(locator).toHaveClass(/bg-\[#0B192C\]/);
}

/**
 * Asserts that the element has the Card Slate background color (#1E3E62) typical of individual panels.
 */
export async function assertCardSlatePanel(locator: Locator) {
  // Check for the class name bg-[#1E3E62]
  await expect(locator).toHaveClass(/bg-\[#1E3E62\]/);
}

/**
 * Asserts that the element uses the Seafoam accent (#00D2C4) for text or background (indicating positive/success).
 */
export async function assertSeafoamAccent(locator: Locator, type: 'text' | 'bg' = 'text') {
  if (type === 'text') {
    await expect(locator).toHaveClass(/text-\[#00D2C4\]/);
  } else {
    await expect(locator).toHaveClass(/bg-\[#00D2C4\]/);
  }
}

/**
 * Asserts that the element uses the Cerulean accent (#008DDA) for text or background (indicating interactive/focus).
 */
export async function assertCeruleanAccent(locator: Locator, type: 'text' | 'bg' = 'text') {
  if (type === 'text') {
    await expect(locator).toHaveClass(/text-\[#008DDA\]/);
  } else {
    await expect(locator).toHaveClass(/bg-\[#008DDA\]/);
  }
}
