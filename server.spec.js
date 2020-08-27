const request = require('supertest');

const server = require('./server');
const db = require('./database/db-config');

beforeEach(async () => {
    await db('users').truncate();
});

describe('server.js', () =>{
    it('should return a status of 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    })
    it('should return text/html', async () => {
        const res = await request(server).get('/');

        expect(res.type).toBe('text/html');
    })
    it('should return "hello"', async () => {
        const res = await request(server).get('/');
        expect(res.text).toEqual("hello")
    })
    it('should register, login, and update and delete a user', async ()=> {
        const res = await request(server).post('/api/auth/register').send({"username":"ian", "password":"password"}).set('Accept', 'application/json');
        expect(res.status).toBe(201);
        const res2 = await request(server).post('/api/auth/login').send({"username":"ian","password":"password"});
        expect(res2.status).toBe(200);
        const res3 = await request(server).put('/api/auth/update').send({"username":"ian","password":"password2"});
        expect(res3.status).toBe(201);
        const res4 = await request(server).delete('/api/auth/delete').send({"username":"ian"});
        expect(res4.status).toBe(401);
    })
});

