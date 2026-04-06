require('dotenv').config();
const { databases } = require('../config/appwrite');

const DB_ID = 'digitalsoul_main';

async function patch() {
    try {
        console.log("Adding index to ChatHistory...");
        await databases.createIndex(DB_ID, 'chat_history', 'idx_user_id', 'key', ['user_id'], ['ASC']);
        console.log("Index added to ChatHistory");
    } catch(e) { console.log(e.message) }

    try {
        console.log("Adding index to PersonalityData...");
        await databases.createIndex(DB_ID, 'personality_data', 'idx_user_id', 'key', ['user_id'], ['ASC']);
        console.log("Index added to PersonalityData");
    } catch(e) { console.log(e.message) }

    console.log("Done patching indexes!");
}
patch();
