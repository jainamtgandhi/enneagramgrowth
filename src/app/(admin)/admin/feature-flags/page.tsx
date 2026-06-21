"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { FeatureFlag } from "@/lib/content/types";

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("feature_flags")
      .select("*")
      .order("key")
      .then(({ data, error }) => {
        if (error) toast.error(error.message);
        else setFlags(data ?? []);
        setLoading(false);
      });
  }, []);

  const toggleFlag = async (flag: FeatureFlag) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("feature_flags")
      .update({ enabled: !flag.enabled } as never)
      .eq("id", flag.id);

    if (error) {
      toast.error(error.message);
    } else {
      setFlags((prev) =>
        prev.map((f) =>
          f.id === flag.id ? { ...f, enabled: !f.enabled } : f
        )
      );
      toast.success(`${flag.key} ${!flag.enabled ? "enabled" : "disabled"}`);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="font-heading text-2xl font-bold">Feature Flags</h1>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Feature Flags</h1>
      <div className="mt-6 space-y-3">
        {flags.map((flag) => (
          <Card key={flag.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <Label className="text-sm font-medium">{flag.key}</Label>
                {flag.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {flag.description}
                  </p>
                )}
              </div>
              <Switch
                checked={flag.enabled}
                onCheckedChange={() => toggleFlag(flag)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
