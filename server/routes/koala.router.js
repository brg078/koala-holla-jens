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
  let queryText = `SELECT * FROM koalas ORDER BY "name"`;

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
koalaRouter.post('/',  (req, res) => {
    let newKoala = req.body;
    console.log(`Adding koala`, newKoala);
  
    let queryText = `INSERT INTO "koalas" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new koala`, error);
        res.sendStatus(500);
      });
  });

// PUT
koalaRouter.put('/:id', (req, res) => {
    let koalaId = req.params.id;

    let isReady = req.body.ready_to_transfer
    let param = (isReady === 'true' ? 'false' : 'true')

    let queryText = `
    UPDATE "koalas" 
    SET "ready_to_transfer" = $1 
    WHERE "id" = $2;
    `;


    pool.query(queryText, [param, id]).then (() => {
        res.sendStatus(200);
    }).catch((error) => {
        alert('error updating status to ready to move', error);
        res.sendStatus(500)
    });
});

// DELETE
koalaRouter.delete('/remove/:id', (req, res) => {
    let koalaId = req.params.id;
    let queryText = `DELETE FROM "koalas" WHERE "id"=$1;`;

    pool.query(queryText, [koalaId]).then(() =>{
        res.sendStatus(200);
    }).catch((error) =>{
        alert('error deleting koala', error);
        res.sendStatus(500)
    });
});


// FILTER by Name or Notes
koalaRouter.get('/:filter', (req, res) => {
    let search = req.params.filter;
    let queryText = `SELECT * FROM "koalas" WHERE "name" iLIKE $1 OR "notes" iLIKE $1;`;

    pool.query(queryText, [`%${search}%`]).then((results) =>{
        res.send(results.rows);
    }).catch((error) => {
        alert('error filter by input field', error);
        res.sendStatus(500);
    });
});

module.exports = koalaRouter;