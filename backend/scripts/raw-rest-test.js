require('dotenv').config();
const https = require('https');

const key = process.env.GEMINI_API_KEY;
const model = "gemini-3.1-flash-live-preview";
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

const data = JSON.stringify({
    contents: [{ parts: [{ text: "Hello" }] }]
});

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(url, options, (res) => {
    let responseBody = '';
    res.on('data', (d) => responseBody += d);
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        console.log("Body:", responseBody);
    });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
