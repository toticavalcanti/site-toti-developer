const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_VItZEY42yCmd@ep-polished-wave-ad7403e5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  try {
    console.log('Altering leads table to allow NULL phone...');
    await pool.query('ALTER TABLE leads ALTER COLUMN phone DROP NOT NULL');
    console.log('Success!');
  } catch (e) {
    console.error('Migration failed:', e);
  } finally {
    pool.end();
  }
}

migrate();
