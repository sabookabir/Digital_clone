require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('--- Startup Environment Check ---');
console.log('PORT:', process.env.PORT);
console.log('GROQ_API_KEY detected:', !!process.env.GROQ_API_KEY);
console.log('APPWRITE_ENDPOINT detected:', !!process.env.APPWRITE_ENDPOINT);
console.log('APPWRITE_PROJECT_ID detected:', !!process.env.APPWRITE_PROJECT_ID);
console.log('APPWRITE_API_KEY detected:', !!process.env.APPWRITE_API_KEY);
console.log('-------------------------------');

app.use(cors({
  origin: '*', // We'll stick to wildcard for now but log everything
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Global Request Logger for Diagnostics
app.use((req, res, next) => {
  console.log(`>>> Incoming Request: ${req.method} ${req.url} from ${req.headers.origin || 'Unknown'}`);
  next();
});

// Routes
app.use('/api/personality', require('./routes/api/personality'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/feedback', require('./routes/api/feedback'));

app.get('/', (req, res) => {
  res.send('Digital Soul API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
