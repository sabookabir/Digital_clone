require('dotenv').config();
const https = require('https');

const key = process.env.GEMINI_API_KEY;
const model = "gemini-1.5-flash";
// Trying V1 instead of V1BETA
const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${key}`;

const data = JSON.stringify({
    contents: [{ parts: [{ text: "System Test" }] }]
});

const req = https.request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
}, (res) => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        console.log("V1 STATUS:", res.statusCode);
        console.log("V1 BODY:", body);
    });
});
req.write(data);
req.end();
