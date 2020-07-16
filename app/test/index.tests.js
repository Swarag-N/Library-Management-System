process.env.NODE_ENV = 'test';

const {describe, it} = require('mocha');
const {expect} = require('chai');

const request = require('supertest');

const app = require('../../app');

describe('Index Route', ()=>{
  it('Index Route', (done)=>{
    request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect((res)=>{
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        })
        .expect(200, done);
  });

  it('404 Route', (done)=>{
    request(app)
        .get('/randomUnknown')
        .expect('Content-Type', /json/)
        .expect((res)=>{
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message');
        })
        .expect(404, done);
  });
});
