require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        console.log("Listing models for the CURRENT key...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The listModels method is actually a standalone fetch usually or on the client? 
        // In @google/generative-ai, it is not a direct method on genAI.
        // We have to use the REST API.
        const https = require('https');
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                const json = JSON.parse(data);
                if (json.models) {
                    console.log("SUCCESS! Available models:");
                    json.models.forEach(m => console.log(`- ${m.name}`));
                } else {
                    console.log("API Error:", data);
                }
            });
        });
    } catch (e) {
        console.error("Setup error:", e);
    }
}
listModels();
