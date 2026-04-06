require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    try {
        console.log("Testing Gemini with the NEW key from .env...");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say 'System Online' if you can read this.");
        console.log("Gemini Response:", result.response.text());
        console.log("✅ GEMINI IS FULLY OPERATIONAL!");
    } catch (e) {
        console.error("❌ GEMINI TEST FAILED:", e.message);
    }
}
testGemini();
