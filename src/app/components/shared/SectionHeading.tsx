import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <p className="uppercase tracking-widest mb-2 text-primary text-xs font-bold">{kicker}</p>
      <h2
        className="text-foreground mb-3 font-bold leading-[1.2]"
        style={{ fontSize: "clamp(26px,4vw,40px)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground" style={{ fontSize: "clamp(14px,1.5vw,17px)", lineHeight: 1.7 }}>
          {description}
        </p>
      )}
    </div>
  );
}
