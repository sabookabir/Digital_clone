require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log("Testing Gemini with the NEW 3.1 key...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-live-preview" });
        const result = await model.generateContent("hello - please respond with 'Digital Soul Verified'");
        console.log("Gemini Response:", result.response.text());
        console.log("✅ GEMINI IS FULLY OPERATIONAL!");
    } catch (e) {
        console.error("❌ GEMINI TEST FAILED:", e.message);
    }
}
testGemini();
