// frontend/src/modules/client/pages/PostListClientPage.tsx
'use client';

import React from 'react';
import { PropertyList } from '../property/components/PropertyList';
import { MOCK_PROPERTY_DEMANDS } from '../property/models/property.data';

export const PostListClientPage: React.FC = () => {
  return <PropertyList initialPosts={MOCK_PROPERTY_DEMANDS} />;
};

export default PostListClientPage;
