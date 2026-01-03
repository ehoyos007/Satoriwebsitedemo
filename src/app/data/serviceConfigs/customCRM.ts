import { ServiceConfig } from './types';
import { Database, Target, Zap, Users, BarChart3, Bot, Megaphone } from 'lucide-react';

export const customCRMConfig: ServiceConfig = {
  slug: 'custom-crm',
  colors: { primary: 'emerald', secondary: 'cyan' },
  icon: Database,
  hero: {
    serviceName: 'Custom CRM + Automation',
    badge: 'Enterprise',
    headline: '<gradient>Automate follow-ups</gradient>, track leads, and close more deals',
    description: 'Custom-built CRM tailored to your sales process. Automate lead capture, follow-ups, and pipeline management so no opportunity falls through the cracks. Built on proven platforms, customized for your workflow.',
    subDescription: 'Stop losing leads to spreadsheets and sticky notes. Get a system that manages your sales process automatically.',
    trustChips: ['2-week setup', 'Custom workflows', 'Team training included', 'Integrations included'],
    whatYouGet: [
      'Custom CRM configured for your sales process',
      'Automated lead capture from website, ads, and forms',
      'Follow-up automation and email sequences',
      'Pipeline management and deal tracking',
      'Team training and ongoing support',
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
    websitePreview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm0lMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY2NzIwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Lead Follow-Up Rate', value: '100%', delta: 'vs. 34% manual' },
      { label: 'Time to First Contact', value: '<5 min', delta: '-92%' },
      { label: 'Deals Closed', value: '+143%', delta: 'Year-over-year' },
      { label: 'Pipeline Visibility', value: '100%', delta: 'Real-time tracking' },
    ],
    summary: 'Custom CRM automation increased lead follow-up rate to 100%, reduced response time to under 5 minutes, and contributed to a 143% increase in closed deals.',
  },
  logoStrip: {
    title: 'Trusted by sales-driven teams',
    logos: ['Elite Law Group', 'Summit Realty', 'Precision HVAC', 'Apex Dental', 'Verde Landscaping'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Custom Workflows', icon: Zap },
      headline: 'Built around <gradient>your sales process</gradient>, not generic templates',
      description: 'Off-the-shelf CRMs force you to adapt to their workflow. We configure the CRM around how you actually sell—lead stages, follow-up sequences, qualification criteria, and reporting dashboards tailored to your business.',
      bullets: [
        'Custom lead stages and pipeline structure',
        'Automated follow-up sequences based on lead source and behavior',
        'Smart routing rules to assign leads to the right team member',
        'Custom fields to track what matters to your business',
        'Automated tasks and reminders so nothing falls through cracks',
      ],
      panel: {
        title: 'What We Automate',
        items: [
          { label: 'Lead Capture', description: 'Website forms, ads, calls automatically enter CRM' },
          { label: 'Follow-Ups', description: 'Email and SMS sequences sent automatically' },
          { label: 'Task Assignment', description: 'Leads routed to team based on rules' },
          { label: 'Reporting', description: 'Real-time dashboards and weekly pipeline reports', icon: BarChart3 },
        ],
      },
    },
    {
      badge: { text: 'Proven Platforms', icon: Target },
      headline: '<gradient>No proprietary lock-in</gradient>—built on platforms you can own',
      description: 'We build on proven CRM platforms (HubSpot, Salesforce, Zoho, or GoHighLevel) so you own your data and system. If you ever leave us, you keep the CRM and all customizations. No vendor lock-in.',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete CRM setup and automation',
    core: [
      'Platform selection and account setup (HubSpot, Salesforce, Zoho, or GoHighLevel)',
      'Custom lead pipeline and deal stages',
      'Automated lead capture integration (website forms, Google Ads, Facebook)',
      'Email and SMS follow-up sequences',
      'Lead scoring and qualification automation',
      'Task automation and assignment rules',
      'Custom fields and data structure',
      'Sales dashboard and reporting',
      'Email integration (Gmail, Outlook)',
      'Calendar integration (Google Calendar, Outlook)',
      'Mobile app setup for on-the-go access',
      'Team user accounts and permissions',
      'Live training session (2 hours)',
      'Documented workflows and SOPs',
    ],
    optionalUpgrades: [
      'Call tracking integration for lead source attribution',
      'AI chatbot integration for lead qualification',
      'Advanced reporting and custom dashboards',
      'Multi-location or franchise setup',
      'API integrations with industry-specific tools',
    ],
  },
  process: {
    subtitle: 'From discovery to go-live in 2 weeks',
    steps: [
      { step: 'Discovery Call', time: 'Day 1', desc: 'We map your current sales process, pain points, and automation goals' },
      { step: 'Platform Setup', time: 'Days 2-4', desc: 'We configure CRM platform, custom fields, pipeline stages' },
      { step: 'Automation Build', time: 'Days 5-8', desc: 'We build email sequences, task automation, lead routing' },
      { step: 'Integration', time: 'Days 8-10', desc: 'We connect website, ads, email, calendar, and other tools' },
      { step: 'Testing & QA', time: 'Days 11-12', desc: 'We test all workflows, automations, and integrations' },
      { step: 'Training & Launch', time: 'Days 13-14', desc: 'We train your team and migrate existing leads (if applicable)' },
    ],
  },
  outcomes: {
    title: 'What CRM automation <gradient>delivers</gradient>',
    subtitle: 'Results our clients report after implementing custom CRM',
    metrics: [
      { metric: 'Lead Follow-Up Rate', value: '95-100%', baseline: 'vs. 30-40% manual' },
      { metric: 'Response Time', value: '<5 min', baseline: 'Instant automation' },
      { metric: 'Deals Closed', value: '+50-150%', baseline: 'Better follow-up = more sales' },
      { metric: 'Time Saved', value: '10-15 hrs/wk', baseline: 'Per sales rep' },
    ],
    disclaimer: '* Results depend on sales process complexity, team adoption, and lead volume',
  },
  pricing: {
    tiers: [
      {
        name: 'CRM Setup',
        price: '$4,997',
        description: 'One-time setup and configuration',
        features: [
          'Platform setup and customization',
          'Automated workflows and sequences',
          'Integrations (website, email, calendar)',
          'Team training (2 hours)',
        ],
      },
      {
        name: 'Monthly Support',
        price: '$297/mo',
        description: 'Ongoing optimization and support',
        features: [
          'Workflow updates and optimization',
          'New integrations as needed',
          'Monthly performance review',
          'Priority support',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Multi-location or advanced automation',
        features: [
          'Multi-location setup',
          'Advanced custom integrations',
          'Dedicated account manager',
          'White-label for agencies',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'What CRM platform do you use?',
      answer: 'We work with HubSpot, Salesforce, Zoho, and GoHighLevel. Choice depends on your budget, complexity, and existing tech stack. HubSpot (best free option), Salesforce (enterprise), Zoho (budget-friendly), GoHighLevel (all-in-one for agencies).',
    },
    {
      question: 'How long does CRM setup take?',
      answer: 'Full setup takes 2 weeks from kickoff to team training. This includes platform configuration, workflow automation, integrations, testing, and training. Migration of existing data adds 3-5 days depending on volume.',
    },
    {
      question: 'Do I need to buy the CRM platform separately?',
      answer: 'Yes. The $4,997 covers setup and configuration. The CRM platform itself costs $20-100/user/month depending on which platform and tier you choose. We help you select the right platform and pricing tier.',
    },
    {
      question: 'What if I already use a CRM?',
      answer: 'Perfect. We can optimize and automate your existing CRM instead of starting from scratch. We audit your current setup, identify gaps, and build the automation and integrations you need.',
    },
    {
      question: 'Can you migrate data from my current system?',
      answer: 'Yes. We handle data migration from spreadsheets, old CRMs, or other systems. We clean, dedupe, and import all contacts, deals, and historical data. Migration complexity affects timeline and may incur additional fees ($500-1,500).',
    },
    {
      question: 'What integrations are included?',
      answer: 'Standard integrations: website forms, Google Ads, Facebook Ads, email (Gmail/Outlook), calendar (Google/Outlook), and Zapier for custom connections. Advanced integrations (call tracking, chatbots, e-commerce) quoted separately.',
    },
    {
      question: 'How do you train my team?',
      answer: 'We provide a 2-hour live training session covering: how to use the CRM, lead management, pipeline tracking, and automation features. We also provide video tutorials and written documentation. Additional training available for $150/hr.',
    },
    {
      question: 'What happens after setup?',
      answer: 'The $297/mo covers ongoing optimization, workflow updates, new integrations, monthly performance reviews, and priority support. As your business evolves, we evolve the CRM to match.',
    },
    {
      question: 'Can I cancel the monthly support?',
      answer: 'Yes, month-to-month after setup. However, most clients stay long-term because CRMs need continuous optimization as your sales process and tools evolve. You own the CRM either way—support just ensures it stays optimized.',
    },
    {
      question: 'What if I outgrow the CRM platform?',
      answer: 'We can migrate you to a more robust platform (e.g., HubSpot to Salesforce). Migration projects are quoted separately ($2,000-5,000 depending on complexity). We handle all data migration and reconfiguration.',
    },
  ],
  resources: [
    {
      title: 'CRM Selection Guide',
      description: 'How to choose the right CRM platform based on your business size, budget, and needs.',
      category: 'Guide',
    },
    {
      title: 'Sales Process Mapping Template',
      description: 'Document your current sales process to identify automation opportunities.',
      category: 'Template',
    },
    {
      title: 'CRM ROI Calculator',
      description: 'Calculate the value of automating your follow-ups and improving close rates.',
      category: 'Tool',
    },
  ],
  relatedServices: [
    { name: 'AI Chat Bot', path: '/services/ai-chat-bot', icon: Bot },
    { name: 'Analytics Dashboards', path: '/services/analytics-dashboards', icon: BarChart3 },
    { name: 'Google Ads', path: '/services/google-ads', icon: Megaphone },
  ],
  finalCTA: {
    headline: 'Ready to <gradient>never miss a lead</gradient> again?',
    description: 'Book a call to discuss your sales process and see how we can automate your pipeline.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
