'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { Button } from '@/components/ui/button';
import { profile } from '@/content/profile';
import { socials } from '@/content/socials';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { submitContact } from '@/actions/contact';
import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from '@/animations/variants';
import { cn } from '@/lib/utils';

const linkedinUrl = socials.find((s) => s.name === 'LinkedIn')?.url ?? '#';
const githubUrl = socials.find((s) => s.name === 'GitHub')?.url ?? '#';

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    href: null,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'Prathmesh Parab',
    href: linkedinUrl,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'prathmesh0',
    href: githubUrl,
  },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const result = await submitContact(data);
      if (result.success) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-black"
          >
            Let&apos;s <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            Have a project in mind or just want to say hi? I&apos;m always open
            to new opportunities and collaborations.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact details */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl font-bold mb-2">Say Hello 👋</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a project, an opportunity, or just want to
                connect - feel free to reach out. I typically respond within 24
                hours.
              </p>
            </motion.div>

            {/* Open to Work badge */}
            <motion.div variants={fadeInLeft}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Open to New Opportunities
              </span>
            </motion.div>

            <motion.div variants={fadeInLeft} className="space-y-4">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={
                          href.startsWith('mailto') ? undefined : '_blank'
                        }
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-2xl p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Name
                  </label>
                  <input
                    {...register('name')}
                    placeholder="John Doe"
                    className={cn(
                      'w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                      errors.name ? 'border-destructive' : 'border-border',
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    className={cn(
                      'w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                      errors.email ? 'border-destructive' : 'border-border',
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  placeholder="Project inquiry"
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                    errors.subject ? 'border-destructive' : 'border-border',
                  )}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none',
                    errors.message ? 'border-destructive' : 'border-border',
                  )}
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-sm"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Something went wrong. Please try again.
                </motion.div>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={!isValid || status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
