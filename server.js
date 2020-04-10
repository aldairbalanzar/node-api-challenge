const express = require('express');
// const usersRouter = require('./users/usersRouter.js');

const server = express();

server.use(express());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
    const message = process.env.MESSAGE || "hello from localhost"
  res.status(200).json({ api: "node_api3_project", message  });
})

function logger(req, res, next) {
    const method = req.method;
    const endpoint = req.originalUrl;
    date = Date();
  
    console.log(`logger: 
    method: ${method}
    endpoint: ${endpoint}
    Timestamp: ${date.toString()}`);
    next();
  };
  
  module.exports = server;