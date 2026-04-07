const sdk = require('node-appwrite');

const client = new sdk.Client();

if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID) {
    console.error('CRITICAL: Missing Appwrite Configuration in process.env');
}

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || '')
    .setProject(process.env.APPWRITE_PROJECT_ID || '');

if (process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
} else {
    console.warn('WARNING: Missing APPWRITE_API_KEY in process.env');
}

const databases = new sdk.Databases(client);
const users = new sdk.Users(client);

module.exports = { client, databases, users, sdk };
