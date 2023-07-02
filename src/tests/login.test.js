const request = require('supertest');
const { app, closeServer } = require('../index');
const User = require('../models/user');
const bcrypt = require('bcrypt');

describe('Login', () => {
    let user;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        user = await User.create({ email: 'test@example.com', password: hashedPassword });
    });

    afterAll(async () => {
        await User.destroy({ where: {} });
        closeServer();
    });

    it('Should return 401 for invalid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'invalid@example.com', password: 'invalidpassword' });

        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Invalid email or password' });
    });

    it('Should return 200 for valid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'testpassword' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ success: true });
    });
});
