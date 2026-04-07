import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config';

const QUESTIONS = [
  {
    id: 'directness',
    text: 'How do you handle conflict in a professional setting?',
    options: [
      { label: 'Be incredibly direct and objective.', value: 'Direct' },
      { label: 'Be diplomatic and subtle.', value: 'Diplomatic' },
      { label: 'Wait and observe before acting.', value: 'Reflective' }
    ]
  },
  {
    id: 'logic',
    text: 'When making a major decision, what is your primary driver?',
    options: [
      { label: 'Pure logic and data.', value: 'Analytical' },
      { label: 'Intuition and gut feeling.', value: 'Intuitive' },
      { label: 'Collaboration and consensus.', value: 'Collaborative' }
    ]
  },
  {
    id: 'speed',
    text: 'What is your preferred working style?',
    options: [
      { label: 'High-speed, iterative, and "frank" execution.', value: 'Agile' },
      { label: 'Methodical, perfectionist, and steady.', value: 'Precise' },
      { label: 'Creative, chaotic, and experimental.', value: 'Chaotic' }
    ]
  },
  {
    id: 'vibe',
    text: 'Which digital aesthetic represents you best?',
    options: [
      { label: 'Dark, neon, and industrial.', value: 'Cyberpunk' },
      { label: 'Clean, minimalist, and white-space.', value: 'Minimalist' },
      { label: 'Organic, flowing, and natural.', value: 'Bio-tech' }
    ]
  },
  {
    id: 'tone',
    text: 'How should your digital clone talk back to you?',
    options: [
      { label: 'Exactly like a direct, frank peer.', value: 'Frank' },
      { label: 'Polite, supportive, and helpful.', value: 'Nurturing' },
      { label: 'Challenging, sarcastic, and sharp.', value: 'Stoic' }
    ]
  }
];

function Analysis() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (value) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitAnalysis(newAnswers);
    }
  };

  const submitAnalysis = async (finalAnswers) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/personality/analyze`, {
        userId: user.$id,
        answers: finalAnswers
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Analysis saving failed:', err);
      alert('Neural link failed at the final stage. Please retry.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ duration: 0.4 }}
           style={{ maxWidth: '600px', width: '100%' }}
        >
          <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
            {loading ? (
              <div>
                <h2 className="title-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>DIGITIZING SOUL...</h2>
                <p style={{ color: '#888' }}>Mapping neural pathways and traits...</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '2rem', color: 'var(--accent-primary)', fontSize: '0.9rem', letterSpacing: '2px' }}>
                  PHASE {currentStep + 1} OF {QUESTIONS.length}
                </div>
                <h2 className="title-text" style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }}>
                  {QUESTIONS[currentStep].text}
                </h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button 
                      key={idx}
                      className="btn-primary"
                      style={{ padding: '1.2rem', textTransform: 'none', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
                      onClick={() => handleOptionSelect(opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Analysis;
