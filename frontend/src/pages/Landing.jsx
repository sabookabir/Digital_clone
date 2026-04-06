import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WelcomeModal from '../components/WelcomeModal';
import GlassCard from '../components/GlassCard';

function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <WelcomeModal />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1 className="title-text" style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 800 }}>DIGITAL SOUL</h1>
        <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
          Upload your consciousness. Train your clone. Evolve your digital self.
        </p>
      </motion.div>

      <GlassCard style={{ maxWidth: '800px', width: '100%', textAlign: 'center', padding: '3rem' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Initialize Sequence</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/analyze">
            <button className="btn-primary">Start Quiz</button>
          </Link>
          <Link to="/dashboard">
            <button className="btn-primary" style={{ borderColor: 'var(--accent-secondary)' }}>Load Profile</button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

export default Landing;
