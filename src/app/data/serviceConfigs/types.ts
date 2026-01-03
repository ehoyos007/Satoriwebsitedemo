import { LucideIcon } from 'lucide-react';

export interface ServiceConfig {
  slug: string;
  colors: {
    primary: string;
    secondary: string;
  };
  icon: LucideIcon;
  hero: {
    serviceName: string;
    badge?: string;
    headline: string; // Use <gradient></gradient> tags for gradient text
    description: string;
    subDescription?: string;
    trustChips: string[];
    whatYouGet: string[];
    ctas: {
      primary: { text: string; link?: string };
      secondary?: { text: string; link?: string };
    };
  };
  featuredCase: {
    clientName: string;
    industry: string;
    location: string;
    websitePreview: string;
    kpis: Array<{ label: string; value: string; delta: string }>;
    summary: string;
  };
  logoStrip: {
    title: string;
    logos: string[];
  };
  whyThisWorks: Array<{
    badge: { text: string; icon?: LucideIcon };
    headline: string; // Use <gradient></gradient> tags
    description: string;
    bullets?: string[];
    panel?: {
      title: string;
      items: Array<{ label: string; description: string; icon?: LucideIcon }>;
    };
    reverse?: boolean;
    background?: boolean;
  }>;
  deliverables: {
    subtitle: string;
    core: string[];
    optionalUpgrades?: string[];
  };
  process: {
    subtitle: string;
    steps: Array<{ step: string; time: string; desc: string }>;
  };
  outcomes: {
    title: string; // Use <gradient></gradient> tags
    subtitle: string;
    metrics: Array<{ metric: string; value: string; baseline: string }>;
    disclaimer?: string;
  };
  pricing: {
    tiers: Array<{
      name: string;
      price: string;
      description: string;
      features: string[];
      highlighted?: boolean;
      badge?: string;
      ctaText?: string;
      ctaLink?: string;
    }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  resources: Array<{ title: string; description: string; category: string }>;
  relatedServices: Array<{ name: string; path: string; icon: LucideIcon }>;
  finalCTA: {
    headline: string; // Use <gradient></gradient> tags
    description: string;
    primaryCTA: { text: string; link?: string };
    secondaryCTA?: { text: string; link?: string };
  };
}
