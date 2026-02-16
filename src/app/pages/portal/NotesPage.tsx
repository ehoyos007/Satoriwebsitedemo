import { useState, useEffect } from 'react';
import {
  StickyNote,
  Send,
  User,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';
import type { Database } from '@/app/lib/database.types';

type ActivityLog = Database['public']['Tables']['activity_log']['Row'];

export function NotesPage() {
  const { user } = useAuth();
  const { client, loading: clientLoading } = useClientData();
  const [notes, setNotes] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    async function fetchNotes() {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('client_id', client!.id)
        .eq('type', 'note')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setNotes(data);
      }
      setLoading(false);
    }

    fetchNotes();
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !client || !user) return;

    setSubmitting(true);
    const { data, error } = await supabase
      .from('activity_log')
      .insert({
        client_id: client.id,
        actor_id: user.id,
        type: 'note',
        message: newNote.trim(),
      })
      .select()
      .single();

    if (!error && data) {
      setNotes((prev) => [data, ...prev]);
      setNewNote('');
    }
    setSubmitting(false);
  };

  const isOwnNote = (note: ActivityLog) => note.actor_id === user?.id;

  if (clientLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Project Notes
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Project Notes
          </span>
        </h1>
        <p className="text-zinc-400">Add notes and updates about your project</p>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-white/10">
        <h3 className="text-lg mb-3 flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-amber-400" />
          Add a Note
        </h3>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note about your project..."
          className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 min-h-[100px] mb-3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!newNote.trim() || submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Saving...' : 'Add Note'}
          </button>
        </div>
      </form>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <StickyNote className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl mb-2">No notes yet</h3>
          <p className="text-zinc-500">Add your first note above to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="glass-panel p-5 rounded-xl border border-white/10"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isOwnNote(note)
                    ? 'bg-cyan-500/20 border border-cyan-400/30'
                    : 'bg-violet-500/20 border border-violet-400/30'
                }`}>
                  {isOwnNote(note) ? (
                    <User className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Shield className="w-4 h-4 text-violet-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {isOwnNote(note) ? 'You' : 'Satori Team'}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(note.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-zinc-300 whitespace-pre-wrap">{note.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
