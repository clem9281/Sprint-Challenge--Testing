const db = require('../data/dbConfig');

const find = () => {
    return db('games');
}

const findBy = filter => {

}

const insert = () => {

}

module.exports = {
    find, findBy, insert
}