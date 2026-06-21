import { Card, CardContent } from "@/components/ui/card";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { TYPE_COLORS } from "@/lib/enneagram/colors";
import type { EnneagramType } from "@/lib/enneagram/types";
import type { ConfidenceLevel } from "@/types/database";

interface ResultCardProps {
  primaryType: EnneagramType;
  wing: EnneagramType;
  confidence: ConfidenceLevel;
}

export function ResultCard({ primaryType, wing, confidence }: ResultCardProps) {
  const info = TYPE_INFO[primaryType];
  const wingInfo = TYPE_INFO[wing];

  const confidenceLabel = {
    low: "Exploratory",
    medium: "Moderate",
    high: "Strong",
  };

  const confidenceColor = {
    low: "text-amber-600 bg-amber-50",
    medium: "text-blue-600 bg-blue-50",
    high: "text-green-600 bg-green-50",
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className="h-2" style={{ backgroundColor: TYPE_COLORS[primaryType] }} />
      <CardContent className="p-8 text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white text-3xl font-bold mb-4"
          style={{ backgroundColor: TYPE_COLORS[primaryType] }}
        >
          {primaryType}
        </div>
        <h2 className="font-heading text-3xl font-bold">{info.name}</h2>
        <p className="mt-2 text-muted-foreground">{info.brief}</p>

        <div className="mt-6 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Wing
            </div>
            <div className="mt-1 font-semibold">
              {primaryType}w{wing}
            </div>
            <div className="text-xs text-muted-foreground">
              {wingInfo.name}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">
              Confidence
            </div>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-0.5 text-sm font-medium ${confidenceColor[confidence]}`}
            >
              {confidenceLabel[confidence]}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
