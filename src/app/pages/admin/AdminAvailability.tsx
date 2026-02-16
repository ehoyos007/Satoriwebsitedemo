import { useState, useEffect } from 'react';
import {
  CalendarClock,
  Plus,
  Trash2,
  AlertCircle,
  X,
  CalendarPlus,
  User,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type SlotRow = Database['public']['Tables']['availability_slots']['Row'];
type BookingRow = Database['public']['Tables']['bookings']['Row'];

interface SlotWithBooking extends SlotRow {
  bookings?: Pick<BookingRow, 'id' | 'guest_name' | 'guest_email' | 'service_interest'>[];
}

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function AdminAvailability() {
  const [slots, setSlots] = useState<SlotWithBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddSingle, setShowAddSingle] = useState(false);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Single slot form
  const [singleDate, setSingleDate] = useState('');
  const [singleStartTime, setSingleStartTime] = useState('09:00');
  const [singleEndTime, setSingleEndTime] = useState('09:30');

  // Bulk slot form
  const [bulkDay, setBulkDay] = useState(1);
  const [bulkStartTime, setBulkStartTime] = useState('09:00');
  const [bulkEndTime, setBulkEndTime] = useState('09:30');
  const [bulkWeeks, setBulkWeeks] = useState(4);

  async function fetchSlots() {
    const { data, error: err } = await retryQuery(() =>
      supabase
        .from('availability_slots')
        .select('*, bookings(id, guest_name, guest_email, service_interest)')
        .order('start_time', { ascending: true })
    );
    if (err) {
      setError('Failed to load availability slots.');
      console.error(err);
    } else {
      setSlots((data as SlotWithBooking[]) || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  const now = new Date().toISOString();
  const upcomingSlots = slots.filter((s) => s.start_time >= now);
  const pastSlots = slots.filter((s) => s.start_time < now).reverse();

  async function handleAddSingle(e: React.FormEvent) {
    e.preventDefault();
    if (!singleDate) return;
    setSaving(true);
    setError(null);

    const startTime = new Date(`${singleDate}T${singleStartTime}`).toISOString();
    const endTime = new Date(`${singleDate}T${singleEndTime}`).toISOString();

    const { error: insertErr } = await supabase
      .from('availability_slots')
      .insert({ start_time: startTime, end_time: endTime });

    if (insertErr) {
      setError('Failed to add slot: ' + insertErr.message);
    } else {
      setShowAddSingle(false);
      setSingleDate('');
      await fetchSlots();
    }
    setSaving(false);
  }

  async function handleBulkAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const slotsToInsert: { start_time: string; end_time: string }[] = [];
    const today = new Date();

    for (let w = 0; w < bulkWeeks; w++) {
      // Find the next occurrence of the selected day of week
      const target = new Date(today);
      const currentDay = target.getDay();
      let daysUntil = bulkDay - currentDay;
      if (daysUntil <= 0) daysUntil += 7;
      target.setDate(target.getDate() + daysUntil + w * 7);

      const dateStr = target.toISOString().split('T')[0];
      const startTime = new Date(`${dateStr}T${bulkStartTime}`).toISOString();
      const endTime = new Date(`${dateStr}T${bulkEndTime}`).toISOString();

      slotsToInsert.push({ start_time: startTime, end_time: endTime });
    }

    const { error: insertErr } = await supabase
      .from('availability_slots')
      .insert(slotsToInsert);

    if (insertErr) {
      setError('Failed to bulk add slots: ' + insertErr.message);
    } else {
      setShowBulkAdd(false);
      await fetchSlots();
    }
    setSaving(false);
  }

  async function handleDelete(slotId: string) {
    setDeleting(slotId);
    setError(null);
    const { error: delErr } = await supabase
      .from('availability_slots')
      .delete()
      .eq('id', slotId);

    if (delErr) {
      setError('Failed to delete slot: ' + delErr.message);
    } else {
      setSlots((prev) => prev.filter((s) => s.id !== slotId));
    }
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Availability
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading slots...</div>
        </div>
      </div>
    );
  }

  function renderSlotRow(slot: SlotWithBooking) {
    const booking = slot.bookings?.[0];
    return (
      <div
        key={slot.id}
        className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{formatDate(slot.start_time)}</div>
          <div className="text-xs text-zinc-400">
            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
          </div>
          {booking && (
            <div className="flex items-center gap-2 mt-1">
              <User className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-cyan-400">
                {booking.guest_name || booking.guest_email || 'Booked'}
                {booking.service_interest && ` - ${booking.service_interest}`}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {slot.is_booked ? (
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
              Booked
            </span>
          ) : (
            <>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400">
                Open
              </span>
              <button
                onClick={() => handleDelete(slot.id)}
                disabled={deleting === slot.id}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50"
                title="Delete slot"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Availability
            </span>
          </h1>
          <p className="text-zinc-400">Manage booking time slots</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowBulkAdd(true); setShowAddSingle(false); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-400/30 text-violet-300 hover:bg-violet-500/30 transition-colors text-sm"
          >
            <CalendarPlus className="w-4 h-4" />
            Bulk Add
          </button>
          <button
            onClick={() => { setShowAddSingle(true); setShowBulkAdd(false); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Slot
          </button>
        </div>
      </div>

      {/* Add Single Slot Dialog */}
      {showAddSingle && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-400/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Add Single Slot</h2>
            <button onClick={() => setShowAddSingle(false)} className="text-zinc-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleAddSingle} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Date</label>
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Start Time</label>
              <input
                type="time"
                value={singleStartTime}
                onChange={(e) => setSingleStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">End Time</label>
              <input
                type="time"
                value={singleEndTime}
                onChange={(e) => setSingleEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-cyan-400/40 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Adding...' : 'Add Slot'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Add Dialog */}
      {showBulkAdd && (
        <div className="glass-panel p-6 rounded-2xl border border-violet-400/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Bulk Weekly Add</h2>
            <button onClick={() => setShowBulkAdd(false)} className="text-zinc-500 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleBulkAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Day of Week</label>
              <select
                value={bulkDay}
                onChange={(e) => setBulkDay(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-violet-400/40 focus:outline-none"
              >
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Start Time</label>
              <input
                type="time"
                value={bulkStartTime}
                onChange={(e) => setBulkStartTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-violet-400/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">End Time</label>
              <input
                type="time"
                value={bulkEndTime}
                onChange={(e) => setBulkEndTime(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-violet-400/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Weeks Ahead</label>
              <input
                type="number"
                value={bulkWeeks}
                onChange={(e) => setBulkWeeks(Number(e.target.value))}
                min={1}
                max={52}
                required
                className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-sm focus:border-violet-400/40 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Generating...' : `Generate ${bulkWeeks} Slot${bulkWeeks === 1 ? '' : 's'}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Slots */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <CalendarClock className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-medium">Upcoming Slots ({upcomingSlots.length})</h2>
        </div>
        {upcomingSlots.length === 0 ? (
          <p className="text-zinc-500 text-sm">No upcoming slots. Add some above.</p>
        ) : (
          <div>{upcomingSlots.map(renderSlotRow)}</div>
        )}
      </div>

      {/* Past Slots */}
      {pastSlots.length > 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-lg font-medium mb-4 text-zinc-400">Past Slots ({pastSlots.length})</h2>
          <div className="opacity-60">{pastSlots.map(renderSlotRow)}</div>
        </div>
      )}
    </div>
  );
}
