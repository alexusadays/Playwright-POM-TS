import 'dotenv/config';

export const validUser = {
  username: process.env.TEST_USER ?? 'placeholderUser',
  password: process.env.TEST_PASS ?? 'placeholderPass',
};