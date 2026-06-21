import { MDXRemote } from "next-mdx-remote/rsc";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="prose prose-ink max-w-none">
      <MDXRemote source={content} />
    </article>
  );
}
