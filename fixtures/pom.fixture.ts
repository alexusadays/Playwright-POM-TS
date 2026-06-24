// We are creating a Playwright fixture that initializes a page object manager (PomManager) for each test.
// This allows us to access various page objects (like LoginPage, SecurePage, etc.) through the manager.
// The fixture also provides a valid user object for authentication tests.
import { test as base } from '@playwright/test';
import PomManager from '../pages/ManagePage';
import { validUser } from '../test-data/validUser.ts';

type MyFixtures = {
  pm: PomManager;                       
  validUser: { username: string; password: string };
};

export const test = base.extend<MyFixtures>({
  // Re-use Playwright’s default `page`
  pm: async ({ page }, use) => {
    await use(new PomManager(page));
  },

  // Plain value fixture (available in every test)
  validUser,
});

export { expect } from '@playwright/test';
