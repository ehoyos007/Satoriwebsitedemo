import { ServicePageTemplate } from './ServicePageTemplate';
import { brandingConfig } from '@/app/data/serviceConfigs/branding';

export function BrandingPage() {
  return <ServicePageTemplate config={brandingConfig} />;
}
