const db = require('../data/dbConfig');
const dbHelpers = require('./gameModel');

describe('gameModel', () => {
    describe("find", () => {
        it("should return an array", async () => {
            const games = await dbHelpers.find();
            expect(games).toEqual([]);
        })
    })
    describe("insert", () => {
        afterEach(async () => {
            await db('games').truncate();
        })
        it("should add an entry to the database", async () => {
            await dbHelpers.insert({
                title: "Galaga", genre: "Arcade"
            });
            const games = await dbHelpers.find();
            expect(games).toEqual([{ id: 1, title: "Galaga", genre: "Arcade", releaseYear: null }]);
        })
        it("should return the index of the added entry", async () => {
            const addedFirst = await dbHelpers.insert({
                title: "Galaga", genre: "Arcade"
            });
            expect(addedFirst).toEqual([1]);
            const addedSecond = await dbHelpers.insert({
                title: "Mario", genre: "Scroller"
            });
            expect(addedSecond).toEqual([2]);
        })
    })
})
