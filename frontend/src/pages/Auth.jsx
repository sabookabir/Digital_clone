import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

function Auth() {
    const { user, login, register, loading } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Connecting Neural Identity...</div>;
    if (user) return <Navigate to="/dashboard" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(email, password, name);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <GlassCard style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h2 className="title-text" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                    {isLogin ? 'ACCESS PLATFORM' : 'INITIALIZE SOUL'}
                </h2>
                {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!isLogin && (
                        <input
                            type="text" placeholder="Designation (Name)" required
                            value={name} onChange={e => setName(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '6px' }}
                        />
                    )}
                    <input
                        type="email" placeholder="Email Vector" required
                        value={email} onChange={e => setEmail(e.target.value)}
                        style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '6px' }}
                    />
                    <input
                        type="password" placeholder="Passcode" required
                        value={password} onChange={e => setPassword(e.target.value)}
                        style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: '1px solid var(--glass-border)', padding: '12px', borderRadius: '6px' }}
                    />
                    <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                        {isLogin ? 'Establish Link' : 'Generate Identity'}
                    </button>
                </form>

                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isLogin ? 'New entity?' : 'Already recorded?'} 
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
                    >
                        {isLogin ? 'Initialize Here' : 'Access Here'}
                    </button>
                </p>
            </GlassCard>
        </div>
    );
}

export default Auth;
