const express = require('express');
const createError = require('http-errors');

const router = new express.Router();
const Book = require('../models/bookModel.js');

const {isEmpty} = require('../utils/seralizeer.help');
const {searchParams, sanitizeQueryParams, isSortInValid} = require('../utils/search.serializer');

const NUM_RESULTS = 10;

// INDEX READ
router.get('/', sanitizeQueryParams, function(req, res) {
  const {page=1, name='', cbNum=0, genr='', sort='asc', lte=false} = req.query;
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'development') {
    console.table({page, name, cbNum, genr, sort, lte});
  }
  if (isSortInValid(sort)) {
    res.status(400).json(createError(400, `sort must be one of asc and desc`));
  } else {
    const findData = searchParams(name, cbNum, genr, lte);
    Book.find(findData, null, {
      sort: {
        cupBoardNumber: sort,
      },
      limit: NUM_RESULTS,
      skip: NUM_RESULTS*(page-1)}, (onerror, foundBooks) => {
      if (onerror) {
        res.status(500).json(createError(500));
      } else {
        Book.find({...findData}).countDocuments((err, total)=>{
          if (err) {
            res.status(500).json(createError(500));
          } else {
            const count = foundBooks.length;
            const books = count===0?`No Books\n Move Back by ${page-1-(~~(total/NUM_RESULTS))} Page(s)`:foundBooks;
            res.json({count, total, page, books});
          }
        });
      }
    });
  }
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
