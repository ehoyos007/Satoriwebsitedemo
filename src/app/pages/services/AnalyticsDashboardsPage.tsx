import { ServicePageTemplate } from './ServicePageTemplate';
import { analyticsDashboardsConfig } from '@/app/data/serviceConfigs/analyticsDashboards';

export function AnalyticsDashboardsPage() {
  return <ServicePageTemplate config={analyticsDashboardsConfig} />;
}
