'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Container from './Container';
import Button from './Button';
import { Menu, X, Code2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');

  const navLinks = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('work'), href: '/cases' },
    { label: t('contact'), href: '/contact' },
  ];

  const handleLanguageChange = (newLocale: 'en' | 'pt') => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // esconde no scroll down, mostra no scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled ? 'backdrop-blur-xl bg-background/70 border-b border-border/50' : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-14 py-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Code2 size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black leading-none tracking-tight">
                TOTI <span className="gradient-text">CAVALCANTI</span>
              </span>
              <span className="text-[10px] font-bold text-foreground-muted uppercase tracking-[0.3em]">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className={cn(
                  'text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative group/link',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground-secondary'
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover/link:w-full"
                )} />
              </Link>
            ))}

            <div className="flex items-center gap-1 p-1 rounded-full bg-background-tertiary border border-border">
              <button
                onClick={() => handleLanguageChange('pt')}
                className={cn(
                  'px-3 py-1 text-[10px] font-black rounded-full transition-all',
                  locale === 'pt' ? 'bg-primary text-white shadow-lg' : 'text-foreground-muted hover:text-foreground'
                )}
              >
                PT
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={cn(
                  'px-3 py-1 text-[10px] font-black rounded-full transition-all',
                  locale === 'en' ? 'bg-primary text-white shadow-lg' : 'text-foreground-muted hover:text-foreground'
                )}
              >
                EN
              </button>
            </div>

            <Button size="sm" asChild className="font-black px-6 shadow-lg shadow-primary/10">
              <Link href="/contact">{t('contact')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
             <button
                onClick={() => handleLanguageChange(locale === 'pt' ? 'en' : 'pt')}
                className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground-muted hover:text-primary transition-colors"
              >
              <Globe size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl bg-background-tertiary border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-effect bg-background/95 border-b border-border shadow-2xl"
          >
            <Container>
              <div className="py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    className={cn(
                      'block py-2 text-xl font-black uppercase tracking-tight transition-all',
                      pathname === link.href
                        ? 'text-primary translate-x-4'
                        : 'text-foreground-secondary hover:text-primary hover:translate-x-2'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background-tertiary border border-border">
                  <span className="text-[10px] text-foreground-muted uppercase tracking-[0.2em] font-black">Language</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleLanguageChange('pt')} className={cn('px-4 py-2 text-xs font-black rounded-xl', locale === 'pt' ? 'bg-primary text-white' : 'text-foreground-muted')}>PT</button>
                    <button onClick={() => handleLanguageChange('en')} className={cn('px-4 py-2 text-xs font-black rounded-xl', locale === 'en' ? 'bg-primary text-white' : 'text-foreground-muted')}>EN</button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button size="lg" className="w-full font-black text-lg py-7 rounded-2xl" asChild>
                    <Link href="/contact">{t('contact')}</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
