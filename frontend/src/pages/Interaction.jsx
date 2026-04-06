import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Avatar3D from '../components/Avatar3D';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Interaction() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/api/chat/history/${user.$id}`)
      .then(res => setMessages(res.data))
      .catch(err => console.log('No history, or server off.'));
  }, [user]);

  const handleSend = async () => {
    if(!input.trim() || !user) return;
    const msg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/chat/message', 
        { message: msg, userId: user.$id },
        { timeout: 60000 }
      );
      setMessages(prev => [...prev, { role: 'clone', content: res.data.reply }]);
    } catch(e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'system', content: '[Connection Error - Backend Offline]' }]);
    }
    setLoading(false);
  };

  return (
    <div className="responsive-flex" style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="title-text" style={{ fontSize: '2rem' }}>ACTIVE SESSION</h1>
        <Link to="/dashboard" className="btn-primary">Dashboard</Link>
      </header>

      <div className="responsive-flex" style={{ flex: 1, flexWrap: 'wrap' }}>
        {/* Avatar Section */}
        <GlassCard style={{ flex: '1 1 400px', minHeight: '500px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 20, left: 20, color: 'var(--accent-primary)', zIndex: 10 }}>Visualizer: Active</div>
          <Avatar3D />
        </GlassCard>

        {/* Chat Section */}
        <GlassCard style={{ flex: '1 1 400px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
            <p style={{ color: '#aaa', marginBottom: '1rem' }}>SYSTEM: Neural link established.</p>
            {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: '1rem', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                  <span style={{ color: m.role === 'user' ? 'var(--accent-secondary)' : (m.role === 'system' ? 'red' : 'var(--accent-primary)'), fontWeight: 'bold' }}>
                    {m.role === 'user' ? 'You' : (m.role === 'system' ? 'Sys' : 'Clone')}: 
                  </span> 
                  {' ' + m.content}
                </div>
            ))}
            {loading && <div style={{ color: '#888' }}>Clone is thinking...</div>}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Transmit message..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '12px', borderRadius: '8px', outline: 'none', fontFamily: 'inherit' }}
            />
            <button className="btn-primary" onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default Interaction;
