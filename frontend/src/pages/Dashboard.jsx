import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { logout, user } = useAuth();
  
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 className="title-text" style={{ fontSize: '2.5rem' }}>EVOLUTION DASHBOARD</h1>
        <div>
          <button onClick={logout} className="btn-primary" style={{ marginRight: '1rem', borderColor: 'var(--accent-secondary)' }}>Log out</button>
          <Link to="/" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Back Home</Link>
        </div>
      </header>

      <div className="responsive-grid">
        <GlassCard>
          <h3>Personality Traits</h3>
          <ul style={{ marginTop: '1rem', color: '#ccc', lineHeight: '1.8' }}>
            <li>Analytical (85%)</li>
            <li>Empathetic (92%)</li>
            <li>Visionary (78%)</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h3>Evolution Stage</h3>
          <h2 className="title-text" style={{ fontSize: '3rem', margin: '1rem 0' }}>V 2.4</h2>
          <p style={{ color: '#aaa' }}>Syncing cognitive patterns...</p>
        </GlassCard>

        <GlassCard>
          <h3>Memory Core</h3>
          <p style={{ color: '#aaa', marginTop: '1rem' }}>42 active conversations analyzed.</p>
          <p style={{ color: '#aaa' }}>128 mood fluctuations recorded.</p>
        </GlassCard>
      </div>

      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <Link to="/analyze" className="btn-primary" style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(0,180,216,0.1)' }}>
          <h2 className="title-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>DIGITIZE SOUL</h2>
          <p style={{ color: '#888' }}>Upload your traits & neural DNA.</p>
        </Link>
        <Link to="/interact" className="btn-primary" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <h2 className="title-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>CONNECT</h2>
          <p style={{ color: '#888', textTransform: 'none' }}>Live session with your digital clone.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
