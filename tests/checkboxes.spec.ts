import { test, expect } from '../fixtures/pom.fixture';

// We drop beforeEach: `pm` (PomManager) is injected
// pm is provided by our custom fixture, alongside Playwright’s core `page` fixture.
test.describe('Checkboxes page', () => {
  // Destructured page here is coming from Playwright’s BUILT-IN fixture
  // same page with use without POM
  test('mix POM helpers and raw page actions', async ({ pm, page }) => {
    // Use POM to open checkboxes page and check the first checkbox
    await pm.checkboxesPage.openCheckboxesPage();
    await pm.checkboxesPage.checkFirstCheckbox();

  // ── About `page` below ───────────────────────────────────────────
    // • `page` comes from Playwright’s BUILT-IN fixture; 
    // our pom.fixture merely extends the default set, so `page`, `context`, etc. are still available.
    // • It is the exact SAME tab that PomManager is working on.
    // • Safe to use for one-off utilities (screenshot, tracing, network intercepts).  It does *not* open a new tab or context.
    // • Keep business interactions (click, fill, asserts) inside POM.
    await expect(page).toHaveScreenshot(
      'checkboxes-after-check.png',
      // maxDiffPixelRatio was added to deal with win32 vs linux screenshot differences in github actions
      // see important.txt
       { maxDiffPixelRatio: 0.02 }   // passes up to ~380 px on a 1920×1080 shot
    );

    // Quick ad-hoc assertion using the BasePage `locator()` helper
    await expect(pm.checkboxesPage.locator('form#checkboxes'))
      .toBeVisible();
  });

  test('uncheck both checkboxes', async ({ pm }) => {
    // Use POM to open checkboxes page and uncheck both checkboxes
    await pm.checkboxesPage.openCheckboxesPage();
    await pm.checkboxesPage.uncheckFirstCheckbox();
    await pm.checkboxesPage.uncheckSecondCheckbox();
    await pm.checkboxesPage.assertCheckboxesState(false, false);
  });
});
