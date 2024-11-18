const mongoose = require('mongoose');
const { status } = require('http-status');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    await mongoose.connect(uri);

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Exercise routes', () => {

    it('should create a new exercise', async () => {
        const res = await request(app)
            .post('/exercise/create')
            .send({
                name: 'Bench Press',
                category: 'Strength',
                muscleGroup: 'Chest'
            });
        expect(res.statusCode).toBe(status.CREATED);
        expect(res.body.exercise).toHaveProperty('name', 'Bench Press');
        expect(res.body.exercise).toHaveProperty('category', 'Strength');
        expect(res.body.exercise).toHaveProperty('muscleGroup', 'Chest');
    });
});
