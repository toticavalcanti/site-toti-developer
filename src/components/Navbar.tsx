'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from './Container';
import Button from './Button';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Cases', href: '/cases' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass-effect shadow-lg'
          : 'bg-transparent'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code2 size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              Toti <span className="gradient-text">Cavalcanti</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-foreground-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" asChild>
              <Link href="/contato">Falar com Toti</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-effect border-t border-border"
          >
            <Container>
              <div className="py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block py-2.5 px-2 text-sm font-medium transition-colors hover:text-primary rounded-lg hover:bg-background-tertiary',
                      pathname === link.href
                        ? 'text-primary bg-background-tertiary'
                        : 'text-foreground-secondary'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button size="md" className="w-full" asChild>
                    <Link href="/contato">Falar com Toti</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
