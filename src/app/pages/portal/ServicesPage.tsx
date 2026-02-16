import { useState, useEffect } from 'react';
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

  useEffect(() => {
    async function fetchPurchased() {
      try {
        const { data: orders } = await supabase
          .from('orders')
          .select('services(slug)')
          .eq('status', 'paid');

        const { data: subs } = await supabase
          .from('subscriptions')
          .select('services(slug)')
          .in('status', ['active']);

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
      }
    }

    fetchPurchased();
  }, []);

  return <AddServicesView purchasedServiceIds={purchasedPortalIds} />;
}
