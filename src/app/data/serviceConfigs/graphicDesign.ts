import { ServiceConfig } from './types';
import { Sparkles, Target, Zap, Image, Globe, Palette, Search } from 'lucide-react';

export const graphicDesignConfig: ServiceConfig = {
  slug: 'graphic-design',
  colors: { primary: 'amber', secondary: 'rose' },
  icon: Sparkles,
  hero: {
    serviceName: 'Graphic Design Services',
    headline: 'Marketing materials that <gradient>convert</gradient>: flyers, cards, signage',
    description: 'Professional graphic design for all your marketing needs. Business cards, flyers, brochures, social media graphics, vehicle wraps, and more—designed to grab attention and drive action.',
    subDescription: 'Stop using Canva templates that look like everyone else. Get custom designs that reflect your brand and convert viewers into customers.',
    trustChips: ['3-5 day turnaround', 'Unlimited revisions', 'Print-ready files', 'Full ownership'],
    whatYouGet: [
      'Custom design tailored to your brand and goals',
      'Unlimited revisions until approved',
      'Print-ready files (PDF, with bleed and crop marks)',
      'Web-optimized versions for digital use',
      'Full ownership and commercial rights',
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
    websitePreview: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWdufGVufDB8fHx8MTc2NjcyMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Door Hanger Response', value: '8.2%', delta: '+340% vs. template' },
      { label: 'Brand Consistency', value: '100%', delta: 'All materials aligned' },
      { label: 'Print Quality', value: 'Perfect', delta: 'Zero reprints needed' },
      { label: 'Customer Perception', value: '+78%', delta: 'More professional' },
    ],
    summary: 'Custom door hanger design generated 8.2% response rate (vs. 1.9% industry average), producing 67 qualified leads in the first campaign.',
  },
  logoStrip: {
    title: 'Trusted by brands that care about design',
    logos: ['Precision HVAC', 'Verde Landscaping', 'Summit Realty', 'Elite Law Group', 'Apex Dental'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Conversion-Focused', icon: Target },
      headline: 'Design that <gradient>drives action</gradient>, not just looks pretty',
      description: 'We design with one goal: getting your audience to take action. Every design element—headline, imagery, layout, call-to-action—is optimized for response. Beautiful is great, but profitable is better.',
      bullets: [
        'Clear hierarchy that guides the eye to your CTA',
        'Compelling headlines that speak to customer pain points',
        'Strategic use of color, contrast, and white space',
        'Strong calls-to-action that tell people exactly what to do',
        'A/B testing recommendations for high-impact campaigns',
      ],
      panel: {
        title: 'Our Design Framework',
        items: [
          { label: 'Brief', description: 'Understand goal, audience, message, and use case' },
          { label: 'Concept', description: 'Design 2-3 layout options with different approaches' },
          { label: 'Refine', description: 'You choose direction, we refine with revisions' },
          { label: 'Deliver', description: 'Print-ready and web-optimized files, ready to use' },
        ],
      },
    },
    {
      badge: { text: 'Fast Turnaround', icon: Zap },
      headline: '<gradient>3-5 day delivery</gradient> on most projects',
      description: 'Need marketing materials fast? We deliver high-quality designs in 3-5 business days for most projects. Rush delivery available for urgent campaigns (24-48 hours).',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Professional design files, ready to use',
    core: [
      'Custom design based on your brief and brand',
      '2-3 initial design concepts (most projects)',
      'Unlimited revisions until approved',
      'Print-ready files (PDF with bleed and crop marks)',
      'High-resolution files for digital use (PNG, JPG)',
      'Editable source files (AI or PSD) upon request',
      'Font and image licensing handled',
      'Full ownership and commercial rights',
    ],
    optionalUpgrades: [
      'Rush delivery (24-48 hours): +$200-500',
      'Additional design variations: $100-300 each',
      'Print coordination and fulfillment',
      'Ongoing design retainer (10 hrs/mo): $1,200/mo',
    ],
  },
  process: {
    subtitle: 'From brief to final files in 3-5 days',
    steps: [
      { step: 'Design Brief', time: 'Day 1', desc: 'You provide brief, goals, audience, and examples you like' },
      { step: 'Concept Design', time: 'Days 1-2', desc: 'We design 2-3 layout concepts for your review' },
      { step: 'Feedback Round', time: 'Day 3', desc: 'You choose direction and provide revision notes' },
      { step: 'Revisions', time: 'Days 3-4', desc: 'We refine based on feedback (unlimited revisions)' },
      { step: 'Finalization', time: 'Day 4-5', desc: 'Final approval, we prepare print-ready and web files' },
      { step: 'Delivery', time: 'Day 5', desc: 'You receive all files, ready to print or publish' },
    ],
  },
  outcomes: {
    title: 'What professional design <gradient>delivers</gradient>',
    subtitle: 'Results from custom-designed marketing materials',
    metrics: [
      { metric: 'Response Rate', value: '+200-400%', baseline: 'vs. DIY templates' },
      { metric: 'Brand Perception', value: '+75%', baseline: 'More professional' },
      { metric: 'Print Errors', value: '-100%', baseline: 'Perfect print-ready files' },
      { metric: 'Time Saved', value: '8-12 hrs', baseline: 'No DIY struggle' },
    ],
    disclaimer: '* Results vary based on offer, audience, and distribution strategy',
  },
  pricing: {
    tiers: [
      {
        name: 'Single Design',
        price: '$297-797',
        description: 'One-off design project',
        features: [
          'Business cards: $297',
          'Flyer/postcard: $397',
          'Brochure (tri-fold): $597',
          'Menu/price sheet: $497',
          'Social graphics: $197',
        ],
      },
      {
        name: 'Marketing Pack',
        price: '$1,297',
        description: 'Complete marketing materials bundle',
        features: [
          'Business cards',
          '2 flyers or postcards',
          'Tri-fold brochure',
          'Social media templates',
          '20% bundle discount',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Design Retainer',
        price: '$1,200/mo',
        description: 'Ongoing design support (10 hrs/mo)',
        features: [
          'Priority turnaround',
          'Unlimited project requests',
          'Monthly strategy call',
          'Roll over unused hours',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'What types of designs do you create?',
      answer: 'We design all marketing materials: business cards, flyers, postcards, brochures, door hangers, yard signs, vehicle wraps, banners, social media graphics, presentation decks, menus, price sheets, and more. If it is marketing-related, we can design it.',
    },
    {
      question: 'How long does design take?',
      answer: 'Most projects: 3-5 business days from brief to final files. Simple designs (business cards, social graphics): 2-3 days. Complex projects (multi-page brochures, vehicle wraps): 5-7 days. Rush delivery available for +$200-500.',
    },
    {
      question: 'How many design concepts do I get?',
      answer: 'For most projects, you get 2-3 initial design concepts with different layouts or approaches. You choose one direction, and we refine it with unlimited revisions. Additional concepts available for $100-300 depending on complexity.',
    },
    {
      question: 'What if I need revisions?',
      answer: 'Unlimited revisions until you are 100% satisfied. Minor tweaks (copy changes, color adjustments) are included. Major direction changes after approval may incur additional fees if they require starting over.',
    },
    {
      question: 'Do I need to provide my brand assets?',
      answer: 'If you have a logo, brand colors, or fonts, send them over. If not, we can design within your existing brand or recommend our Brand Identity service to create a complete brand system first.',
    },
    {
      question: 'What file formats do I receive?',
      answer: 'For print: PDF with bleed and crop marks, ready to send to any printer. For digital: high-res PNG and JPG. Editable source files (AI, PSD, INDD) available upon request. All files optimized for their intended use.',
    },
    {
      question: 'Can you handle printing too?',
      answer: 'Yes, we can coordinate printing and fulfillment for an additional fee. We work with commercial printers to get you the best quality and pricing. Or, take our print-ready files to any local or online printer.',
    },
    {
      question: 'Do I own the designs?',
      answer: 'Yes. You receive full ownership and commercial rights to all final designs. Use them however you want—print, digital, merchandise, advertising. No licensing fees, no restrictions.',
    },
    {
      question: 'What is included in the Marketing Pack?',
      answer: 'The $1,297 Marketing Pack includes: business cards, 2 flyers or postcards, tri-fold brochure, and social media templates. This is a 20% discount vs. ordering individually. Perfect for new businesses launching marketing.',
    },
    {
      question: 'How does the design retainer work?',
      answer: 'The $1,200/mo retainer gets you 10 hours of design work per month (roughly 5-8 deliverables depending on complexity). Submit project requests anytime, we prioritize your work, and unused hours roll over for 2 months. Cancel anytime.',
    },
  ],
  resources: [
    {
      title: 'Design Brief Template',
      description: 'The exact information we need to create an effective design on the first try.',
      category: 'Template',
    },
    {
      title: 'Print Specifications Guide',
      description: 'Common print sizes, paper types, and finishing options for different marketing materials.',
      category: 'Guide',
    },
    {
      title: 'Flyer Copywriting Checklist',
      description: 'The 7 elements every high-converting flyer must include.',
      category: 'Checklist',
    },
  ],
  relatedServices: [
    { name: 'Branding', path: '/services/branding', icon: Palette },
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
    { name: 'Local SEO', path: '/services/local-seo', icon: Search },
  ],
  finalCTA: {
    headline: 'Ready for marketing materials that <gradient>actually convert</gradient>?',
    description: 'Book a call to discuss your project and see examples of our work in your industry.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
