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


todoRouter.put('/', (req,res) => {

    
})


todoRouter.post('/', (req,res) => {

    
})


todoRouter.delete('/', (req,res) => {

    
})



module.exports = todoRouter;