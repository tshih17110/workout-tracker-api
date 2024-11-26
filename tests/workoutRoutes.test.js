const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { status } = require('http-status');
const request = require('supertest');
const app = require('../server');

let mongoServer;
let userId;
let token;
let exerciseId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri);

    //Signs up new test user
    const signupResponse = await request(app)
        .post('/auth/signup')
        .send({ name: 'test', email: 'testuser@example.com', password: 'password'});
    
    token = signupResponse.body.token;
    userId = signupResponse.body.user._id; 
    
    //Creates a test exercise
    const exerciseResponse = await request(app)
        .post('/exercise/create')
        .send({
            name: 'Bench Press',
            category: 'Strength',
            muscleGroup: 'Chest'
        });
    
    //Set exercise id
    exerciseId = exerciseResponse.body.exercise._id;
});



describe('Workout routes', () => {

    it('should create a new workout', async () => {
        const res = await request(app)
            .post('/workouts/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user: userId,
                name: 'Test Workout',
                exercises: [{
                    exercise: exerciseId,
                    sets: 3,
                    reps: 10,
                    weight: 50
                }]
        });
        expect(res.statusCode).toBe(status.CREATED);
        expect(res.body).toHaveProperty('workout');
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});
