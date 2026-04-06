require('dotenv').config();
const { databases } = require('../config/appwrite');
const { Query } = require('node-appwrite');

const DB_ID = 'digitalsoul_main';

async function diagnose() {
    console.log("--- Starting Database Diagnosis ---");
    try {
        // Check ChatHistory
        const chatCol = await databases.getCollection(DB_ID, 'chat_history');
        console.log("\n[ChatHistory]");
        console.log("Attributes:");
        chatCol.attributes.forEach(a => console.log(`  - ${a.key}: ${a.status} (${a.type})`));
        console.log("Indexes:");
        chatCol.indexes.forEach(i => console.log(`  - ${i.key}: ${i.status} [${i.attributes.join(',')}]`));

        // Check PersonalityData
        const persCol = await databases.getCollection(DB_ID, 'personality_data');
        console.log("\n[PersonalityData]");
        console.log("Attributes:");
        persCol.attributes.forEach(a => console.log(`  - ${a.key}: ${a.status} (${a.type})`));
        console.log("Indexes:");
        persCol.indexes.forEach(i => console.log(`  - ${i.key}: ${i.status} [${i.attributes.join(',')}]`));

        // Attempt a test query
        console.log("\n--- Testing Queries ---");
        try {
            await databases.listDocuments(DB_ID, 'chat_history', [Query.equal('user_id', 'test_id')]);
            console.log("✅ ChatHistory query: SUCCESS");
        } catch (e) {
            console.log("❌ ChatHistory query: FAILED - " + e.message);
        }

        try {
            await databases.listDocuments(DB_ID, 'personality_data', [Query.equal('user_id', 'test_id')]);
            console.log("✅ PersonalityData query: SUCCESS");
        } catch (e) {
            console.log("❌ PersonalityData query: FAILED - " + e.message);
        }

    } catch (e) {
        console.error("DIAGNOSIS ERROR:", e.message);
    }
}

diagnose();
