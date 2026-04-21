'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, MessageSquare, Mail, Phone, Users, CheckSquare, PlusSquare } from 'lucide-react';

export default function LeadInteractionClientForm({ leadId }: { leadId: string }) {
  const [content, setContent] = useState('');
  const [type, setType] = useState<'whatsapp' | 'email' | 'call' | 'meeting' | 'note'>('note');
  const [direction, setDirection] = useState<'inbound' | 'outbound' | 'internal'>('internal');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, direction, content }),
      });

      if (res.ok) {
        setContent('');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 flex gap-2 p-1 rounded-lg bg-neutral-950 border border-neutral-800">
           {[
             { id: 'note', icon: PlusSquare },
             { id: 'whatsapp', icon: MessageSquare },
             { id: 'email', icon: Mail },
             { id: 'call', icon: Phone },
             { id: 'meeting', icon: Users },
           ].map((item) => (
             <button
               key={item.id}
               type="button"
               onClick={() => setType(item.id as any)}
               className={`flex-1 flex items-center justify-center p-2 rounded transition-all ${
                 type === item.id 
                 ? 'bg-neutral-800 text-teal-500 shadow-inner' 
                 : 'text-neutral-500 hover:text-neutral-300'
               }`}
             >
               <item.icon size={16} />
             </button>
           ))}
        </div>

        <div className="flex gap-1 p-1 rounded-lg bg-neutral-950 border border-neutral-800">
          {['internal', 'outbound', 'inbound'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDirection(d as any)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${
                direction === d 
                ? 'bg-neutral-800 text-white' 
                : 'text-neutral-600 hover:text-neutral-400'
              }`}
            >
              {d.charAt(0)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Record interaction details, notes, or outcomes..."
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-sm h-32 focus:ring-2 focus:ring-teal-500 outline-none resize-none placeholder:text-neutral-600"
        />
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="absolute bottom-4 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg disabled:opacity-50 transition-all"
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
}
