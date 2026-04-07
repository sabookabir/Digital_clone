require('dotenv').config();
const { databases } = require('../config/appwrite');

const DB_ID = 'digitalsoul_main';
const collections = ['profiles', 'personality_data', 'chat_history', 'support_tickets'];

async function patch() {
    console.log("--- MASTER PERMISSION PATCH STARTING ---");
    
    for (const colId of collections) {
        try {
            console.log(`Patching Permissions for: ${colId}...`);
            await databases.updateCollection(
                DB_ID, 
                colId, 
                colId.charAt(0).toUpperCase() + colId.slice(1), // Name
                ['read("any")', 'create("any")', 'update("any")', 'delete("any")'] // MASTER PERMISSIONS
            );
            console.log(`✅ ${colId} is now OPEN.`);
        } catch (e) {
            console.log(`❌ Error patching ${colId}:`, e.message);
        }
    }

    console.log("\n--- PATCH COMPLETED ---");
}

patch();
