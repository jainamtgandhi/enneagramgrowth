"use client";

import { Button } from "@/components/ui/button";
import { Share2, ExternalLink, LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareNative = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: shareUrl });
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={shareNative}>
        <Share2 className="h-4 w-4 mr-1.5" />
        Share
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={shareTwitter}>
        <ExternalLink className="h-3.5 w-3.5" />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={copyLink}>
        <LinkIcon className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
