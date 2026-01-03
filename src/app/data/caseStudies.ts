export interface KPI {
  label: string;
  value: string;
  delta?: string; // e.g., "+125%", "+$2.4k"
  trend?: 'up' | 'down' | 'neutral';
}

export interface TimelineItem {
  week: string;
  actions: string[];
}

export interface Testimonial {
  name: string;
  title: string;
  text: string;
  image?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  previous?: number;
}

export interface CaseStudy {
  slug: string;
  clientName: string;
  industry: string;
  location: string;
  services: string[];
  websitePreviewImages: {
    desktop: string;
    mobile?: string;
    thumbnail: string;
  };
  kpis: KPI[];
  summaryHeadline: string;
  challenge: string;
  strategy: string;
  buildDeliverables: string[];
  resultsNarrative: string;
  chartsData: {
    conversions?: ChartDataPoint[];
    traffic?: ChartDataPoint[];
    revenue?: ChartDataPoint[];
  };
  testimonial: Testimonial;
  timeline: TimelineItem[];
  tools: string[];
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'summit-realty-growth',
    clientName: 'Summit Realty Group',
    industry: 'Real Estate',
    location: 'Denver, CO',
    services: ['Website Build', 'SEO', 'Local Ads', 'Analytics'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      mobile: 'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/flagged/photo-1558954157-aa76c0d246c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwd2Vic2l0ZSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    kpis: [
      { label: 'Direction Requests', value: '842/mo', delta: '+247%', trend: 'up' },
      { label: 'Form Leads', value: '156/mo', delta: '+189%', trend: 'up' },
      { label: 'Phone Calls', value: '93/mo', delta: '+312%', trend: 'up' },
      { label: 'Cost Per Lead', value: '$18.40', delta: '-67%', trend: 'up' },
      { label: 'Conversion Rate', value: '8.2%', delta: '+4.1%', trend: 'up' },
      { label: 'Google Reviews', value: '127', delta: '+89', trend: 'up' },
    ],
    summaryHeadline: 'Turned a static brochure site into a lead-generating asset that drives 842 direction requests per month',
    challenge: 'Summit Realty had a beautiful but non-converting website. Traffic was high from brand searches, but visitors bounced. No clear CTA paths, slow mobile performance (4.2s load time), and zero tracking meant they had no idea which marketing efforts were working. They were spending $12k/month on Google Ads with a $56 CPL.',
    strategy: 'We rebuilt their site from scratch with conversion architecture: hero CTAs above the fold, persistent contact modules, neighborhood landing pages for SEO, mobile-first design (under 1.8s load time), and integrated Google Analytics 4 + call tracking. Then we optimized their Local Service Ads and launched targeted search campaigns.',
    buildDeliverables: [
      'Conversion-optimized website (15 pages)',
      'Neighborhood landing pages (12 high-value areas)',
      'IDX property search integration',
      'Google Analytics 4 + goal tracking',
      'Call tracking system',
      'Local Service Ads setup + optimization',
      'Google Ads account restructure',
      'Monthly performance dashboard',
    ],
    resultsNarrative: 'Within 90 days, Summit Realty saw a 247% increase in direction requests and a 189% jump in form submissions. Cost per lead dropped from $56 to $18.40. The site now converts at 8.2% (industry avg: 2.1%). They have since scaled their ad spend to $18k/month while maintaining profitability.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 62, previous: 52 },
        { name: 'Month 2', value: 118, previous: 58 },
        { name: 'Month 3', value: 156, previous: 61 },
        { name: 'Month 4', value: 189, previous: 59 },
        { name: 'Month 5', value: 203, previous: 64 },
        { name: 'Month 6', value: 218, previous: 67 },
      ],
      traffic: [
        { name: 'Month 1', value: 1840, previous: 1620 },
        { name: 'Month 2', value: 2280, previous: 1710 },
        { name: 'Month 3', value: 2640, previous: 1890 },
        { name: 'Month 4', value: 3120, previous: 1950 },
        { name: 'Month 5', value: 3480, previous: 2040 },
        { name: 'Month 6', value: 3820, previous: 2180 },
      ],
    },
    testimonial: {
      name: 'Michael Chen',
      title: 'Owner, Summit Realty Group',
      text: "Satori turned our website from a digital business card into our #1 lead source. We went from guessing what works to knowing exactly where every lead comes from. Best ROI we have ever seen.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Analytics audit & goal setup',
          'Competitor research',
          'Conversion architecture plan',
          'Content gathering',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Neighborhood landing pages',
          'IDX integration',
          'Mobile optimization',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Call tracking implementation',
          'GA4 configuration',
          'Site launch & testing',
          'Google Ads account restructure',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Local Service Ads optimization',
          'Campaign performance monitoring',
          'A/B testing CTAs',
          'Monthly reporting & scaling',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Google Analytics 4', 'CallRail', 'Google Ads', 'Local Service Ads'],
    featured: true,
  },
  {
    slug: 'ironclad-fitness-transformation',
    clientName: 'IronClad Fitness',
    industry: 'Health & Fitness',
    location: 'Austin, TX',
    services: ['Website Build', 'Booking System', 'Paid Social', 'Email Automation'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1551763337-e05b91996d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd2Vic2l0ZSUyMGFwcHxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1551763337-e05b91996d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd2Vic2l0ZSUyMGFwcHxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1551763337-e05b91996d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd2Vic2l0ZSUyMGFwcHxlbnwxfHx8fDE3NjY3MTY5NjN8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    kpis: [
      { label: 'Online Bookings', value: '387/mo', delta: '+421%', trend: 'up' },
      { label: 'Trial Sign-ups', value: '124/mo', delta: '+276%', trend: 'up' },
      { label: 'Membership Conversions', value: '64/mo', delta: '+183%', trend: 'up' },
      { label: 'Cost Per Booking', value: '$12.80', delta: '-58%', trend: 'up' },
      { label: 'Email Open Rate', value: '42.3%', delta: '+18.2%', trend: 'up' },
    ],
    summaryHeadline: 'Built an automated booking system that handles 387 monthly bookings while the owner sleeps',
    challenge: 'IronClad was taking bookings through Instagram DMs and Google Forms—a manual nightmare. They had no email list, no automated follow-up, and no way to track which marketing channels were working. Show rate was 61% because there were no reminders. Monthly revenue was capped by the owner\'s availability to respond to inquiries.',
    strategy: 'We built a custom website with integrated class booking, automated email sequences (welcome, reminder, win-back), and connected Facebook/Instagram Ads to drive trial sign-ups. Implemented conversion tracking across the entire funnel from ad click → trial → paid membership.',
    buildDeliverables: [
      'Booking-optimized website with class schedule',
      'Integrated booking system (Calendly + Zapier)',
      'Email automation workflows (5 sequences)',
      'Facebook Ads account setup',
      'Instagram Ads creative + targeting',
      'Conversion pixel tracking',
      'Member dashboard (login portal)',
      'Automated SMS reminders',
    ],
    resultsNarrative: 'IronClad went from manual chaos to a self-operating booking machine. Show rate jumped to 89% with automated reminders. 64 new paid memberships per month (previous: 22). The owner now focuses on coaching instead of admin work. Email list grew from 0 to 2,847 engaged subscribers in 6 months.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 89, previous: 74 },
        { name: 'Month 2', value: 167, previous: 81 },
        { name: 'Month 3', value: 243, previous: 78 },
        { name: 'Month 4', value: 312, previous: 85 },
        { name: 'Month 5', value: 361, previous: 79 },
        { name: 'Month 6', value: 387, previous: 83 },
      ],
    },
    testimonial: {
      name: 'Sarah Martinez',
      title: 'Owner, IronClad Fitness',
      text: "I went from spending 3 hours a day on booking admin to zero. The system just works. I am getting trial sign-ups at 2am while I am asleep. Game changer.",
    },
    timeline: [
      {
        week: 'Week 1',
        actions: [
          'Business process mapping',
          'Booking flow design',
          'Email sequence planning',
        ],
      },
      {
        week: 'Week 2-3',
        actions: [
          'Website build + booking integration',
          'Email automation setup',
          'SMS reminder system',
        ],
      },
      {
        week: 'Week 4-5',
        actions: [
          'Facebook/Instagram Ads account setup',
          'Creative testing (10 variations)',
          'Conversion tracking implementation',
        ],
      },
      {
        week: 'Week 6-12',
        actions: [
          'Campaign optimization',
          'A/B testing landing pages',
          'Email sequence refinement',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Calendly', 'Zapier', 'Mailchimp', 'Facebook Ads', 'Twilio'],
    featured: true,
  },
  {
    slug: 'urban-bites-delivery-growth',
    clientName: 'Urban Bites',
    industry: 'Restaurant',
    location: 'Portland, OR',
    services: ['Website Build', 'Online Ordering', 'Google Ads', 'SEO'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMG1lbnV8ZW58MXx8fHwxNzY2NzE2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMG1lbnV8ZW58MXx8fHwxNzY2NzE2OTYzfDA&ixlib=rb-4.1.0&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMG1lbnV8ZW58MXx8fHwxNzY2NzE2OTYzfDA&ixlib=rb-4.1.0&q=80&w=600',
    },
    kpis: [
      { label: 'Online Orders', value: '1,247/mo', delta: '+512%', trend: 'up' },
      { label: 'Monthly Revenue', value: '$84k', delta: '+$52k', trend: 'up' },
      { label: 'Avg Order Value', value: '$67.30', delta: '+23%', trend: 'up' },
      { label: 'Direction Requests', value: '623/mo', delta: '+156%', trend: 'up' },
      { label: 'Google Reviews', value: '234', delta: '+187', trend: 'up' },
    ],
    summaryHeadline: 'Cut third-party delivery fees by 67% and drove $84k in monthly direct online orders',
    challenge: 'Urban Bites was losing 30% of every order to DoorDash and Grubhub fees. They had a basic website with a PDF menu and a phone number. No online ordering, no email capture, no way to build direct customer relationships. Google searches for their restaurant name went to third-party apps, not their site.',
    strategy: 'Built a fast, mobile-first website with integrated online ordering (no commission fees). Optimized for "restaurant near me" and "[cuisine] in Portland" local search. Launched Google Ads targeting high-intent search terms. Implemented a loyalty program to encourage repeat direct orders.',
    buildDeliverables: [
      'Mobile-optimized restaurant website',
      'Integrated online ordering system',
      'Digital menu with dietary filters',
      'Loyalty program integration',
      'Google My Business optimization',
      'Local SEO (15 location-based pages)',
      'Google Ads campaign (search + display)',
      'Email marketing system',
    ],
    resultsNarrative: 'Urban Bites now processes 1,247 direct online orders per month, saving $25k in platform fees. Monthly revenue increased by $52k. Average order value is 23% higher on their site vs. third-party apps (upsells + no fee pressure). They have built an email list of 4,200+ customers and drive 31% of orders from repeat customers.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 243, previous: 204 },
        { name: 'Month 2', value: 478, previous: 198 },
        { name: 'Month 3', value: 687, previous: 215 },
        { name: 'Month 4', value: 894, previous: 203 },
        { name: 'Month 5', value: 1089, previous: 207 },
        { name: 'Month 6', value: 1247, previous: 209 },
      ],
      revenue: [
        { name: 'Month 1', value: 42, previous: 32 },
        { name: 'Month 2', value: 54, previous: 31 },
        { name: 'Month 3', value: 63, previous: 34 },
        { name: 'Month 4', value: 71, previous: 33 },
        { name: 'Month 5', value: 78, previous: 35 },
        { name: 'Month 6', value: 84, previous: 36 },
      ],
    },
    testimonial: {
      name: 'David Park',
      title: 'Owner, Urban Bites',
      text: 'We were hemorrhaging money on delivery platform fees. Now we own our customer relationships and keep the profits. This system paid for itself in the first month.',
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Menu digitization & photography',
          'Ordering system integration planning',
          'Local SEO keyword research',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Online ordering integration',
          'Payment gateway setup',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Google My Business optimization',
          'Local landing pages',
          'Google Ads campaign launch',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Campaign optimization',
          'Loyalty program rollout',
          'Email marketing sequences',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Square', 'Google Ads', 'Mailchimp', 'Yoast SEO'],
    featured: false,
  },
  {
    slug: 'luxe-living-ecommerce',
    clientName: 'Luxe Living',
    industry: 'E-commerce',
    location: 'San Francisco, CA',
    services: ['E-commerce Build', 'Conversion Optimization', 'Paid Search', 'Email Flows'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1642142785744-261a5f663d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGFnZXxlbnwxfHx8fDE3NjY3MTY5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1642142785744-261a5f663d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGFnZXxlbnwxfHx8fDE3NjY3MTY5NjR8MA&ixlib=rb-4.1.0&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1642142785744-261a5f663d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGFnZXxlbnwxfHx8fDE3NjY3MTY5NjR8MA&ixlib=rb-4.1.0&q=80&w=600',
    },
    kpis: [
      { label: 'Conversion Rate', value: '4.8%', delta: '+2.9%', trend: 'up' },
      { label: 'Avg Order Value', value: '$243', delta: '+$87', trend: 'up' },
      { label: 'Monthly Revenue', value: '$127k', delta: '+$89k', trend: 'up' },
      { label: 'Cart Abandonment', value: '42%', delta: '-31%', trend: 'up' },
      { label: 'Email Revenue', value: '$34k/mo', delta: '+$29k', trend: 'up' },
    ],
    summaryHeadline: 'Rebuilt checkout flow and added abandoned cart recovery to increase revenue by $89k per month',
    challenge: 'Luxe Living had a clunky Shopify theme with a 73% cart abandonment rate. Checkout took 7 steps. No abandoned cart emails, no post-purchase flows, no upsells. Product pages had low-quality images and no social proof. They were spending $15k/month on Google Shopping ads with a 1.9% conversion rate.',
    strategy: 'Complete UX overhaul focused on conversion: one-page checkout, trust badges, high-quality product photography, customer reviews, and smart upsells. Built abandoned cart email sequences (3 emails over 48 hours) and post-purchase flows. Optimized Google Shopping feed and restructured campaigns.',
    buildDeliverables: [
      'Shopify theme customization',
      'One-page checkout implementation',
      'Product page redesign (A/B tested)',
      'Abandoned cart email sequence (3 emails)',
      'Post-purchase email flows',
      'Google Shopping feed optimization',
      'Smart upsell/cross-sell system',
      'Customer review integration (Yotpo)',
    ],
    resultsNarrative: 'Conversion rate jumped from 1.9% to 4.8%. Average order value increased by $87 thanks to strategic upsells. Cart abandonment dropped to 42% (industry avg: 69%). Abandoned cart emails alone recover $18k/month. Monthly revenue grew from $38k to $127k in 5 months. Email marketing now drives $34k in monthly revenue.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 2.3, previous: 1.9 },
        { name: 'Month 2', value: 3.1, previous: 2.0 },
        { name: 'Month 3', value: 3.7, previous: 1.8 },
        { name: 'Month 4', value: 4.2, previous: 1.9 },
        { name: 'Month 5', value: 4.6, previous: 2.1 },
        { name: 'Month 6', value: 4.8, previous: 1.9 },
      ],
      revenue: [
        { name: 'Month 1', value: 52, previous: 38 },
        { name: 'Month 2', value: 67, previous: 41 },
        { name: 'Month 3', value: 84, previous: 39 },
        { name: 'Month 4', value: 103, previous: 37 },
        { name: 'Month 5', value: 116, previous: 40 },
        { name: 'Month 6', value: 127, previous: 38 },
      ],
    },
    testimonial: {
      name: 'Amanda Foster',
      title: 'Founder, Luxe Living',
      text: "The abandoned cart emails alone pay for the entire engagement. Our revenue has tripled, and we are finally profitable on our ad spend. Satori knows e-commerce.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'UX audit & heatmap analysis',
          'Checkout flow redesign',
          'A/B test planning',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Shopify customization',
          'Product page redesign',
          'Review system integration',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Email automation setup',
          'Abandoned cart sequences',
          'Google Shopping optimization',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'A/B testing (checkout, product pages)',
          'Campaign optimization',
          'Email flow refinement',
        ],
      },
    ],
    tools: ['Shopify', 'Klaviyo', 'Google Ads', 'Yotpo', 'Google Analytics', 'Hotjar'],
    featured: false,
  },
  {
    slug: 'apex-consulting-lead-gen',
    clientName: 'Apex Consulting',
    industry: 'B2B Services',
    location: 'Chicago, IL',
    services: ['Website Build', 'LinkedIn Ads', 'Lead Nurture', 'CRM Integration'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1583932692875-a42450d50acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2NjcxNjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1583932692875-a42450d50acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2NjcxNjk2Mnww&ixlib=rb-4.1.0&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583932692875-a42450d50acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2NjcxNjk2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    kpis: [
      { label: 'SQL (Sales Qualified Leads)', value: '47/mo', delta: '+289%', trend: 'up' },
      { label: 'Demo Bookings', value: '34/mo', delta: '+412%', trend: 'up' },
      { label: 'Cost Per SQL', value: '$184', delta: '-59%', trend: 'up' },
      { label: 'Demo Show Rate', value: '76%', delta: '+31%', trend: 'up' },
      { label: 'Pipeline Generated', value: '$420k/mo', delta: '+$312k', trend: 'up' },
    ],
    summaryHeadline: 'Built a B2B lead machine generating 47 sales-qualified leads per month at $184 each',
    challenge: 'Apex had a generic corporate website with no clear value proposition. Their contact form generated mostly spam and tire-kickers. No lead nurturing, no CRM tracking, and their sales team was cold calling. LinkedIn Ads sent traffic to the homepage with no dedicated landing pages. Sales cycle was 90+ days because leads weren\'t educated.',
    strategy: 'Complete messaging overhaul focused on pain points and outcomes. Built dedicated landing pages for each service line. Implemented lead scoring and multi-touch nurture sequences. Created gated case studies and whitepapers. Launched LinkedIn Ads targeting decision-makers at companies with 50-500 employees.',
    buildDeliverables: [
      'Authority-positioned website',
      'Service-specific landing pages (5)',
      'Gated content (3 case studies, 2 whitepapers)',
      'HubSpot CRM integration',
      'Lead scoring system',
      'Multi-touch email nurture (9 sequences)',
      'LinkedIn Ads campaign',
      'Demo booking automation (Calendly)',
    ],
    resultsNarrative: 'Apex now generates 47 sales-qualified leads per month (previous: 12). Demo bookings increased by 412%. Cost per SQL dropped from $449 to $184. Demo show rate is 76% thanks to automated reminders and nurture sequences. Sales cycle shortened to 42 days. Monthly pipeline generated: $420k.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 18, previous: 12 },
        { name: 'Month 2', value: 26, previous: 11 },
        { name: 'Month 3', value: 34, previous: 13 },
        { name: 'Month 4', value: 41, previous: 14 },
        { name: 'Month 5', value: 45, previous: 12 },
        { name: 'Month 6', value: 47, previous: 13 },
      ],
    },
    testimonial: {
      name: 'Robert Kim',
      title: 'VP of Sales, Apex Consulting',
      text: 'Our sales team used to spend 80% of their time prospecting. Now they spend 80% closing deals. The lead quality is night and day compared to what we were getting before.',
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Messaging workshop',
          'Competitor positioning analysis',
          'Lead scoring design',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website redesign',
          'Landing page builds',
          'Gated content creation',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'HubSpot integration',
          'Email nurture sequences',
          'LinkedIn Ads setup',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Campaign optimization',
          'Lead scoring refinement',
          'Sales enablement training',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'HubSpot', 'Calendly', 'LinkedIn Ads', 'Zapier'],
    featured: false,
  },
];

// Helper functions
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}

export function getCaseStudiesByIndustry(industry: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.industry.toLowerCase() === industry.toLowerCase());
}

export function getCaseStudiesByService(service: string): CaseStudy[] {
  return caseStudies.filter((cs) =>
    cs.services.some((s) => s.toLowerCase().includes(service.toLowerCase()))
  );
}

export function getAllIndustries(): string[] {
  return Array.from(new Set(caseStudies.map((cs) => cs.industry)));
}

export function getAllServices(): string[] {
  const servicesSet = new Set<string>();
  caseStudies.forEach((cs) => {
    cs.services.forEach((service) => servicesSet.add(service));
  });
  return Array.from(servicesSet);
}