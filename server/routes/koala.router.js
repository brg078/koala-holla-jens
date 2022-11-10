const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST
router.post('/',  (req, res) => {
    let newKoala = req.body;
    console.log(`Adding book`, newKoala);
  
    let queryText = `INSERT INTO "books" ("author", "title")`;
    pool.query(queryText, [newBook.author, newBook.title])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
      });
  });

// PUT


// DELETE

module.exports = koalaRouter;