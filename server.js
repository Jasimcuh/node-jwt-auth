const express = require('express');
const boddyParser = require('body-parser')
const cors = require('cors')
const api = require('./routes/api')

const PORT = 3000;
const app = express();

app.use(boddyParser.json())
app.use(cors())

app.use('/api', api)

app.get('/', function(req, res){
    res.send('Hello from server')
})

app.listen(PORT,function(){
    console.log('Server running on localhost: ' + PORT);
})