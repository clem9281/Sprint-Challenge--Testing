const db = require('../data/dbConfig');
const dbHelpers = require('./gameModel');

describe('gameModel', () => {
    afterEach(async () => {
        await db('games').truncate();
    })
    beforeEach(async () => {
        await db('games').truncate();
    })
    describe("find", () => {
        it("should return an array", async () => {
            const games = await dbHelpers.find();
            expect(games).toEqual([]);
        })
    })
    describe("insert", () => {
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
    describe("findBy", () => {
        it("should return an array whose only element is the object with the given filter", async () => {
            await dbHelpers.insert({
                title: "Galaga", genre: "Arcade"
            });
            const game = await dbHelpers.findBy({ title: 'Galaga' });
            expect(game).toEqual([{ id: 1, title: "Galaga", genre: "Arcade", releaseYear: null }]);
        })
    })
    describe("remove", () => {
        it("should remove an object from the database", async () => {
            await dbHelpers.insert({
                title: "Galaga", genre: "Arcade"
            });
            await dbHelpers.insert({
                title: "Mario", genre: "Scroller"
            });
            await dbHelpers.remove(1);
            const games = await dbHelpers.find();
            expect(games).toEqual([{ id: 2, title: "Mario", genre: "Scroller", releaseYear: null }]);
        })
        it("should return 1 if it deleted something", async () => {
            await dbHelpers.insert({
                title: "Galaga", genre: "Arcade"
            });
            const deleted = await dbHelpers.remove(1);
            expect(deleted).toBe(1);
        })
        it("should return 0 if it didn't delete something", async () => {
            const deleted = await dbHelpers.remove(1);
            console.log(deleted);
            expect(deleted).toBe(0);
        })
    })
})
