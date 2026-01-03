import { ServiceConfig } from './types';
import { Megaphone, Target, TrendingUp, DollarSign, BarChart3, Globe, MapPin } from 'lucide-react';

export const googleAdsConfig: ServiceConfig = {
  slug: 'google-ads',
  colors: { primary: 'violet', secondary: 'amber' },
  icon: Megaphone,
  hero: {
    serviceName: 'Google Ads Management',
    headline: '<gradient>Immediate visibility</gradient> and qualified leads through targeted campaigns',
    description: 'Data-driven Google Ads campaigns that put you at the top of search results instantly. Strategic bidding, conversion tracking, and continuous optimization—all managed for you.',
    subDescription: 'No waiting for SEO. Start generating leads this week with professionally managed search campaigns.',
    trustChips: ['Setup in 5-7 days', 'Conversion tracking', 'Weekly optimization', 'Transparent reporting'],
    whatYouGet: [
      'Complete Google Ads account setup and optimization',
      'Keyword research and ad copywriting',
      'Landing page optimization recommendations',
      'Conversion tracking and analytics integration',
      'Monthly performance reports and strategy calls',
    ],
    ctas: {
      primary: { text: 'Book a Call', link: '/book-call' },
      secondary: { text: 'View Case Studies', link: '/case-studies' },
    },
  },
  featuredCase: {
    clientName: 'Elite Law Group',
    industry: 'Legal Services',
    location: 'Miami, FL',
    websitePreview: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBhZHMlMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY2NzIwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Cost Per Lead', value: '$42', delta: '-67%' },
      { label: 'Conversion Rate', value: '12.4%', delta: '+189%' },
      { label: 'ROAS', value: '4.8x', delta: '$4.80 per $1 spent' },
      { label: 'Quality Score', value: '8.2/10', delta: 'Above industry avg' },
    ],
    summary: 'Strategic Google Ads management reduced cost-per-lead by 67% while improving conversion rate to 12.4%, generating a 4.8x return on ad spend.',
  },
  logoStrip: {
    title: 'Trusted by growing businesses',
    logos: ['Elite Law Group', 'Precision HVAC', 'Summit Realty', 'Apex Dental', 'Verde Landscaping'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Conversion-Focused', icon: Target },
      headline: 'Campaigns built for <gradient>leads, not clicks</gradient>',
      description: 'Most agencies optimize for clicks. We optimize for conversions—leads, calls, bookings. Every keyword, ad, and landing page is tested and refined to maximize ROI, not just traffic.',
      bullets: [
        'Conversion tracking from day one',
        'High-intent keyword targeting',
        'Negative keyword strategy to reduce waste',
        'Ad copy A/B testing for higher CTR',
        'Landing page optimization recommendations',
      ],
      panel: {
        title: 'Our Optimization Process',
        items: [
          { label: 'Research', description: 'Keyword research, competitor analysis, audience targeting' },
          { label: 'Launch', description: 'Campaign setup, ad creation, tracking implementation' },
          { label: 'Test', description: 'A/B test ads, keywords, landing pages for performance' },
          { label: 'Optimize', description: 'Weekly bid adjustments, budget allocation, negative keywords' },
        ],
      },
    },
    {
      badge: { text: 'Transparent Reporting', icon: BarChart3 },
      headline: '<gradient>Know exactly</gradient> where your money goes',
      description: 'You get full access to your Google Ads account and monthly reports showing: spend, clicks, conversions, cost-per-lead, and ROI. No black box. You know exactly what is working and what is not.',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete Google Ads management',
    core: [
      'Google Ads account setup and structure',
      'Keyword research (100+ keywords)',
      'Ad copywriting and A/B testing',
      'Landing page audit and recommendations',
      'Conversion tracking setup (Google Analytics + Ads)',
      'Negative keyword strategy',
      'Ad extensions optimization',
      'Bid strategy and budget allocation',
      'Weekly performance monitoring and optimization',
      'Monthly performance reports',
      'Monthly strategy calls',
      'Competitor monitoring',
    ],
    optionalUpgrades: [
      'Landing page design and optimization',
      'Display and remarketing campaigns',
      'YouTube video advertising',
      'Call tracking integration',
      'Advanced audience targeting and lookalikes',
    ],
  },
  process: {
    subtitle: 'From setup to leads in 7-10 days',
    steps: [
      { step: 'Strategy Call', time: 'Day 1', desc: 'We learn your business, target audience, and campaign goals' },
      { step: 'Keyword Research', time: 'Days 1-3', desc: 'We research keywords, analyze competitors, and build campaign structure' },
      { step: 'Account Setup', time: 'Days 3-5', desc: 'We set up campaigns, write ads, configure tracking' },
      { step: 'Landing Page Audit', time: 'Days 4-5', desc: 'We audit landing pages and provide optimization recommendations' },
      { step: 'Testing & QA', time: 'Days 6-7', desc: 'We test all tracking, conversion paths, and ad approvals' },
      { step: 'Launch & Optimize', time: 'Days 7-10', desc: 'Campaigns go live, we begin daily monitoring and weekly optimization' },
    ],
  },
  outcomes: {
    title: 'Typical <gradient>performance improvements</gradient>',
    subtitle: 'Average results within 90 days',
    metrics: [
      { metric: 'Cost Per Lead Reduction', value: '-40 to -60%', baseline: 'vs. pre-management' },
      { metric: 'Conversion Rate', value: '8-12%', baseline: 'Industry avg: 3-5%' },
      { metric: 'Return on Ad Spend', value: '3-5x', baseline: '$3-5 revenue per $1 spent' },
      { metric: 'Quality Score', value: '7-9/10', baseline: 'Lower costs, better placement' },
    ],
    disclaimer: '* Results vary based on industry, competition, and budget. Minimum $1,500/mo ad spend recommended.',
  },
  pricing: {
    tiers: [
      {
        name: 'Setup',
        price: '$997',
        description: 'One-time campaign setup',
        features: [
          'Account setup',
          'Keyword research',
          'Ad copywriting',
          'Conversion tracking',
          'Landing page audit',
        ],
      },
      {
        name: 'Management',
        price: '$597/mo',
        description: 'Monthly management + ad spend',
        features: [
          'Weekly optimization',
          'Bid management',
          'A/B testing',
          'Monthly reports',
          'Strategy calls',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'High-volume or multi-location campaigns',
        features: [
          'Dedicated account manager',
          'Advanced targeting',
          'Display + YouTube ads',
          'Priority support',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'What is the minimum ad budget required?',
      answer: 'We recommend a minimum of $1,500/month in ad spend for single-location businesses. This allows enough data to optimize effectively. High-competition industries (legal, medical, real estate) may need $3,000-5,000/month for meaningful volume.',
    },
    {
      question: 'How quickly can I start seeing leads?',
      answer: 'Campaigns go live within 7-10 days. You can start seeing leads immediately after launch. Optimization takes 30-60 days as we gather data and refine targeting, ad copy, and bidding strategy.',
    },
    {
      question: 'How is the $597/mo management fee structured?',
      answer: 'The $597/mo covers campaign management, weekly optimization, monthly reporting, and strategy calls. Ad spend is separate and goes directly to Google. Total cost = $597 + your ad budget.',
    },
    {
      question: 'Do I own the Google Ads account?',
      answer: 'Yes. We set up the account under your Google account so you own it. You have full access at all times. If you cancel, you keep the account and all historical data.',
    },
    {
      question: 'How do you track ROI?',
      answer: 'We set up conversion tracking via Google Analytics and Google Ads. This tracks form submissions, phone calls (with call tracking integration), and other conversion events. Monthly reports show cost-per-lead, ROAS, and lead quality.',
    },
    {
      question: 'What if my landing page needs work?',
      answer: 'We provide a landing page audit with recommendations as part of setup. If your page needs significant optimization, we can design and build a conversion-optimized landing page for an additional fee ($800-1,500 depending on complexity).',
    },
    {
      question: 'How often do you optimize campaigns?',
      answer: 'We monitor performance daily and make optimization changes weekly. This includes: bid adjustments, budget reallocation, negative keyword additions, ad copy testing, and audience refinements.',
    },
    {
      question: 'Can you run ads for local businesses?',
      answer: 'Yes. We specialize in local service ads and location-based targeting. We can target specific zip codes, cities, or radiuses around your location to ensure you only pay for local leads.',
    },
    {
      question: 'What is a good cost-per-lead for my industry?',
      answer: 'Varies widely by industry. Home services (HVAC, plumbing): $30-80. Legal: $100-300. Real estate: $20-60. Medical/dental: $50-150. We provide industry benchmarks during our strategy call.',
    },
    {
      question: 'Can I pause or cancel anytime?',
      answer: 'Yes. Management is month-to-month after the initial setup. You can pause or cancel with 30 days notice. Ad spend can be paused instantly at any time.',
    },
  ],
  resources: [
    {
      title: 'Google Ads Budgeting Guide',
      description: 'How to calculate the right ad budget based on your goals and industry benchmarks.',
      category: 'Guide',
    },
    {
      title: 'Landing Page Optimization Checklist',
      description: 'The 23-point checklist for high-converting landing pages that maximize ad ROI.',
      category: 'Checklist',
    },
    {
      title: 'Keyword Research Template',
      description: 'Our exact keyword research template for finding high-intent, low-cost search terms.',
      category: 'Template',
    },
  ],
  relatedServices: [
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
    { name: 'Local SEO', path: '/services/local-seo', icon: Target },
    { name: 'Analytics Dashboards', path: '/services/analytics-dashboards', icon: BarChart3 },
  ],
  finalCTA: {
    headline: 'Ready to <gradient>start generating leads</gradient> this week?',
    description: 'Book a call to discuss your Google Ads strategy and see how we can drive qualified leads at a profitable cost-per-acquisition.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
