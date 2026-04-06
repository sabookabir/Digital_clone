require('dotenv').config();
const { client, databases } = require('../config/appwrite');
const { ID } = require('node-appwrite');

const DB_NAME = 'DigitalSoulDB';
const DB_ID = 'digitalsoul_main';

async function initSchema() {
    try {
        console.log('Validating Appwrite Server connection...');
        
        let dbExists = false;
        try {
            await databases.get(DB_ID);
            console.log(`Database [${DB_NAME}] already exists.`);
            dbExists = true;
        } catch (error) {
            if(error.code === 404) {
                console.log(`Creating Database [${DB_NAME}]...`);
                await databases.create(DB_ID, DB_NAME);
                dbExists = true;
            } else if (error.code === 401) {
                throw new Error("401 Unauthorized. You MUST provide an APPWRITE_API_KEY in backend/.env with 'database' and 'collections' access scopes.");
            } else {
                throw error;
            }
        }

        if(!dbExists) return;

        console.log("Database secured. Provisioning Collection Schemas...");

        // 1. Profiles
        try {
            await databases.createCollection(DB_ID, 'profiles', 'Profiles');
            await databases.createStringAttribute(DB_ID, 'profiles', 'user_id', 255, true);
            await databases.createStringAttribute(DB_ID, 'profiles', 'evolution_stage', 50, false, 'V1.0');
            console.log("-> 'Profiles' collection provisioned.");
        } catch(e) { if(e.code !== 409) console.error(e.message); }

        // 2. PersonalityData
        try {
            await databases.createCollection(DB_ID, 'personality_data', 'PersonalityData');
            await databases.createStringAttribute(DB_ID, 'personality_data', 'user_id', 255, true);
            await databases.createStringAttribute(DB_ID, 'personality_data', 'traits_json', 10000, true);
            console.log("-> 'PersonalityData' collection provisioned.");
        } catch(e) { if(e.code !== 409) console.error(e.message); }

        // 3. ChatHistory
        try {
            await databases.createCollection(DB_ID, 'chat_history', 'ChatHistory');
            await databases.createStringAttribute(DB_ID, 'chat_history', 'user_id', 255, true);
            await databases.createStringAttribute(DB_ID, 'chat_history', 'role', 50, true);
            await databases.createStringAttribute(DB_ID, 'chat_history', 'content', 10000, true);
            console.log("-> 'ChatHistory' collection provisioned.");
        } catch(e) { if(e.code !== 409) console.error(e.message); }

        // 4. Feedback / Support Tickets
        try {
            await databases.createCollection(DB_ID, 'support_tickets', 'SupportTickets');
            await databases.createStringAttribute(DB_ID, 'support_tickets', 'type', 100, true);
            await databases.createStringAttribute(DB_ID, 'support_tickets', 'description', 5000, true);
            await databases.createStringAttribute(DB_ID, 'support_tickets', 'status', 50, false, 'OPEN');
            console.log("-> 'SupportTickets' collection provisioned.");
        } catch(e) { if(e.code !== 409) console.error(e.message); }

        console.log("\n✅ Base schema injected into Appwrite Successfully!");
        console.log("Note: Database indices must be created manually in the console if complex queries are required later.");

    } catch (err) {
        console.error("\n❌ FATAL INIT ERROR:", err.message);
    }
}

initSchema();
