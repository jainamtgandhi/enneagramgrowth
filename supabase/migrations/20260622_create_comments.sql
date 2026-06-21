-- Comment system for Enneagram Growth
-- Supports blog posts, type pages, and articles with threaded replies and moderation

CREATE TYPE public.comment_status AS ENUM ('pending', 'approved', 'flagged');

CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type text NOT NULL CHECK (post_type IN ('blog', 'type', 'article')),
  post_slug text NOT NULL,
  author_name text NOT NULL CHECK (char_length(author_name) BETWEEN 1 AND 100),
  author_email text NOT NULL CHECK (author_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 5000),
  parent_id uuid REFERENCES public.comments(id) ON DELETE CASCADE,
  status public.comment_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_comments_post ON public.comments(post_type, post_slug);
CREATE INDEX idx_comments_status ON public.comments(status);
CREATE INDEX idx_comments_parent ON public.comments(parent_id);

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved comments are visible to everyone"
  ON public.comments FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can submit a comment"
  ON public.comments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Facilitators can manage all comments"
  ON public.comments FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
