import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useQuiz } from '@/context/QuizContext';
import { generateFeedback } from '@/utils/aiClient';
import LoadingSpinner from '@/components/LoadingSpinner';
import ThemeToggle from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

interface ResultScreenProps {
  onRestart: () => void;
}

const ResultScreen = ({ onRestart }: ResultScreenProps) => {
  const {
    topic,
    score,
    feedback,
    isLoading,
    calculateScore,
    setScore,
    setFeedback,
    setIsLoading,
    resetQuiz,
  } = useQuiz();

  useEffect(() => {
    const fetchFeedback = async () => {
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setIsLoading(true);

      try {
        const feedbackText = await generateFeedback(topic || 'Quiz', calculatedScore);
        setFeedback(feedbackText);
      } catch (err) {
        setFeedback("Great effort! Keep learning and improving. Every quiz is a step toward mastery!");
      } finally {
        setIsLoading(false);
      }
    };

    if (score === null) {
      fetchFeedback();
    }
  }, []);

  const handleRestart = () => {
    resetQuiz();
    onRestart();
  };

  const getScoreGradient = () => {
    if (score === null) return 'from-muted to-muted';
    if (score >= 4) return 'from-emerald-500 to-teal-500';
    if (score >= 3) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-pink-500';
  };

  const getScoreMessage = () => {
    if (score === null) return '';
    if (score === 5) return 'Perfect Score!';
    if (score >= 4) return 'Excellent Work!';
    if (score >= 3) return 'Good Job!';
    if (score >= 2) return 'Keep Practicing!';
    return 'Room for Growth';
  };

  if (isLoading && score === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ThemeToggle />
        <LoadingSpinner message="Calculating your results..." />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background py-12 px-4 relative overflow-hidden"
    >
      <ThemeToggle />

      {/* Celebration background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {score !== null && score >= 4 && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  rotate: [0, 360],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'linear',
                }}
              />
            ))}
          </>
        )}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.3, 1, 1.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="glass rounded-3xl p-8 shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${getScoreGradient()} flex items-center justify-center mx-auto mb-6 shadow-lg`}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy className="h-12 w-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-2"
            >
              {getScoreMessage()}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-muted-foreground"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Topic: {topic}</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.4 }}
            className="text-center mb-8"
          >
            <div className={`inline-flex items-baseline gap-2 text-7xl font-bold bg-gradient-to-br ${getScoreGradient()} bg-clip-text text-transparent`}>
              <span>{score}</span>
              <span className="text-3xl text-muted-foreground">/5</span>
            </div>

            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                >
                  <Star
                    className={`h-8 w-8 ${
                      i < (score || 0)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-muted fill-muted'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-muted/30 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-bold text-foreground">AI Feedback</h3>
            </div>
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <motion.div
                  className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Generating personalized feedback...
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground leading-relaxed"
              >
                {feedback}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleRestart}
              className="w-full gap-2 rounded-xl gradient-bg text-white py-6 text-lg font-semibold shadow-lg"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
              Take Another Quiz
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultScreen;
