import { ServicePageTemplate } from './ServicePageTemplate';
import { graphicDesignConfig } from '@/app/data/serviceConfigs/graphicDesign';

export function GraphicDesignPage() {
  return <ServicePageTemplate config={graphicDesignConfig} />;
}
