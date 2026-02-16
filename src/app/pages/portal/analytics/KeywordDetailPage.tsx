import { useParams, useNavigate } from 'react-router-dom';
import { KeywordDetailView } from './KeywordDetailView';

export function KeywordDetailPage() {
  const { keyword } = useParams();
  const navigate = useNavigate();

  return (
    <KeywordDetailView
      keyword={decodeURIComponent(keyword || '')}
      onBack={() => navigate('/portal/analytics')}
    />
  );
}
