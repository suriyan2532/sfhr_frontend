
import { test, expect } from '@playwright/test';

test('test language switcher', async ({ page }) => {
  await page.goto('http://localhost:3000/en/dashboard/settings/master/unit/create');
  
  // Check if language switcher button exists and has initial state
  const langButton = page.locator('button:has-text("🇺🇸 EN")');
  await expect(langButton).toBeVisible();

  // Open dropdown
  await langButton.click();

  // Check if options are visible
  const thaiOption = page.locator('button:has-text("🇹🇭 ไทย")');
  await expect(thaiOption).toBeVisible();

  // Click Thai option
  await thaiOption.click();

  // Verify URL change
  await expect(page).toHaveURL(/.*\/th\/dashboard\/settings\/master\/unit\/create/);
  
  // Verify button text changes
  const newLangButton = page.locator('button:has-text("🇹🇭 TH")');
  await expect(newLangButton).toBeVisible();
});
