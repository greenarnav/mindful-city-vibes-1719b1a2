
import React from 'react';
import Layout from '@/components/Layout';
import { MoodProvider } from '@/context/MoodContext';

const Index = () => {
  return (
    <MoodProvider>
      <Layout />
    </MoodProvider>
  );
};

export default Index;
