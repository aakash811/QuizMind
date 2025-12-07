import { cn } from '@/lib/utils';
import type { Question } from '@/context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-bold gradient-text">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <motion.div
        className="glass rounded-2xl p-8 shadow-xl"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAnswer(index)}
                className={cn(
                  'w-full text-left p-5 rounded-xl border-2 transition-all duration-300',
                  selectedAnswer === index
                    ? 'border-primary bg-primary/10 shadow-lg glow'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                )}
              >
                <span className="inline-flex items-center gap-4">
                  <motion.span
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300',
                      selectedAnswer === index
                        ? 'gradient-bg text-primary-foreground shadow-md'
                        : 'bg-muted/50 text-muted-foreground'
                    )}
                    animate={selectedAnswer === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {optionLabels[index]}
                  </motion.span>
                  <span className={cn(
                    'font-medium transition-colors duration-300',
                    selectedAnswer === index ? 'text-primary' : 'text-foreground'
                  )}>
                    {option}
                  </span>
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
