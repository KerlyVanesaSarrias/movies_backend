const request = require('supertest');
const app = require('../app');
let id;

test('GET /actors', async () => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /actors', async () => {
    const newActor = {
        first_name: 'Maurice',
        last_name: 'Ravel',
        nationality:'UK',
        image:'https://es.web.img3.acsta.net/c_310_420/pictures/15/05/20/14/58/214953.jpg',
        birthday: '1933-03-14',
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.first_name).toBe(newActor.first_name)
});

test('GET /actors/:id', async () => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /actors/:id', async () => {
    const updatedActor = {
        first_name: 'Maurice update'
        }
        const res = await request(app).put(`/actors/${id}`).send(updatedActor);
        expect(res.status).toBe(200);
        expect(res.body.first_name).toBe(updatedActor.first_name);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204); 
    
});

