const express = require('express'),
    createError = require('http-errors'),
    router = express.Router(),
    Book = require('../models/bookModel.js');

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//READ
router.get('/', function (req, res) {
    Book.find({}, (onerror, foundBooks) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            res.send(foundBooks);
        }
    });
});

//CREATE
router.post('/new', (request, response, next) => {
    if (isEmpty(request.body)) {
        let err = createError(501);
        response.render('error', {
            "message": "Got an Empty Object",
            "error": err
        });
    } else {
        Book.create(request.body, (onerror, createdBook) => {
            if (onerror) {
                console.log(request.body);
                response.status(204).render('error', {
                    "message": "POST object not Good",
                    "error": onerror
                });
            } else {
                response.status(202).send(createdBook);
                // response.redirect("/api/books/show?id=" + createdBook.id.toString())
            }
        })
    }
});

//SHOW
router.get('/show', (request, response) => {
    Book.findById(request.query.id, (onerror, foundBook) => {
        if (onerror) {
            let err = createError(404);
            console.warn(onerror.code, onerror.message);
            response.render('error', {
                "message": "Book not found",
                "error": err
            })
        } else {
            response.send(foundBook)
        }
    })
});


//Update
router.put("/update", (request, response) => {
    Book.findByIdAndUpdate(
        request.query.id,
        request.body,
        (onerror, updateBook) => {
            if (onerror) {
                let err = createError(402);
                console.warn(onerror.code, onerror.message);
                response.render('error', {
                    "message": "Book not found",
                    "error": err
                })
            } else {
                response.status(202).redirect("/api/books/show?id=" + updateBook.id.toString())
            }
        }
    )
});

//Delete
router.delete("/delete", (request, response) => {
    Book.findByIdAndDelete(request.query.id, (onerror) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.redirect("/api/books");
        }
    })
});

module.exports = router;
