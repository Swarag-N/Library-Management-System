const express = require('express');
const createError = require('http-errors');
const router = new express.Router();
const Book = require('../models/bookModel.js');

/**
 *
 * @param {obj} obj Object
 * @return {int} count
 */
function countProperties(obj) {
  let count = 0;

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      count++;
    }
  }

  return count;
}

// READ
router.get('/', function(req, res) {
  Book.find({}, (onerror, foundBooks) => {
    if (onerror) {
      console.warn(onerror);
      res.redirect('/');
    } else {
      res.render('home', {'booksList': foundBooks});
    }
  });
});

router.get('/new', (request, response) => {
  response.render('new');
});

// CREATE
router.post('/new', (request, response) => {
  if (countProperties(request.body) === 3) {
    Book.create(request.body, (onerror, createdBook) => {
      if (onerror) {
        console.warn(onerror);
        response.redirect('/');
      } else {
        response.redirect('/books/' + createdBook.id.toString());
      }
    });
  } else {
    const err = createError(501);
    response.render('error', {
      'message': 'Form not completely fulled',
      'error': err,
    });
  }
});

// SHOW
router.get('/:id', (request, response) => {
  Book.findById(request.params.id, (onerror, foundBook) => {
    if (onerror) {
      console.warn(onerror);
      response.redirect('/');
    } else {
      response.send(foundBook);
    }
  });
});

// Update
router.put('/:id', (request, response)=>{
  Book.findByIdAndUpdate(
      request.params.id,
      request.body,
      (onerror, updatedBook)=> {
        if (onerror) {
          console.warn(onerror);
          response.redirect('/');
        } else {
          response.send(updatedBook);
        }
      },
  );
});

// Delete
router.delete('/:id', (request, response) => {
  Book.findByIdAndDelete(request.params.id, (onerror) => {
    if (onerror) {
      console.warn(onerror);
      response.redirect('/');
    } else {
      response.redirect('/books');
    }
  });
});

module.exports = router;
