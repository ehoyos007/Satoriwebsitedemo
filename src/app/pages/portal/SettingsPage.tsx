import { useState } from 'react';
import {
  Settings,
  User,
  Lock,
  Building,
  Save,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useClientData } from '@/app/hooks/useClientData';
import { supabase } from '@/app/lib/supabase';

export function SettingsPage() {
  const { profile, updatePassword } = useAuth();
  const { client } = useClientData();

  // Account form
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [accountSaving, setAccountSaving] = useState(false);
  const [accountMessage, setAccountMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password form
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setAccountSaving(true);
    setAccountMessage(null);

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone: phone || null })
      .eq('id', profile.id);

    if (error) {
      setAccountMessage({ type: 'error', text: error.message });
    } else {
      setAccountMessage({ type: 'success', text: 'Profile updated successfully' });
    }
    setAccountSaving(false);
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 8) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    setPasswordSaving(true);
    const { error } = await updatePassword(newPassword);

    if (error) {
      setPasswordMessage({ type: 'error', text: error });
    } else {
      setPasswordMessage({ type: 'success', text: 'Password updated successfully' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
            Settings
          </span>
        </h1>
        <p className="text-zinc-400">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <form onSubmit={handleAccountSave} className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" />
          Account
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              value={profile?.email || ''}
              readOnly
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg text-zinc-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        {accountMessage && (
          <div className={`flex items-center gap-2 text-sm mb-4 ${
            accountMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {accountMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {accountMessage.text}
          </div>
        )}

        <button
          type="submit"
          disabled={accountSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {accountSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Password */}
      <form onSubmit={handlePasswordSave} className="glass-panel p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Lock className="w-6 h-6 text-violet-400" />
          Change Password
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        {passwordMessage && (
          <div className={`flex items-center gap-2 text-sm mb-4 ${
            passwordMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {passwordMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {passwordMessage.text}
          </div>
        )}

        <button
          type="submit"
          disabled={passwordSaving || !newPassword}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 hover:border-violet-400/50 hover:bg-violet-500/5 transition-all disabled:opacity-50"
        >
          <Lock className="w-4 h-4" />
          {passwordSaving ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      {/* Business Info (read-only) */}
      {client && (
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl mb-4 flex items-center gap-2">
            <Building className="w-6 h-6 text-emerald-400" />
            Business Information
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            Contact us to update your business information.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Business Name', value: client.business_name },
              { label: 'Business Email', value: client.business_email },
              { label: 'Business Phone', value: client.business_phone },
              { label: 'Website', value: client.business_url },
              { label: 'Industry', value: client.industry },
              { label: 'Location', value: client.location },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm text-zinc-400 mb-2">{field.label}</label>
                <div className="px-4 py-2.5 bg-zinc-900/50 border border-white/10 rounded-lg text-zinc-500">
                  {field.value || '—'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
