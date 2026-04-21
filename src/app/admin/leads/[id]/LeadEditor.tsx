'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Tag as TagIcon, Trash2, CheckCircle, Clock, Calendar, DollarSign, Target, Mail, Phone, MessageSquare } from 'lucide-react';
import { LeadData } from '@/types/whatsapp';

export default function LeadEditor({ lead, score }: { lead: LeadData; score: number }) {
  const [formData, setFormData] = useState(lead);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Score Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800">
         <div className="flex flex-col">
           <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Lead Score</span>
           <span className="text-2xl font-bold font-mono">{score}</span>
         </div>
         <div className="h-12 w-12 rounded-full border-4 border-neutral-800 flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-full border-4 border-teal-500 border-t-transparent -rotate-45"
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${score}%, 0 ${score}%)` }} // Simple visual
            ></div>
            <Target size={18} className="text-teal-500" />
         </div>
      </div>

      {/* Main Info */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Name</span>
          <input 
            className="mt-1 w-full bg-transparent border-b border-neutral-800 py-1 text-lg font-medium focus:border-teal-500 outline-none transition-colors"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Email</span>
            <input 
              className="mt-1 w-full bg-transparent border-b border-neutral-800 py-1 text-sm focus:border-teal-500 outline-none transition-colors"
              value={formData.email || ''}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">WhatsApp</span>
            <input 
              className="mt-1 w-full bg-transparent border-b border-neutral-800 py-1 text-sm focus:border-teal-500 outline-none transition-colors"
              value={formData.phone || ''}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </label>
        </div>
      </div>

      {/* Deal Properties */}
      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
        <div className="space-y-4 border-r border-neutral-800/50 pr-4">
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
               <DollarSign size={10} /> Budget
             </span>
             <select 
               className="mt-1 bg-transparent text-sm font-medium outline-none text-neutral-300"
               value={formData.budget_range || ''}
               onChange={e => setFormData({ ...formData, budget_range: e.target.value })}
             >
               <option value="under_3k">Até R$ 3k</option>
               <option value="3k_10k">R$ 3k - 10k</option>
               <option value="10k_30k">R$ 10k - 30k</option>
               <option value="30k_plus">R$ 30k+</option>
             </select>
           </div>
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
               <Calendar size={10} /> Timeline
             </span>
             <select 
               className="mt-1 bg-transparent text-sm font-medium outline-none text-neutral-300"
               value={formData.desired_deadline || ''}
               onChange={e => setFormData({ ...formData, desired_deadline: e.target.value })}
             >
               <option value="asap">ASAP</option>
               <option value="1_month">1 Month</option>
               <option value="2_3_months">2-3 Months</option>
               <option value="no_rush">No rush</option>
             </select>
           </div>
        </div>
        <div className="space-y-4 pl-4">
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
               <MessageSquare size={10} /> Interest
             </span>
             <select 
               className="mt-1 bg-transparent text-sm font-medium outline-none text-neutral-300"
               value={formData.service_interest || ''}
               onChange={e => setFormData({ ...formData, service_interest: e.target.value })}
             >
               <option value="landing">Landing Page</option>
               <option value="ecommerce">E-commerce</option>
               <option value="automation">AI Automation</option>
               <option value="custom">Custom System</option>
             </select>
           </div>
           <div className="flex flex-col">
             <span className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
               <Save size={10} /> Status
             </span>
             <select 
               className="mt-1 bg-transparent text-sm font-bold outline-none text-teal-500"
               value={formData.status || 'new'}
               onChange={e => setFormData({ ...formData, status: e.target.value as any })}
             >
               <option value="new">NEW</option>
               <option value="contacted">CONTACTED</option>
               <option value="qualified">QUALIFIED</option>
               <option value="won">WON</option>
               <option value="lost">LOST</option>
             </select>
           </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
         <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1">
           <Clock size={12} /> Next Action
         </span>
         <div className="space-y-2">
            <input 
              type="date"
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-xs"
              value={formData.next_action_at ? new Date(formData.next_action_at).toISOString().split('T')[0] : ''}
              onChange={e => setFormData({ ...formData, next_action_at: e.target.value ? new Date(e.target.value) : null })}
            />
            <textarea 
              placeholder="What needs to happen next?"
              className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs h-16 resize-none"
              value={formData.next_action_note || ''}
              onChange={e => setFormData({ ...formData, next_action_note: e.target.value })}
            />
         </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg font-bold transition-all shadow-lg"
      >
        <Save size={18} />
        {loading ? 'Saving Changes...' : 'Update Lead Info'}
      </button>

      {/* Metadata */}
      <div className="pt-4 flex items-center justify-between text-[10px] text-neutral-600 border-t border-neutral-800">
         <span>Source: {formData.source || 'Unknown'}</span>
         <span>Created: {new Date(formData.created_at!).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
