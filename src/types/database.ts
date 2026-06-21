export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null;
          body_md: string;
          cover_image_url: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          is_published: boolean;
          published_at: string | null;
          reading_time_min: number | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          tags: string[] | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          body_md?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean;
          published_at?: string | null;
          reading_time_min?: number | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          tags?: string[] | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          body_md?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          is_published?: boolean;
          published_at?: string | null;
          reading_time_min?: number | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          tags?: string[] | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      feature_flags: {
        Row: {
          description: string | null;
          enabled: boolean;
          id: string;
          key: string;
          payload: Json | null;
          updated_at: string;
        };
        Insert: {
          description?: string | null;
          enabled?: boolean;
          id?: string;
          key: string;
          payload?: Json | null;
          updated_at?: string;
        };
        Update: {
          description?: string | null;
          enabled?: boolean;
          id?: string;
          key?: string;
          payload?: Json | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      library_articles: {
        Row: {
          author_id: string | null;
          body_md: string;
          category: Database["public"]["Enums"]["article_category"];
          created_at: string;
          id: string;
          is_published: boolean;
          position: number;
          related_types: number[] | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          title: string;
          type_tag: number | null;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          body_md?: string;
          category?: Database["public"]["Enums"]["article_category"];
          created_at?: string;
          id?: string;
          is_published?: boolean;
          position?: number;
          related_types?: number[] | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          title: string;
          type_tag?: number | null;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          body_md?: string;
          category?: Database["public"]["Enums"]["article_category"];
          created_at?: string;
          id?: string;
          is_published?: boolean;
          position?: number;
          related_types?: number[] | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          title?: string;
          type_tag?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      quiz_sessions: {
        Row: {
          answers: Json;
          created_at: string;
          finished_at: string | null;
          id: string;
          ip_hash: string | null;
          mode: Database["public"]["Enums"]["quiz_mode"];
          raw_scores: Json | null;
          result_confidence:
            | Database["public"]["Enums"]["confidence_level"]
            | null;
          result_instinct: string | null;
          result_type: number | null;
          result_wing: number | null;
          started_at: string;
          user_id: string | null;
        };
        Insert: {
          answers?: Json;
          created_at?: string;
          finished_at?: string | null;
          id?: string;
          ip_hash?: string | null;
          mode?: Database["public"]["Enums"]["quiz_mode"];
          raw_scores?: Json | null;
          result_confidence?:
            | Database["public"]["Enums"]["confidence_level"]
            | null;
          result_instinct?: string | null;
          result_type?: number | null;
          result_wing?: number | null;
          started_at?: string;
          user_id?: string | null;
        };
        Update: {
          answers?: Json;
          created_at?: string;
          finished_at?: string | null;
          id?: string;
          ip_hash?: string | null;
          mode?: Database["public"]["Enums"]["quiz_mode"];
          raw_scores?: Json | null;
          result_confidence?:
            | Database["public"]["Enums"]["confidence_level"]
            | null;
          result_instinct?: string | null;
          result_type?: number | null;
          result_wing?: number | null;
          started_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      article_category:
        | "core-type"
        | "wing"
        | "instinct"
        | "growth"
        | "relationship"
        | "responsible-use"
        | "overview";
      confidence_level: "low" | "medium" | "high";
      quiz_mode: "quick" | "full";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema =
  DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

// Re-export commonly used types for convenience
export type ArticleCategory =
  Database["public"]["Enums"]["article_category"];
export type QuizMode = Database["public"]["Enums"]["quiz_mode"];
export type ConfidenceLevel =
  Database["public"]["Enums"]["confidence_level"];
