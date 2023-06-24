const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const toDoRouter = require('./routes/routes')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.use('/toDoList', toDoRouter)


app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  