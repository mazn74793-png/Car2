import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModelName: string;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedModelName,
}) => {
  const [model, setModel] = useState(selectedModelName || 'Porsche 911 GT3 RS');
  const [center, setCenter] = useState('Porsche Experience Center Los Angeles');
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('10:00 AM');
  const [driverName, setDriverName] = useState('Alexander Vance');
  const [email, setEmail] = useState('mizoo2y2@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 911-7180');
  const [submitted, setSubmitted] = useState(false);

  // Sync state if prop changes
  React.useEffect(() => {
    if (selectedModelName) {
      setModel(selectedModelName);
    }
  }, [selectedModelName]);

  if (!isOpen) return null;

  const centers = [
    'Porsche Experience Center Los Angeles (PEC LA)',
    'Porsche Experience Center Atlanta (PEC ATL)',
    'Porsche Experience Center Silverstone (UK)',
    'Porsche Experience Center Leipzig Track (Germany)',
    'Porsche Experience Center Hockenheimring (Germany)',
    'Porsche Center Manhattan (New York)',
    'Porsche Center Beverly Hills (California)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick(1200);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-white/15 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              VIP Reservation
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-0.5">
              Book a Test Drive
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick(600);
              onClose();
            }}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
            <h4 className="text-lg font-bold uppercase tracking-wide">Reservation Requested</h4>
            <p className="text-xs text-neutral-400 font-mono">
              Reservation Code: PEC-{Math.floor(10000 + Math.random() * 90000)}
            </p>
            <div className="p-4 bg-white/5 border border-white/10 text-xs font-mono text-left space-y-1">
              <div>
                <span className="text-neutral-400">Vehicle:</span> <span className="text-white">{model}</span>
              </div>
              <div>
                <span className="text-neutral-400">Location:</span> <span className="text-white">{center}</span>
              </div>
              <div>
                <span className="text-neutral-400">Date & Slot:</span> <span className="text-white">{date} at {time}</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light">
              A dedicated Porsche Brand Ambassador will contact you within 2 business hours to finalize track briefing requirements.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-2 px-6 py-2.5 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Selected Model
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Authorized Center / Experience Circuit
              </label>
              <select
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
              >
                {centers.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                >
                  <option value="09:00 AM">09:00 AM (Morning Session)</option>
                  <option value="11:30 AM">11:30 AM (Midday Session)</option>
                  <option value="02:30 PM">02:30 PM (Afternoon Track)</option>
                  <option value="05:00 PM">05:00 PM (Sunset Session)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 text-xs font-bold tracking-widest uppercase bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                Confirm Experience Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
