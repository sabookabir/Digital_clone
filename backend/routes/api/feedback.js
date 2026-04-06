const express = require('express');
const router = express.Router();
const { databases } = require('../../config/appwrite');
const { ID } = require('node-appwrite');

const DB_ID = 'digitalsoul_main';

router.post('/', async (req, res) => {
    try {
        const { type, message } = req.body;
        await databases.createDocument(DB_ID, 'support_tickets', ID.unique(), {
            type,
            description: message,
            status: 'OPEN'
        });
        res.json({ success: true });
    } catch(e) {
        console.error(e);
        res.status(500).send('Error');
    }
});

module.exports = router;
