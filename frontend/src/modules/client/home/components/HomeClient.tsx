'use client';

import React, { useState } from 'react';
import { HeroClient } from './HeroClient';
import { PromotionsClient } from './PromotionsClient';
import { PopularRoutesClient } from './PopularRoutesClient';
import { NewsClient } from './NewsClient';
import { EcosystemClient } from './EcosystemClient';

export const HomeClient: React.FC = () => {
  const [activeSearchTab, setActiveSearchTab] = useState<'BUY' | 'RENT'>('BUY');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
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

      <PromotionsClient />
      
      <PopularRoutesClient />
      
      <NewsClient />
      
      <EcosystemClient />
    </div>
  );
};

export default HomeClient;
