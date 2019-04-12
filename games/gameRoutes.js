const express = require('express');
const dbHelpers = require('./gameModel');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const games = await dbHelpers.find();
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({ message: "We could not find the games at this time" });
        }
    })
    .post(async (req, res) => {
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

router.route('/:id')
    .get(async (req, res) => {
        try {
            const game = await dbHelpers.findBy({ id: req.params.id }).first();
            if (!game) return res.status(404).json({ message: 'There is no game at that id' })
            res.status(200).json(game);
        } catch (error) {
            res.status(500).json({ message: "We could not find the games at this time" });
        }
    })
    .delete(async (req, res) => {
        try {
            const deleted = await dbHelpers.remove(req.params.id);
            if (deleted === 0) return res.status(404).json({ message: 'There is no game at that id' });
            const games = await dbHelpers.find();
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({ message: "We could not find the games at this time" });
        }
    })




module.exports = router;