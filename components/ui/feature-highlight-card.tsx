import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FeatureHighlightCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
}

export const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const cardItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const cardImageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const FeatureHighlightCard = React.forwardRef<
  HTMLDivElement,
  FeatureHighlightCardProps
>(({ imageSrc, imageAlt = "Feature image", title, description, buttonText, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative w-full max-w-lg overflow-hidden rounded-2xl border bg-card p-8 text-center shadow-sm",
        className
      )}
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute left-1/2 top-0 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <motion.div variants={cardImageVariants} className="mb-6 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} className="h-auto w-full object-contain" />
      </motion.div>

      <motion.h2
        variants={cardItemVariants}
        className="text-3xl font-bold tracking-tight text-card-foreground md:text-4xl"
      >
        {title}
      </motion.h2>

      <motion.p variants={cardItemVariants} className="mt-4 text-base text-muted-foreground">
        {description}
      </motion.p>

      <motion.div variants={cardItemVariants} className="mt-8">
        <Button size="lg" className="w-full sm:w-auto">
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
});

FeatureHighlightCard.displayName = "FeatureHighlightCard";
