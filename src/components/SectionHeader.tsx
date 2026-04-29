import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "relative mb-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] text-filament-cyan/90 mb-3"
          aria-hidden={false}
        >
          {eyebrow}
        </p>
      ) : null}
      <div
        className={cn(
          "absolute -left-4 top-1 h-px w-12 bg-gradient-to-r from-filament-cyan to-transparent opacity-80",
          align === "center" && "left-1/2 -translate-x-1/2",
        )}
        aria-hidden
      />
      <h2
        id={titleId}
        className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.4rem] leading-tight"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
