'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CinematicIntro from '@/components/sections/CinematicIntro';

// Dynamically import heavy sections for better initial load
const SelectedWork = dynamic(() => import('@/components/sections/SelectedWork'));
const DeveloperOS = dynamic(() => import('@/components/sections/DeveloperOS'));
const CollaborationNetwork = dynamic(() => import('@/components/sections/CollaborationNetwork'));
const BuildProcess = dynamic(() => import('@/components/sections/BuildProcess'));
const TechnicalExcellence = dynamic(() => import('@/components/sections/TechnicalExcellence'));
const ClientExperience = dynamic(() => import('@/components/sections/ClientExperience'));
const LiveDashboard = dynamic(() => import('@/components/sections/LiveDashboard'));
const ContactExperience = dynamic(() => import('@/components/sections/ContactExperience'));

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <CinematicIntro />
      <SelectedWork />
      <DeveloperOS />
      <CollaborationNetwork />
      <BuildProcess />
      <TechnicalExcellence />
      <ClientExperience />
      <LiveDashboard />
      <ContactExperience />
      <Footer />
    </main>
  );
}
