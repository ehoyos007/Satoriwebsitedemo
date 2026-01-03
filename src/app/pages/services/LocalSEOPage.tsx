import { ServicePageTemplate } from './ServicePageTemplate';
import { localSEOConfig } from '@/app/data/serviceConfigs/localSEO';

export function LocalSEOPage() {
  return <ServicePageTemplate config={localSEOConfig} />;
}
