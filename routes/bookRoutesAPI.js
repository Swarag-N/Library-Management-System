const express = require('express');
const createError = require('http-errors');
const router = new express.Router();
const Book = require('../models/bookModel.js');

/**
 *
 * @param {object} obj object with no keys
 * @return {boolean} true when empty
 */
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
    // if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// // Use middleware to set the default Content-Type
// router.use((req, res, next)=>{
//     res.header('Content-Type', 'application/json');
//     next();
// });

// INDEX READ
router.get('/', function(req, res) {
  Book.find({}, (onerror, foundBooks) => {
    if (onerror) {
      res.status(500).json(createError(500));
    } else {
      res.json(foundBooks);
    }
  });
});

// CREATE
router.post('/', (request, response, next) => {
  if (isEmpty(request.body)) {
    const err = createError(406);
    response.status(406).json(err);
  } else {
    Book.create(request.body, (onerror, createdBook) => {
      if (onerror) {
        response.status(400).json(createError(400, 'Parameter Missing'));
      } else {
        response.status(201).json(createdBook);
      }
    });
  }
});

// SHOW READ
router.get('/:id', (request, response) => {
  Book.findById(request.params.id, (onerror, foundBook) => {
    if (onerror) {
      response.status(404).json(createError(404, 'Book Not Found'));
    } else {
      response.send(foundBook);
    }
  });
});


// UPDATE
router.put('/:id/edit', (request, response) => {
  if (isEmpty(request.body)) {
    response.status(406).json(createError(406));
  } else {
    Book.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true},
        (onerror, updateBook) => {
          if (onerror) {
            response.status(400).json(createError(400));
          } else {
            response.status(202).json(updateBook);
          }
        },
    );
  }
});

// DELETE
router.delete('/:id', (request, response) => {
  Book.findByIdAndDelete(request.params.id, (onerror) => {
    if (onerror) {
      response.status(400).json(createError(400, onerror.message));
    } else {
      response.status(204).send({message: 'Book Deleted'});
    }
  });
});

module.exports = router;
