# Playwright + TypeScript — Page Object Model Example
Update Readme from your_github_actio

> A minimal, beginner-friendly POM starter that powers my YouTube series  
> **“Learn QA Automation with Playwright Typescript”**.
> https://www.youtube.com/watch?v=Gxn0i76jIJI&list=PLfw_nI4u_6WOuClIHl4Wl5V--ufJGin71

---

## 🚀 Quick start

```bash
# 1 Clone & install
git clone https://github.com/alexusadays/Playwright-POM-TS.git
cd Playwright-POM-TS
npm ci            # Node 18 + recommended

# 2 Run the tests
npx playwright test
```

Want the exact code shown in **Video 1**? Check out the tag:

```bash
git checkout v0-baseline
```

---

## 🗂️ Project structure

```
.
├─ pages/
│  ├─ BasePage.ts          # shared helper methods
│  ├─ CheckboxesPage.ts    # reusable-locator example
│  ├─ LoginPage.ts         # inline-locator example
│  ├─ ManagePage.ts        # lazy POM factory
│  └─ SecurePage.ts        
├─ tests/
│  ├─ checkboxes.spec.ts
│  └─ login.spec.ts
├─ playwright.config.ts
├─ package.json
└─ README.md
```

---

## 🗺️ Course checkpoints

| Stage | Git tag                     | Branch               |
|-------|-----------------------------|----------------------|
| 0 Baseline POM           | `v0-baseline` | `lesson/00-baseline` |
| 1 Fixtures (coming)      | _TBD_         | `lesson/01-fixtures` |
| 2 GitHub Actions (coming)| _TBD_         | `lesson/02-ci`       |

---

## 👀 TypeScript visibility cheatsheet

| Keyword      | Accessible from…                              | Typical use                   |
|--------------|-----------------------------------------------|-------------------------------|
| `public`     | Everywhere (`page.method()` in tests, etc.)   | **Business actions** (`login()`, `addToCart()`) |
| `protected`  | Class itself **and subclasses**               | **Low-level helpers** (`basePageFill`, `basePageClick`) |
| `private`    | Declaring class only                          | Internal state you never expose |

### Example

```ts
abstract class BasePage {
  protected async basePageFill(selector: string | Locator, text: string) {
    await this.toLocator(selector).fill(text);
  }
}

class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.basePageFill('#username', username);
    await this.basePageFill('#password', password);
  }
}

// ✅ inside LoginPage         → allowed
// ❌ inside a test file       → mp.loginPage.basePageFill(...)  // compiler error
```

### Why keep helpers `protected`?

1. **Encapsulation** – tests talk in *business language* (`login`, `open`) rather than raw clicks.
2. **Refactor-safety** – change the helper once; no tests break.
3. **Cleaner API** – page objects decide what to expose publicly.

> Need to call a helper from a test?  
> You *can* make it `public`, but you’ll leak low-level details and lose the abstraction that keeps tests readable.

---

### Prerequisites

* **Node.js ≥ 18**
* **Playwright** is already in `devDependencies`; no global install needed.

---

### License

MIT – use it, fork it, star it ⭐️, enjoy!
