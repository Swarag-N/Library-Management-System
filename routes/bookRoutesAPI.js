const { HttpError } = require('http-errors');

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

// // Use middleware to set the default Content-Type
// router.use((req, res, next)=>{
//     res.header('Content-Type', 'application/json');
//     next();
// });

//INDEX READ
router.get('/', function (req, res) {
    Book.find({}, (onerror, foundBooks) => {
        if (onerror) {
            // console.warn(onerror);
            response.redirect("/");
        } else {
            res.send(foundBooks);
        }
    });
});

//CREATE 
router.post('/', (request, response, next) => {
    if (isEmpty(request.body)) {
        let err = createError(406);
        response.status(406).json(err)
    } else {
        Book.create(request.body, (onerror, createdBook) => {
            if (onerror) {
                response.status(400).json(createError(400,'Parameter Missing'))
            } else {
                response.status(201).json(createdBook);
            }
        })
    }
});

//SHOW READ
router.get('/:id', (request, response) => {
    Book.findById(request.params.id, (onerror, foundBook) => {
        if (onerror) {
            response.status(404).json(createError(404,"Book Not Found"))
        } else {
            response.send(foundBook)
        }
    })
});


//UPDATE 
router.put("/:id/edit", (request, response) => {
    if (isEmpty(request.body)) {
        let err = createError(406);
        response.status(406).json(createError(406))
    }else{
        Book.findByIdAndUpdate(
            request.params.id,
            request.body,
            {new: true},
            (onerror, updateBook) => {
                if (onerror) {
                    response.status(400).json(createError(400))
                } else {
                    response.status(202).json(updateBook)
                }
            }
        )
    }
});

//DELETE
router.delete("/:id", (request, response) => {
    Book.findByIdAndDelete(request.params.id, (onerror) => {
        if (onerror) {
            response.status(400).json(createError(400,onerror.message))
        } else {
            response.status(204).json({message:"Book Deleted"});
        }
    })
});

module.exports = router;
