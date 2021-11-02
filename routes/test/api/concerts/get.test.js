const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../../server.js');
const Concert = require('../../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    beforeEach(async () => {
        const concert_1 = new Concert({id:1, performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
        await concert_1.save();

        const concert_2 = new Concert({id:2, performer: 'Amanda Doe', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
        await concert_2.save();

        const concert_3 = new Concert({id:3, performer: 'John Doe', genre: 'Rock', price: 30, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
        await concert_3.save();

        const concert_4 = new Concert({id:4, performer: 'Oliver Krauz', genre: 'Rock', price: 20, day: 2, image: '/img/uploads/1fsd324fsdg.jpg'});
        await concert_4.save();
      });

    it('/ should return all concerts of a given performer', async () => {
        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/ should return all concerts of a given genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });
   
    it('/ should return all concerts from a given price range', async () => {
        const res = await request(server).get('/api/concerts/price/30/40');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });
  
    it('/ should return all concerts on a given day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    });

    afterEach(async () => {
        await Concert.deleteMany();
      });
});