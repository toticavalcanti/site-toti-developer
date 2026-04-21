import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const { rows } = await pool.query('SELECT * FROM admin_users WHERE email = $1 AND is_active = TRUE', [email]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const token = await encrypt(sessionData);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: sessionData.expires,
    });

    return response;
  } catch (error) {
    console.error('[Admin Login API] Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
