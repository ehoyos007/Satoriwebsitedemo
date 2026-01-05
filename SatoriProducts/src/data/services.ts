import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'gbp',
    name: 'Google Business Profile Optimization',
    shortName: 'GBP Optimization',
    icon: '📍',
    badge: 'Popular',
    badgeColor: 'emerald',
    currentPrice: '$1,495',
    proposedPrice: '$1,495 setup + $197/mo',
    pricing: {
      setup: 1495,
      monthly: 197,
      model: 'Setup + Recurring',
      annualOption: '$1,970/yr (2 months free)'
    },
    margins: { setup: '72%', monthly: '68%' },
    overview: {
      what: "Google Business Profile (formerly Google My Business) Optimization is a comprehensive service that transforms your business's presence on Google Search and Maps. We audit, optimize, and actively manage your GBP listing to maximize visibility when local customers search for services you offer. This includes optimizing your business information, categories, attributes, photos, posts, Q&A section, and review management strategy.",
      whyItMatters: "Your Google Business Profile is often the first impression potential customers have of your business. 46% of all Google searches have local intent, and 88% of consumers who search for a local business on mobile call or visit within 24 hours. A fully optimized GBP listing can increase your visibility in the \"Local Pack\" (the map results), drive more calls, direction requests, and website visits—all without paying for ads.",
      clientExpects: [
        "Complete audit of your current GBP listing with gap analysis",
        "Full optimization of all profile fields, categories, and attributes",
        "Professional photo optimization and geotagging",
        "Weekly Google Posts to keep your profile active and engaging",
        "Q&A section monitoring and strategic question seeding",
        "Review response strategy and templates",
        "Monthly performance reports with insights",
        "Ongoing monitoring for listing hijacking or unauthorized changes"
      ]
    },
    tools: [
      { name: "Google Business Profile", role: "Core Platform", description: "The free platform from Google where your business listing lives. We manage all aspects of your profile directly through GBP's interface and API.", cost: "Free", importance: "Essential—this is the platform we're optimizing", status: 'active' },
      { name: "BrightLocal", role: "Tracking & Citations", description: "Industry-leading local SEO platform that tracks your GBP rankings across different locations, monitors citation accuracy, and provides competitive analysis.", cost: "$29-79/mo", importance: "Critical for measuring results and identifying optimization opportunities", status: 'selected' },
      { name: "LocalViking", role: "Grid Rank Tracking", description: "Specialized tool that shows exactly where you rank in Google Maps across a geographic grid. Reveals ranking variations across your service area.", cost: "$20-49/mo", importance: "Provides granular visibility into map rankings that standard tools miss", status: 'evaluating' },
      { name: "Canva Pro", role: "Visual Content", description: "Design platform used to create eye-catching Google Posts, cover photos, and promotional graphics that drive engagement.", cost: "$13/mo", importance: "Enables consistent, professional visual content without custom design costs", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "GBP Optimization - Setup", productId: "prod_gbp_setup", priceModel: "One-time: $1,495.00", metadata: "service_type: gbp | phase: setup | hours_included: 8" },
        { name: "GBP Optimization - Monthly", productId: "prod_gbp_monthly", priceModel: "Recurring: $197.00/month", billingInterval: "Monthly (annual option available)", metadata: "service_type: gbp | phase: maintenance | posts_per_week: 3" }
      ]
    },
    website: {
      displayPrice: '"$1,495 setup + $197/mo" or "Starting at $197/mo"',
      badge: "Popular",
      tagline: "Drive 200-300% more map views and direction requests",
      description: "Complete GBP optimization with ongoing management. Includes initial audit & cleanup, weekly posts, Q&A monitoring, photo optimization, and monthly performance reports."
    }
  },
  {
    id: 'reviews',
    name: 'Review Screener',
    shortName: 'Review Screener',
    icon: '⭐',
    badge: 'Recommended',
    badgeColor: 'violet',
    currentPrice: '$1,200',
    proposedPrice: '$997 setup + $297/mo',
    pricing: { setup: 997, monthly: 297, model: 'Setup + Recurring', minimumCommitment: '3 months' },
    margins: { setup: '70%', monthly: '65%' },
    overview: {
      what: "Review Screener is an intelligent review generation and management system that automatically requests reviews from your customers, routes happy customers to leave public reviews on Google (and other platforms), while directing unhappy customers to private feedback channels where you can resolve issues before they become public complaints.",
      whyItMatters: "Reviews are the #1 factor consumers use when choosing between local businesses. 93% of consumers say online reviews impact their purchasing decisions, and businesses with 4+ stars earn 28% more revenue than competitors. But manually asking for reviews is inconsistent, and bad reviews can devastate your reputation.",
      clientExpects: [
        "Custom-branded review request landing page",
        "Automated SMS and email review request campaigns",
        "Smart routing: 4-5 star ratings → Google, 1-3 stars → private feedback",
        "Integration with your CRM or job management software",
        "Real-time alerts when new reviews are posted",
        "Review response templates and guidance",
        "Monthly review analytics and growth tracking",
        "Multi-platform support (Google, Facebook, Yelp, industry-specific)"
      ]
    },
    tools: [
      { name: "GatherUp / Grade.us", role: "Review Platform", description: "White-label review generation platform that powers the entire review funnel—from request to collection to monitoring.", cost: "$99-199/mo", importance: "The core engine that automates review generation and routing", status: 'evaluating' },
      { name: "Twilio", role: "SMS Delivery", description: "Enterprise-grade SMS platform that ensures review requests are delivered reliably.", cost: "~$0.01/message", importance: "SMS requests get 3-5x higher response rates than email alone", status: 'selected' },
      { name: "Zapier / Make", role: "Automation", description: "Connects your existing systems to automatically trigger review requests when jobs are completed.", cost: "$20-70/mo", importance: "Enables hands-free automation without manual data entry", status: 'active' },
      { name: "GoHighLevel", role: "Alternative Platform", description: "All-in-one platform that can replace multiple tools. Includes review requests, SMS, email, and CRM.", cost: "$97-297/mo", importance: "Cost-effective option that consolidates multiple tools", status: 'evaluating' }
    ],
    stripe: {
      products: [
        { name: "Review Screener - Setup", productId: "prod_reviews_setup", priceModel: "One-time: $997.00", metadata: "service_type: reviews | phase: setup | hours_included: 6" },
        { name: "Review Screener - Monthly", productId: "prod_reviews_monthly", priceModel: "Recurring: $297.00/month", billingInterval: "Monthly (3-month minimum)", metadata: "service_type: reviews | phase: active | sms_included: 500" }
      ]
    },
    website: {
      displayPrice: '"$997 setup + $297/mo"',
      badge: "Recommended",
      tagline: "Generate 400-600% more 5-star reviews with smart routing",
      description: "Automated review generation system with smart routing. Happy customers go to Google; unhappy customers come to you first."
    }
  },
  {
    id: 'chatbot',
    name: 'AI Chat Bot',
    shortName: 'AI Chat Bot',
    icon: '🤖',
    badge: 'AI-Powered',
    badgeColor: 'cyan',
    currentPrice: '$1,800',
    proposedPrice: '$1,497 setup + $147/mo',
    pricing: { setup: 1497, monthly: 147, model: 'Setup + Recurring', usage: '1,000 conversations/mo included' },
    margins: { setup: '75%', monthly: '72%' },
    overview: {
      what: "AI Chat Bot is a custom-trained conversational AI assistant that lives on your website and engages visitors 24/7. Unlike basic chatbots with rigid decision trees, our AI chatbot uses natural language processing to understand questions, provide helpful answers about your services, capture lead information, and even book appointments.",
      whyItMatters: "79% of consumers prefer live chat for quick questions, but most small businesses can't staff chat 24/7. Meanwhile, 55% of website visitors leave within 15 seconds if they don't find what they need. An AI chatbot engages every visitor instantly, answers their questions, and captures their information before they bounce.",
      clientExpects: [
        "Custom AI chatbot trained on your specific services, pricing, and FAQs",
        "Natural conversational flow that matches your brand voice",
        "Lead capture with automatic CRM/email integration",
        "Appointment booking integration with your calendar",
        "Smart handoff to human staff during business hours",
        "Conversation transcripts and analytics dashboard",
        "Ongoing training and optimization based on real conversations",
        "Mobile-optimized chat widget with customizable design"
      ]
    },
    tools: [
      { name: "Tidio / Botpress", role: "Chat Platform", description: "The chat interface and bot builder that powers conversations.", cost: "$29-99/mo", importance: "Foundation of the chat experience", status: 'evaluating' },
      { name: "OpenAI API (GPT-4)", role: "AI Intelligence", description: "The artificial intelligence that enables natural language understanding and generation.", cost: "$20-50/mo (usage-based)", importance: "The 'brain' that makes conversations feel human", status: 'selected' },
      { name: "Custom Training Corpus", role: "Knowledge Base", description: "We build a custom knowledge base from your website, FAQs, pricing, service descriptions.", cost: "Included in setup", importance: "Ensures accurate, relevant responses specific to your business", status: 'active' },
      { name: "Calendly / Cal.com", role: "Scheduling Integration", description: "Connects the chatbot to your calendar so visitors can book appointments directly.", cost: "$0-16/mo", importance: "Converts conversations into booked appointments automatically", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "AI Chat Bot - Setup", productId: "prod_chatbot_setup", priceModel: "One-time: $1,497.00", metadata: "service_type: chatbot | phase: setup | hours_included: 10" },
        { name: "AI Chat Bot - Monthly", productId: "prod_chatbot_monthly", priceModel: "Recurring: $147.00/month", billingInterval: "Monthly", metadata: "service_type: chatbot | phase: active | conversations_included: 1000" }
      ]
    },
    website: {
      displayPrice: '"$1,497 setup + $147/mo"',
      badge: "AI-Powered",
      tagline: "Capture leads 24/7 and answer questions instantly with AI",
      description: "Custom AI chatbot trained on your business. Answers FAQs, captures leads, books appointments, and hands off to your team when needed."
    }
  },
  {
    id: 'seo',
    name: 'Local SEO + On-Page SEO',
    shortName: 'Local SEO',
    icon: '🔍',
    badge: 'Popular',
    badgeColor: 'emerald',
    currentPrice: '$2,500',
    proposedPrice: '$497/mo (6-mo min)',
    pricing: { setup: 0, monthly: 497, model: 'Recurring Only', minimumCommitment: '6 months', prepayDiscount: '$2,682 prepaid (10% off)' },
    margins: { monthly: '62%' },
    overview: {
      what: "Local SEO + On-Page SEO is a comprehensive search engine optimization service focused on helping your business rank higher in local search results. This includes technical website optimization, content strategy, local citation building, link acquisition, and ongoing rank tracking.",
      whyItMatters: "72% of consumers who perform a local search visit a store within 5 miles. Organic search drives 53% of all website traffic, and unlike paid ads, SEO results compound over time. Local businesses that invest in SEO see an average of 14.6% conversion rate from organic search.",
      clientExpects: [
        "Comprehensive technical SEO audit and fixes",
        "Keyword research targeting high-intent local searches",
        "On-page optimization of title tags, meta descriptions, headers, and content",
        "Local citation building and cleanup across 50+ directories",
        "Google Search Console setup and monitoring",
        "Content strategy and optimization recommendations",
        "Monthly rank tracking for 20+ keywords",
        "Detailed monthly reports with progress and next steps",
        "Competitor analysis and gap identification"
      ]
    },
    tools: [
      { name: "Ahrefs / SEMrush", role: "SEO Platform", description: "Industry-leading SEO suite for keyword research, backlink analysis, rank tracking, and competitive intelligence.", cost: "$99-249/mo", importance: "Essential for data-driven SEO decisions", status: 'selected' },
      { name: "Surfer SEO", role: "Content Optimization", description: "AI-powered content optimization tool that analyzes top-ranking pages.", cost: "$59-199/mo", importance: "Ensures content is optimized based on what's actually ranking", status: 'evaluating' },
      { name: "Screaming Frog", role: "Technical Audits", description: "Website crawler that identifies technical SEO issues.", cost: "$259/yr (~$22/mo)", importance: "Critical for identifying and fixing technical issues", status: 'active' },
      { name: "BrightLocal", role: "Local Citations", description: "Manages your business listings across 50+ directories.", cost: "$29-79/mo", importance: "Citation consistency is a key local ranking factor", status: 'selected' },
      { name: "Google Search Console", role: "Performance Data", description: "Free tool from Google that shows exactly how your site performs in search.", cost: "Free", importance: "Direct data from Google about your search performance", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "Local SEO - Monthly", productId: "prod_localseo_monthly", priceModel: "Recurring: $497.00/month", billingInterval: "Monthly (6-month minimum)", metadata: "service_type: seo | min_commitment_months: 6 | keywords_tracked: 20" }
      ]
    },
    website: {
      displayPrice: '"$497/mo" with "6-month minimum" note',
      badge: "Popular",
      tagline: "Rank higher in local search and drive sustainable organic traffic",
      description: "Comprehensive local SEO including technical audits, on-page optimization, content strategy, citation building, and monthly reporting."
    }
  },
  {
    id: 'ads',
    name: 'Google Ads / Search Marketing',
    shortName: 'Google Ads',
    icon: '📢',
    badge: null,
    badgeColor: null,
    currentPrice: '$3,000',
    proposedPrice: '$997 setup + $597/mo',
    pricing: { setup: 997, monthly: 597, model: 'Setup + Recurring', minimumCommitment: '3 months', note: 'Ad spend billed separately to client' },
    margins: { setup: '70%', monthly: '58%' },
    overview: {
      what: "Google Ads / Search Marketing is a full-service paid advertising management program. We build, launch, and continuously optimize Google Ads campaigns that put your business at the top of search results for high-intent keywords.",
      whyItMatters: "While SEO builds long-term organic visibility, Google Ads delivers immediate results. When someone searches 'emergency plumber near me,' the top results are ads—and those businesses get the call. Google Ads lets you appear instantly for high-intent searches.",
      clientExpects: [
        "Complete Google Ads account setup and structure",
        "In-depth keyword research for your services and area",
        "Compelling ad copy with multiple variations for testing",
        "Landing page recommendations or builds for conversion",
        "Call tracking setup with recorded calls",
        "Conversion tracking for forms, calls, and bookings",
        "Daily bid management and optimization",
        "A/B testing of ads, keywords, and landing pages",
        "Weekly performance monitoring and adjustments",
        "Monthly strategy calls and detailed reporting"
      ]
    },
    tools: [
      { name: "Google Ads", role: "Advertising Platform", description: "Google's advertising platform where campaigns are built and managed.", cost: "Client pays ad spend directly", importance: "The platform where your ads run", status: 'active' },
      { name: "SEMrush / SpyFu", role: "Competitive Intelligence", description: "Tools to research competitor ads, keywords they're bidding on.", cost: "$39-249/mo", importance: "Reveals competitor strategies and opportunities", status: 'selected' },
      { name: "CallRail", role: "Call Tracking", description: "Tracks which ads and keywords generate phone calls. Records calls for quality review.", cost: "$45-95/mo", importance: "Essential for measuring true ROI when most leads come by phone", status: 'selected' },
      { name: "Unbounce", role: "Landing Pages", description: "Landing page builder for creating high-converting pages specifically designed for ad traffic.", cost: "$99-199/mo", importance: "Dedicated landing pages convert 2-3x better than homepage", status: 'evaluating' },
      { name: "Optmyzr", role: "PPC Automation", description: "Advanced optimization platform that automates bid adjustments.", cost: "$99-249/mo", importance: "Enables efficient management and catches issues humans might miss", status: 'evaluating' }
    ],
    stripe: {
      products: [
        { name: "Google Ads Management - Setup", productId: "prod_googleads_setup", priceModel: "One-time: $997.00", metadata: "service_type: ppc | phase: setup | hours_included: 15" },
        { name: "Google Ads Management - Monthly", productId: "prod_googleads_monthly", priceModel: "Recurring: $597.00/month", billingInterval: "Monthly (3-month minimum)", metadata: "service_type: ppc | phase: management | ad_spend_max: 5000" }
      ]
    },
    website: {
      displayPrice: '"$997 setup + $597/mo" with "+ ad spend" note',
      badge: "None",
      tagline: "Immediate visibility and qualified leads through targeted campaigns",
      description: "Full-service Google Ads management including campaign setup, keyword research, ad copywriting, bid optimization, and A/B testing."
    }
  },
  {
    id: 'analytics',
    name: 'Analytics + Reporting Dashboards',
    shortName: 'Analytics',
    icon: '📊',
    badge: 'Recommended',
    badgeColor: 'violet',
    currentPrice: '$1,500',
    proposedPrice: '$997 setup + $97/mo',
    pricing: { setup: 997, monthly: 97, model: 'Setup + Recurring' },
    margins: { setup: '75%', monthly: '70%' },
    overview: {
      what: "Analytics + Reporting Dashboards is a custom business intelligence solution that consolidates all your marketing data into a single, easy-to-understand dashboard. We connect Google Analytics, Search Console, call tracking, ad platforms, and CRM data into live dashboards.",
      whyItMatters: "Most business owners are either drowning in data or flying blind. You might have Google Analytics, but do you actually look at it? Can you tell which marketing channel drives the most revenue? Analytics Dashboards solve this by putting the metrics that matter in front of you.",
      clientExpects: [
        "Custom dashboard design based on your KPIs",
        "Integration of all marketing data sources",
        "Real-time or daily data refresh",
        "Mobile-friendly dashboard access",
        "Monthly PDF report delivered to your inbox",
        "Executive summary highlighting wins and concerns",
        "Recommendations based on data patterns",
        "Quarterly strategy review calls"
      ]
    },
    tools: [
      { name: "Google Analytics 4", role: "Website Analytics", description: "Google's analytics platform that tracks website traffic, user behavior, conversions.", cost: "Free", importance: "Core data source for understanding website performance", status: 'active' },
      { name: "Google Search Console", role: "SEO Data", description: "Provides search performance data—which queries bring visitors, your average ranking positions.", cost: "Free", importance: "The only source of actual search query data from Google", status: 'active' },
      { name: "Looker Studio", role: "Dashboard Builder", description: "Google's free visualization platform that connects to multiple data sources.", cost: "Free", importance: "Enables beautiful, shareable dashboards at no additional cost", status: 'active' },
      { name: "AgencyAnalytics", role: "White-Label Reporting", description: "Professional reporting platform designed for agencies. Automates report generation.", cost: "$49-179/mo", importance: "Streamlines reporting and provides professional presentation", status: 'selected' },
      { name: "CallRail", role: "Call Attribution", description: "Tracks phone calls back to their source—which ad, keyword, or page drove each call.", cost: "$45-95/mo", importance: "Without call tracking, you're missing half the conversion picture", status: 'selected' }
    ],
    stripe: {
      products: [
        { name: "Analytics Dashboard - Setup", productId: "prod_analytics_setup", priceModel: "One-time: $997.00", metadata: "service_type: analytics | phase: setup | hours_included: 8" },
        { name: "Analytics Dashboard - Monthly", productId: "prod_analytics_monthly", priceModel: "Recurring: $97.00/month", billingInterval: "Monthly", metadata: "service_type: analytics | phase: reporting | reports_per_month: 1" }
      ]
    },
    website: {
      displayPrice: '"$997 setup + $97/mo"',
      badge: "Recommended",
      tagline: "Track every metric and optimize based on real data",
      description: "Custom dashboard connecting all your marketing data in one view. Includes GA4, Search Console, call tracking, and conversions."
    }
  },
  {
    id: 'branding',
    name: 'Branding / Identity Design',
    shortName: 'Branding',
    icon: '🎨',
    badge: null,
    badgeColor: null,
    currentPrice: '$2,500',
    proposedPrice: '$2,997',
    pricing: { setup: 2997, monthly: 0, model: 'One-Time Project', paymentOptions: '50% deposit + 50% on delivery' },
    margins: { project: '68%' },
    overview: {
      what: "Branding / Identity Design is a comprehensive visual identity development service. We create a complete brand system including logo design, color palette, typography, and brand guidelines that give your business a cohesive, professional look across all touchpoints.",
      whyItMatters: "First impressions are formed in 7 seconds, and 75% of consumers judge a company's credibility based on its visual design. A professional brand identity builds trust before you ever speak to a prospect. It differentiates you from competitors who look generic.",
      clientExpects: [
        "Discovery session to understand your business, values, and goals",
        "Competitive analysis of branding in your market",
        "3 initial logo concepts in different directions",
        "3 rounds of revisions on selected concept",
        "Final logo in all formats (vector, PNG, horizontal, stacked, icon)",
        "Primary and secondary color palette with hex codes",
        "Typography system with primary and secondary fonts",
        "Brand guidelines document (PDF) for consistent application",
        "All source files (AI, EPS, PSD) for future use"
      ]
    },
    tools: [
      { name: "Adobe Illustrator", role: "Logo Design", description: "Industry-standard vector design software for creating scalable logos.", cost: "$22/mo (part of Creative Cloud)", importance: "Produces professional vector files", status: 'active' },
      { name: "Adobe Photoshop", role: "Image Editing", description: "Photo editing and manipulation for creating mockups, editing imagery.", cost: "Included in Creative Cloud", importance: "Essential for creating realistic mockups", status: 'active' },
      { name: "Figma", role: "Design & Collaboration", description: "Collaborative design platform for creating brand guidelines, presenting concepts.", cost: "$0-15/mo", importance: "Enables smooth client collaboration", status: 'active' },
      { name: "Adobe Fonts / Google Fonts", role: "Typography", description: "Professional font libraries with thousands of typefaces.", cost: "Included / Free", importance: "Access to premium fonts that elevate the brand", status: 'active' },
      { name: "Coolors / Adobe Color", role: "Color Development", description: "Color palette generation and harmony tools.", cost: "Free", importance: "Ensures colors work together and meet accessibility standards", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "Brand Identity Package", productId: "prod_branding", priceModel: "One-time: $2,997.00", paymentOptions: "Full payment or 50% deposit + 50% on delivery", metadata: "service_type: branding | revisions_included: 3 | deliverables: logo,colors,fonts,guidelines" }
      ]
    },
    website: {
      displayPrice: '"$2,997"',
      badge: "None",
      tagline: "Professional brand identity that builds trust and recognition",
      description: "Complete brand identity including logo design (3 concepts, 3 revisions), color palette, typography system, and brand guidelines document."
    }
  },
  {
    id: 'design',
    name: 'Graphic Design + Print Assets',
    shortName: 'Graphic Design',
    icon: '🖼️',
    badge: null,
    badgeColor: null,
    currentPrice: '$800',
    proposedPrice: '$1,297',
    pricing: { setup: 1297, monthly: 0, model: 'One-Time Project', note: 'Print costs not included' },
    margins: { project: '65%' },
    overview: {
      what: "Graphic Design + Print Assets is a marketing collateral design service that creates professional print-ready materials for your business. This includes business cards, service flyers, brochures, door hangers, yard signs, vehicle graphics templates, and social media templates.",
      whyItMatters: "Even in a digital world, print materials matter for local service businesses. Technicians need business cards, door hangers drive neighborhood awareness, vehicle wraps turn your truck into a mobile billboard. Professional design ensures every touchpoint reinforces credibility.",
      clientExpects: [
        "Business card design (front and back)",
        "Service flyer or leave-behind (8.5x11)",
        "Social media templates (3 designs for posts)",
        "All files in print-ready format (PDF with bleeds and crops)",
        "Web-optimized versions for digital use",
        "2 rounds of revisions per piece",
        "Source files (AI/PSD) for future edits",
        "Print vendor recommendations if needed"
      ]
    },
    tools: [
      { name: "Adobe InDesign", role: "Print Layout", description: "Industry-standard page layout software for creating print materials.", cost: "$22/mo (part of Creative Cloud)", importance: "Produces professional print files", status: 'active' },
      { name: "Adobe Illustrator", role: "Vector Graphics", description: "Creates scalable vector elements, icons, and graphics.", cost: "Included in Creative Cloud", importance: "Essential for logos and graphics that need to scale", status: 'active' },
      { name: "Canva Pro", role: "Quick Design", description: "Accessible design platform for creating social media templates.", cost: "$13/mo", importance: "Enables client self-service for ongoing social content needs", status: 'active' },
      { name: "Placeit / Mockup World", role: "Mockup Creation", description: "Libraries of realistic mockup templates.", cost: "$0-15/mo", importance: "Helps clients visualize final products before printing", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "Print & Marketing Assets Package", productId: "prod_graphicdesign", priceModel: "One-time: $1,297.00", metadata: "service_type: design | package: starter | assets: 5" }
      ]
    },
    website: {
      displayPrice: '"Starting at $1,297"',
      badge: "None",
      tagline: "Marketing materials that convert: flyers, cards, signage",
      description: "Professional print-ready assets for your business. Includes business cards, service flyer, and social media templates."
    }
  },
  {
    id: 'crm',
    name: 'Custom CRM + Automations',
    shortName: 'Custom CRM',
    icon: '⚙️',
    badge: 'Enterprise',
    badgeColor: 'amber',
    currentPrice: '$5,000',
    proposedPrice: '$4,997 setup + $297/mo',
    pricing: { setup: 4997, monthly: 297, model: 'Setup + Recurring', minimumCommitment: '12 months recommended', paymentOptions: '50% deposit + 50% on launch' },
    margins: { setup: '70%', monthly: '60%' },
    overview: {
      what: "Custom CRM + Automations is a comprehensive business systems implementation that gives you a central hub for managing leads, customers, and communications. We build a customized CRM tailored to your business processes, complete with automated workflows.",
      whyItMatters: "Most local service businesses lose 30-50% of potential revenue due to poor follow-up. Leads slip through the cracks, estimates aren't followed up, past customers are never contacted again. A CRM solves this by ensuring every lead is tracked and every follow-up happens automatically.",
      clientExpects: [
        "Complete CRM platform setup and configuration",
        "Custom pipeline stages matching your sales process",
        "Lead capture forms integrated with your website",
        "Automated email sequences for lead nurturing",
        "Automated SMS follow-ups for estimates and appointments",
        "Appointment scheduling with automated reminders",
        "Post-job follow-up sequences (review requests, referral asks)",
        "Integration with your existing tools where possible",
        "Team training (2-hour session + recorded walkthrough)",
        "2 hours monthly support for adjustments and questions"
      ]
    },
    tools: [
      { name: "GoHighLevel", role: "All-in-One Platform", description: "Comprehensive platform that combines CRM, email marketing, SMS, phone system, calendar booking, website builder.", cost: "$97-297/mo", importance: "The foundation—replaces 5-10 separate tools", status: 'selected' },
      { name: "Zapier / Make", role: "Integration Hub", description: "Connects the CRM to other business tools—job management software, accounting systems.", cost: "$20-159/mo", importance: "Ensures data flows between systems without manual entry", status: 'active' },
      { name: "Twilio", role: "SMS & Voice", description: "Powers SMS automations and phone system features.", cost: "$50-200/mo (usage-based)", importance: "SMS has 98% open rates—critical for effective follow-up", status: 'selected' },
      { name: "ActiveCampaign", role: "Alternative Platform", description: "Email marketing and automation platform. Used when clients need more sophisticated email sequences.", cost: "$29-149/mo", importance: "Best-in-class email automation for complex nurturing sequences", status: 'evaluating' },
      { name: "Calendly / Cal.com", role: "Scheduling", description: "Online scheduling that syncs with calendars and embeds in the CRM.", cost: "$0-16/mo", importance: "Removes friction from booking appointments", status: 'active' }
    ],
    stripe: {
      products: [
        { name: "Custom CRM & Automations - Setup", productId: "prod_crm_setup", priceModel: "One-time: $4,997.00", paymentOptions: "Full or 50% deposit / 50% on launch", metadata: "service_type: crm | phase: setup | hours_included: 40" },
        { name: "Custom CRM & Automations - Monthly", productId: "prod_crm_monthly", priceModel: "Recurring: $297.00/month", billingInterval: "Monthly (12-month minimum recommended)", metadata: "service_type: crm | phase: active | support_hours: 2" }
      ]
    },
    website: {
      displayPrice: '"$4,997 setup + $297/mo"',
      badge: "Enterprise",
      tagline: "Automate follow-ups, track leads, and close more deals",
      description: "Custom CRM built for your business. Includes pipeline setup, email/SMS sequences, appointment scheduling, and automated follow-ups."
    }
  }
];

export const getTotalSetup = (): number => services.reduce((sum, s) => sum + s.pricing.setup, 0);
export const getTotalMonthly = (): number => services.reduce((sum, s) => sum + s.pricing.monthly, 0);
export const getYear1LTV = (): number => getTotalSetup() + (getTotalMonthly() * 12);
export const getYear2LTV = (): number => getTotalSetup() + (getTotalMonthly() * 24);
