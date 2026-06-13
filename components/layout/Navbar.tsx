'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Monitor, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/components/providers/ThemeProvider';
import { COLOR_THEMES, type DarkMode } from '@/lib/theme-config';
import { cn } from '@/lib/utils';
import { profile } from '@/content/profile';
import { ThemeModeDropdown } from '@/components/ui/ThemeModeDropdown';
import { ColorThemeDropdown } from '@/components/ui/ColorThemeDropdown';
import { Logo } from '@/components/shared/Logo';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'blogs',
  'contact',
];

const MODE_OPTIONS: {
  id: DarkMode;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'system', icon: Monitor, label: 'System' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { mode, color, setMode, setColor } = useTheme();
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo size={40} />
            </button>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                      activeSection === item.href.replace('#', '')
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme mode picker */}
              <div className="hidden md:block">
                <ThemeModeDropdown />
              </div>

              {/* Accent color picker */}
              <div className="hidden md:block">
                <ColorThemeDropdown />
              </div>

              <Button
                variant="gradient"
                size="sm"
                className="hidden md:flex gap-2"
                asChild
              >
                <a href={profile.resume} download>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col pt-20 px-8 pb-8"
          >
            <ul className="flex flex-col gap-2 flex-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left py-3 text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Mobile theme controls */}
            <div className="space-y-3 mb-4">
              {/* Mode */}
              <div className="grid grid-cols-3 gap-2">
                {MODE_OPTIONS.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={cn(
                      'flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-all',
                      mode === id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Color swatches */}
              <div className="flex gap-2 flex-wrap">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setColor(theme.id)}
                    aria-label={theme.label}
                    className={cn(
                      'w-8 h-8 rounded-full transition-all ring-2 ring-offset-2 ring-offset-background',
                      color === theme.id
                        ? 'ring-foreground scale-110'
                        : 'ring-transparent',
                    )}
                    style={{ background: theme.swatch }}
                  />
                ))}
              </div>
            </div>

            <Button variant="gradient" asChild className="w-full">
              <a href={profile.resume} download>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
