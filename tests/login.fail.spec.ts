import { test } from '../fixtures/pom.fixture';

test('This will pass now', async ({ pm }) => {
    await pm.loginPage.openLoginPage();
    await pm.loginPage.userLogin("fakeUser", "fakePass");
    await pm.loginPage.assertFailedUsername();
});