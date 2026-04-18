import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';

// Singleton connection pool
let pool: Pool | null = null;

function getPool(): Pool {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        pool = new Pool({
            connectionString,
            ssl: {
                rejectUnauthorized: false, // Neon requires SSL
            },
            max: 20, // Maximum number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        // Log pool errors
        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
        });
    }

    return pool;
}

/**
 * Execute a parameterized SQL query
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
): Promise<QueryResult<T>> {
    const start = Date.now();
    const pool = getPool();

    try {
        const result = await pool.query<T>(text, params);
        const duration = Date.now() - start;

        if (process.env.NODE_ENV === 'development') {
            console.log('[DB Query]', { text, duration: `${duration}ms`, rows: result.rowCount });
        }

        return result;
    } catch (error) {
        console.error('[DB Query Error]', { text, params, error });
        throw error;
    }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
    const pool = getPool();
    return pool.connect();
}

/**
 * Close the connection pool (useful for cleanup)
 */
export async function closePool(): Promise<void> {
    if (pool) {
        await pool.end();
        pool = null;
    }
}
