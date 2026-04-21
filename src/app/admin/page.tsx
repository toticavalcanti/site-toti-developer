import Link from 'next/link';
import { Pool } from 'pg';
import { 
  Users, 
  MessageSquare, 
  LayoutDashboard, 
  LogOut, 
  Clock, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function getStats() {
  const [newCount, activeLeads, byStage, recentActivity] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM leads WHERE status = 'new'"),
    pool.query("SELECT COUNT(*) FROM leads WHERE status NOT IN ('won', 'lost')"),
    pool.query("SELECT status, COUNT(*) FROM leads GROUP BY status"),
    pool.query(`
      SELECT 'interaction' as type, i.type as detail, l.name, i.created_at 
      FROM lead_interactions i 
      JOIN leads l ON i.lead_id = l.id 
      ORDER BY i.created_at DESC LIMIT 5
    `),
  ]);

  return {
    newCount: parseInt(newCount.rows[0].count),
    activeCount: parseInt(activeLeads.rows[0].count),
    stages: byStage.rows,
    recent: recentActivity.rows
  };
}

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const stats = await getStats();

  return (
    <div className="flex h-screen flex-col">
      {/* Admin Sidebar/Navbar */}
      <header className="flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-teal-500">
            <LayoutDashboard size={20} />
            <span>CRM COCKPIT</span>
          </div>
          <nav className="flex items-center gap-4 ml-6 text-sm font-medium">
            <Link href="/admin" className="text-white">Dashboard</Link>
            <Link href="/admin/leads" className="text-neutral-400 hover:text-white transition-colors">Leads</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400">{session.email}</span>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-neutral-400 hover:text-red-400 transition-colors">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Operational Overview</h1>
          <div className="text-sm text-neutral-400">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Top Widgets */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between opacity-70 mb-2">
              <span className="text-sm font-medium">New Leads</span>
              <AlertCircle size={16} className="text-blue-500" />
            </div>
            <div className="text-3xl font-bold">{stats.newCount}</div>
            <p className="mt-1 text-xs text-neutral-500">Awaiting first contact</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between opacity-70 mb-2">
              <span className="text-sm font-medium">Active CRM</span>
              <Users size={16} className="text-teal-500" />
            </div>
            <div className="text-3xl font-bold">{stats.activeCount}</div>
            <p className="mt-1 text-xs text-neutral-500">Leads in progress</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between opacity-70 mb-2">
              <span className="text-sm font-medium">Daily Actions</span>
              <Clock size={16} className="text-orange-500" />
            </div>
            <div className="text-3xl font-bold">0</div>
            <p className="mt-1 text-xs text-neutral-500">Follow-ups due today</p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="flex items-center justify-between opacity-70 mb-2">
              <span className="text-sm font-medium">Service Interest</span>
              <TrendingUp size={16} className="text-purple-500" />
            </div>
            <div className="text-3xl font-bold">--</div>
            <p className="mt-1 text-xs text-neutral-500">Most requested category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Leads by Stage */}
          <div className="lg:col-span-1 rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
            <div className="border-b border-neutral-800 bg-neutral-900/50 px-6 py-4 font-semibold uppercase text-xs tracking-wider text-neutral-400">
              Pipeline Distribution
            </div>
            <div className="p-6 space-y-4">
              {stats.stages.length > 0 ? stats.stages.map((st: any) => (
                <div key={st.status} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{st.status.replace('_', ' ')}</span>
                  <div className="flex items-center gap-3 flex-1 ml-6">
                    <div className="h-1.5 flex-1 rounded-full bg-neutral-800 overflow-hidden">
                      <div 
                        className="h-full bg-teal-600 rounded-full" 
                        style={{ width: `${(parseInt(st.count) / (stats.activeCount || 1)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold min-w-[20px] text-right">{st.count}</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-neutral-500">No leads in the pipeline yet.</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
             <div className="border-b border-neutral-800 bg-neutral-900/50 px-6 py-4 font-semibold uppercase text-xs tracking-wider text-neutral-400">
              Recent Activity
            </div>
            <div className="divide-y divide-neutral-800">
              {stats.recent.length > 0 ? stats.recent.map((act: any, i: number) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-neutral-800 text-teal-500">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{act.name}</div>
                      <div className="text-xs text-neutral-500">New {act.detail} recorded</div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center">
                   <p className="text-sm text-neutral-500 italic">Static like a graveyard. Start closing some deals!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
