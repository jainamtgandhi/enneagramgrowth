import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_COLORS } from "@/lib/enneagram/colors";
import type { EnneagramType } from "@/lib/enneagram/types";

interface TypeCardProps {
  type: EnneagramType;
  slug?: string;
}

export function TypeCard({ type, slug }: TypeCardProps) {
  const info = TYPE_INFO[type];
  const href = slug ? `/library/${slug}` : `/library/type-${type}`;

  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            >
              {type}
            </div>
            <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
              {info.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {info.brief}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {info.keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
