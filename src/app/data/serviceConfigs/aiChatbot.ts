import { ServiceConfig } from './types';
import { Bot, Zap, Clock, MessageSquare, Target, Globe, MapPin } from 'lucide-react';

export const aiChatbotConfig: ServiceConfig = {
  slug: 'ai-chat-bot',
  colors: { primary: 'cyan', secondary: 'violet' },
  icon: Bot,
  hero: {
    serviceName: 'AI Chat Bot',
    badge: 'AI-Powered Lead Capture',
    headline: 'Capture leads 24/7 and <gradient>answer questions instantly</gradient> with AI',
    description: 'Smart AI chatbot that qualifies leads, answers FAQs, and routes conversations to your team—working around the clock to capture opportunities you would otherwise miss.',
    subDescription: 'No more missed leads after hours. No more repetitive questions. Just instant, intelligent responses that convert visitors into customers.',
    trustChips: ['24/7 availability', '48-hour setup', 'Custom training', 'CRM integration'],
    whatYouGet: [
      'Custom-trained AI chatbot for your business',
      'Lead qualification and routing logic',
      'FAQ automation with natural language understanding',
      'CRM integration for seamless lead handoff',
      'Performance analytics dashboard',
    ],
    ctas: {
      primary: { text: 'Book a Call', link: '/book-call' },
      secondary: { text: 'View Case Studies', link: '/case-studies' },
    },
  },
  featuredCase: {
    clientName: 'Precision HVAC Services',
    industry: 'Home Services',
    location: 'Phoenix, AZ',
    websitePreview: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBjaGF0fGVufDB8fHx8MTc2NjcyMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'After-Hours Leads', value: '47/mo', delta: '+∞ (was 0)' },
      { label: 'Response Time', value: '<10s', delta: '-94%' },
      { label: 'Lead Qualification', value: '89%', delta: 'Auto-qualified' },
      { label: 'Conversion Rate', value: '34%', delta: '+12%' },
    ],
    summary: 'AI chatbot captured 47 qualified leads per month during after-hours periods, converting 34% into booked appointments with zero human intervention.',
  },
  logoStrip: {
    title: 'Trusted by growing businesses',
    logos: ['Precision HVAC', 'Elite Law Group', 'Summit Realty', 'Apex Dental', 'Verde Landscaping'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Intelligent Automation', icon: Zap },
      headline: 'AI that <gradient>understands your business</gradient>',
      description: 'We train the AI on your services, pricing, processes, and common questions so it can have natural conversations with prospects. The bot learns from every interaction and gets smarter over time.',
      bullets: [
        'Custom-trained on your business knowledge base',
        'Natural language understanding (not rigid scripts)',
        'Learns from conversations and improves accuracy',
        'Handles multiple conversations simultaneously',
        'Escalates complex questions to your team',
      ],
      panel: {
        title: 'How It Works',
        items: [
          { label: 'Visitor Asks', description: 'Customer visits site and asks a question' },
          { label: 'AI Responds', description: 'Bot provides instant, accurate answer' },
          { label: 'Qualifies Lead', description: 'Asks qualifying questions if needed' },
          { label: 'Routes to CRM', description: 'Sends qualified lead to your system' },
        ],
      },
    },
    {
      badge: { text: '24/7 Lead Capture', icon: Clock },
      headline: '<gradient>Never miss a lead</gradient> again',
      description: 'Most leads happen outside business hours—evenings, weekends, holidays. Our AI chatbot works 24/7 to capture these opportunities and qualify them before your team even wakes up.',
      bullets: [
        'Capture leads during off-hours (nights, weekends)',
        'Instant response time (under 10 seconds)',
        'Auto-qualification based on your criteria',
        'Direct integration with your CRM or email',
      ],
      panel: {
        title: 'Lead Routing Logic',
        items: [
          { label: 'Qualified', description: 'High-intent leads routed to sales immediately', icon: Target },
          { label: 'Info Request', description: 'Questions answered, resources sent automatically', icon: MessageSquare },
          { label: 'Unqualified', description: 'Politely handled or added to nurture list', icon: Clock },
        ],
      },
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete AI chatbot setup and training',
    core: [
      'Custom AI training on your business, services, and pricing',
      'FAQ knowledge base setup (50+ common questions)',
      'Lead qualification workflow design',
      'Website integration (chat widget)',
      'CRM integration (HubSpot, Salesforce, or email)',
      'Conversation routing logic',
      'Fallback escalation to human agents',
      'Chat widget customization (branding, colors)',
      'Mobile-optimized chat interface',
      'Performance analytics dashboard',
      'Conversation history and transcripts',
      'Weekly optimization and retraining',
    ],
    optionalUpgrades: [
      'SMS/text message integration for lead alerts',
      'Voice AI integration (phone bot)',
      'Multi-language support',
      'Advanced sentiment analysis',
      'Integration with appointment scheduling tools',
    ],
  },
  process: {
    subtitle: 'From setup to go-live in 48 hours',
    steps: [
      { step: 'Discovery Call', time: 'Day 1', desc: 'We learn your business, services, common questions, and lead qualification criteria' },
      { step: 'AI Training', time: 'Days 1-2', desc: 'We train the AI on your knowledge base, FAQs, and conversation flows' },
      { step: 'Widget Setup', time: 'Day 2', desc: 'We customize the chat widget and integrate it with your website' },
      { step: 'CRM Integration', time: 'Day 2', desc: 'We connect the bot to your CRM or email system for lead handoff' },
      { step: 'Testing', time: 'Day 3', desc: 'We test all conversation paths, escalation logic, and integrations' },
      { step: 'Launch & Train', time: 'Day 3', desc: 'We go live and train your team on monitoring and optimization' },
    ],
  },
  outcomes: {
    title: 'Typical <gradient>performance improvements</gradient>',
    subtitle: 'Average results from our AI chatbot clients',
    metrics: [
      { metric: 'After-Hours Lead Capture', value: '35-50/mo', baseline: 'vs. 0 without bot' },
      { metric: 'Response Time', value: '<10 sec', baseline: 'vs. 4-6 hours manual' },
      { metric: 'Auto-Qualification Rate', value: '85%', baseline: 'No human input needed' },
      { metric: 'Lead-to-Customer Rate', value: '28-34%', baseline: 'Qualified leads' },
    ],
    disclaimer: '* Results vary based on traffic volume, offer complexity, and integration quality',
  },
  pricing: {
    tiers: [
      {
        name: 'Setup',
        price: '$1,497',
        description: 'One-time setup and training',
        features: [
          'Custom AI training',
          'Website integration',
          'CRM connection',
          'FAQ knowledge base (50+ questions)',
        ],
      },
      {
        name: 'Monthly',
        price: '$147/mo',
        description: 'Ongoing hosting and optimization',
        features: [
          'Unlimited conversations',
          'Weekly retraining',
          'Performance analytics',
          'Support and updates',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Advanced features and integrations',
        features: [
          'Multi-language support',
          'Voice AI integration',
          'Advanced analytics',
          'Priority support',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'How does the AI chatbot work?',
      answer: 'The AI is trained on your business information—services, pricing, processes, and FAQs. When a visitor asks a question, the AI understands the intent and provides an accurate answer. If it cannot answer, it escalates to your team. The bot learns from every conversation and gets smarter over time.',
    },
    {
      question: 'How quickly can this be set up?',
      answer: 'Setup takes 48-72 hours including AI training, website integration, CRM connection, and testing. You can start capturing leads immediately after launch.',
    },
    {
      question: 'What platforms does this integrate with?',
      answer: 'We integrate with all major CRMs (HubSpot, Salesforce, Zoho), email platforms (Gmail, Outlook), and appointment scheduling tools (Calendly, Acuity). Custom integrations available for other systems.',
    },
    {
      question: 'Can the bot handle complex questions?',
      answer: 'The AI handles 85-90% of questions automatically. For complex or nuanced questions, it escalates to your team via email, SMS, or CRM notification. You can customize escalation rules based on your preferences.',
    },
    {
      question: 'How many conversations can it handle?',
      answer: 'Unlimited. The bot can handle multiple conversations simultaneously without degradation in quality. Unlike human agents, it never gets tired or needs breaks.',
    },
    {
      question: 'Does this replace my customer service team?',
      answer: 'No, it augments them. The bot handles repetitive questions and qualifies leads, freeing your team to focus on high-value conversations and closing deals. Think of it as a 24/7 junior sales rep who never sleeps.',
    },
    {
      question: 'What if the AI gives wrong answers?',
      answer: 'We test extensively before launch to ensure accuracy. Post-launch, we monitor conversations weekly and retrain the AI on any mishandled questions. You can also manually review and approve responses during the first few weeks.',
    },
    {
      question: 'Can I customize the bot\'s personality?',
      answer: 'Yes. During setup, we define the tone and personality—professional, friendly, casual, technical, etc. The bot adapts its language to match your brand voice.',
    },
    {
      question: 'How do I track performance?',
      answer: 'You get a dashboard showing: total conversations, questions answered, leads captured, qualification rate, escalation rate, and conversation transcripts. Weekly reports summarize performance.',
    },
    {
      question: 'What happens after the first month?',
      answer: 'The $147/mo covers hosting, unlimited conversations, weekly retraining, and performance monitoring. We continuously optimize based on real conversation data to improve accuracy and conversion rates.',
    },
  ],
  resources: [
    {
      title: 'AI Chatbot ROI Calculator',
      description: 'Calculate how many leads you are losing after hours and what an AI bot could capture.',
      category: 'Tool',
    },
    {
      title: 'Chatbot Training Best Practices',
      description: 'How to train an AI bot to sound natural and handle your specific business scenarios.',
      category: 'Guide',
    },
    {
      title: 'Lead Qualification Workflow Templates',
      description: 'Pre-built qualification logic for different industries and business models.',
      category: 'Template',
    },
  ],
  relatedServices: [
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
    { name: 'Google Business Profile', path: '/services/google-business-profile', icon: MapPin },
    { name: 'Custom CRM', path: '/services/custom-crm', icon: Target },
  ],
  finalCTA: {
    headline: 'Ready to <gradient>capture leads 24/7</gradient>?',
    description: 'Book a call to see the AI bot in action and discuss your lead capture strategy.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
