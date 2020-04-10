const express = require('express');
const projectsRouter = require('./projectsRouter');

const server = express();

server.use(express());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from localhost"
  res.status(200).json({ api: "sprint challenge", message  });
});

server.use('/api/projects', projectsRouter);

//Middleware
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