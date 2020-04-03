const express = require('express'),
    createError = require('http-errors'),
    router = express.Router(),
    Book = require('../models/bookModel.js');


function countProperties(obj) {
    var count = 0;

    for (var property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }

    return count;
}

//READ
router.get('/', function (req, res) {
    Book.find({}, (onerror, foundBooks) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            res.render('home', {"booksList": foundBooks})
        }
    });
});

router.get('/new', (request, response) => {
    response.render('new')
});

//CREATE
router.post('/new', (request, response) => {
    if (countProperties(request.body) === 3) {
        Book.create(request.body, (onerror, createdBook) => {
            if (onerror) {
                console.warn(onerror);
                response.redirect("/");
            } else {
                response.redirect("/books/" + createdBook.id.toString())
            }
        });
    } else {
        let err = createError(501);
        response.render('error', {
            "message": "Form not completely fulled",
            "error": err
        });
    }
});

//SHOW
router.get('/:id', (request, response) => {
    Book.findById(request.params.id, (onerror, foundBook) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.send(foundBook)
        }
    })
});

//Update
router.put("/:id",(request,response)=>{
    Book.findByIdAndUpdate(
        request.params.id,
        request.body,
        (onerror,updatedBook)=> {
            if (onerror) {
                console.warn(onerror);
                response.redirect("/");
            } else {
                response.send(updatedBook);
            }
        }
    )
});

//Delete
router.delete("/:id", (request, response) => {
    Book.findByIdAndDelete(request.params.id, (onerror) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.redirect("/books");
        }
    })
});

module.exports = router;
