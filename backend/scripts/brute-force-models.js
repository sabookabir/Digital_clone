require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function discover() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const https = require('https');
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    
    https.get(url, (res) => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', async () => {
            const json = JSON.parse(data);
            if (!json.models) {
                console.log("No models available for this key.");
                return;
            }
            
            console.log(`Found ${json.models.length} potential models. Brute-forcing...`);
            for (const mData of json.models) {
                const modelName = mData.name.replace('models/', '');
                console.log(`Testing: ${modelName}...`);
                try {
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await model.generateContent("hi");
                    console.log(`🌟 SUCCESS! Model [${modelName}] is the one!`);
                    process.exit(0);
                } catch (e) {
                    console.log(`❌ [${modelName}] failed: ${e.message}`);
                }
            }
        });
    });
}
discover();
