import { useParams, useNavigate } from 'react-router-dom';
import { PageDetailView } from './PageDetailView';

export function PageDetailPage() {
  const { pageUrl } = useParams();
  const navigate = useNavigate();

  return (
    <PageDetailView
      pageUrl={decodeURIComponent(pageUrl || '')}
      onBack={() => navigate('/portal/analytics')}
    />
  );
}
