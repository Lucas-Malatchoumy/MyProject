const request = require('supertest');
const { app, closeServer } = require('../index');
const User = require('../models/user');

describe('Register', () => {
    afterAll(() => {
        closeServer();
    });

    afterEach(async () => {
        await User.destroy({ where: {} });
    });

    it('Should return 200 and create a new user for unique email', async () => {
        const testData = { email: 'test@example.com', password: 'testpassword' };

        const res = await request(app)
            .post('/register')
            .send(testData);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ success: true });

        const user = await User.findOne({ where: { email: testData.email } });
        expect(user).toBeTruthy();
        expect(user.email).toBe(testData.email);
    });

    it('Should return 409 for duplicate email', async () => {
        const existingUser = { email: 'existing@example.com', password: 'existingpassword' };
        await User.create(existingUser);

        const testData = { email: 'existing@example.com', password: 'newpassword' };

        const res = await request(app)
            .post('/register')
            .send(testData);

        expect(res.status).toBe(409);
        expect(res.body).toEqual({ error: 'Email already exists' });
    });
});
