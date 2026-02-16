-- ============================================
-- SEED DATA: Services catalog
-- Prices in cents. Stripe Price IDs to be filled after Stripe setup.
-- ============================================

INSERT INTO services (slug, name, description, setup_price_cents, monthly_price_cents, category, display_order, features) VALUES
  ('website-build', 'Website Build', 'Custom-designed, conversion-optimized website built for your local service business.', 99995, NULL, 'core', 1,
    '["Custom design from scratch", "Mobile-responsive", "SEO-optimized structure", "Contact forms & CTAs", "Google Analytics setup", "90-day support"]'::jsonb),

  ('gbp-optimization', 'Google Business Profile Optimization', 'Complete GBP setup and optimization to dominate local search results.', 149500, 19700, 'addon', 2,
    '["Full profile optimization", "Photo & video strategy", "Review response templates", "Weekly post schedule", "Competitor analysis", "Monthly reporting"]'::jsonb),

  ('review-screener', 'Review Screener', 'Automated review collection system that filters and routes customer feedback.', 99700, 29700, 'addon', 3,
    '["Automated review requests", "Sentiment filtering", "Multi-platform support", "Response templates", "Review analytics", "Negative review alerts"]'::jsonb),

  ('ai-chat-bot', 'AI Chat Bot', 'Intelligent chatbot that handles customer inquiries and books appointments 24/7.', 149700, 14700, 'addon', 4,
    '["24/7 availability", "Lead qualification", "Appointment booking", "FAQ handling", "Human handoff", "Conversation analytics"]'::jsonb),

  ('local-seo', 'Local SEO', 'Ongoing local search optimization to increase your visibility in your service area.', NULL, 49700, 'addon', 5,
    '["Keyword research", "On-page optimization", "Citation building", "Link building", "Content strategy", "Monthly ranking reports"]'::jsonb),

  ('google-ads', 'Google Ads Management', 'Strategic Google Ads campaigns that drive qualified leads to your business.', 99700, 59700, 'addon', 6,
    '["Campaign setup", "Keyword targeting", "Ad copywriting", "Bid optimization", "Landing page alignment", "Weekly performance reports"]'::jsonb),

  ('analytics-dashboards', 'Analytics Dashboards', 'Custom analytics dashboard showing your key business metrics in real-time.', 99700, 9700, 'addon', 7,
    '["Custom KPI dashboard", "Traffic analytics", "Conversion tracking", "Lead source attribution", "Monthly trend reports", "Data export"]'::jsonb),

  ('branding', 'Branding Package', 'Complete brand identity design including logo, colors, typography, and brand guidelines.', 299700, NULL, 'addon', 8,
    '["Logo design", "Color palette", "Typography system", "Brand guidelines PDF", "Social media templates", "Business card design"]'::jsonb),

  ('graphic-design', 'Graphic Design', 'Professional graphic design for marketing materials, ads, and digital assets.', 129700, NULL, 'addon', 9,
    '["Marketing collateral", "Social media graphics", "Ad creative", "Infographics", "Presentation design", "Print-ready files"]'::jsonb),

  ('custom-crm', 'Custom CRM', 'Purpose-built CRM system tailored to your business workflow and client management needs.', 499700, 29700, 'addon', 10,
    '["Custom pipeline stages", "Contact management", "Task automation", "Email integration", "Reporting dashboard", "Mobile access"]'::jsonb);
