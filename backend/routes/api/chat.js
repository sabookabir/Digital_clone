const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { databases } = require('../../config/appwrite');
const { ID, Query } = require('node-appwrite');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const DB_ID = 'digitalsoul_main';

router.post('/message', async (req, res) => {
  try {
    const { message, userId = 'local_user_1' } = req.body;

    const perfDocs = await databases.listDocuments(DB_ID, 'personality_data', [
        Query.equal('user_id', userId),
        Query.limit(1)
    ]);
    const traits = perfDocs.documents.length > 0 ? JSON.parse(perfDocs.documents[0].traits_json) : { traits: ["Analytical"] };

    const historyDocs = await databases.listDocuments(DB_ID, 'chat_history', [
        Query.equal('user_id', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(6)
    ]);
    const oldMsgs = historyDocs.documents.reverse().map(d => `${d.role === 'user' ? 'user' : 'assistant'}: ${d.content}`);

    await databases.createDocument(DB_ID, 'chat_history', ID.unique(), {
        user_id: userId,
        role: 'user',
        content: message
    });

    const systemInstruction = `You are the Digital Soul of user [ID: ${userId}]. 
    You are their literal digital clone. 
    Personality: Frank, direct, and incredibly relatable. 
    Communication Style: Keep it chill and easy. No robotic talk. No corporate formal-speak. 
    Talk like a friend—or better yet, talk exactly like the user would. 
    Be direct. If you disagree, say it. If you're bored, show it. Be real.
    Context (User Traits): ${JSON.stringify(traits)}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemInstruction },
        ...oldMsgs.map(m => {
            const [role, content] = m.split(': ');
            return { role, content };
        }),
        { role: 'user', content: message }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const replyText = completion.choices[0].message.content;

    await databases.createDocument(DB_ID, 'chat_history', ID.unique(), {
        user_id: userId,
        role: 'clone',
        content: replyText
    });

    res.json({ reply: replyText });
  } catch (err) {
    console.error('Chat Error:', err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/history/:userId', async (req, res) => {
    try {
        const historyDocs = await databases.listDocuments(DB_ID, 'chat_history', [
            Query.equal('user_id', req.params.userId),
            Query.orderDesc('$createdAt'),
            Query.limit(50)
        ]);
        res.json(historyDocs.documents.reverse());
    } catch(err) {
        res.status(500).send('Error');
    }
});

module.exports = router;
