const express = require('express')
const pool = require('../modules/pool')
const todoRouter = express.Router()

todoRouter.get('/', (req,res) => {
    let queryText = 'SELECT * FROM "tasks"'
    pool.query(queryText).then(results => {
        console.log('routes get')
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting todo data', error)
        res.sendStatus(500)
    })

})

todoRouter.post('/', (req, res) => {
    let task = req.body
    console.log("Inside POST /, req.body:", task);

    let todo = req.body.task;
    let taskCompleted = req.body.completed;
    let dateCompleted = req.body.date.split('T')[0];

    const query = `INSERT INTO "tasks" ("task", "completed", "date") VALUES ($1, $2, $3);`

    pool.query(query, [todo,taskCompleted,dateCompleted])
    .then((result) => {
        console.log("Task inserted into task database.");
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query: ${query}`, error);
        res.sendStatus(500);
    })
});

todoRouter.put('/:id', (req, res) => {
    const idToUpdate = req.params.id
    console.log(req.params)
    let query = `UPDATE "tasks" SET "completed" = NOT "completed"
    WHERE id = $1;`;
    pool.query(query, [idToUpdate])
.then((results) => {
    console.log("Success Updating Task")
    res.sendStatus(200)
})
.catch((error) => {
    console.log('error making DB query', error)
    res.sendStatus(500)
})
});

todoRouter.delete('/:id', (req,res) => {
    let idToDelete = req.params.id;

    let query = `DELETE FROM "tasks" WHERE "id" = $1`

    pool.query(query, [idToDelete])
    .then((results) => {
        console.log("Task Deleted.");
        res.sendStatus(200);
    }).catch((error) => {
        console.log("Error making database query:", error);
        res.sendStatus(500);
    })
    
})





module.exports = todoRouter;