import { supabase } from '@/integrations/supabase/client';
import type { Question } from '@/context/QuizContext';

const MAX_RETRIES = 3;

export const generateQuestions = async (topic: string): Promise<Question[]> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: { topic, attempt },
      });

      if (error) throw new Error(error.message);

      if (data.error) throw new Error(data.error);

      const questions = data.questions;

      // Validate the structure
      if (!Array.isArray(questions) || questions.length !== 5) {
        throw new Error('Invalid number of questions');
      }

      for (const q of questions) {
        if (
          typeof q.question !== 'string' ||
          !Array.isArray(q.options) ||
          q.options.length !== 4 ||
          typeof q.correctIndex !== 'number' ||
          q.correctIndex < 0 ||
          q.correctIndex > 3
        ) {
          throw new Error('Invalid question format');
        }
      }

      return questions;
    } catch (err) {
      console.error(`Attempt ${attempt} failed:`, err);
      lastError = err instanceof Error ? err : new Error('Unknown error');
      
      if (attempt === MAX_RETRIES) {
        throw new Error(`Failed to generate questions after ${MAX_RETRIES} attempts: ${lastError.message}`);
      }
    }
  }

  throw lastError || new Error('Failed to generate questions');
};

export const generateFeedback = async (topic: string, score: number): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-feedback', {
      body: { topic, score },
    });

    if (error) throw new Error(error.message);

    if (data.error) throw new Error(data.error);

    return data.feedback;
  } catch (err) {
    console.error('Failed to generate feedback:', err);
    throw err instanceof Error ? err : new Error('Failed to generate feedback');
  }
};
