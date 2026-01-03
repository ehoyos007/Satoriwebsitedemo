import { ServicePageTemplate } from './ServicePageTemplate';
import { customCRMConfig } from '@/app/data/serviceConfigs/customCRM';

export function CustomCRMPage() {
  return <ServicePageTemplate config={customCRMConfig} />;
}
