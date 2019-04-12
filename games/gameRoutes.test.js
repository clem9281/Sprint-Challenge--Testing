const request = require('supertest');

const app = require('../api/server');

describe("gameRoutes /api/games", () => {
    describe("/GET", () => {
        it("should return an array", async () => {
            const games = await request(app).get('/api/games');
            expect(games.body).toEqual([])
        })
        it("should return 200 status code", async () => {
            const games = await request(app).get('/api/games').expect(200);
        })
    })
})