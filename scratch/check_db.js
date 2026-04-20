const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_VItZEY42yCmd@ep-polished-wave-ad7403e5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    const res = await pool.query(`
      SELECT column_name, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'leads'
    `);
    console.log('COLUMNS:', JSON.stringify(res.rows));
    
    const pk = await pool.query(`
      SELECT a.attname
      FROM   pg_index i
      JOIN   pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
      WHERE  i.indrelid = 'leads'::regclass AND i.indisprimary
    `);
    console.log('PK:', JSON.stringify(pk.rows));
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

check();
