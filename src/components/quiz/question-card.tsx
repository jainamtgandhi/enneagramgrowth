"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LikertScale } from "./likert-scale";
import type { QuizItem } from "@/lib/quiz/types";

interface QuestionCardProps {
  item: QuizItem;
  answer: number | undefined;
  onAnswer: (value: number) => void;
  index: number;
  total: number;
}

export function QuestionCard({
  item,
  answer,
  onAnswer,
  index,
  total,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.25 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="text-xs text-muted-foreground mb-4">
              Question {index + 1} of {total}
            </div>
            <p className="text-lg sm:text-xl font-medium leading-relaxed mb-8">
              {item.text}
            </p>
            <LikertScale value={answer} onChange={onAnswer} />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
