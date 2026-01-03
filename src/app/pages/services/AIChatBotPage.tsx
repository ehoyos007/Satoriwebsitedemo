import { ServicePageTemplate } from './ServicePageTemplate';
import { aiChatbotConfig } from '@/app/data/serviceConfigs/aiChatbot';

export function AIChatBotPage() {
  return <ServicePageTemplate config={aiChatbotConfig} />;
}
