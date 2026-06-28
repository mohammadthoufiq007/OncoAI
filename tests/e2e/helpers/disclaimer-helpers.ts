import { expect, Page } from '@playwright/test';

export const VERBATIM_DISCLAIMER = 'Research use only. This platform is for educational and portfolio purposes. Outputs are not clinical diagnoses and must not replace professional medical advice. Consult a licensed oncologist for any health decisions.';

/**
 * Asserts that the medical disclaimer banner is present, visible, and contains the exact verbatim text.
 */
export async function assertMedicalDisclaimerBanner(page: Page) {
  const banner = page.locator('[data-testid="medical-disclaimer-banner"]');
  await expect(banner).toBeVisible();
  await expect(banner).toHaveText(VERBATIM_DISCLAIMER);
}
