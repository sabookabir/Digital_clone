import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenSoulIntro');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const closeIntro = () => {
    sessionStorage.setItem('hasSeenSoulIntro', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{ maxWidth: '650px', width: '100%' }}
        >
          <GlassCard style={{ padding: '3rem', position: 'relative' }}>
            <h2 className="title-text" style={{ fontSize: '2.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              WELCOME TO YOUR DIGITAL SOUL
            </h2>
            
            <p style={{ color: '#aaa', textAlign: 'center', marginBottom: '2.5rem', lineHeight: '1.6' }}>
              You are about to initialize a neural clone of yourself. This is how you "upload" your consciousness:
            </p>

            <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--accent-primary)', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>1</div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '0.3rem' }}>PHASE 1: DIGITIZE</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Answer a few deep questions. We use Groq's Llama-3 AI to extract your personality DNA from your words.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--accent-secondary)', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>2</div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '0.3rem' }}>PHASE 2: CONNECT</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>Open a live neural session. Your clone will chat with you, mirroring your frank tone and direct style.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--accent-primary)', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold' }}>3</div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '0.3rem' }}>PHASE 3: EVOLVE</h4>
                  <p style={{ color: '#888', fontSize: '0.9rem' }}>The more you talk, the more the clone learns. It evolves to be your literal, direct-language duplicate.</p>
                </div>
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={closeIntro}
              style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}
            >
              INITIALIZE CONNECTION
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default WelcomeModal;
