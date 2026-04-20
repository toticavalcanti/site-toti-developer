import { query } from '../src/lib/db';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test() {
  try {
    console.log('Checking leads table schema...');
    const schema = await query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'leads'
    `);
    console.log('Schema:', JSON.stringify(schema.rows, null, 2));

    console.log('Checking primary key...');
    const pk = await query(`
      SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type
      FROM   pg_index i
      JOIN   pg_attribute a ON a.attrelid = i.indrelid
                           AND a.attnum = ANY(i.indkey)
      WHERE  i.indrelid = 'leads'::regclass
      AND    i.indisprimary;
    `);
    console.log('Primary Key:', JSON.stringify(pk.rows, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    process.exit();
  }
}

test();
