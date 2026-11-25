import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, ChefHat } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Logo } from '../../components/Logo';

interface LoginPageProps {
  onBackToSite: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackToSite }) => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    try {
      setIsLoading(true);
      await login(email.trim(), password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#190608] via-[#100405] to-[#0a0203] text-cream flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to website button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToSite}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-cream/80 hover:text-white border border-white/10 text-xs font-bold transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-gold" />
          <span>Return to Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 transform hover:scale-105 transition-transform">
            <Logo showBranch={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-gold text-xs font-black uppercase tracking-widest mt-2 shadow-md">
            <ChefHat className="w-3.5 h-3.5 text-gold" />
            <span>Kitchen Head Portal</span>
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white font-['Montserrat',sans-serif] tracking-tight">
            Kitchen Administration
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-cream/70 max-w-sm">
            Sign in to manage live biryani availability, food pricing, dish images, and branch contact details.
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-neutral-950/90 border border-gold/30 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(242,11,18,0.25)] backdrop-blur-md relative">
          {/* Subtle top gold accent rim */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-brand-red/50 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
                Kitchen Head Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. joelramireddy@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-sm text-white placeholder-cream/30 focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gold uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cream/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your administrative password"
                  className="w-full pl-10 pr-11 py-3 bg-neutral-900 border border-white/10 focus:border-gold rounded-xl text-sm text-white placeholder-cream/30 focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-cream/50 hover:text-gold transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="pt-1 flex items-center gap-2 text-[11px] text-cream/50">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Protected portal. Unauthorized access attempts are monitored and logged.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-red via-deep-red to-burgundy hover:from-red-600 hover:to-brand-red text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-brand-red/40 active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ChefHat className="w-4 h-4 text-gold" />
                    <span>Enter Kitchen Console</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-cream/40">
          Red Bucket Biryani • Jodimetla Branch, Hyderabad
        </div>
      </div>
    </div>
  );
};
