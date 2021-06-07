import * as path from 'path';
import * as yup from 'yup';

export type Credential = {
  id: string;
  password: string;
};

/**
 * Get credentials from local env, relative to source code
 */
export function credential(): Credential {
  require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
  return schema.validateSync({
    id: process.env.CODEWARS_ID,
    password: process.env.CODEWARS_PASSWORD,
  });
}

/**
 * Credential Schema
 */
const schema = yup.object().shape({
  id: yup.string().required(),
  password: yup.string().required(),
});
