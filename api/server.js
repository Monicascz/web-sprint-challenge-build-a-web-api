const express = require('express');
const server = express();
const actionRouter = require('./actions/actions-router.js')
const projectsRouter = require('./projects/projects-router.js')

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req,res)=>{
    res.send(`<h1> Let's pass this sprint! </h1>`)
})

module.exports = server;
