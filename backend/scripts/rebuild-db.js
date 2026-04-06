require('dotenv').config();
const { databases } = require('../config/appwrite');
const { Query } = require('node-appwrite');

const DB_ID = 'digitalsoul_main';
const DB_NAME = 'DigitalSoulDB';

async function rebuild() {
    console.log("--- CLEAN REBUILD STARTING ---");
    
    // 1. Delete old DB if it exists
    try {
        console.log("Cleanup: Deleting old database...");
        await databases.delete(DB_ID);
        console.log("Old database purged.");
        // Appwrite needs a moment to settle after deletion
        await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
        if (e.code === 404) console.log("No old database found. Proceeding.");
        else console.log("Deletion warning:", e.message);
    }

    // 2. Create Database
    try {
        console.log(`Creating database: [${DB_NAME}] (${DB_ID})`);
        await databases.create(DB_ID, DB_NAME);
    } catch (e) {
        console.error("FATAL: Could not create database.", e.message);
        return;
    }

    // Define Collections
    const collections = [
        { id: 'profiles', name: 'Profiles', attrs: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'evolution_stage', type: 'string', size: 50, required: false, default: 'V1.0' }
        ]},
        { id: 'personality_data', name: 'PersonalityData', attrs: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'traits_json', type: 'string', size: 10000, required: true }
        ], index: 'user_id'},
        { id: 'chat_history', name: 'ChatHistory', attrs: [
            { key: 'user_id', type: 'string', size: 255, required: true },
            { key: 'role', type: 'string', size: 50, required: true },
            { key: 'content', type: 'string', size: 10000, required: true }
        ], index: 'user_id'},
        { id: 'support_tickets', name: 'SupportTickets', attrs: [
            { key: 'type', type: 'string', size: 100, required: true },
            { key: 'description', type: 'string', size: 5000, required: true },
            { key: 'status', type: 'string', size: 50, required: false, default: 'OPEN' }
        ]}
    ];

    for (const col of collections) {
        try {
            console.log(`\nCreating Collection: ${col.name} (${col.id})...`);
            await databases.createCollection(DB_ID, col.id, col.name);
            
            for (const attr of col.attrs) {
                console.log(`  - Adding attribute: ${attr.key}...`);
                await databases.createStringAttribute(DB_ID, col.id, attr.key, attr.size, attr.required, attr.default);
            }

            // Important: Wait for attributes to be officially available before indexing
            console.log("  Waiting for attributes to compile...");
            let ready = false;
            let attempts = 0;
            while (!ready && attempts < 10) {
                await new Promise(r => setTimeout(r, 2000));
                const current = await databases.getCollection(DB_ID, col.id);
                ready = current.attributes.every(a => a.status === 'available');
                attempts++;
            }

            if (col.index) {
                console.log(`  - Adding Search Index for: ${col.index}...`);
                await databases.createIndex(DB_ID, col.id, `idx_${col.index}`, 'key', [col.index], ['ASC']);
            }
            console.log(`✅ Collection ${col.name} Initialized!`);
        } catch (e) {
            console.error(`Error building ${col.id}:`, e.message);
        }
    }

    console.log("\n--- REBUILD COMPLETED ---");
    console.log("Verifying ChatHistory queryability...");
    try {
        await databases.listDocuments(DB_ID, 'chat_history', [Query.equal('user_id', 'verify')]);
        console.log("Final Verification: SUCCESS. The search engine is active!");
    } catch (e) {
        console.log("Final Verification Warning:", e.message);
    }
}

rebuild();
