process.env.NODE_ENV = 'test';

const {describe, it} = require('mocha');
const {expect} = require('chai');

const request = require('supertest');

const app = require('../../app');

let NEW_BOOK_ID;

describe('API OF BOOKS', ()=>{
  describe('CREATE of CRUD', ()=>{
    const data = {
      name: 'RandomName',
      cupBoardNumber: 78443215,
      genre: 'RandomGener',
    };
    describe('NEW', ()=>{
      it('add book with all info', (done)=>{
        request(app)
            .post('/api/books/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect((res)=>{
              const {body} = res;
              NEW_BOOK_ID = body._id;
              expect(body).to.be.an('object');
            })
            .end((err) => {
              if (err) return done(err);
              done();
            });
      });

      it('add book with partial info', (done)=>{
        delete(data.name);
        request(app)
            .post('/api/books/')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res)=>{
              const {body} = res;
              expect(body).to.have.property('message');
            })
            .end((err) => {
              if (err) return done(err);
              done();
            });
      });

      it('add book with no info', (done)=>{
        request(app)
            .post('/api/books/')
            .send({})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(406)
            .expect((res)=>{
              const {body} = res;
              expect(body).to.be.an('object');
              expect(body).to.have.property('message');
            })
            .end((err) => {
              if (err) return done(err);
              done();
            });
      });
    });
  });

  describe('READ of CRUD', ()=>{
    let id;
    it('LIST', (done)=>{
      request(app)
          .get('/api/books/')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            id = res.body['books'][0]._id;
            expect(res.body).to.be.an('object');
          })
          .expect(200, done);
    });

    describe('SHOW', ()=>{
      it('Giving Correct ID', (done)=>{
        request(app)
            .get(`/api/books/${id}`)
            .expect('Content-Type', /json/)
            .expect((res)=>{
              const {body} = res;
              expect(body).to.be.an('object');
              expect(body).to.include.all.keys('genre', 'cupBoardNumber', 'name', '_id');
            })
            .expect(200, done);
      });

      it('Giving Wrong ID', (done)=>{
        request(app)
            .get(`/api/books/thisIsWrongID`)
            .expect('Content-Type', /json/)
            .expect((res)=>{
              const {body} = res;
              expect(body).to.be.an('object');
              expect(body).to.have.property('message');
            })
            .expect(404, done);
      });
    });
  });

  describe('UPDATE of CRUD', ()=>{
    const changes = {
      name: 'NewRandomName',
    };
    it('update with correct id', (done)=>{
      request(app)
          .put(`/api/books/${NEW_BOOK_ID}/edit`)
          .send(changes)
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.include({...changes});
          })
          .expect(202, done);
    });
    it('update with wrong id', (done)=>{
      request(app)
          .put(`/api/books/randomWrongID/edit`)
          .send(changes)
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.be.an('object');
            expect(body).to.have.property('message');
          })
          .expect(400, done);
    });

    it('update with empty data', (done)=>{
      request(app)
          .put(`/api/books/randomWrongID/edit`)
          .send({})
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.be.an('object');
            expect(body).to.have.property('message');
          })
          .expect(406, done);
    });
  });

  describe('DELETE of CRUD', ()=>{
    it('delete with correct id', (done)=>{
      request(app)
          .delete(`/api/books/${NEW_BOOK_ID}`)
          .expect(204, done);
    });

    it('delete with wrond id', (done)=>{
      request(app)
          .delete('/api/books/falseID')
          .expect(400, done);
    });
  });
});
