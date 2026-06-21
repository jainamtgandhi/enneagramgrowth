import { MDXRemote } from "next-mdx-remote/rsc";

interface ArticleContentProps {
  content: string;
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-heading text-4xl font-bold tracking-tight mt-8 mb-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-heading text-2xl font-semibold tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-heading text-xl font-semibold mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 mb-4 text-foreground/90" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary underline underline-offset-4 hover:text-primary/80" {...props} />
  ),
};

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose-custom max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
