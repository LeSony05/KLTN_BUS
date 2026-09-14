// frontend/src/modules/client/home/components/HomeClient.tsx
'use client';

import React, { useState } from 'react';
import { HeroClient } from './HeroClient';
import { CategoryClient } from './CategoryClient';
import { LatestDemandClient } from './LatestDemandClient';
import { WhyUsClient } from './WhyUsClient';
import { CTASection } from './CTASection';
import { MOCK_PROPERTY_DEMANDS } from '../../property/models/property.data';

export const HomeClient: React.FC = () => {
  const [activeSearchTab, setActiveSearchTab] = useState<'BUY' | 'RENT'>('BUY');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [postFilterTab, setPostFilterTab] = useState<'ALL' | 'BUY' | 'RENT'>('ALL');

  return (
    <div className="flex flex-col min-h-screen">
      <HeroClient
        activeSearchTab={activeSearchTab}
        setActiveSearchTab={setActiveSearchTab}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />

      <CategoryClient />

      <LatestDemandClient
        postFilterTab={postFilterTab}
        setPostFilterTab={setPostFilterTab}
        posts={MOCK_PROPERTY_DEMANDS}
      />

      <WhyUsClient />

      <CTASection />
    </div>
  );
};

export default HomeClient;
