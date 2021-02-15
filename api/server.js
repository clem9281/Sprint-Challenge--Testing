const express = require('express');
const helmet = require('helmet');

const gameRoutes = require('../games/gameRoutes');

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => res.send('<h1>Sprint Challenge: Testing</h1>'));
app.use('/api/games', gameRoutes);

module.exports = app;