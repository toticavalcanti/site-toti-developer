import Link from 'next/link';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  LogOut, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Target, 
  MessageSquare,
  Clock,
  ExternalLink,
  Save,
  Tag
} from 'lucide-react';
import { getSession } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getLeadById, getLeadInteractions, getAuditLog, calculateLeadScore } from '@/lib/leads';
import LeadEditor from './LeadEditor'; // I'll create this client component

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const [interactions, auditLog] = await Promise.all([
    getLeadInteractions(id),
    getAuditLog('lead', id)
  ]);

  const score = calculateLeadScore(lead);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads" className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back to Leads</span>
          </Link>
          <div className="h-6 w-px bg-neutral-800 mx-2" />
          <div className="flex items-center gap-2 font-bold text-white">
            <span>{lead.name || 'Anonymous'}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                lead.status === 'won' ? 'bg-green-500/10 text-green-500' :
                lead.status === 'lost' ? 'bg-red-500/10 text-red-500' :
                'bg-neutral-800 text-neutral-400'
              }`}>
                {lead.status?.replace('_', ' ')}
            </span>
          </div>
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

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Details & Edit */}
        <div className="w-1/3 border-r border-neutral-800 bg-neutral-950 overflow-auto p-6 space-y-8">
           <LeadEditor lead={lead} score={score} />
        </div>

        {/* Right Column: Timeline & Interactions */}
        <div className="flex-1 bg-neutral-950 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Interaction Form Section (Future expansion: Add interaction form here) */}
             <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                  <MessageSquare size={16} />
                  Record Interaction
                </h3>
                <LeadInteractionForm leadId={lead.id!} />
             </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Clock size={16} />
                Timeline
              </h3>
              
              <div className="relative border-l border-neutral-800 ml-3 pl-8 space-y-8">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="relative">
                    <div className="absolute -left-[37px] mt-1.5 h-4 w-4 rounded-full border-2 border-neutral-950 bg-teal-500" />
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-500">
                          {interaction.type.replace('_', ' ')} — {interaction.direction}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {new Date(interaction.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-neutral-300 whitespace-pre-wrap">
                        {interaction.content}
                      </div>
                    </div>
                  </div>
                ))}

                {interactions.length === 0 && (
                   <p className="text-sm text-neutral-500 italic">No interactions recorded yet.</p>
                )}
              </div>
            </div>

            {/* Audit Log / Sys Events */}
             <div className="pt-12 border-t border-neutral-800">
               <details className="group">
                 <summary className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600 cursor-pointer hover:text-neutral-400 transition-colors">
                   <Target size={14} />
                   System Audit Log
                 </summary>
                 <div className="mt-4 space-y-2 opacity-50">
                    {auditLog.map((event) => (
                      <div key={event.id} className="text-[10px] font-mono flex items-center gap-4">
                         <span className="text-neutral-500">{new Date(event.created_at).toISOString()}</span>
                         <span className="text-teal-500 font-bold">{event.action}</span>
                         <span className="text-neutral-400 truncate">{event.entity_type} {event.entity_id}</span>
                      </div>
                    ))}
                 </div>
               </details>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Inline Sub-Component for Interaction Form
function LeadInteractionForm({ leadId }: { leadId: string }) {
  // Since this needs to be a client component for direct form handling, 
  // I'll create a separate file but I can keep a placeholder here for the structure.
  // Actually, I'll build a Real interaction form.
  return <LeadInteractionClientForm leadId={leadId} />;
}

// For brevety in this step, I'll define these client components separately 
// but mention them here. 
import LeadInteractionClientForm from './InteractionForm';
