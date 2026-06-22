import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { ReflectionPrompt } from "@/components/mdx/reflection-prompt";
import { CalloutBox } from "@/components/mdx/callout-box";
import { JournalPrompt } from "@/components/mdx/journal-prompt";

/* eslint-disable @typescript-eslint/no-explicit-any */
const mdxComponents: Record<string, React.ComponentType<any>> = {
  ReflectionPrompt,
  CalloutBox,
  JournalPrompt,
};

interface MdxArticleProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MdxArticle({ source, components }: MdxArticleProps) {
  return (
    <article className="prose prose-ink max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
        components={{ ...mdxComponents, ...components }}
      />
    </article>
  );
}
