'use client';

import { motion } from 'framer-motion';
import { Code2, BookOpen, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { socials } from '@/content/socials';
import { fadeInUp } from '@/animations/variants';
import { Logo } from '@/components/shared/Logo';

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Code2,
  BookOpen,
  Mail,
};

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & tagline */}
          <div>
            <div className="mb-3">
              <Logo size={52} />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Building elegant, performant web experiences. Open to new
              opportunities.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 flex-wrap">
              {socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? Mail;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target={
                      social.url.startsWith('mailto') ? undefined : '_blank'
                    }
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Prathmesh Parab. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />{' '}
            using{' '}
            <span className="text-foreground font-medium">
              Next.js, TypeScript & Shadcn UI
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
