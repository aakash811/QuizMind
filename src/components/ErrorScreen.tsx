import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}

const ErrorScreen = ({ message, onRetry, onBack }: ErrorScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[400px]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground mb-2"
      >
        Something went wrong
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-center max-w-md mb-8"
      >
        {message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        {onBack && (
          <Button variant="outline" onClick={onBack} className="rounded-xl">
            Go Back
          </Button>
        )}
        {onRetry && (
          <Button onClick={onRetry} className="rounded-xl gradient-bg">
            Try Again
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ErrorScreen;
