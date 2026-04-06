import { useState } from 'react';
import GlassCard from './GlassCard';

const questions = [
  {
    id: 1,
    text: "If you could only preserve one memory before uploading your consciousness, what would it be?",
    options: ["A moment of pure joy", "A difficult lesson learned", "A deep connection with someone", "A grand achievement"]
  },
  {
    id: 2,
    text: "When faced with an unsolvable paradox, your mind naturally...",
    options: ["Tries to find a logical loophole", "Embraces the mystery", "Gets frustrated and moves on", "Breaks it down into smaller, solvable parts"]
  },
  {
    id: 3,
    text: "Which aesthetic resonates most with your inner world?",
    options: ["Neon-lit cyberpunk nights", "Pristine, minimal white spaces", "Overgrown ancient ruins", "An endless, starlit void"]
  }
];

function QuizModule({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (option) => {
    const nextAnswers = { ...answers, [questions[currentQuestionIndex].id]: option };
    setAnswers(nextAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (onComplete) onComplete(nextAnswers);
    }
  };

  const currentQ = questions[currentQuestionIndex];

  return (
    <GlassCard style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <p style={{ color: 'var(--accent-pink)', marginBottom: '1rem', letterSpacing: '2px' }}>
        CALIBRATING NEURAL PATTERNS {currentQuestionIndex + 1}/{questions.length}
      </p>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{currentQ.text}</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {currentQ.options.map((option, idx) => (
          <button 
            key={idx}
            onClick={() => handleAnswer(option)}
            className="btn-primary"
            style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: '1.1rem', padding: '15px' }}
          >
            {option}
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

export default QuizModule;
