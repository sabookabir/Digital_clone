require('dotenv').config();
const { databases } = require('../config/appwrite');

const DB_ID = 'digitalsoul_main';

async function inspect() {
    try {
        const col = await databases.getCollection(DB_ID, 'chat_history');
        console.log("ChatHistory Attributes:");
        col.attributes.forEach(a => console.log(`- ${a.key} (${a.status})`));
        
        console.log("ChatHistory Indexes:");
        col.indexes.forEach(i => console.log(`- ${i.key}: ${i.attributes.join(',')}`));
        
    } catch(e) {
        console.error("Error inspecting:", e.message);
    }
}
inspect();
