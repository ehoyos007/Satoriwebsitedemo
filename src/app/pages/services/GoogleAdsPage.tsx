import { ServicePageTemplate } from './ServicePageTemplate';
import { googleAdsConfig } from '@/app/data/serviceConfigs/googleAds';

export function GoogleAdsPage() {
  return <ServicePageTemplate config={googleAdsConfig} />;
}
