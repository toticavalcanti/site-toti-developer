import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutPreview from '@/components/AboutPreview';
import PackagesSection from '@/components/PackagesSection';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import StatsSection from '@/components/StatsSection';
import ClientsMarquee from '@/components/ClientsMarquee';
import TechCredibility from '@/components/TechCredibility';

import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <HeroSection />
      
      <StatsSection />
      
      <TechCredibility />
      
      <FeaturedProjects />
      
      <ServicesOverview />
      
      <ScrollReveal delay={0.2}>
        <AboutPreview />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <HowItWorks />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <PackagesSection />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <CTASection />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <ContactSection />
      </ScrollReveal>
    </div>
  );
}
