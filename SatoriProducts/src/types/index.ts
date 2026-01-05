export type BadgeColor = 'emerald' | 'violet' | 'cyan' | 'amber' | null;

export interface Tool {
  name: string;
  role: string;
  description: string;
  cost: string;
  importance: string;
  status?: 'evaluating' | 'selected' | 'active';
}

export interface StripeProduct {
  name: string;
  productId: string;
  priceModel: string;
  billingInterval?: string;
  paymentOptions?: string;
  metadata: string;
}

export interface Pricing {
  setup: number;
  monthly: number;
  model: string;
  minimumCommitment?: string;
  annualOption?: string;
  prepayDiscount?: string;
  usage?: string;
  note?: string;
  paymentOptions?: string;
}

export interface Margins {
  setup?: string;
  monthly?: string;
  project?: string;
}

export interface Overview {
  what: string;
  whyItMatters: string;
  clientExpects: string[];
}

export interface WebsiteInfo {
  displayPrice: string;
  badge: string;
  tagline: string;
  description: string;
}

export interface Service {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  badge: string | null;
  badgeColor: BadgeColor;
  currentPrice: string;
  proposedPrice: string;
  pricing: Pricing;
  margins: Margins;
  overview: Overview;
  tools: Tool[];
  stripe: {
    products: StripeProduct[];
  };
  website: WebsiteInfo;
}

export interface ServiceNote {
  serviceId: string;
  content: string;
  updatedAt: string;
}

export type TabId = 'overview' | 'tools' | 'stripe' | 'website' | 'notes';
