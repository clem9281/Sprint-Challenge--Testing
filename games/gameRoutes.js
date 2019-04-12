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
}).post(async (req, res) => {
    const { title, genre } = req.body;
    if (!title || !genre) return res.status(422).json({ message: "A new game must have at least a title and a genre" });
    try {
        const newGameId = await dbHelpers.insert(req.body);
        const newGame = await dbHelpers.findBy({ id: newGameId[0] }).first();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: 'We could not add a game at this time' });
    }
})

module.exports = router;