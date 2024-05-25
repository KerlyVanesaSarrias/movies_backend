const request = require('supertest');
const app = require('../app');

test('GET /genres', async () => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /genres', async () => {
    const newGenre = {
        name: 'Romance'
    }
    const res = await request(app).post('/genres').send(newGenre);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name)
});

test('GET /genres/:id', async () => {
    const res = await request(app).get(`/genres/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /genres/:id', async () => {
    const updatedGenre = {
        name: 'Romantic update'
        }
        const res = await request(app).put(`/genres/${id}`).send(updatedGenre);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedGenre.name);
});



test('DELETE /genres/:id', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204); 
    
});

