const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const projectsRouter = require('./projects/projects-router.js');

const server = express();

//global middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

//routing middleware
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(
        '<h1>Working at Root</h1>'
    )
})

module.exports = server;