const request = require('supertest');
const app = require('../app');
let id;

test('GET /directors', async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /directors', async () => {
    const newDirector = {
        first_name: 'Mark',
        last_name: 'Ravel',
        nationality:'US',
        image:'https://es.web.img3.acsta.net/c_310_420/pictures/15/05/20/14/58/214953.jpg',
        birthday: '1997-03-19',
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.first_name).toBe(newDirector.first_name)
});

test('GET /directors/:id', async () => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /directors/:id', async () => {
    const updatedActor = {
        first_name: 'Maurice update'
        }
        const res = await request(app).put(`/directors/${id}`).send(updatedActor);
        expect(res.status).toBe(200);
        expect(res.body.first_name).toBe(updatedActor.first_name);
});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204); 
    
});

