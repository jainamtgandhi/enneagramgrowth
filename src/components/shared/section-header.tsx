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
      <h2 className="font-serif text-h2 font-semibold text-ink">{title}</h2>
      {description && (
        <p className="text-body-lg text-ink-muted">{description}</p>
      )}
    </div>
  );
}
