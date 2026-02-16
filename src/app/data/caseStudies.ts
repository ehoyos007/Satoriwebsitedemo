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
    slug: 'proflow-plumbing-leads',
    clientName: 'ProFlow Plumbing',
    industry: 'Plumbing',
    location: 'Phoenix, AZ',
    services: ['Website Build', 'GBP Optimization', 'Review Screener', 'Google Ads'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    kpis: [
      { label: 'Phone Calls', value: '74/mo', delta: '+267%', trend: 'up' },
      { label: 'Form Leads', value: '38/mo', delta: '+192%', trend: 'up' },
      { label: 'Google Reviews', value: '187', delta: '+142', trend: 'up' },
      { label: 'Cost Per Lead', value: '$22', delta: '-61%', trend: 'up' },
      { label: 'GBP Views', value: '4,820/mo', delta: '+318%', trend: 'up' },
      { label: 'Avg Job Value', value: '$485', delta: '+$120', trend: 'up' },
    ],
    summaryHeadline: 'Took a word-of-mouth plumbing company from 20 calls a month to 74 with a website that actually converts',
    challenge: 'ProFlow had been in business for 11 years running entirely on referrals and a Google Business Profile with 45 reviews. No website. When homeowners searched "plumber near me" in Phoenix, they found competitors with professional sites and hundreds of reviews. ProFlow was leaving $15-20k/month on the table in lost emergency calls alone.',
    strategy: 'Built a conversion-focused website with click-to-call on every page, service area pages for 18 Phoenix neighborhoods, and emergency service prominently displayed. Optimized their Google Business Profile with updated photos, services, and posts. Deployed the Review Screener to systematically collect reviews after every job. Launched Google Ads targeting emergency and high-value plumbing keywords.',
    buildDeliverables: [
      'Conversion-optimized website (12 pages)',
      'Service area landing pages (18 neighborhoods)',
      'Click-to-call CTAs on every page',
      'Google Business Profile optimization',
      'Review Screener setup + automation',
      'Google Ads campaign (emergency + service keywords)',
      'Call tracking with source attribution',
      'Monthly analytics dashboard',
    ],
    resultsNarrative: 'Within 90 days, ProFlow went from 20 calls/month to 74. Google reviews climbed from 45 to 187, pushing them into the Local Pack for "plumber near me" searches. Cost per lead dropped from $57 to $22. The owner hired two additional plumbers to handle the volume. Monthly revenue increased by $18k.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 32, previous: 20 },
        { name: 'Month 2', value: 48, previous: 22 },
        { name: 'Month 3', value: 61, previous: 19 },
        { name: 'Month 4', value: 68, previous: 21 },
        { name: 'Month 5', value: 72, previous: 23 },
        { name: 'Month 6', value: 74, previous: 20 },
      ],
      traffic: [
        { name: 'Month 1', value: 820, previous: 340 },
        { name: 'Month 2', value: 1240, previous: 360 },
        { name: 'Month 3', value: 1680, previous: 380 },
        { name: 'Month 4', value: 2140, previous: 350 },
        { name: 'Month 5', value: 2580, previous: 370 },
        { name: 'Month 6', value: 2910, previous: 390 },
      ],
    },
    testimonial: {
      name: 'Ray Delgado',
      title: 'Owner, ProFlow Plumbing',
      text: "I ran this business for 11 years without a website. Satori built one and within three months I had to hire two guys to keep up. The review system alone is worth every penny. I went from 45 reviews to almost 200.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Business audit & competitor analysis',
          'Service area keyword research',
          'Google Business Profile audit',
          'Content gathering (photos, service list)',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Service area landing pages',
          'Mobile optimization & click-to-call',
          'GBP optimization + posts',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Review Screener deployment',
          'Google Ads campaign launch',
          'Call tracking setup',
          'Site launch & QA testing',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Ad campaign optimization',
          'Review velocity monitoring',
          'GBP post schedule',
          'Monthly performance reporting',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Google Ads', 'Google Business Profile', 'CallRail', 'Review Screener'],
    featured: true,
  },
  {
    slug: 'summit-hvac-growth',
    clientName: 'Summit Air HVAC',
    industry: 'HVAC',
    location: 'Charlotte, NC',
    services: ['Website Build', 'Local SEO', 'Google Ads', 'Analytics Dashboards'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    kpis: [
      { label: 'Monthly Leads', value: '112/mo', delta: '+340%', trend: 'up' },
      { label: 'Phone Calls', value: '83/mo', delta: '+276%', trend: 'up' },
      { label: 'Organic Traffic', value: '3,240/mo', delta: '+412%', trend: 'up' },
      { label: 'Cost Per Lead', value: '$31', delta: '-54%', trend: 'up' },
      { label: 'Revenue Growth', value: '+$27k/mo', delta: '+45%', trend: 'up' },
    ],
    summaryHeadline: 'Grew an HVAC company from 25 leads per month to 112 by dominating "AC repair Charlotte" searches',
    challenge: 'Summit Air was stuck on page 3 of Google for every keyword that mattered. Their 8-year-old website looked outdated, loaded in 5.1 seconds on mobile, and had no service area pages. They were spending $4k/month on Google Ads with no conversion tracking, so they had no idea which ads were working. Competitors with newer websites were eating their lunch.',
    strategy: 'Full website rebuild with fast-loading, mobile-first design. Created 22 service area pages targeting every suburb in the Charlotte metro. Built content around seasonal HVAC needs (AC tune-ups in spring, furnace prep in fall). Restructured Google Ads with proper conversion tracking and negative keywords. Deployed an analytics dashboard so the owner could see ROI in real time.',
    buildDeliverables: [
      'Mobile-first website (16 pages)',
      'Service area landing pages (22 suburbs)',
      'Seasonal content strategy (blog posts)',
      'Google Ads restructure + conversion tracking',
      'Local SEO technical optimization',
      'Analytics dashboard (real-time KPIs)',
      'Call tracking with source attribution',
      'Monthly SEO reporting',
    ],
    resultsNarrative: 'Summit Air jumped from page 3 to the top 3 for "AC repair Charlotte" and 14 other high-value keywords within 4 months. Organic traffic grew 412%. Google Ads cost per lead dropped from $67 to $31 by cutting wasted spend on irrelevant searches. The owner uses the analytics dashboard daily. Revenue increased $27k/month and they expanded into two new service areas.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 38, previous: 25 },
        { name: 'Month 2', value: 56, previous: 27 },
        { name: 'Month 3', value: 78, previous: 24 },
        { name: 'Month 4', value: 94, previous: 26 },
        { name: 'Month 5', value: 106, previous: 28 },
        { name: 'Month 6', value: 112, previous: 25 },
      ],
      traffic: [
        { name: 'Month 1', value: 1020, previous: 630 },
        { name: 'Month 2', value: 1480, previous: 650 },
        { name: 'Month 3', value: 2110, previous: 680 },
        { name: 'Month 4', value: 2640, previous: 640 },
        { name: 'Month 5', value: 3010, previous: 670 },
        { name: 'Month 6', value: 3240, previous: 660 },
      ],
    },
    testimonial: {
      name: 'Marcus Thompson',
      title: 'Owner, Summit Air HVAC',
      text: "Before Satori, I was paying for ads and hoping they worked. Now I can see exactly which calls came from Google, which came from organic search, and what every lead costs me. We added $27k in monthly revenue. That dashboard changed how I run my business.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'SEO audit & keyword research',
          'Competitor gap analysis',
          'Google Ads account audit',
          'Content strategy planning',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Service area page buildout',
          'Mobile performance optimization',
          'Google Ads restructure',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Analytics dashboard setup',
          'Call tracking implementation',
          'Site launch & indexing',
          'Local citation building',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Content publishing cadence',
          'Link building outreach',
          'Campaign optimization',
          'Monthly reporting & strategy calls',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Google Ads', 'Google Search Console', 'CallRail', 'Google Analytics 4'],
    featured: true,
  },
  {
    slug: 'brightstar-electrical-chatbot',
    clientName: 'BrightStar Electric',
    industry: 'Electrical',
    location: 'Dallas, TX',
    services: ['Website Build', 'GBP Optimization', 'AI Chat Bot', 'Review Screener'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    kpis: [
      { label: 'After-Hours Leads', value: '31/mo', delta: 'New', trend: 'up' },
      { label: 'Chat Conversations', value: '247/mo', delta: '+100%', trend: 'up' },
      { label: 'Phone Calls', value: '58/mo', delta: '+189%', trend: 'up' },
      { label: 'Google Reviews', value: '156', delta: '+118', trend: 'up' },
      { label: 'GBP Actions', value: '1,340/mo', delta: '+225%', trend: 'up' },
    ],
    summaryHeadline: 'Captured 31 after-hours leads per month with an AI chatbot that books emergency electrical jobs at 2am',
    challenge: 'BrightStar was a solid 6-person electrical crew, but they were losing every lead that came in after 5pm. The owner estimated 30-40% of emergency calls went to voicemail and never called back. Their website was a single page with a phone number. Google Business Profile had 38 reviews and incomplete information. They had zero online booking capability.',
    strategy: 'Built a professional website with emergency service messaging front and center. Deployed an AI chatbot that handles after-hours inquiries, qualifies the job (panel upgrade vs. outlet repair vs. emergency), and books appointments directly. Optimized their GBP with complete service categories, photos, and weekly posts. Set up automated review requests after every completed job.',
    buildDeliverables: [
      'Professional electrician website (10 pages)',
      'AI chatbot with job qualification logic',
      'After-hours lead capture automation',
      'Google Business Profile optimization',
      'Review Screener with SMS/email requests',
      'Online scheduling integration',
      'Service area pages (12 neighborhoods)',
      'Emergency service landing page',
    ],
    resultsNarrative: 'BrightStar now captures 31 leads per month that previously went to voicemail. The AI chatbot handles 247 conversations monthly, qualifying and routing them automatically. Google reviews jumped from 38 to 156, and they now appear in the Local Pack for "electrician near me" in Dallas. The owner says the chatbot paid for itself in the first week.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 28, previous: 20 },
        { name: 'Month 2', value: 41, previous: 19 },
        { name: 'Month 3', value: 52, previous: 21 },
        { name: 'Month 4', value: 56, previous: 18 },
        { name: 'Month 5', value: 57, previous: 22 },
        { name: 'Month 6', value: 58, previous: 20 },
      ],
    },
    testimonial: {
      name: 'Carlos Reyes',
      title: 'Owner, BrightStar Electric',
      text: "The chatbot is like having a dispatcher who never sleeps. We booked a $3,200 panel upgrade at 11pm on a Tuesday. That customer said they almost called someone else because nobody answered. Now nobody slips through the cracks.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Service catalog & pricing review',
          'Chatbot conversation flow design',
          'GBP audit & photo planning',
          'Competitor research',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'AI chatbot training & testing',
          'GBP optimization',
          'Review Screener setup',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Chatbot launch & monitoring',
          'Review request automation go-live',
          'Site launch & QA',
          'Staff training on new leads',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Chatbot conversation refinement',
          'Review velocity tracking',
          'GBP post schedule',
          'Performance reporting',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'AI Chat Bot', 'Google Business Profile', 'Review Screener', 'Calendly'],
    featured: false,
  },
  {
    slug: 'ironside-roofing-ads',
    clientName: 'Ironside Roofing',
    industry: 'Roofing',
    location: 'Atlanta, GA',
    services: ['Website Build', 'Google Ads', 'Local SEO', 'Analytics Dashboards'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    kpis: [
      { label: 'Estimate Requests', value: '67/mo', delta: '+385%', trend: 'up' },
      { label: 'Cost Per Lead', value: '$43', delta: '-68%', trend: 'up' },
      { label: 'Close Rate', value: '34%', delta: '+12%', trend: 'up' },
      { label: 'Avg Job Value', value: '$8,400', delta: '+$2,100', trend: 'up' },
      { label: 'Monthly Revenue', value: '+$42k/mo', delta: '+62%', trend: 'up' },
    ],
    summaryHeadline: 'Turned $3k/month in ad spend into $42k in additional monthly revenue for a roofing company',
    challenge: 'Ironside was running Google Ads in-house with a $3k/month budget but getting terrible results: $135 per lead, mostly tire-kickers requesting free estimates with no intention of hiring. Their website had stock photos, no social proof, and a generic contact form. Close rate was 22% because leads came in cold with no trust built.',
    strategy: 'Rebuilt the website with before/after project galleries, video testimonials, and a streamlined estimate request form. Created dedicated landing pages for each roofing type (shingle, metal, flat, storm damage). Restructured Google Ads with high-intent keywords, negative keyword lists, and geo-targeting. Added an analytics dashboard so the owner could track cost per lead and close rate by service type.',
    buildDeliverables: [
      'Conversion-focused roofing website (14 pages)',
      'Before/after project gallery',
      'Video testimonial integration',
      'Service-specific landing pages (4 roofing types)',
      'Google Ads restructure + new campaigns',
      'Storm damage response landing page',
      'Analytics dashboard (lead source + ROI)',
      'Call tracking with recording',
    ],
    resultsNarrative: 'Ironside went from 14 estimate requests per month to 67 while keeping the same $3k ad budget. Cost per lead dropped from $135 to $43. The before/after galleries and video testimonials improved close rate from 22% to 34%. Average job value increased $2,100 because the website pre-sold premium materials. Monthly revenue grew $42k.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 24, previous: 14 },
        { name: 'Month 2', value: 38, previous: 13 },
        { name: 'Month 3', value: 49, previous: 15 },
        { name: 'Month 4', value: 58, previous: 14 },
        { name: 'Month 5', value: 64, previous: 16 },
        { name: 'Month 6', value: 67, previous: 14 },
      ],
      revenue: [
        { name: 'Month 1', value: 82, previous: 68 },
        { name: 'Month 2', value: 94, previous: 65 },
        { name: 'Month 3', value: 103, previous: 71 },
        { name: 'Month 4', value: 108, previous: 67 },
        { name: 'Month 5', value: 110, previous: 69 },
        { name: 'Month 6', value: 110, previous: 68 },
      ],
    },
    testimonial: {
      name: 'Jake Morrison',
      title: 'Owner, Ironside Roofing',
      text: "Same ad budget, completely different results. I was paying $135 per lead and closing 1 in 5. Now it is $43 per lead and I close 1 in 3. The project gallery on the website does the selling for me before I even show up to the estimate.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'Google Ads audit & waste analysis',
          'Project photo/video collection',
          'Keyword research by roofing type',
          'Competitor ad analysis',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Project gallery buildout',
          'Landing page creation',
          'Estimate form optimization',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'Google Ads campaign restructure',
          'Analytics dashboard setup',
          'Call tracking deployment',
          'Site launch & testing',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Campaign bid optimization',
          'Negative keyword refinement',
          'New project gallery updates',
          'Monthly ROI reporting',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Google Ads', 'Google Analytics 4', 'CallRail', 'Analytics Dashboard'],
    featured: false,
  },
  {
    slug: 'patriot-contracting-seo',
    clientName: 'Patriot Contracting',
    industry: 'General Contractor',
    location: 'Nashville, TN',
    services: ['Website Build', 'Local SEO', 'Review Screener', 'GBP Optimization'],
    websitePreviewImages: {
      desktop: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      mobile: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
    kpis: [
      { label: 'Organic Leads', value: '46/mo', delta: '+475%', trend: 'up' },
      { label: 'Google Reviews', value: '214', delta: '+176', trend: 'up' },
      { label: 'Local Pack Rankings', value: '8 keywords', delta: '+7', trend: 'up' },
      { label: 'GBP Calls', value: '52/mo', delta: '+260%', trend: 'up' },
      { label: 'Avg Project Value', value: '$14,200', delta: '+$4,800', trend: 'up' },
    ],
    summaryHeadline: 'Ranked a general contractor in the Local Pack for 8 high-value keywords without spending a dollar on ads',
    challenge: 'Patriot Contracting had a Wix website that ranked for nothing. They relied entirely on HomeAdvisor and Angi leads at $40-80 per lead, most of which were shared with 3-4 other contractors. Google reviews sat at 38 with a 4.1-star average. The owner was spending $2k/month on lead generation platforms and closing fewer than 10% because customers were shopping multiple bids from the same platform.',
    strategy: 'Built a fast, professional website with detailed project pages for each service type (kitchen remodels, bathroom renovations, additions, decks). Created location-specific content for 16 Nashville-area neighborhoods. Aggressively optimized their GBP and deployed the Review Screener to build review volume and improve their star rating. Zero ad spend — pure organic and GBP strategy.',
    buildDeliverables: [
      'Professional contractor website (18 pages)',
      'Service-specific project portfolio pages',
      'Location pages (16 Nashville neighborhoods)',
      'Google Business Profile optimization',
      'Review Screener with photo request',
      'Schema markup for local business',
      'Blog content strategy (monthly posts)',
      'Local citation building (40+ directories)',
    ],
    resultsNarrative: 'Patriot now ranks in the Local Pack for 8 high-value keywords including "general contractor Nashville" and "kitchen remodel Nashville." Organic leads went from 8 per month to 46 — all free. Google reviews climbed from 38 to 214 with a 4.8-star average. Average project value increased $4,800 because organic leads have higher intent and less price-shopping behavior. The owner canceled HomeAdvisor, saving $2k/month.',
    chartsData: {
      conversions: [
        { name: 'Month 1', value: 14, previous: 8 },
        { name: 'Month 2', value: 21, previous: 9 },
        { name: 'Month 3', value: 29, previous: 7 },
        { name: 'Month 4', value: 36, previous: 8 },
        { name: 'Month 5', value: 42, previous: 10 },
        { name: 'Month 6', value: 46, previous: 8 },
      ],
      traffic: [
        { name: 'Month 1', value: 480, previous: 210 },
        { name: 'Month 2', value: 740, previous: 230 },
        { name: 'Month 3', value: 1080, previous: 220 },
        { name: 'Month 4', value: 1420, previous: 240 },
        { name: 'Month 5', value: 1780, previous: 250 },
        { name: 'Month 6', value: 2040, previous: 230 },
      ],
    },
    testimonial: {
      name: 'Danny Whitfield',
      title: 'Owner, Patriot Contracting',
      text: "I was paying HomeAdvisor $2,000 a month for leads that four other contractors were also calling. Now I get 46 leads a month for free from Google, and these people already trust me before I walk through the door because they read the reviews and saw the project photos. Best investment I have made in this business.",
    },
    timeline: [
      {
        week: 'Week 1-2',
        actions: [
          'SEO audit & keyword research',
          'Project portfolio photography',
          'GBP audit & optimization plan',
          'Citation audit',
        ],
      },
      {
        week: 'Week 3-4',
        actions: [
          'Website design & development',
          'Project portfolio page buildout',
          'Location page creation',
          'Schema markup implementation',
        ],
      },
      {
        week: 'Week 5-6',
        actions: [
          'GBP optimization + weekly posts',
          'Review Screener deployment',
          'Citation building (40+ directories)',
          'Site launch & indexing',
        ],
      },
      {
        week: 'Week 7-12',
        actions: [
          'Monthly blog content publishing',
          'Review velocity monitoring',
          'Ranking progress tracking',
          'Strategy adjustment calls',
        ],
      },
    ],
    tools: ['React', 'Tailwind CSS', 'Google Business Profile', 'Review Screener', 'Google Search Console', 'Ahrefs'],
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