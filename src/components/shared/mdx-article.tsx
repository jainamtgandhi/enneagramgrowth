import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";

interface MdxArticleProps {
  source: string;
  components?: Record<string, React.ComponentType<Record<string, unknown>>>;
}

export function MdxArticle({ source, components }: MdxArticleProps) {
  return (
    <article className="prose prose-ink max-w-none">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
        components={components}
      />
    </article>
  );
}
