const db = require('../data/dbConfig');

const find = () => {
    return db('games');
}

const findBy = filter => {
    return db('games').where(filter)
}

const insert = (newGame) => {
    return db('games').insert(newGame);
}

module.exports = {
    find, findBy, insert
}