import Image from "next/image";

/** 4:5 portrait revealed with a CSS clip-path inset. Space is reserved by aspect-ratio (no CLS). */
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface">
      <div className="grain clip-in absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1024px) 288px, 272px"
          className="object-cover object-[50%_20%]"
        />
      </div>
    </div>
  );
}
