import { ServiceConfig } from './types';
import { Search, Target, TrendingUp, BarChart3, Globe, MapPin, Star } from 'lucide-react';

export const localSEOConfig: ServiceConfig = {
  slug: 'local-seo',
  colors: { primary: 'cyan', secondary: 'emerald' },
  icon: Search,
  hero: {
    serviceName: 'Local SEO + On-Page SEO',
    badge: 'Popular',
    headline: 'Rank higher in local search and <gradient>drive sustainable organic traffic</gradient>',
    description: 'Strategic local SEO that gets you found when customers search for your services. On-page optimization, local citations, content strategy, and performance tracking—all managed for you.',
    subDescription: 'Stop paying for every click. Build sustainable organic visibility that generates leads month after month.',
    trustChips: ['6-month minimum', 'Monthly reporting', 'On-page optimization', 'Local citations'],
    whatYouGet: [
      'Complete local SEO audit and strategy',
      'On-page optimization (titles, meta, schema)',
      'Local citation building and management',
      'Monthly content creation and optimization',
      'Performance tracking and reporting',
    ],
    ctas: {
      primary: { text: 'Book a Call', link: '/book-call' },
      secondary: { text: 'View Case Studies', link: '/case-studies' },
    },
  },
  featuredCase: {
    clientName: 'Ridgeway Law Firm',
    industry: 'Legal Services',
    location: 'Dallas, TX',
    websitePreview: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBmaXJtJTIwb2ZmaWNlfGVufDB8fHx8MTc2NjcyMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Organic Traffic', value: '+287%', delta: 'Month 6 vs baseline' },
      { label: 'Top 3 Rankings', value: '24 keywords', delta: '+21 new' },
      { label: 'Organic Leads', value: '67/mo', delta: '+312%' },
      { label: 'Featured Snippets', value: '8', delta: 'Position zero' },
    ],
    summary: 'Comprehensive local SEO strategy increased organic traffic by 287% and captured 24 top-3 rankings within 6 months.',
  },
  logoStrip: {
    title: 'Trusted by local businesses',
    logos: ['Ridgeway Law', 'Summit Dental', 'Apex Plumbing', 'Verde Landscaping', 'Precision Auto'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Strategic Approach', icon: Target },
      headline: 'SEO strategy built on <gradient>data, not guesswork</gradient>',
      description: 'We start with comprehensive keyword research, competitor analysis, and technical audit to identify quick wins and long-term opportunities. Every optimization is backed by search volume data and conversion potential.',
      bullets: [
        'Keyword research focused on buyer intent',
        'Competitor gap analysis to find opportunities',
        'Technical SEO audit and fixes',
        'Content strategy aligned with search demand',
        'Monthly performance tracking and optimization',
      ],
      panel: {
        title: 'Our SEO Framework',
        items: [
          { label: 'Audit', description: 'Technical SEO audit, keyword research, competitor analysis' },
          { label: 'Optimize', description: 'On-page SEO, schema markup, local citations' },
          { label: 'Content', description: 'Monthly content creation optimized for target keywords' },
          { label: 'Track', description: 'Rankings, traffic, leads tracked monthly' },
        ],
      },
    },
    {
      badge: { text: 'Long-Term Growth', icon: TrendingUp },
      headline: '<gradient>Sustainable traffic</gradient> that compounds over time',
      description: 'Paid ads stop when you stop paying. SEO builds compounding value—rankings improve month over month, driving more traffic without increasing spend. By month 6, most clients see 200-400% increases in organic leads.',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete local SEO management',
    core: [
      'Monthly keyword research and strategy',
      'On-page SEO optimization (titles, meta, headings)',
      'Schema markup implementation',
      'Local citation building (50+ directories)',
      'Citation monitoring and cleanup',
      'Monthly content creation (blog posts, service pages)',
      'Internal linking strategy',
      'Image optimization and alt text',
      'Mobile and page speed optimization',
      'Monthly performance reports',
      'Ranking tracking (50+ keywords)',
      'Competitor monitoring',
    ],
    optionalUpgrades: [
      'Advanced content writing (2-4 posts/month)',
      'Link building outreach campaigns',
      'Video SEO optimization',
      'Multi-location SEO management',
      'Review generation for SEO signals',
    ],
  },
  process: {
    subtitle: 'From audit to rankings in 90 days',
    steps: [
      { step: 'Audit & Strategy', time: 'Month 1', desc: 'Comprehensive SEO audit, keyword research, and 6-month roadmap' },
      { step: 'Foundation', time: 'Month 1-2', desc: 'On-page optimization, schema setup, citation building' },
      { step: 'Content Launch', time: 'Month 2-3', desc: 'Optimized content creation and publishing begins' },
      { step: 'Optimization', time: 'Month 3-4', desc: 'Internal linking, technical fixes, image optimization' },
      { step: 'Scale & Iterate', time: 'Month 4-6', desc: 'Double down on what is working, expand keyword targeting' },
      { step: 'Continuous Growth', time: 'Month 6+', desc: 'Monthly content, optimization, and performance tracking' },
    ],
  },
  outcomes: {
    title: 'Typical <gradient>performance improvements</gradient>',
    subtitle: 'Average results within 6 months',
    metrics: [
      { metric: 'Organic Traffic Increase', value: '+250-350%', baseline: 'Month 6 vs baseline' },
      { metric: 'Top 3 Rankings', value: '15-25', baseline: 'Target keywords' },
      { metric: 'Organic Lead Growth', value: '+200-400%', baseline: 'vs. pre-SEO' },
      { metric: 'Featured Snippets', value: '5-10', baseline: 'Position zero wins' },
    ],
    disclaimer: '* SEO results take 3-6 months. Performance varies by competition and market.',
  },
  pricing: {
    tiers: [
      {
        name: 'Local SEO',
        price: '$497/mo',
        description: '6-month minimum commitment',
        features: [
          'Monthly keyword research',
          'On-page optimization',
          'Local citations',
          '2 blog posts per month',
          'Monthly reporting',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'SEO + Content',
        price: '$797/mo',
        description: 'Accelerated growth package',
        features: [
          'Everything in Local SEO',
          '4 blog posts per month',
          'Link building outreach',
          'Advanced reporting',
        ],
      },
      {
        name: 'Enterprise SEO',
        price: 'Custom',
        description: 'Multi-location or high-competition markets',
        features: [
          'Custom strategy',
          'Unlimited content',
          'Dedicated SEO manager',
          'Priority support',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'How long does SEO take to show results?',
      answer: 'Typical timeline: 30-60 days for technical improvements to be indexed, 60-90 days for initial ranking improvements, 90-180 days for significant traffic growth. SEO is a long-term strategy—results compound over time.',
    },
    {
      question: 'Why is there a 6-month minimum?',
      answer: 'SEO takes 3-6 months to show meaningful results. A 6-month commitment ensures we have enough time to execute the strategy, measure results, and optimize. Clients who commit for 6+ months see 3-5x better ROI.',
    },
    {
      question: 'What is included in local citations?',
      answer: 'We build and manage your business listings on 50+ directories including Google Business Profile, Bing Places, Yelp, YellowPages, industry-specific directories, and local chambers of commerce. This improves local search visibility.',
    },
    {
      question: 'Do you guarantee rankings?',
      answer: 'No one can guarantee specific rankings—Google\'s algorithm is constantly changing. We guarantee effort, strategy, and transparent reporting. Based on our track record, 90% of clients see top-3 rankings for target keywords within 6 months.',
    },
    {
      question: 'How do you measure success?',
      answer: 'We track: organic traffic, keyword rankings (top 3, top 10, top 20), leads from organic search, and conversions. Monthly reports show progress on all metrics with year-over-year comparisons.',
    },
    {
      question: 'What if I already have a website?',
      answer: 'Perfect. We audit your existing site, identify technical issues, optimize existing pages, and add new optimized content. We work with any platform (WordPress, Webflow, custom, etc.).',
    },
    {
      question: 'Can I cancel after 6 months?',
      answer: 'Yes, it is month-to-month after the initial 6-month commitment. Most clients stay for 12-24+ months because SEO results compound—month 12 is significantly better than month 6.',
    },
    {
      question: 'Do I own the content you create?',
      answer: 'Yes. All blog posts, page content, and optimizations are yours. If you cancel, you keep everything we have created.',
    },
    {
      question: 'How is this different from doing SEO myself?',
      answer: 'SEO requires expertise in keyword research, technical optimization, content strategy, and link building. Plus, it is time-intensive. We handle all of it so you can focus on running your business. Most DIY SEO efforts fail due to lack of consistency.',
    },
    {
      question: 'What happens after 6 months?',
      answer: 'We continue optimizing and creating content. SEO is ongoing—your competitors are also doing SEO, so standing still means falling behind. We continuously identify new keyword opportunities and optimize existing content to maintain and improve rankings.',
    },
  ],
  resources: [
    {
      title: 'Local SEO Checklist 2025',
      description: 'The 47-point checklist we use to audit and optimize every local business website.',
      category: 'Checklist',
    },
    {
      title: 'Keyword Research for Local Businesses',
      description: 'How to find high-intent, low-competition keywords that drive leads.',
      category: 'Guide',
    },
    {
      title: 'SEO ROI Calculator',
      description: 'Estimate the value of ranking for your target keywords based on search volume and conversion rate.',
      category: 'Tool',
    },
  ],
  relatedServices: [
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
    { name: 'Google Business Profile', path: '/services/google-business-profile', icon: MapPin },
    { name: 'Analytics Dashboards', path: '/services/analytics-dashboards', icon: BarChart3 },
  ],
  finalCTA: {
    headline: 'Ready to <gradient>dominate local search</gradient>?',
    description: 'Book a call to discuss your SEO strategy and see how we can 3x your organic traffic in 6 months.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
