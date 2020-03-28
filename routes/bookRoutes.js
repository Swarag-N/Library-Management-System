const express = require('express'),
    router = express.Router(),
    Book = require('../models/bookModel.js');

//READ
router.get('/', function(req, res) {
    Book.find({},(onerror, foundBooks)=>{
        if (onerror){
            console.warn(onerror);
            response.redirect("/");
        }else{
            res.send(foundBooks);
        }
    });
});

//CREATE
router.post('/new',(request,response)=>{
    Book.create(request.body,(onerror,createdBook)=>{
        if (onerror){
            console.warn(onerror);
            response.redirect("/");
        }else{
            response.redirect("/books/"+createdBook.id.toString())
        }
    })

});

//SHOW
router.get('/:id',(request,response)=>{
   Book.findById(request.params.id,(onerror,foundBook)=>{
       if (onerror){
           console.warn(onerror);
           response.redirect("/");
       }else{
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
router.delete("/:id",(request,response)=>{
   Book.findByIdAndDelete(request.params.id,(onerror)=>{
       if (onerror){
           console.warn(onerror);
           response.redirect("/");
       }else{
           response.redirect("/books");
       }
   })
});

module.exports = router;
