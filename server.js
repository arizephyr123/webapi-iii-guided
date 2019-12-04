const express = require('express'); // importing a CommonJS module
const helmet = require("helmet"); // << install the package 1:

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();


//custom middleware
// think of next as a button that moves the req tot he next middleware or route handler
function logger(req, res, next){
  console.log(`${req.method} to ${req.originalUrl}`);
  next(); // w/o this next then sends response and ends
}

function gatekeeper(req, res, next){
  console.log("gatekeeper", req.headers);
  // const pass = req.headers;
  // if(pass.password === "mellon"){
  //   next();
  // } else {
  //   res.status(401).json({ errorMessage: "You are not authourized. Your computer will self destruct in 5..." });
  // }
};

// middleware
//server.use(helmet()); //<< use it 2: if used here globalused in EVERY endpoint
server.use(express.json()); // << built-in middleware
server.use(logger);
server.use(gatekeeper);

// endpoints
server.use('/api/hubs', hubsRouter); // the router is local middleware, because it only applies to api/hubs
//server.use ("/area51", gatekeeper());

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers)
});

server.get("/area51", helmet(), (req, res) => {
  res.send(req.headers)
});

module.exports = server;
