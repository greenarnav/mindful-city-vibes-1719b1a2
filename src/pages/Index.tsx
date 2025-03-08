
import React from 'react';
import Layout from '@/components/Layout';
import { MoodProvider } from '@/context/MoodContext';
import { Toaster } from '@/components/ui/toaster';
import '../App.css';

const Index = () => {
  return (
    <MoodProvider>
      <Layout />
      <Toaster />
    </MoodProvider>
  );
};

export default Index;
