require('dotenv').config();
const { databases } = require('../config/appwrite');

const DB_ID = 'digitalsoul_main';

async function addAttribute(col, key, size, req, def) {
    try {
        await databases.createStringAttribute(DB_ID, col, key, size, req, def);
        console.log(`Added ${key} to ${col}`);
    } catch(e) { 
        if(e.code !== 409) console.log(`Error adding ${key}: ${e.message}`); 
    }
}

async function patch() {
    try {
        console.log("Patching Attributes...");
        await addAttribute('profiles', 'user_id', 255, true);
        await addAttribute('profiles', 'evolution_stage', 50, false, 'V1.0');

        await addAttribute('personality_data', 'user_id', 255, true);
        await addAttribute('personality_data', 'traits_json', 10000, true);

        await addAttribute('chat_history', 'user_id', 255, true);
        await addAttribute('chat_history', 'role', 50, true);
        await addAttribute('chat_history', 'content', 10000, true);

        await addAttribute('support_tickets', 'type', 100, true);
        await addAttribute('support_tickets', 'description', 5000, true);
        await addAttribute('support_tickets', 'status', 50, false, 'OPEN');

        console.log("Attributes patched! Waiting 3 seconds for Appwrite to finalize columns...");
        await new Promise(r => setTimeout(r, 3000));
        
        try {
            await databases.createIndex(DB_ID, 'chat_history', 'idx_user_id', 'key', ['user_id'], ['ASC']);
            console.log("Index active on ChatHistory");
        } catch(e) { if(e.code !== 409) console.log("Index error:", e.message); }

        try {
            await databases.createIndex(DB_ID, 'personality_data', 'idx_user_id', 'key', ['user_id'], ['ASC']);
            console.log("Index active on PersonalityData");
        } catch(e) { if(e.code !== 409) console.log("Index error:", e.message); }
        
        console.log("✅ Done patching Database Schema!");
    } catch(e) {
        console.error(e);
    }
}
patch();
