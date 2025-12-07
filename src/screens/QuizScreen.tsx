import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import QuestionCard from '@/components/QuestionCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useQuiz } from '@/context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizScreenProps {
  onComplete: () => void;
}

const QuizScreen = ({ onComplete }: QuizScreenProps) => {
  const {
    questions,
    answers,
    currentQuestionIndex,
    selectAnswer,
    setCurrentQuestionIndex,
  } = useQuiz();

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = answers[currentQuestionIndex] !== null;
  const allAnswered = answers.every(a => a !== null);

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      if (allAnswered) {
        onComplete();
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background py-8 px-4 relative overflow-hidden"
    >
      <ThemeToggle />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-b from-primary/5 to-transparent blur-2xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIndex}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onSelectAnswer={(index) => selectAnswer(currentQuestionIndex, index)}
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="gap-2 rounded-xl px-6"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
          </motion.div>

          <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNext}
              disabled={!hasAnswered}
              className="gap-2 rounded-xl px-6 gradient-bg text-white"
            >
              {isLastQuestion ? (
                allAnswered ? (
                  <>
                    Submit
                    <Send className="h-4 w-4" />
                  </>
                ) : (
                  'Answer all'
                )
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Question dots navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {questions.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuestionIndex
                  ? 'gradient-bg w-8'
                  : answers[index] !== null
                  ? 'bg-primary/50'
                  : 'bg-muted'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizScreen;
