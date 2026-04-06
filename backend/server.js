require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/personality', require('./routes/api/personality'));
app.use('/api/chat', require('./routes/api/chat'));
app.use('/api/feedback', require('./routes/api/feedback'));

app.get('/', (req, res) => {
  res.send('Digital Soul API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
