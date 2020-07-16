process.env.NODE_ENV = 'test';

const {describe, it} = require('mocha');
const {expect} = require('chai');

const request = require('supertest');

const app = require('../../app');

describe('Query PARAMETERS', ()=>{
  describe('Page', ()=>{
    it('valid page number', (done)=>{
      request(app)
          .get('/api/books?page=2')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('showing at least 2 results', (done)=>{
      request(app)
          .get('/api/books?page=2')
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
            expect(body['books']).to.have.length.above(1);
          })
          .expect(200, done);
    });

    it('invalid page number', (done)=>{
      request(app)
          .get('/api/books?page=9999')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
            expect(body['books']).to.a('string');
          })
          .expect(200, done);
    });
  });

  describe('Name', ()=>{
    it('proper search text', (done)=>{
      request(app)
          .get('/api/books?name=a')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('showing at least 2 results', (done)=>{
      request(app)
          .get('/api/books?name=b')
          .expect((res)=>{
            const {body} = res;
            expect(body['books']).to.have.length.above(1);
          })
          .expect(200, done);
    });
  });

  describe('Genre', ()=>{
    it('correct genre', (done)=>{
      request(app)
          .get('/api/books?genr=2')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('showing at least 1 result', (done)=>{
      request(app)
          .get('/api/books?genr=2')
          .expect((res)=>{
            const {body} = res;
            expect(body['books']).to.have.length.above(1);
          })
          .expect(200, done);
    });
  });

  describe('Sort', ()=>{
    it('valid param', (done)=>{
      request(app)
          .get('/api/books?sort=desc')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('invalid param', (done)=>{
      request(app)
          .get('/api/books?sort=false')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('message');
          })
          .expect(400, done);
    });

    it('showing at least 3 results', (done)=>{
      request(app)
          .get('/api/books?sort=desc')
          .expect((res)=>{
            const {body} = res;
            expect(body['books']).to.have.length.above(2);
          })
          .expect(200, done);
    });
  });

  describe('CBN', ()=>{
    const CBN = 4578;
    it('books are returned', (done)=>{
      request(app)
          .get(`/api/books?cbNum=${CBN}`)
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('having results in books', (done)=>{
      request(app)
          .get(`/api/books?cbNum=${CBN}`)
          .expect((res)=>{
            const {body} = res;
            expect(body['books']).to.have.length.above(2);
          })
          .expect(200, done);
    });

    it('verfying if results all are greater than given', (done)=>{
      request(app)
          .get(`/api/books?cbNum=${CBN}`)
          .expect((res)=>{
            const {body} = res;
            expect(body['books'].every((book)=>book.cupBoardNumber>CBN)).to.be.true;
          })
          .expect(200, done);
    });
  });

  describe('LTE', ()=>{
    const CBN = 34785;
    it('books are returned', (done)=>{
      request(app)
          .get('/api/books?cbNum=45&lte=desc')
          .expect('Content-Type', /json/)
          .expect((res)=>{
            const {body} = res;
            expect(body).to.have.property('books');
          })
          .expect(200, done);
    });

    it('more than 2 books are there', (done)=>{
      request(app)
          .get('/api/books?cbNum=45&lte=desc')
          .expect((res)=>{
            const {body} = res;
            expect(body['books'].length >= 2).to.be.true;
          })
          .expect(200, done);
    });

    it('verfiy results', (done)=>{
      request(app)
          .get(`/api/books?cbNum=${CBN}&lte=desc`)
          .expect((res)=>{
            const {body} = res;
            expect(body['books'].every((book)=>book.cupBoardNumber<CBN)).to.be.true;
          })
          .expect(200, done);
    });
  });
});
