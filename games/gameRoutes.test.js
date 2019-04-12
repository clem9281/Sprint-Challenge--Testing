const request = require('supertest');
const db = require('../data/dbConfig');

const app = require('../api/server');

describe("gameRoutes /api/games", () => {
    afterEach(async () => {
        await db('games').truncate();
    })
    describe("/GET", () => {
        it("should return an array", async () => {
            const games = await request(app).get('/api/games');
            expect(games.body).toEqual([])
        })
        it("should return 200 status code", async () => {
            await request(app).get('/api/games').expect(200);
        })
    })
    describe("/POST", () => {
        it("should return 422 if no genre or title is included in the request", async () => {
            await request(app).post('/api/games').send({
                title: "Galaga"
            }).expect(422);
            await request(app).post('/api/games').send({
                genre: 'Arcade'
            }).expect(422);
        })
        it("should return 201 status code", async () => {
            await request(app).post('/api/games').send({
                title: "Galaga", genre: "Arcade"
            }).expect(201);
        })
        it("should add a new game to the database", async () => {
            await request(app).post('/api/games').send({
                title: "Galaga", genre: "Arcade"
            });
            const games = await request(app).get('/api/games');
            expect(games.body).toEqual([{
                title: "Galaga", genre: "Arcade", id: 1, releaseYear: null
            }])
        })
        it("should the game created", async () => {
            const game = await request(app).post('/api/games').send({
                title: "Galaga", genre: "Arcade"
            });
            expect(game.body).toEqual({
                title: "Galaga", genre: "Arcade", releaseYear: null, id: 1
            })
        })
    })
})