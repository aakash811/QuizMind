import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizState {
  topic: string | null;
  questions: Question[];
  answers: (number | null)[];
  currentQuestionIndex: number;
  score: number | null;
  feedback: string | null;
  isLoading: boolean;
  error: string | null;
}

interface QuizContextType extends QuizState {
  setTopic: (topic: string) => void;
  setQuestions: (questions: Question[]) => void;
  selectAnswer: (questionIndex: number, answerIndex: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
  calculateScore: () => number;
  setScore: (score: number) => void;
  setFeedback: (feedback: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  topic: null,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  score: null,
  feedback: null,
  isLoading: false,
  error: null,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<QuizState>(initialState);

  const setTopic = (topic: string) => {
    setState(prev => ({ ...prev, topic }));
  };

  const setQuestions = (questions: Question[]) => {
    setState(prev => ({
      ...prev,
      questions,
      answers: new Array(questions.length).fill(null),
    }));
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    setState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[questionIndex] = answerIndex;
      return { ...prev, answers: newAnswers };
    });
  };

  const setCurrentQuestionIndex = (index: number) => {
    setState(prev => ({ ...prev, currentQuestionIndex: index }));
  };

  const calculateScore = () => {
    let score = 0;
    state.questions.forEach((q, i) => {
      if (state.answers[i] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const setScore = (score: number) => {
    setState(prev => ({ ...prev, score }));
  };

  const setFeedback = (feedback: string) => {
    setState(prev => ({ ...prev, feedback }));
  };

  const setIsLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const resetQuiz = () => {
    setState(initialState);
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        setTopic,
        setQuestions,
        selectAnswer,
        setCurrentQuestionIndex,
        calculateScore,
        setScore,
        setFeedback,
        setIsLoading,
        setError,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
