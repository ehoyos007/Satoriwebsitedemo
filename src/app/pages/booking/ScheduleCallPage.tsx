import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, CheckCircle, Clock, Video, Globe, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { SEO } from '../../components/SEO';

interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
}

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern (ET)' },
  { value: 'America/Chicago', label: 'Central (CT)' },
  { value: 'America/Denver', label: 'Mountain (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific (PT)' },
  { value: 'America/Anchorage', label: 'Alaska (AKT)' },
  { value: 'Pacific/Honolulu', label: 'Hawaii (HT)' },
];

function groupSlotsByDate(slots: AvailabilitySlot[]): Map<string, AvailabilitySlot[]> {
  const map = new Map<string, AvailabilitySlot[]>();
  for (const slot of slots) {
    const key = new Date(slot.start_time).toISOString().split('T')[0];
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slot);
  }
  return map;
}

function formatTime(isoString: string, tz: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: tz,
    });
  } catch {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

function formatDateLabel(dateStr: string, tz: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  try {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: tz,
    });
  } catch {
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
}

export function ScheduleCallPage() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [timezone, setTimezone] = useState(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return TIMEZONES.find((tz) => tz.value === detected)?.value || 'America/New_York';
    } catch {
      return 'America/New_York';
    }
  });

  // Check that form data exists from previous step
  useEffect(() => {
    const saved = sessionStorage.getItem('satori_booking_form');
    if (!saved) {
      navigate('/book-call', { replace: true });
    }
  }, [navigate]);

  // Load available slots from Supabase
  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('availability_slots')
        .select('id, start_time, end_time')
        .eq('is_booked', false)
        .gt('start_time', new Date().toISOString())
        .order('start_time');

      if (err) {
        setError('Unable to load available times. Please try again.');
        console.error('Failed to load slots:', err);
      }
      setSlots(data || []);
      setLoading(false);
    }
    loadSlots();
  }, []);

  const slotsByDate = useMemo(() => groupSlotsByDate(slots), [slots]);
  const availableDates = useMemo(() => Array.from(slotsByDate.keys()).sort(), [slotsByDate]);
  const slotsForSelectedDate = selectedDate ? (slotsByDate.get(selectedDate) || []) : [];

  // Build calendar data for the month containing available dates
  const calendarData = useMemo(() => {
    if (availableDates.length === 0) return null;

    // Show month of the first available date
    const firstDate = new Date(availableDates[0] + 'T12:00:00');
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDow = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const availableDateSet = new Set(availableDates);
    const today = new Date().toISOString().split('T')[0];

    const days: { day: number; dateStr: string; available: boolean; past: boolean }[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        dateStr,
        available: availableDateSet.has(dateStr),
        past: dateStr < today,
      });
    }

    const monthLabel = firstDayOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { monthLabel, startDow, days };
  }, [availableDates]);

  const handleConfirm = () => {
    if (!selectedSlot) return;
    navigate('/booking/confirmation', {
      state: {
        slotId: selectedSlot.id,
        slotStart: selectedSlot.start_time,
        slotEnd: selectedSlot.end_time,
        timezone,
      },
    });
  };

  return (
    <div className="min-h-screen pt-16">
      <SEO
        title="Schedule Your Call"
        path="/booking/schedule"
        description="Pick a time for your free 15-minute strategy call with Satori Studios."
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Pick Your Perfect Time
            </span>
          </h1>
          <p className="text-zinc-400">Schedule your 15-minute strategy call with our team</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-4" />
            <p className="text-zinc-400">Loading available times...</p>
          </div>
        ) : error ? (
          <div className="glass-panel p-8 rounded-2xl border border-red-400/20 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : slots.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center">
            <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">No Available Times</h2>
            <p className="text-zinc-400 mb-6">
              We're fully booked right now. Please check back soon or contact us directly.
            </p>
            <a
              href="mailto:hello@satori-labs.cloud"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-transform"
            >
              Email Us Instead
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar & Times */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timezone selector */}
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-zinc-400" />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="bg-zinc-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-cyan-400/50 focus:outline-none"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              {/* Calendar grid */}
              {calendarData && (
                <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                  <h2 className="text-xl mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-cyan-400" />
                    {calendarData.monthLabel}
                  </h2>

                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center text-sm text-zinc-500 py-2">
                        {day}
                      </div>
                    ))}

                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: calendarData.startDow }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}

                    {calendarData.days.map(({ day, dateStr, available, past }) => {
                      const isSelected = selectedDate === dateStr;
                      return (
                        <button
                          key={day}
                          onClick={() => {
                            if (available) {
                              setSelectedDate(dateStr);
                              setSelectedSlot(null);
                            }
                          }}
                          disabled={!available || past}
                          className={`aspect-square p-2 rounded-lg transition-all text-sm ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white scale-105'
                              : available
                              ? 'bg-zinc-900/50 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                              : past
                              ? 'bg-zinc-900/30 text-zinc-700 cursor-not-allowed'
                              : 'bg-zinc-900/30 text-zinc-700 cursor-not-allowed'
                          }`}
                        >
                          {day}
                          {available && !isSelected && (
                            <div className="w-1 h-1 rounded-full bg-cyan-400 mx-auto mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Also show available dates as list for dates in other months */}
              {availableDates.length > 0 && calendarData && (() => {
                const calMonth = calendarData.monthLabel;
                const otherDates = availableDates.filter((d) => {
                  const dt = new Date(d + 'T12:00:00');
                  const label = dt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  return label !== calMonth;
                });
                if (otherDates.length === 0) return null;
                return (
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
                    <h3 className="text-lg mb-4 text-zinc-300">More Available Dates</h3>
                    <div className="flex flex-wrap gap-2">
                      {otherDates.map((dateStr) => (
                        <button
                          key={dateStr}
                          onClick={() => { setSelectedDate(dateStr); setSelectedSlot(null); }}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedDate === dateStr
                              ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white'
                              : 'bg-zinc-900/50 border border-white/10 hover:border-cyan-400/50'
                          }`}
                        >
                          {formatDateLabel(dateStr, timezone)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Time Slots */}
              {selectedDate && slotsForSelectedDate.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10"
                >
                  <h2 className="text-xl mb-2 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-violet-400" />
                    Available Times
                  </h2>
                  <p className="text-sm text-zinc-500 mb-6">
                    {formatDateLabel(selectedDate, timezone)} &middot; {TIMEZONES.find((t) => t.value === timezone)?.label}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {slotsForSelectedDate.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg transition-all text-sm ${
                          selectedSlot?.id === slot.id
                            ? 'bg-gradient-to-r from-violet-500 to-emerald-500 text-white scale-105'
                            : 'bg-zinc-900/50 border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/10'
                        }`}
                      >
                        {formatTime(slot.start_time, timezone)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar: Selection Summary */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 sticky top-24">
                <h3 className="text-xl mb-6">Call Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Call Type</div>
                      <div>15-Minute Strategy Call</div>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Date</div>
                        <div>{new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                    </div>
                  )}

                  {selectedSlot && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-zinc-500 mb-1">Time</div>
                        <div>
                          {formatTime(selectedSlot.start_time, timezone)} – {formatTime(selectedSlot.end_time, timezone)}{' '}
                          {TIMEZONES.find((t) => t.value === timezone)?.label}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="glass-panel p-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5 mb-6">
                  <h4 className="text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    What to Expect
                  </h4>
                  <ul className="space-y-1 text-sm text-zinc-400">
                    <li>Review your project goals</li>
                    <li>Discuss timeline & budget</li>
                    <li>Answer your questions</li>
                    <li>Outline next steps</li>
                  </ul>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!selectedSlot}
                  className="w-full group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Confirm Call
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {!selectedSlot && (
                  <p className="text-xs text-zinc-500 text-center mt-3">
                    Select a date and time to continue
                  </p>
                )}

                <button
                  onClick={() => navigate('/book-call')}
                  className="w-full mt-3 flex items-center justify-center gap-2 px-6 py-2 rounded-lg border border-white/10 hover:border-cyan-400/50 text-sm text-zinc-400 hover:text-white transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
