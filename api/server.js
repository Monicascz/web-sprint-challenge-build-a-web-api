const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router.js')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/actions', actionRouter)

server.get('/', (req,res)=>{
    res.send(`<h1> Let's pass this sprint! </h1>`)
})

module.exports = server;
