const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
  database: 'koalas', // name of database
  host: 'localhost', // database server
  port: 5432, // Postgres default
  max: 10, // max queries at once
  idleTimeoutMillis: 30000 // 30 seconds to try to connect before cancelling query
});

// not required, but useful for debugging:
pool.on('connect', () => {
  console.log('postgresql is connected!');
});

pool.on('error', (error) => {
  console.log('error in postgres pool.', error);
})

// GET
koalaRouter.get('/', (req, res) => {
  let queryText = `SELECT * FROM koalas`;

  pool.query(queryText)
    .then( (response) => {
      console.log('query GET successful');
      res.send(response);
    })
    .catch( (error) => {
      console.log('error in query GET:', error);
    })
})

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