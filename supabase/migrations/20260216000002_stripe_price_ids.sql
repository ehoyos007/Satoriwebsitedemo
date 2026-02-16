-- ============================================
-- Update services with Stripe Price IDs
-- Created by setup-stripe-products.mjs
-- ============================================

UPDATE services SET stripe_setup_price_id = 'price_1T1LxaPeEqK10bESHCREkwIq' WHERE slug = 'website-build';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxbPeEqK10bES2JpavFAf', stripe_monthly_price_id = 'price_1T1LxbPeEqK10bESW1rhJxlS' WHERE slug = 'gbp-optimization';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxbPeEqK10bESYBpmAyaa', stripe_monthly_price_id = 'price_1T1LxcPeEqK10bESVlrudKkB' WHERE slug = 'review-screener';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxcPeEqK10bESQyFPBObE', stripe_monthly_price_id = 'price_1T1LxcPeEqK10bESIKV420EH' WHERE slug = 'ai-chat-bot';
UPDATE services SET stripe_monthly_price_id = 'price_1T1LxdPeEqK10bESLwE1T5SY' WHERE slug = 'local-seo';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxdPeEqK10bESDu4GRhkV', stripe_monthly_price_id = 'price_1T1LxdPeEqK10bES9O0lGkwi' WHERE slug = 'google-ads';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxePeEqK10bESLLFrXBaQ', stripe_monthly_price_id = 'price_1T1LxePeEqK10bES1csBFChQ' WHERE slug = 'analytics-dashboards';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxfPeEqK10bESpfkHLPj1' WHERE slug = 'branding';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxfPeEqK10bES8TSpr5ia' WHERE slug = 'graphic-design';
UPDATE services SET stripe_setup_price_id = 'price_1T1LxgPeEqK10bESCic3BhDF', stripe_monthly_price_id = 'price_1T1LxgPeEqK10bESz9dMkytG' WHERE slug = 'custom-crm';
