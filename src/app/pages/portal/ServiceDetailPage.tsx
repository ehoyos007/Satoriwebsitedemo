import { useParams, useNavigate } from 'react-router-dom';
import { ServiceDetailView } from './ServiceDetailView';

const portalToSlug: Record<string, string> = {
  gbp: 'gbp-optimization',
  reviews: 'review-screener',
  chatbot: 'ai-chat-bot',
  'local-seo': 'local-seo',
  'google-ads': 'google-ads',
  analytics: 'analytics-dashboards',
  branding: 'branding',
  'graphic-design': 'graphic-design',
  crm: 'custom-crm',
};

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const handlePurchase = (id: string, _notes: string) => {
    const slug = portalToSlug[id] || id;
    navigate(`/checkout?service=${slug}`);
  };

  return (
    <ServiceDetailView
      serviceId={serviceId || ''}
      onBack={() => navigate('/portal/services')}
      onPurchase={handlePurchase}
    />
  );
}
