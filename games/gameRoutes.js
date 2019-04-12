const express = require('express');
const dbHelpers = require('./gameModel');

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const users = await dbHelpers.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "We could not find the games at this time" });
    }
})

module.exports = router;