const sdk = require('node-appwrite');

const client = new sdk.Client();

const endpoint = (process.env.APPWRITE_ENDPOINT || '').trim();
const project = (process.env.APPWRITE_PROJECT_ID || '').trim();
const key = (process.env.APPWRITE_API_KEY || '').trim();

if (!endpoint || !project) {
    console.error('CRITICAL: Missing Appwrite Configuration in process.env');
}

client
    .setEndpoint(endpoint)
    .setProject(project);

if (key) {
    client.setKey(key);
} else {
    console.warn('WARNING: Missing APPWRITE_API_KEY in process.env');
}

const databases = new sdk.Databases(client);
const users = new sdk.Users(client);

module.exports = { client, databases, users, sdk };
