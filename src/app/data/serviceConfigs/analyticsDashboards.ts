import { ServiceConfig } from './types';
import { BarChart3, TrendingUp, Target, Zap, Globe, Search, Megaphone } from 'lucide-react';

export const analyticsDashboardsConfig: ServiceConfig = {
  slug: 'analytics-dashboards',
  colors: { primary: 'violet', secondary: 'cyan' },
  icon: BarChart3,
  hero: {
    serviceName: 'Analytics + Reporting Dashboards',
    badge: 'Recommended',
    headline: 'Track every metric and <gradient>optimize based on real data</gradient>',
    description: 'Custom analytics dashboards that consolidate all your marketing data into one view. See what is working, what is not, and where to invest for maximum ROI.',
    subDescription: 'Stop guessing. Start measuring. Make data-driven decisions with real-time insights.',
    trustChips: ['48-hour setup', 'Real-time data', 'Custom dashboards', 'Multi-source integration'],
    whatYouGet: [
      'Custom-built analytics dashboard',
      'Integration with Google Analytics, Ads, GBP, CRM',
      'Real-time reporting and KPI tracking',
      'Automated monthly reports',
      'Training on dashboard usage',
    ],
    ctas: {
      primary: { text: 'Book a Call', link: '/book-call' },
      secondary: { text: 'View Case Studies', link: '/case-studies' },
    },
  },
  featuredCase: {
    clientName: 'Summit Realty Group',
    industry: 'Real Estate',
    location: 'Denver, CO',
    websitePreview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY2NzIwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Data Sources Unified', value: '7', delta: 'All in one view' },
      { label: 'Decision Speed', value: '+450%', delta: 'Real-time visibility' },
      { label: 'ROI Visibility', value: '100%', delta: 'Track every dollar' },
      { label: 'Time Saved', value: '12 hrs/mo', delta: 'No manual reports' },
    ],
    summary: 'Custom dashboard unified 7 data sources into one real-time view, saving 12 hours per month on manual reporting while providing instant ROI visibility.',
  },
  logoStrip: {
    title: 'Trusted by data-driven businesses',
    logos: ['Summit Realty', 'Elite Law Group', 'Precision HVAC', 'Apex Dental', 'Verde Landscaping'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Unified Data', icon: Target },
      headline: 'All your marketing data <gradient>in one place</gradient>',
      description: 'We integrate Google Analytics, Google Ads, Search Console, GBP, your CRM, and more into a single, real-time dashboard. No more logging into 5 different platforms to see how your marketing is performing.',
      bullets: [
        'Google Analytics 4 (traffic, conversions, behavior)',
        'Google Ads (spend, clicks, cost-per-lead)',
        'Google Business Profile (views, calls, directions)',
        'Search Console (rankings, impressions, clicks)',
        'CRM data (leads, pipeline, closed deals)',
      ],
      panel: {
        title: 'Data Sources We Integrate',
        items: [
          { label: 'Google Analytics', description: 'Traffic, conversions, user behavior' },
          { label: 'Google Ads', description: 'Campaign performance, ROI, cost-per-lead' },
          { label: 'GBP Insights', description: 'Profile views, calls, direction requests' },
          { label: 'Search Console', description: 'SEO rankings, impressions, click-through rate' },
          { label: 'CRM', description: 'Lead volume, pipeline value, conversion rates', icon: Target },
        ],
      },
    },
    {
      badge: { text: 'Real-Time Insights', icon: Zap },
      headline: '<gradient>Stop waiting</gradient> for monthly reports',
      description: 'Traditional reporting is backward-looking. Our dashboards update in real-time, showing you what is happening right now so you can make faster, smarter decisions.',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete dashboard setup and training',
    core: [
      'Custom dashboard design based on your KPIs',
      'Google Analytics 4 integration',
      'Google Ads integration',
      'Google Business Profile integration',
      'Search Console integration',
      'CRM integration (HubSpot, Salesforce, etc.)',
      'Real-time data syncing',
      'Custom KPI widgets and visualizations',
      'Automated email reports (weekly/monthly)',
      'Mobile-responsive dashboard',
      'User access and permissions setup',
      'Training session on dashboard usage',
    ],
    optionalUpgrades: [
      'Social media integration (Facebook, Instagram, LinkedIn)',
      'Call tracking integration',
      'E-commerce platform integration (Shopify, WooCommerce)',
      'Advanced custom reporting and alerts',
      'White-label dashboard for client reporting',
    ],
  },
  process: {
    subtitle: 'From kickoff to live dashboards in 48 hours',
    steps: [
      { step: 'Discovery Call', time: 'Day 1', desc: 'We learn your business, KPIs, and data sources to integrate' },
      { step: 'Dashboard Design', time: 'Days 1-2', desc: 'We design custom dashboard layout with widgets for your key metrics' },
      { step: 'Data Integration', time: 'Day 2', desc: 'We connect all data sources and configure real-time syncing' },
      { step: 'Testing & QA', time: 'Day 3', desc: 'We verify all data is flowing correctly and widgets are accurate' },
      { step: 'Training & Launch', time: 'Day 3', desc: 'We train your team and give you full access to the live dashboard' },
      { step: 'Ongoing Support', time: 'Monthly', desc: 'We monitor data accuracy and provide ongoing optimization' },
    ],
  },
  outcomes: {
    title: 'Typical <gradient>improvements</gradient> with dashboards',
    subtitle: 'What our clients report after implementing dashboards',
    metrics: [
      { metric: 'Time Saved on Reporting', value: '10-15 hrs/mo', baseline: 'No manual reports needed' },
      { metric: 'Decision Speed', value: '+300-500%', baseline: 'Real-time vs. monthly' },
      { metric: 'Marketing ROI Visibility', value: '100%', baseline: 'Track every dollar' },
      { metric: 'Data Accuracy', value: '+95%', baseline: 'vs. manual spreadsheets' },
    ],
    disclaimer: '* Dashboards provide visibility into performance but do not directly generate leads. Value comes from faster, data-driven decision-making.',
  },
  pricing: {
    tiers: [
      {
        name: 'Setup',
        price: '$997',
        description: 'One-time dashboard setup',
        features: [
          'Custom dashboard design',
          'Up to 5 data source integrations',
          'Training session',
          'Mobile-optimized',
        ],
      },
      {
        name: 'Hosting + Support',
        price: '$97/mo',
        description: 'Dashboard hosting and maintenance',
        features: [
          'Real-time data syncing',
          'Automated monthly reports',
          'Data accuracy monitoring',
          'Support and updates',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Advanced dashboards for agencies or multi-location',
        features: [
          'Unlimited data sources',
          'White-label dashboards',
          'Advanced custom widgets',
          'Priority support',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'What is an analytics dashboard?',
      answer: 'An analytics dashboard is a centralized view that pulls data from multiple sources (Google Analytics, Ads, CRM, etc.) into one interface. Instead of logging into 5 different platforms, you see all your key metrics in one place, updated in real-time.',
    },
    {
      question: 'How quickly can this be set up?',
      answer: 'Setup takes 48-72 hours including discovery call, dashboard design, data integration, testing, and training. You get access to your live dashboard within 3 days of kickoff.',
    },
    {
      question: 'What platforms do you integrate with?',
      answer: 'We integrate with Google Analytics 4, Google Ads, Google Business Profile, Google Search Console, HubSpot, Salesforce, Zoho, call tracking platforms, social media, and more. If it has an API or export, we can integrate it.',
    },
    {
      question: 'Can I access the dashboard on mobile?',
      answer: 'Yes. All dashboards are mobile-responsive so you can check performance from your phone or tablet. We also offer optional mobile app integrations.',
    },
    {
      question: 'Do I need to know how to read data?',
      answer: 'No technical skills required. We design dashboards with clear visualizations, plain-English labels, and color-coded indicators (green = good, red = needs attention). We also provide training on how to interpret the data.',
    },
    {
      question: 'Can I share the dashboard with my team?',
      answer: 'Yes. We set up user access and permissions so you can share dashboards with team members, investors, or clients. You control who sees what.',
    },
    {
      question: 'What if I need changes to the dashboard later?',
      answer: 'Minor changes (adding a widget, adjusting layout) are included in the $97/mo. Major redesigns or new data source integrations are quoted separately ($200-500 depending on complexity).',
    },
    {
      question: 'How is this different from Google Analytics?',
      answer: 'Google Analytics only shows website traffic data. Our dashboards combine GA4 with Google Ads, GBP, Search Console, CRM, and other sources to show the full marketing picture—from impression to closed deal.',
    },
    {
      question: 'Can I export data from the dashboard?',
      answer: 'Yes. You can export data to CSV/Excel, PDF reports, or connect directly to Google Sheets for further analysis. Automated email reports are also available.',
    },
    {
      question: 'What happens if a data source changes its API?',
      answer: 'We monitor all integrations for issues. If an API changes and breaks integration, we fix it as part of the $97/mo maintenance fee at no extra cost.',
    },
  ],
  resources: [
    {
      title: 'KPI Selection Guide',
      description: 'How to choose the right KPIs to track for your business model and marketing goals.',
      category: 'Guide',
    },
    {
      title: 'Dashboard Design Best Practices',
      description: 'How to structure dashboards for clarity, usability, and fast decision-making.',
      category: 'Article',
    },
    {
      title: 'Marketing Attribution Models Explained',
      description: 'First-touch vs. last-touch vs. multi-touch attribution and when to use each.',
      category: 'Guide',
    },
  ],
  relatedServices: [
    { name: 'Google Ads', path: '/services/google-ads', icon: Megaphone },
    { name: 'Local SEO', path: '/services/local-seo', icon: Search },
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
  ],
  finalCTA: {
    headline: 'Ready to <gradient>see your data clearly</gradient>?',
    description: 'Book a call to discuss your analytics needs and see example dashboards tailored to your industry.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
