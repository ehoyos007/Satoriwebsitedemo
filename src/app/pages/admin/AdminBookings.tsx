import { useState, useEffect } from 'react';
import {
  CalendarCheck,
  AlertCircle,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { retryQuery } from '@/app/lib/retry';
import type { Database } from '@/app/lib/database.types';

type BookingStatus = Database['public']['Enums']['booking_status'];

interface BookingWithSlot {
  id: string;
  slot_id: string;
  client_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  service_interest: string | null;
  message: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  availability_slots: {
    start_time: string;
    end_time: string;
  } | null;
  clients: {
    business_name: string | null;
  } | null;
}

const bookingStatusBadge: Record<string, { color: string; label: string }> = {
  confirmed: { color: 'bg-cyan-500/10 border-cyan-400/20 text-cyan-400', label: 'Confirmed' },
  completed: { color: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400', label: 'Completed' },
  cancelled: { color: 'bg-zinc-500/10 border-zinc-400/20 text-zinc-400', label: 'Cancelled' },
  no_show: { color: 'bg-red-500/10 border-red-400/20 text-red-400', label: 'No Show' },
};

const ALL_STATUSES: BookingStatus[] = ['confirmed', 'cancelled', 'completed', 'no_show'];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function AdminBookings() {
  const [bookings, setBookings] = useState<BookingWithSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchBookings() {
    const { data, error: err } = await retryQuery(() =>
      supabase
        .from('bookings')
        .select('*, availability_slots(start_time, end_time), clients(business_name)')
        .order('created_at', { ascending: false })
    );
    if (err) {
      setError('Failed to load bookings.');
      console.error(err);
    } else {
      setBookings((data as BookingWithSlot[]) || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function handleStatusChange(bookingId: string, newStatus: BookingStatus) {
    setUpdatingId(bookingId);
    setError(null);

    const { error: updateErr } = await supabase
      .from('bookings')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', bookingId);

    if (updateErr) {
      setError('Failed to update status: ' + updateErr.message);
    } else {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus, updated_at: new Date().toISOString() } : b
        )
      );
    }
    setUpdatingId(null);
  }

  const filtered =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  const filterTabs: { value: 'all' | BookingStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: bookings.length },
    { value: 'confirmed', label: 'Confirmed', count: bookings.filter((b) => b.status === 'confirmed').length },
    { value: 'completed', label: 'Completed', count: bookings.filter((b) => b.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: bookings.filter((b) => b.status === 'cancelled').length },
    { value: 'no_show', label: 'No Show', count: bookings.filter((b) => b.status === 'no_show').length },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Bookings
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading bookings...</div>
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

      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Bookings
          </span>
        </h1>
        <p className="text-zinc-400">Manage client booking requests</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filter === tab.value
                ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-white'
                : 'bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No bookings found{filter !== 'all' ? ` with status "${filter}"` : ''}.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((booking) => {
              const badge = bookingStatusBadge[booking.status];
              return (
                <div key={booking.id} className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Date/Time */}
                      <div className="flex items-center gap-3">
                        <CalendarCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {booking.availability_slots
                            ? `${formatDateTime(booking.availability_slots.start_time)} - ${formatTime(booking.availability_slots.end_time)}`
                            : 'No slot info'}
                        </span>
                      </div>

                      {/* Guest Info */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                        {booking.guest_name && (
                          <span className="text-white font-medium">{booking.guest_name}</span>
                        )}
                        {booking.clients?.business_name && (
                          <span className="text-zinc-500">({booking.clients.business_name})</span>
                        )}
                        {booking.guest_email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.guest_email}
                          </span>
                        )}
                        {booking.guest_phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {booking.guest_phone}
                          </span>
                        )}
                      </div>

                      {/* Service Interest */}
                      {booking.service_interest && (
                        <div className="text-sm text-zinc-400">
                          <span className="text-zinc-500">Interest: </span>
                          {booking.service_interest}
                        </div>
                      )}

                      {/* Message */}
                      {booking.message && (
                        <div className="flex items-start gap-2 text-sm text-zinc-500">
                          <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <span className="italic">{booking.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Status + Dropdown */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${badge?.color || ''}`}>
                        {badge?.label || booking.status}
                      </span>
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingStatus)}
                        disabled={updatingId === booking.id}
                        className="px-2 py-1 rounded-lg bg-zinc-900/50 border border-white/10 text-white text-xs focus:border-cyan-400/40 focus:outline-none disabled:opacity-50"
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {bookingStatusBadge[s]?.label || s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
