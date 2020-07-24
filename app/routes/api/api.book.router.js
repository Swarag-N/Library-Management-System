const express = require('express');
const createError = require('http-errors');

const router = new express.Router();
const Book = require('../../db/models/book.model.js');

const {isEmpty} = require('../../utils/seralizeer.help');
const {searchParams, sanitizeQueryParams, isSortInValid} = require('../../utils/search.serializer');

const NUM_RESULTS = 10;

// INDEX READ
/**
 * @swagger
 * /api/books/:
 *  get:
 *    tags:
 *      - Books
 *    description: List of the Books
 *    summary: LIST
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *      - in: query
 *        name: page
 *        type: int
 *        description: page of query
 *        summary: page of query
 *      - in: query
 *        name: name
 *        type: string
 *        description: name of the book
 *      - in: query
 *        name: cbNum
 *        type: string
 *        description: name of the book
 *      - in: query
 *        name: genr
 *        type: string
 *        description: genre of the book
 *      - in: query
 *        name: sort
 *        type: string
 *        description: genre of the book
 *        enum: [asc, desc]
 *      - in: query
 *        name: lte
 *        type: boolean
 *        description: on giving cupboard number(cbNum)  results are  (n>cbNum), if lte is passed results are (n<cbNum)
 *
 */
router.get('/', sanitizeQueryParams, function(req, res) {
  const {page=1, name='', cbNum=0, genr='', sort='asc', lte=false} = req.query;
  /* istanbul ignore next */
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
      /* istanbul ignore if */
      if (onerror) {
        res.status(500).json(createError(500));
      } else {
        Book.find({...findData}).countDocuments((err, total)=>{
          /* istanbul ignore if */
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
/**
 * @swagger
 * paths:
 *  /api/books/:
 *   post:
 *     tags:
 *       - Books
 *     description: Add a new Book
 *     summary: CREATE
 *     parameters:
 *      - in: body
 *        name: Book
 *        required: true
 *        schema:
 *          type: object
 *     responses:
 *       '201':
 *         description: Successful response
 *       '406':
 *         description: Empty Body
 */
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
/**
 * @swagger
 * paths:
 *  /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Read Book
 *     summary: READ
 *     parameters:
 *      - in: path
 *        name: Book_id
 *        required: true
 *        type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Book Not Found
 */
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
/**
 * @swagger
 * paths:
 *  /api/books/{id}/edit:
 *   put:
 *     tags:
 *       - Books
 *     description: Update Books
 *     summary: UPDATE
 *     responses:
 *       '201':
 *         description: Successful response
 *       '406':
 *         description: Empty Body
 */
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
/**
 * @swagger
 * paths:
 *  /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     description: Delete Books
 *     summary: DELETE
 *     responses:
 *       '201':
 *         description: Successful response
 *       '406':
 *         description: Empty Body
 */
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
