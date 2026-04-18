import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import ServicesOverview from '@/components/ServicesOverview';
import HowItWorks from '@/components/HowItWorks';
import PackagesSection from '@/components/PackagesSection';
import ChannelsSection from '@/components/ChannelsSection';
import LinksLojasSection from '@/components/LinksLojasSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <FeaturedProjects />
      <HowItWorks />
      <PackagesSection />
      <ChannelsSection />
      <LinksLojasSection />
      <CTASection />
    </>
  );
}
