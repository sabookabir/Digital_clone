const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { databases } = require('../../config/appwrite');
const { ID } = require('node-appwrite');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DB_ID = 'digitalsoul_main';

router.post('/analyze', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    
    const prompt = `Analyze the following personality survey answers and return a JSON object with:
    1. "traits": An array of 5 personality traits (e.g., ["Analytical", "Direct", "Futuristic"]).
    2. "summary": A 2-sentence summary of the digital soul's personality.
    3. "vibe": A single word describing the aesthetic (e.g., "Dark", "Neon", "Minimal").
    
    Answers: ${JSON.stringify(answers)}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an advanced digital clone analyzer. Return ONLY clean JSON.' },
        { role: 'user', content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const data = JSON.parse(completion.choices[0].message.content);

    // Save to Appwrite PersonalityData
    await databases.createDocument(DB_ID, 'personality_data', ID.unique(), {
        user_id: userId,
        traits_json: JSON.stringify(data) // Pack the full analysis into traits_json
    });

    res.json(data);
  } catch (err) {
    console.error('Personality Error:', err.message);
    res.status(500).send('Analysis Failed');
  }
});

module.exports = router;
