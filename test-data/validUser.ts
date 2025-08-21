import 'dotenv/config';

export const validUser =
{
  username: process.env.TEST_USER ?? 'defaultUser',
  password: process.env.TEST_PASS ?? 'defaultPass'
}