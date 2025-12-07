import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface TopicCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
  index: number;
}

const TopicCard = ({ title, description, icon: Icon, gradient, onClick, index }: TopicCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'w-full p-6 rounded-2xl border-2 border-border bg-card',
        'hover:border-primary/50 hover:shadow-2xl',
        'transition-all duration-300 text-left group relative overflow-hidden'
      )}
    >
      <motion.div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
          gradient
        )}
      />

      <motion.div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mb-5',
          gradient
        )}
        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="h-7 w-7 text-white" />
      </motion.div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={cn('h-full rounded-full', gradient)} />
      </motion.div>
    </motion.button>
  );
};

export default TopicCard;
