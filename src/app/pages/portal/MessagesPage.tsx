import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Shield,
  Bell,
  CheckCircle,
  CreditCard,
  Rocket,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';
import type { Database } from '@/app/lib/database.types';

type ActivityLog = Database['public']['Tables']['activity_log']['Row'];

const typeBadge: Record<string, { label: string; color: string; icon: typeof Bell }> = {
  project_update: { label: 'Update', color: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400', icon: Rocket },
  milestone: { label: 'Milestone', color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400', icon: CheckCircle },
  note: { label: 'Note', color: 'bg-violet-500/10 border-violet-400/20 text-violet-400', icon: MessageSquare },
  system: { label: 'System', color: 'bg-amber-500/10 border-amber-400/20 text-amber-400', icon: Bell },
  payment: { label: 'Payment', color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400', icon: CreditCard },
  purchase: { label: 'Purchase', color: 'bg-violet-500/10 border-violet-400/20 text-violet-400', icon: CreditCard },
};

export function MessagesPage() {
  const { user } = useAuth();
  const { client, loading: clientLoading } = useClientData();
  const [messages, setMessages] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    async function fetchMessages() {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('client_id', client!.id)
        .in('type', ['project_update', 'milestone', 'note', 'system', 'payment', 'purchase'])
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    }

    fetchMessages();
  }, [client]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !client || !user) return;

    setSubmitting(true);
    const { data, error } = await supabase
      .from('activity_log')
      .insert({
        client_id: client.id,
        actor_id: user.id,
        type: 'note',
        message: newMessage.trim(),
        metadata: { source: 'message' },
      })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [data, ...prev]);
      setNewMessage('');
    }
    setSubmitting(false);
  };

  const isOwnMessage = (msg: ActivityLog) => msg.actor_id === user?.id;

  if (clientLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Messages
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Messages
          </span>
        </h1>
        <p className="text-zinc-400">Project updates, milestones, and communication</p>
      </div>

      {/* Compose */}
      <form onSubmit={handleSend} className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-lg mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          Send a Message
        </h3>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[80px] mb-3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newMessage.trim() || submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {/* Messages Feed */}
      {messages.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No messages yet</h3>
          <p className="text-zinc-500">Send a message or check back for project updates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const badge = typeBadge[msg.type] || typeBadge.system;
            const BadgeIcon = badge.icon;

            return (
              <div
                key={msg.id}
                className="glass-panel p-5 rounded-xl border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isOwnMessage(msg)
                      ? 'bg-cyan-500/20 border border-cyan-400/30'
                      : 'bg-violet-500/20 border border-violet-400/30'
                  }`}>
                    {isOwnMessage(msg) ? (
                      <User className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Shield className="w-4 h-4 text-violet-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium">
                        {isOwnMessage(msg) ? 'You' : 'Satori Team'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${badge.color} flex items-center gap-1`}>
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-zinc-300 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
