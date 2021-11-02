const expect = require('chai').expect;
const mongoose = require('mongoose');
const Concert = require('../../models/concert.model.js');

describe('Concert', () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });
    
    describe('Reading data', () => {
        before( async () => {
           const concert_1 = new Concert({id:1, performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
           await concert_1.save();

           const concert_2 = new Concert({id:2, performer: 'Amanda Doe', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
           await concert_2.save();

           const concert_3 = new Concert({id:3, performer: 'John Doe', genre: 'Rock', price: 30, day: 1, image: '/img/uploads/1fsd324fsdg.jpg'});
           await concert_3.save();

           const concert_4 = new Concert({id:4, performer: 'Oliver Krauz', genre: 'Rock', price: 20, day: 2, image: '/img/uploads/1fsd324fsdg.jpg'});
           await concert_4.save();
        });

        it('should return all concerts of a given performer using the "find" method', async () => {
           const concerts = await Concert.find({ performer: 'John Doe'});

           expect(concerts).to.be.an('array');
           expect(concerts.length).to.be.equal(2);
           expect(concerts[0].performer).to.be.equal('John Doe');
           expect(concerts[1].performer).to.be.equal('John Doe');
        });
        
        it('should return all concerts of a given genre using the "find" method', async () =>{
          const concerts = await Concert.find({ genre: 'Rock'});

          expect(concerts).to.be.an('array');
          expect(concerts.length).to.be.equal(3);
          expect(concerts[2].performer).to.be.equal('Oliver Krauz');
        });
        
        it('should return all concerts from a given price range using the "find" method', async() => {
          const concerts = await Concert.find({ $and: [{price: {$gte:20} }, {price: {$lte: 30} }]});

          expect(concerts).to.be.an('array');
          expect(concerts.length).to.be.equal(3);
        });
        
        it('should return all concerts on a given day using the "find" method', async () => {
          const concerts = await Concert.find({ day: 2});

          expect(concerts).to.be.an('array');
          expect(concerts.length).to.be.equal(1);
        });

        after(async () => {
            await Concert.deleteMany();
          });

      });

    afterEach(() => {
        mongoose.models = {};
      });
});