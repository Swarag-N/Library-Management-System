const AdminBro = require('admin-bro');
const adminBroExpress = require('admin-bro-expressjs');
const adminBroMongoose = require('admin-bro-mongoose');
const Book = require('../models/bookModel');
const express = require('express');

AdminBro.registerAdapter(adminBroMongoose);


const adminBro = new AdminBro({
  resources: [{
    resource: Book,
    options: {
      listProperties: [
        'name',
        'cupBoardNumber',
      ],
    },
  }],
  softwareBrothers: false,
  branding: {
    companyName: 'C4P',
  },
  locale: {
    transactions: {
      labels: {
        Book: 'Library Books',
      },
    },
  },
},
);

// const router = adminBroExpress.buildRouter(adminBro);
// module.exports = router;

const adminRouter = new express.Router();
const Admin = {
  email: process.env.EMAIL_OF_ADMIN || 'example@c4p.com',
  password: process.env.PASSWORD_OF_ADMIN || 'coding',
};

adminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
      authenticate: async (email, password) => {
        if (email === Admin.email && password === Admin.password) {
          return Admin;
        }
        return null;
      },
      cookieName: process.env.COOKIE_ADMIN_NAME || 'C-4-P',
      cookiePassword: process.env.COOKIE_ADMIN_PASSWORD || 'admin-bro',
    },
    adminRouter,
    {
      resave: true,
      saveUninitialized: true,
    },
);
module.exports = adminRouter;
