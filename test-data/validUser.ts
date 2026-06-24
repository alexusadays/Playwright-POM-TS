import 'dotenv/config';

export const validUser = {
  username: process.env.TEST_USER ?? 'fallbackUser',
  password: process.env.TEST_PASS ?? 'fallbackPass',
};