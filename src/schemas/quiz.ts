import { z } from "zod/v4";

export const quizSubmissionSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.number().int().min(1).max(5),
    })
  ),
  mode: z.enum(["quick", "full"]).default("quick"),
  startedAt: z.string().datetime(),
});

export type QuizSubmission = z.infer<typeof quizSubmissionSchema>;
