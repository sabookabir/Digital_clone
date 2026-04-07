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

app.use(cors());
app.use(express.json());

// Global Request Logger for Diagnostics
app.use((req, res, next) => {
  console.log(`>>> Incoming Request: ${req.method} ${req.url}`);
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
