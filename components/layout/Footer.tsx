import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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
