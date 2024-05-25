const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
let id;

test('GET /movies', async () => { 
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /movies', async () => {
    const newMovie = {
        name: 'John Wick',
        image: 'https://www.commonsensemedia.org/sites/default/files/styles/ratio_2_3_large/public/product-images/csm-movie/john-wick.jpg',
        synopsis:'New York City is filled with bullets when John Wick, a former hitman, returns from retirement to confront Russian gangsters, led by Viggo Tarasov, who destroyed everything he loved and put a price on his head.',
        release_year: '2014',
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name)
});

test('GET /movies/:id', async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('PUT /movies/:id', async () => {
    const updatedMovie = {
        name: 'John Wick update'
        }
        const res = await request(app).put(`/movies/${id}`).send(updatedMovie);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedMovie.name);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name:'Action'
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        first_name: 'Vane',
        last_name: 'Ravel',
        nationality:'UK',
        image:'https://es.web.img3.acsta.net/c_310_420/pictures/15/05/20/14/58/214953.jpg',
        birthday: '2000-10-11',
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        first_name: 'kerly',
        last_name: 'Ravel',
        nationality:'COL',
        image:'https://es.web.img3.acsta.net/c_310_420/pictures/15/05/20/14/58/214953.jpg',
        birthday: '2000-10-11',
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204); 
    
});



