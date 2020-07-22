process.env.NODE_ENV = 'test';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const faker = require('faker');

const request = require('supertest');

const app = require('../../app');


describe('Check Authentication System', ()=>{
  const USERNAME = faker.internet.userName();
  const PASSWORD = 'AQW123@weq';
  let TOKEN = '';
  describe('Sign Up Methods', ()=>{
    it('Proper Data While Login', (done)=>{
      request(app).
          post('/api/auth/signUp').
          send({
            email: faker.internet.email(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            password: PASSWORD,
            username: USERNAME,
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('username');
          }).
          expect(201, done);
    });
    it('Missing Params', (done)=>{
      request(app).
          post('/api/auth/signUp').
          send({
            email: faker.internet.email(),
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            username: faker.internet.userName(),
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
    it('Invalid Password', (done)=>{
      request(app).
          post('/api/auth/signUp').
          send({
            email: faker.internet.email(),
            password: 'assad21323asd',
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            username: faker.internet.userName(),
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
  });

  describe('Login', ()=>{
    it('Proper Way', (done)=>{
      request(app).
          post('/api/auth/login').
          send({
            username: USERNAME,
            password: PASSWORD,
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('token');
            TOKEN = body.token;
          }).
          expect(200, done);
    });
    it('Invalid Username', (done)=>{
      request(app).
          post('/api/auth/login').
          send({
            username: 'USERNAME',
            password: PASSWORD,
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(404, done);
    });
    it('Invalid Password', (done)=>{
      request(app).
          post('/api/auth/login').
          send({
            username: USERNAME,
            password: 'PASSWORD',
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
    it('No Password', (done)=>{
      request(app).
          post('/api/auth/login').
          send({
            username: USERNAME,
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
    it('No Username', (done)=>{
      request(app).
          post('/api/auth/login').
          send({
            password: PASSWORD,
          }).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
  });

  describe('See Account Details', ()=>{
    it('Correct Token', (done)=>{
      request(app).
          get('/api/account').
          set('authorization', `Bearer ${TOKEN}`).
          expect((res)=>{
            const {body} = res;
            expect(body).to.include.all.keys('username', 'email', 'firstname', 'lastname');
          }).
          expect(200, done);
    });
    it('No Token', (done)=>{
      request(app).
          get('/api/account').
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
    it('Invalid Token', (done)=>{
      request(app).
          get('/api/account').
          set('authorization', `Bearer TOKEN`).
          expect((res)=>{
            const {body} = res;
            expect(body).has.property('message');
          }).
          expect(400, done);
    });
  });
});
