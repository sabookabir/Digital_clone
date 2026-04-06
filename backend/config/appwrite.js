const sdk = require('node-appwrite');

const client = new sdk.Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

if (process.env.APPWRITE_API_KEY) {
    client.setKey(process.env.APPWRITE_API_KEY);
}

const databases = new sdk.Databases(client);
const users = new sdk.Users(client);

module.exports = { client, databases, users, sdk };
