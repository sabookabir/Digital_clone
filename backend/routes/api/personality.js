const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { databases } = require('../../config/appwrite');
const { ID } = require('node-appwrite');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DB_ID = 'digitalsoul_main';

router.post('/analyze', async (req, res) => {
  console.log('>>> ATTEMPTING PERSONALITY ANALYSIS...');
  try {
    const { userId, answers } = req.body;
    console.log('Incoming userId:', userId);
    console.log('Incoming answers count:', Object.keys(answers || {}).length);
    
    const prompt = `Analyze the following personality survey answers and return a JSON object with:
    1. "traits": An array of 5 personality traits (e.g., ["Analytical", "Direct", "Futuristic"]).
    2. "summary": A 2-sentence summary of the digital soul's personality.
    3. "vibe": A single word describing the aesthetic (e.g., "Dark", "Neon", "Minimal").
    
    Answers: ${JSON.stringify(answers)}`;

    console.log('Calling Groq AI...');
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an advanced digital clone analyzer. Return ONLY clean JSON.' },
        { role: 'user', content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    let rawContent = completion.choices[0].message.content;
    // Clean markdown if present
    rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const data = JSON.parse(rawContent);
    console.log('AI Analysis complete:', data.vibe);

    // Save to Appwrite PersonalityData
    console.log('Saving to Appwrite [DB:', DB_ID, '] [Collection: personality_data]');
    await databases.createDocument(DB_ID, 'personality_data', ID.unique(), {
        user_id: userId,
        traits_json: JSON.stringify(data)
    });
    console.log('✅ Analysis Saved Successfully!');

    res.json(data);
  } catch (err) {
    console.error('--- PERSONALITY ANALYSIS CRITICAL FAILURE ---');
    console.error('Error Message:', err.message);
    res.status(500).send('Analysis Failed [NEURAL-X99]');
  }
});

module.exports = router;
