import { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { generateQuestions } from '@/utils/aiClient';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorScreen from '@/components/ErrorScreen';
import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

interface QuestionGeneratorScreenProps {
  onQuestionsReady: () => void;
  onBack: () => void;
}

const QuestionGeneratorScreen = ({ onQuestionsReady, onBack }: QuestionGeneratorScreenProps) => {
  const { topic, isLoading, error, setQuestions, setIsLoading, setError } = useQuiz();

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!topic) return;

      setIsLoading(true);
      setError(null);

      try {
        const questions = await generateQuestions(topic);
        setQuestions(questions);
        setIsLoading(false);
        onQuestionsReady();
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Failed to generate questions');
      }
    };

    fetchQuestions();
  }, [topic]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <ThemeToggle />
        <ErrorScreen
          message={error}
          onBack={onBack}
          onRetry={() => {
            setError(null);
            setIsLoading(true);
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden"
    >
      <ThemeToggle />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <div className="text-center relative z-10">
        <LoadingSpinner message={`Generating ${topic} questions...`} />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground mt-4"
        >
          Our AI is crafting the perfect quiz for you
        </motion.p>
      </div>
    </motion.div>
  );
};

export default QuestionGeneratorScreen;
