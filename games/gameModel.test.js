const db = require('../data/dbConfig');
const dbHelpers = require('./gameModel');

describe('gameModel', () => {
    describe("find", () => {
        it("should return an array", async () => {
            const games = await dbHelpers.find();
            expect(games).toEqual([]);
        })
    })
})
