import { Heart, Laptop, Target, BookOpen, Sparkles } from 'lucide-react';
import TopicCard from '@/components/TopicCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useQuiz } from '@/context/QuizContext';
import { motion } from 'framer-motion';

const topics = [
  {
    id: 'wellness',
    title: 'Wellness',
    description: 'Health, mindfulness, and well-being tips for a balanced life',
    icon: Heart,
    gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
  },
  {
    id: 'tech-trends',
    title: 'Tech Trends',
    description: 'Latest innovations in technology and digital transformation',
    icon: Laptop,
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Time management and efficiency strategies for success',
    icon: Target,
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
  },
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Fascinating trivia and interesting facts from around the world',
    icon: BookOpen,
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
  },
];

interface TopicSelectionScreenProps {
  onSelectTopic: (topic: string) => void;
}

const TopicSelectionScreen = ({ onSelectTopic }: TopicSelectionScreenProps) => {
  const { setTopic } = useQuiz();

  const handleSelectTopic = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setTopic(topic.title);
      onSelectTopic(topicId);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative overflow-hidden">
      <ThemeToggle />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Quizzes</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">QuizMind</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Challenge yourself with intelligent quizzes and get personalized feedback
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              description={topic.description}
              icon={topic.icon}
              gradient={topic.gradient}
              onClick={() => handleSelectTopic(topic.id)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TopicSelectionScreen;
