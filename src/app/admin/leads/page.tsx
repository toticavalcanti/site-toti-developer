import Link from 'next/link';
import { 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Search, 
  ChevronRight, 
  Filter,
  Plus
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllLeads } from '@/lib/leads';

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const { q, status } = await searchParams;
  
  // Basic implementation of filtering in getAllLeads could be better,
  // but for Phase 1 we fetch all and filter or just show all.
  // Actually, I'll update getAllLeads to support search if needed, but let's start simple.
  const leads = await getAllLeads(200);

  // Client-side like search for Phase 1 if needed, or simple direct SQL
  const filteredLeads = leads.filter(l => {
    const matchesQuery = q ? (
      l.name?.toLowerCase().includes(q.toLowerCase()) || 
      l.email?.toLowerCase().includes(q.toLowerCase()) ||
      l.phone?.includes(q)
    ) : true;
    
    const matchesStatus = status ? l.status === status : true;
    
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-teal-500">
            <LayoutDashboard size={20} />
            <span>CRM COCKPIT</span>
          </div>
          <nav className="flex items-center gap-4 ml-6 text-sm font-medium">
            <Link href="/admin" className="text-neutral-400 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/admin/leads" className="text-white">Leads</Link>
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

      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Filters Bar */}
        <div className="border-b border-neutral-800 bg-neutral-900/50 p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <form className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input 
                name="q"
                defaultValue={q}
                placeholder="Search name, email, or phone..." 
                className="h-9 w-full rounded-md border border-neutral-800 bg-neutral-950 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </form>
            
            <div className="flex items-center gap-2 p-1 rounded-lg bg-neutral-950 border border-neutral-800">
               {['all', 'new', 'qualified', 'won', 'lost'].map((s) => (
                 <Link 
                   key={s}
                   href={`/admin/leads${s === 'all' ? '' : `?status=${s}`}`}
                   className={`px-3 py-1 text-xs rounded-md transition-colors ${
                     (status === s || (!status && s === 'all')) 
                     ? 'bg-neutral-800 text-white font-bold' 
                     : 'text-neutral-400 hover:text-white'
                   }`}
                 >
                   {s.toUpperCase()}
                 </Link>
               ))}
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-sm font-medium transition-colors">
            <Plus size={16} />
            <span>Manually Add Lead</span>
          </button>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-neutral-950 z-10 border-b border-neutral-800">
              <tr>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider">Lead</th>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider">Status</th>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider">Score</th>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider">Interest</th>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider">Last Sync</th>
                <th className="px-6 py-3 font-semibold text-neutral-400 uppercase text-xs tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-neutral-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{lead.name || 'Anonymous'}</span>
                      <span className="text-xs text-neutral-400 truncate max-w-[200px]">{lead.email || lead.phone || 'No identifier'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                      lead.status === 'won' ? 'bg-green-500/10 text-green-500' :
                      lead.status === 'lost' ? 'bg-red-500/10 text-red-500' :
                      lead.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-neutral-800 text-neutral-400'
                    }`}>
                      {(lead.status || 'new').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 rounded-full bg-neutral-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                             (lead.score || 0) > 70 ? 'bg-green-500' : 
                             (lead.score || 0) > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${lead.score || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono">{lead.score || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neutral-400 capitalize">{lead.service_interest || '--'}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">
                    {new Date(lead.updated_at!).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-neutral-800 text-neutral-400 hover:text-teal-500 hover:bg-teal-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLeads.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <Users size={48} className="text-neutral-800 mb-4" />
              <p className="text-neutral-500">No leads found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
