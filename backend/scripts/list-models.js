require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // The listModels method is on the genAI instance or similar
        // Actually, the easiest way to see what's available is to check documentation or just try gemini-pro
        console.log("Attempting to list models...");
        // In @google/generative-ai, listing models is actually not a direct method on the client usually, 
        // it's an authenticated fetch to the discovery endpoint.
        // But we can try the most likely ones.
        
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("test");
                console.log(`✅ Model ${m} is AVAILABLE`);
            } catch (e) {
                console.log(`❌ Model ${m} failed: ${e.message}`);
            }
        }
    } catch (e) {
        console.error("List error:", e);
    }
}
listModels();
