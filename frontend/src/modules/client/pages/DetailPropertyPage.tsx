// frontend/src/modules/client/pages/DetailPropertyPage.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DetailPropertyPost } from '../property/components/DetailPropertyPost';
import { MOCK_PROPERTY_DEMANDS } from '../property/models/property.data';

export const DetailPropertyPage: React.FC = () => {
  const params = useParams();
  const id = (params?.id as string) || '1';

  const matchedPost = MOCK_PROPERTY_DEMANDS.find((p) => p.id === id) || MOCK_PROPERTY_DEMANDS[0];

  return <DetailPropertyPost post={matchedPost} />;
};

export default DetailPropertyPage;
