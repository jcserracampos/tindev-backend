const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes')

const server = express();

mongoose.connect('mongodb://dev:1234567890@192.168.99.100:32769/tindev', { 
    useNewUrlParser: true 
})

server.use(cors());
server.use(express.json());
server.use(router);

server.listen(4000);