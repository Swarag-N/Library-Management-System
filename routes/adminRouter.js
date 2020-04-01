const AdminBro = require('admin-bro'),
    adminBroExpress = require('admin-bro-expressjs'),
    adminBroMongoose = require('admin-bro-mongoose'),
    Book = require('../models/bookModel');
// express = require('express');

AdminBro.registerAdapter(adminBroMongoose);


const adminBro = new AdminBro({
        resources: [{
            resource: Book,
        }],
        softwareBrothers: false,
        branding: {
            companyName: 'C4P'
        }
    }
);

const router = adminBroExpress.buildRouter(adminBro);
module.exports = router;

// var adminRouter = express.Router();
//
// const Admin = {
//     email: process.env.EMAIL_OF_ADMIN || 'example@c4p.com',
//     password: process.env.PASSWORD_OF_ADMIN || 'coding'
// };
//
// adminBroExpress.buildAuthenticatedRouter(
//     adminBro,
//     {
//         authenticate: async (email, password) => {
//             if (email === Admin.email && password === Admin.password) {
//                 return Admin
//             }
//             return null
//         },
//         cookieName: process.env.COOKIE_ADMIN_NAME || 'C-4-P',
//         cookiePassword: process.env.COOKIE_ADMIN_PASSWORD || 'admin-bro',
//     },
//     adminRouter,
//     {
//         resave: true,
//         saveUninitialized: true
//     }
// );
// module.exports = adminRouter;
