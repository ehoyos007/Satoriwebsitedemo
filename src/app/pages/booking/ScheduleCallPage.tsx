import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock, Video } from 'lucide-react';
import { useState } from 'react';

export function ScheduleCallPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = [
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
  ];

  const handleConfirm = () => {
    navigate('/booking/confirmation');
  };

  return (
    <div className="min-h-screen pt-16">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Times */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h2 className="text-xl mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cyan-400" />
                Select a Date
              </h2>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">January 2025</h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
                      ←
                    </button>
                    <button className="p-2 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
                      →
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-sm text-zinc-500 py-2">
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate === day;
                    const isPast = day < 5;
                    const isWeekend = (day % 7 === 0 || day % 7 === 6);

                    return (
                      <button
                        key={i}
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                        className={`aspect-square p-2 rounded-lg transition-all text-sm ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white scale-105'
                            : isPast
                            ? 'bg-zinc-900/30 text-zinc-700 cursor-not-allowed'
                            : isWeekend
                            ? 'bg-zinc-900/50 text-zinc-600 cursor-not-allowed'
                            : 'bg-zinc-900/50 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-2xl border border-white/10"
              >
                <h2 className="text-xl mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-violet-400" />
                  Available Times (EST)
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg transition-all text-sm ${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-violet-500 to-emerald-500 text-white scale-105'
                          : 'bg-zinc-900/50 border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/10'
                      }`}
                    >
                      {time}
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
                      <div>January {selectedDate}, 2025</div>
                    </div>
                  </div>
                )}

                {selectedTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">Time</div>
                      <div>{selectedTime} EST</div>
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
                  <li>• Review your project goals</li>
                  <li>• Discuss timeline & budget</li>
                  <li>• Answer your questions</li>
                  <li>• Outline next steps</li>
                </ul>
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                className="w-full group relative px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Confirm Call
                  <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {(!selectedDate || !selectedTime) && (
                <p className="text-xs text-zinc-500 text-center mt-3">
                  Select a date and time to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
