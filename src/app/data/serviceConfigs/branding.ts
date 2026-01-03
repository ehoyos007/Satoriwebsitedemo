import { ServiceConfig } from './types';
import { Palette, Target, Users, Sparkles, Globe, Search, BarChart3 } from 'lucide-react';

export const brandingConfig: ServiceConfig = {
  slug: 'branding',
  colors: { primary: 'violet', secondary: 'rose' },
  icon: Palette,
  hero: {
    serviceName: 'Brand Identity + Strategy',
    headline: 'Professional brand identity that <gradient>builds trust and recognition</gradient>',
    description: 'Complete brand identity system including logo, colors, typography, and brand guidelines. Stand out from competitors with a cohesive, memorable brand that attracts your ideal customers.',
    subDescription: 'First impressions matter. A professional brand identity signals credibility, quality, and trust—before you say a word.',
    trustChips: ['2-week delivery', 'Unlimited revisions', 'Brand guidelines included', 'Full ownership'],
    whatYouGet: [
      'Custom logo design (3 concepts, unlimited revisions)',
      'Complete color palette and typography system',
      'Brand style guide document',
      'Logo variations and file formats for all uses',
      'Business card and letterhead designs',
    ],
    ctas: {
      primary: { text: 'Book a Call', link: '/book-call' },
      secondary: { text: 'View Case Studies', link: '/case-studies' },
    },
  },
  featuredCase: {
    clientName: 'Verde Landscaping Co.',
    industry: 'Home Services',
    location: 'Austin, TX',
    websitePreview: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRlc2lnbnxlbnwwfHx8fDE3NjY3MjAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    kpis: [
      { label: 'Brand Recognition', value: '+450%', delta: 'Customer recall improved' },
      { label: 'Premium Pricing', value: '+35%', delta: 'Higher rates accepted' },
      { label: 'Customer Trust', value: '+89%', delta: 'Professional perception' },
      { label: 'Lead Quality', value: '+67%', delta: 'Better-fit prospects' },
    ],
    summary: 'Complete rebrand transformed Verde from "just another landscaper" to a premium, trusted brand—enabling 35% higher pricing and significantly better lead quality.',
  },
  logoStrip: {
    title: 'Trusted by ambitious brands',
    logos: ['Verde Landscaping', 'Elite Law Group', 'Summit Realty', 'Precision HVAC', 'Apex Dental'],
  },
  whyThisWorks: [
    {
      badge: { text: 'Strategic Foundation', icon: Target },
      headline: 'Brand strategy <gradient>before pixels</gradient>',
      description: 'We start by understanding your business, target audience, and competitive landscape. Your brand identity is built on strategy—not arbitrary design choices. Every color, font, and visual element has a reason.',
      bullets: [
        'Discovery session to understand your business and goals',
        'Competitor analysis to identify differentiation opportunities',
        'Target audience research to inform design direction',
        'Brand positioning and messaging strategy',
        'Mood boards and design direction approval before final design',
      ],
      panel: {
        title: 'Our Brand Process',
        items: [
          { label: 'Discover', description: 'Business goals, audience, competitors, positioning' },
          { label: 'Strategize', description: 'Brand positioning, messaging, visual direction' },
          { label: 'Design', description: 'Logo concepts, color palette, typography system' },
          { label: 'Refine', description: 'Unlimited revisions until perfect' },
        ],
      },
    },
    {
      badge: { text: 'Complete System', icon: Sparkles },
      headline: '<gradient>Everything you need</gradient> to launch confidently',
      description: 'You do not just get a logo—you get a complete brand system: colors, fonts, logo variations, usage guidelines, and templates. Everything needed to maintain brand consistency across all touchpoints.',
      reverse: true,
      background: true,
    },
  ],
  deliverables: {
    subtitle: 'Complete brand identity package',
    core: [
      'Custom logo design (3 initial concepts)',
      'Unlimited revisions until approved',
      'Primary and secondary logo variations',
      'Horizontal, vertical, and icon-only versions',
      'Full-color, black, white, and grayscale versions',
      'Complete color palette (primary, secondary, accent colors)',
      'Typography system (headings, body, web fonts)',
      'Brand style guide (PDF, 15-20 pages)',
      'Business card design (2 concepts)',
      'Letterhead and email signature design',
      'Social media profile graphics (Facebook, Instagram, LinkedIn)',
      'Logo files in all formats (AI, EPS, SVG, PNG, JPG)',
      'Web-optimized logo files for website',
      'Full ownership and commercial rights',
    ],
    optionalUpgrades: [
      'Brand messaging and tagline development',
      'Extended brand guidelines (30+ pages)',
      'Packaging and product label design',
      'Vehicle wrap and signage design',
      'Brand photography art direction',
    ],
  },
  process: {
    subtitle: 'From kickoff to final brand in 2 weeks',
    steps: [
      { step: 'Discovery Call', time: 'Day 1', desc: 'We learn your business, audience, and vision for the brand' },
      { step: 'Strategy & Research', time: 'Days 1-3', desc: 'Competitor analysis, audience research, mood boards' },
      { step: 'Concept Design', time: 'Days 4-7', desc: 'We design 3 unique logo concepts with color and font options' },
      { step: 'Feedback & Revisions', time: 'Days 8-10', desc: 'You provide feedback, we refine until perfect' },
      { step: 'Finalization', time: 'Days 11-12', desc: 'We create all logo variations, brand guide, and templates' },
      { step: 'Delivery', time: 'Day 14', desc: 'You receive complete brand package with all files and guidelines' },
    ],
  },
  outcomes: {
    title: 'What a strong brand <gradient>delivers</gradient>',
    subtitle: 'Benefits our clients report after rebranding',
    metrics: [
      { metric: 'Brand Recognition', value: '+300-500%', baseline: 'Customer recall improvement' },
      { metric: 'Premium Pricing Ability', value: '+25-40%', baseline: 'Higher rates accepted' },
      { metric: 'Referral Rate', value: '+60%', baseline: 'More word-of-mouth' },
      { metric: 'Professional Perception', value: '+80%', baseline: 'Trust and credibility' },
    ],
    disclaimer: '* Results represent qualitative improvements in brand perception and customer behavior',
  },
  pricing: {
    tiers: [
      {
        name: 'Logo Only',
        price: '$997',
        description: 'Just need a logo',
        features: [
          'Custom logo design (3 concepts)',
          'Unlimited revisions',
          'Logo variations and formats',
          'Basic 1-page brand guide',
        ],
      },
      {
        name: 'Complete Brand',
        price: '$2,997',
        description: 'Full brand identity system',
        features: [
          'Everything in Logo Only',
          'Color palette + typography',
          'Full brand style guide',
          'Business cards + letterhead',
          'Social media graphics',
        ],
        highlighted: true,
        badge: 'Most Popular',
      },
      {
        name: 'Enterprise Brand',
        price: 'Custom',
        description: 'Multi-location or complex branding',
        features: [
          'Everything in Complete Brand',
          'Extended brand guidelines',
          'Sub-brands or product lines',
          'Brand messaging strategy',
        ],
        ctaText: 'Book a Call',
      },
    ],
  },
  faqs: [
    {
      question: 'What is included in the brand identity package?',
      answer: 'You get a custom logo (3 concepts, unlimited revisions), complete color palette, typography system, brand style guide, business card design, letterhead, social media graphics, and all logo files in every format (AI, EPS, SVG, PNG, JPG). Full ownership and commercial rights included.',
    },
    {
      question: 'How long does branding take?',
      answer: 'The full process takes 2 weeks from kickoff to delivery. Week 1: discovery, research, and initial concepts. Week 2: revisions, finalization, and file preparation. Rush delivery available for additional fee.',
    },
    {
      question: 'How many logo concepts do I get?',
      answer: 'You receive 3 unique logo concepts based on the brand strategy. You choose one direction, and we refine it with unlimited revisions until you are 100% satisfied. Additional concepts available for $300 each.',
    },
    {
      question: 'What if I do not like any of the concepts?',
      answer: 'Rare, but it happens. If none of the 3 initial concepts resonate, we do another round of 2-3 concepts at no extra cost. Our goal is a logo you love, not just acceptance.',
    },
    {
      question: 'Can I use the logo on anything?',
      answer: 'Yes. You receive full ownership and commercial rights. Use it on your website, marketing, signage, products, merchandise—anything. No licensing fees, no restrictions.',
    },
    {
      question: 'What file formats do I receive?',
      answer: 'You get vector files (AI, EPS, SVG for infinite scaling), high-res raster files (PNG, JPG), and web-optimized versions. Files provided in full-color, black, white, and transparent backgrounds.',
    },
    {
      question: 'Do I need a brand style guide?',
      answer: 'Yes, especially if you have a team or work with contractors. The style guide shows exactly how to use your logo, colors, and fonts consistently. It ensures your brand looks professional across all materials.',
    },
    {
      question: 'Can you redesign my existing brand?',
      answer: 'Absolutely. Many clients come to us for rebrands. We analyze your current brand, identify what is working and what is not, and create a refreshed or completely new identity that better serves your business goals.',
    },
    {
      question: 'What if I need help applying the brand later?',
      answer: 'We offer ongoing design support. Need a flyer, brochure, or ad designed with your new branding? We can handle that for an hourly rate ($150/hr) or project fee. You can also use the brand guide to brief other designers.',
    },
    {
      question: 'Do you do brand naming or taglines?',
      answer: 'Yes, as an optional add-on. Brand naming and tagline development is $500-1,000 depending on complexity. This includes name/tagline options, trademark screening, and domain availability check.',
    },
  ],
  resources: [
    {
      title: 'Brand Identity Checklist',
      description: 'The 23 elements every complete brand identity system should include.',
      category: 'Checklist',
    },
    {
      title: 'How to Choose Brand Colors',
      description: 'Psychology of color in branding and how to select colors that resonate with your audience.',
      category: 'Guide',
    },
    {
      title: 'Logo Design Brief Template',
      description: 'The exact questions to answer before starting a logo design project.',
      category: 'Template',
    },
  ],
  relatedServices: [
    { name: 'Website Build', path: '/services/website-build', icon: Globe },
    { name: 'Graphic Design', path: '/services/graphic-design', icon: Sparkles },
    { name: 'Local SEO', path: '/services/local-seo', icon: Search },
  ],
  finalCTA: {
    headline: 'Ready to build a <gradient>brand people remember</gradient>?',
    description: 'Book a call to discuss your brand vision and see examples of our work in your industry.',
    primaryCTA: { text: 'Book a Call', link: '/book-call' },
    secondaryCTA: { text: 'View Case Studies', link: '/case-studies' },
  },
};
