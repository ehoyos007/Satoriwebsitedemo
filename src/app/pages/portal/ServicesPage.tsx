import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { AddServicesView } from './AddServicesView';

// Map portal service IDs to Supabase service slugs
const slugToPortalId: Record<string, string> = {
  'gbp-optimization': 'gbp',
  'review-screener': 'reviews',
  'ai-chat-bot': 'chatbot',
  'local-seo': 'local-seo',
  'google-ads': 'google-ads',
  'analytics-dashboards': 'analytics',
  'branding': 'branding',
  'graphic-design': 'graphic-design',
  'custom-crm': 'crm',
};

export function ServicesPage() {
  const [purchasedPortalIds, setPurchasedPortalIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPurchased() {
      try {
        const { data: orders, error: ordersErr } = await supabase
          .from('orders')
          .select('services(slug)')
          .eq('status', 'paid');

        if (ordersErr) throw ordersErr;

        const { data: subs, error: subsErr } = await supabase
          .from('subscriptions')
          .select('services(slug)')
          .in('status', ['active']);

        if (subsErr) throw subsErr;

        const ids = new Set<string>();

        if (orders) {
          for (const order of orders) {
            const slug = (order as any).services?.slug;
            if (slug && slugToPortalId[slug]) ids.add(slugToPortalId[slug]);
          }
        }
        if (subs) {
          for (const sub of subs) {
            const slug = (sub as any).services?.slug;
            if (slug && slugToPortalId[slug]) ids.add(slugToPortalId[slug]);
          }
        }

        setPurchasedPortalIds(Array.from(ids));
      } catch (err) {
        console.error('Failed to fetch purchased services:', err);
        setError('Failed to load your purchased services. Please try refreshing.');
      } finally {
        setLoading(false);
      }
    }

    fetchPurchased();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 text-transparent bg-clip-text">
              Services
            </span>
          </h1>
        </div>
        <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center">
          <div className="animate-pulse text-zinc-500">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-red-400 text-sm mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
      <AddServicesView purchasedServiceIds={purchasedPortalIds} />
    </>
  );
}
