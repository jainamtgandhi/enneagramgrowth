interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h2 className="font-heading text-3xl font-bold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
