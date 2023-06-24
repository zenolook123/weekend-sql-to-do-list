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


todoRouter.put('/:id', (req, res) => {
    const idToUpdate = req.params.id
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

todoRouter.post('/', (req,res) => {

    
})


todoRouter.delete('/', (req,res) => {

    
})



module.exports = todoRouter;