# ✅ GitHub Actions Upgrade Checklist

> Follow these steps (check them off as you go) to upgrade  
> **`lesson/01-fixtures`** → **`lesson/02-ci-github-action`** with CI and secrets.

---

- [ ] **1 · Install dotenv**

  ```bash
  npm i -D dotenv
  ```

- [ ] **2 · Create `.env`**

  ```bash
  touch .env
  ```

  ```dotenv
  # .env  (local variables only)
  TEST_USER=tomsmith
  TEST_PASS=SuperSecretPassword!
  BASE_URL=https://example.com
  ```

- [ ] **3 · Ignore the local secrets file**

  ```bash
  echo ".env" >> .gitignore
  ```

- [ ] **4 · Convert credentials helper**

  1. **Delete** `test-data/validUser.json`.  
  2. **Create** `test-data/validUser.ts`:

  ```ts
  import 'dotenv/config';

  export const validUser = {
    username: process.env.TEST_USER ?? 'placeholderUser',
    password: process.env.TEST_PASS ?? 'placeholderPass',
  };
  ```

- [ ] **5 · Update `pom.fixture.ts` to import the new helper**

  ```ts
  import { test as base } from '@playwright/test';
  import PomManager from '../pages/PomManager';
  import { validUser } from '../test-data/validUser';

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
  ```

- [ ] **6 · Load env vars in `playwright.config.ts`**

  ```ts
  import 'dotenv/config';        // ← first line
  export default {
    use: { baseURL: process.env.BASE_URL },
  };
  ```

- [ ] **7 · Add GitHub Actions workflow**

  ```yaml
  # .github/workflows/playwright.yml
  name: Playwright CI

  on:
    push: { branches: [main] }

  jobs:
    test:
      runs-on: ubuntu-latest
      env:
        TEST_USER: ${{ secrets.TEST_USER }}
        TEST_PASS: ${{ secrets.TEST_PASS }}
        BASE_URL:  ${{ secrets.BASE_URL }}
      steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Setup Node.js
          uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm

        - name: Install deps & browsers
          run: |
            npm ci
            npx playwright install --with-deps

        - name: Run Playwright tests
          run: npx playwright test --reporter=html

        - name: Upload Playwright report   # always upload, even on failures
          if: always()
          uses: actions/upload-artifact@v4
          with:
            name: playwright-report
            path: playwright-report
  ```

- [ ] **8 · Add repo secrets**  
      *Settings → Secrets → Actions* → `TEST_USER`, `TEST_PASS`, `BASE_URL`

- [ ] **9 · Add CI badge to `README.md`**

  ```markdown
  ![Playwright CI](https://github.com/<owner>/<repo>/actions/workflows/playwright.yml/badge.svg?branch=main)
  ```

- [ ] **10 · Commit & push**

  ```bash
  git add .
  git commit -m "CI + dotenv + env‑driven fixtures"
  git push
  ```

- [ ] **11 · Verify in GitHub → Actions**  
      You should see a run (red if tests fail) and an artifact named  
      **`playwright-report.zip`** containing the HTML report.

---
