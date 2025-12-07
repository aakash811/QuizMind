import { useState } from 'react';
import { QuizProvider } from '@/context/QuizContext';
import TopicSelectionScreen from '@/screens/TopicSelectionScreen';
import QuestionGeneratorScreen from '@/screens/QuestionGeneratorScreen';
import QuizScreen from '@/screens/QuizScreen';
import ResultScreen from '@/screens/ResultScreen';

type Screen = 'topic' | 'generating' | 'quiz' | 'result';

const QuizApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('topic');

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'topic' && (
        <TopicSelectionScreen onSelectTopic={() => setCurrentScreen('generating')} />
      )}
      {currentScreen === 'generating' && (
        <QuestionGeneratorScreen
          onQuestionsReady={() => setCurrentScreen('quiz')}
          onBack={() => setCurrentScreen('topic')}
        />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen onComplete={() => setCurrentScreen('result')} />
      )}
      {currentScreen === 'result' && (
        <ResultScreen onRestart={() => setCurrentScreen('topic')} />
      )}
    </div>
  );
};

const Index = () => {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
};

export default Index;
