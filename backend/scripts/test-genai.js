require('dotenv').config();
const { GoogleAI } = require('@google/genai');

async function test() {
    try {
        const client = new GoogleAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await client.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: 'Hello, testing structure.'
        });
        console.log("Response Keys:", Object.keys(response));
        if(response.candidates) {
            console.log("Candidate 0 Content Keys:", Object.keys(response.candidates[0].content));
            console.log("Text:", response.candidates[0].content.parts[0].text);
        }
    } catch (e) {
        console.error("Test error:", e);
    }
}
test();
