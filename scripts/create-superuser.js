const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query, silent = false) {
  return new Promise((resolve) => {
    if (silent) {
      const stdin = process.stdin;
      const stdout = process.stdout;
      stdin.resume();
      stdin.setRawMode(true);
      stdout.write(query);

      let password = '';
      const onData = (char) => {
        char = char.toString();
        switch (char) {
          case '\n':
          case '\r':
          case '\u0004':
            stdin.setRawMode(false);
            stdin.pause();
            stdin.removeListener('data', onData);
            stdout.write('\n');
            resolve(password);
            break;
          case '\u0003': // Ctrl+C
            process.exit();
            break;
          case '\u007f': // Backspace (Linux/macOS)
          case '\b': // Backspace (Windows)
            if (password.length > 0) {
              password = password.slice(0, -1);
              // In raw mode, we have to handle the cursor moving back and clearing
              stdout.write('\b \b');
            }
            break;
          default:
            password += char;
            stdout.write('*');
            break;
        }
      };
      stdin.on('data', onData);
    } else {
      rl.question(query, (answer) => {
        resolve(answer);
      });
    }
  });
}

async function run() {
  console.log('\n--- Admin Superuser Setup ---\n');
  
  const email = await question('? Email: ');
  if (!email || !email.includes('@')) {
    console.error('❌ Error: Invalid email address.');
    process.exit(1);
  }

  const password = await question('? Password: ', true);
  const confirmPassword = await question('? Confirm password: ', true);

  if (password !== confirmPassword) {
    console.error('❌ Error: Passwords do not match.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters long.');
    process.exit(1);
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO admin_users (email, password_hash, role, is_active, updated_at)
      VALUES ($1, $2, 'super_admin', TRUE, NOW())
      ON CONFLICT (email) 
      DO UPDATE SET 
        password_hash = EXCLUDED.password_hash,
        updated_at = NOW()
    `;

    await pool.query(query, [email, passwordHash]);
    console.log(`\n✅ Superuser created successfully.`);
    console.log(`   Email: ${email}`);
    console.log(`   Role: super_admin\n`);
  } catch (e) {
    console.error('❌ Error saving superuser:', e);
  } finally {
    pool.end();
    rl.close();
  }
}

run();
