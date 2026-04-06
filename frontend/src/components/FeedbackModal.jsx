import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
        await fetch('http://localhost:5000/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, message })
        });
        setStatus('Received. Our system logged this query.');
        setTimeout(() => {
          setIsOpen(false);
          setMessage('');
          setStatus('');
        }, 2000);
    } catch(err) {
        setStatus('Connection Error');
        setTimeout(() => setStatus(''), 2000);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', 
          width: '50px', height: '50px', borderRadius: '50%',
          background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.5)',
          color: '#fff', cursor: 'pointer', zIndex: 1000,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
              zIndex: 1001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
            }}
          >
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
              <GlassCard style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
                >✕</button>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>System Support</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <select 
                    value={type} onChange={(e) => setType(e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '6px' }}
                  >
                    <option value="Feedback">Feature Feedback</option>
                    <option value="Bug">Report Bug</option>
                    <option value="Support">Request Support</option>
                  </select>
                  <textarea 
                    rows="4" 
                    placeholder="Describe your query..." 
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--glass-border)', padding: '10px', borderRadius: '6px', resize: 'vertical' }}
                  />
                  <button type="submit" className="btn-primary" disabled={!!status}>
                    {status || 'Transmit'}
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FeedbackModal;
