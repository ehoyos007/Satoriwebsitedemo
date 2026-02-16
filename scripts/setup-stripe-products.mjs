/**
 * One-time script to create Stripe products and prices for all Satori services,
 * then update the Supabase services table with the Stripe Price IDs.
 *
 * Usage: node scripts/setup-stripe-products.mjs
 */

import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
  console.error('Error: STRIPE_SECRET_KEY environment variable is required.');
  console.error('Usage: STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe-products.mjs');
  process.exit(1);
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://cbeurhcgvqptclggkbhb.supabase.co';

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Services matching the seed data (20260215000003_seed_services.sql)
const services = [
  {
    slug: 'website-build',
    name: 'Website Build',
    description: 'Custom-designed, conversion-optimized website built for your local service business.',
    setup_price_cents: 99995,
    monthly_price_cents: null,
  },
  {
    slug: 'gbp-optimization',
    name: 'Google Business Profile Optimization',
    description: 'Complete GBP setup and optimization to dominate local search results.',
    setup_price_cents: 149500,
    monthly_price_cents: 19700,
  },
  {
    slug: 'review-screener',
    name: 'Review Screener',
    description: 'Automated review collection system that filters and routes customer feedback.',
    setup_price_cents: 99700,
    monthly_price_cents: 29700,
  },
  {
    slug: 'ai-chat-bot',
    name: 'AI Chat Bot',
    description: 'Intelligent chatbot that handles customer inquiries and books appointments 24/7.',
    setup_price_cents: 149700,
    monthly_price_cents: 14700,
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    description: 'Ongoing local search optimization to increase your visibility in your service area.',
    setup_price_cents: null,
    monthly_price_cents: 49700,
  },
  {
    slug: 'google-ads',
    name: 'Google Ads Management',
    description: 'Strategic Google Ads campaigns that drive qualified leads to your business.',
    setup_price_cents: 99700,
    monthly_price_cents: 59700,
  },
  {
    slug: 'analytics-dashboards',
    name: 'Analytics Dashboards',
    description: 'Custom analytics dashboard showing your key business metrics in real-time.',
    setup_price_cents: 99700,
    monthly_price_cents: 9700,
  },
  {
    slug: 'branding',
    name: 'Branding Package',
    description: 'Complete brand identity design including logo, colors, typography, and brand guidelines.',
    setup_price_cents: 299700,
    monthly_price_cents: null,
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    description: 'Professional graphic design for marketing materials, ads, and digital assets.',
    setup_price_cents: 129700,
    monthly_price_cents: null,
  },
  {
    slug: 'custom-crm',
    name: 'Custom CRM',
    description: 'Purpose-built CRM system tailored to your business workflow and client management needs.',
    setup_price_cents: 499700,
    monthly_price_cents: 29700,
  },
];

async function main() {
  console.log('Creating Stripe products and prices...\n');

  const results = [];

  for (const svc of services) {
    // Create the product
    const product = await stripe.products.create({
      name: svc.name,
      description: svc.description,
      metadata: { slug: svc.slug },
    });
    console.log(`✓ Product: ${svc.name} (${product.id})`);

    let setupPriceId = null;
    let monthlyPriceId = null;

    // Create one-time setup price if applicable
    if (svc.setup_price_cents) {
      const setupPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: svc.setup_price_cents,
        currency: 'usd',
        metadata: { type: 'setup', slug: svc.slug },
      });
      setupPriceId = setupPrice.id;
      console.log(`  → Setup price: $${(svc.setup_price_cents / 100).toFixed(2)} (${setupPrice.id})`);
    }

    // Create recurring monthly price if applicable
    if (svc.monthly_price_cents) {
      const monthlyPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: svc.monthly_price_cents,
        currency: 'usd',
        recurring: { interval: 'month' },
        metadata: { type: 'monthly', slug: svc.slug },
      });
      monthlyPriceId = monthlyPrice.id;
      console.log(`  → Monthly price: $${(svc.monthly_price_cents / 100).toFixed(2)}/mo (${monthlyPrice.id})`);
    }

    results.push({ slug: svc.slug, setupPriceId, monthlyPriceId });
    console.log('');
  }

  // Update Supabase services table with Stripe Price IDs
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.log('⚠ SUPABASE_SERVICE_ROLE_KEY not set. Printing UPDATE statements instead:\n');
    for (const r of results) {
      const setParts = [];
      if (r.setupPriceId) setParts.push(`stripe_setup_price_id = '${r.setupPriceId}'`);
      if (r.monthlyPriceId) setParts.push(`stripe_monthly_price_id = '${r.monthlyPriceId}'`);
      if (setParts.length > 0) {
        console.log(`UPDATE services SET ${setParts.join(', ')} WHERE slug = '${r.slug}';`);
      }
    }
    console.log('\nRun these against your Supabase database, or re-run with SUPABASE_SERVICE_ROLE_KEY set.');
  } else {
    console.log('Updating Supabase services table...\n');
    for (const r of results) {
      const body = {};
      if (r.setupPriceId) body.stripe_setup_price_id = r.setupPriceId;
      if (r.monthlyPriceId) body.stripe_monthly_price_id = r.monthlyPriceId;

      if (Object.keys(body).length === 0) continue;

      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/services?slug=eq.${r.slug}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        console.error(`✗ Failed to update ${r.slug}: ${res.status} ${await res.text()}`);
      } else {
        console.log(`✓ Updated ${r.slug} in Supabase`);
      }
    }
  }

  console.log('\nDone! All Stripe products and prices created.');
}

main().catch(console.error);
