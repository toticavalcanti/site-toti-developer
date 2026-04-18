import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutPreview from '@/components/AboutPreview';
import PackagesSection from '@/components/PackagesSection';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';

import StatsSection from '@/components/StatsSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <FeaturedProjects />
      <AboutPreview />
      <HowItWorks />
      <PackagesSection />
      <CTASection />
      <ContactSection />
    </div>
  );
}
