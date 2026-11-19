import 'dotenv/config';

export const validUser = {
  username: (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TEST_USER ?? 'placeholderUser',
  password: (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.TEST_PASS ?? 'placeholderPass',
}
  username: process.env.TEST_USER ?? 'fallbackUser',
  password: process.env.TEST_PASS ?? 'fallbackPass',
};
