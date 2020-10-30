/************************************************************************ */
/* This is a very simple server.  YOu run it in nodejs, for example

        nodejs server.js 

    This server has the following commands
        * localhost              - resppond with client.html
        * localhost/increment    - increment a count, respond with count in JSON
        * localhost/decrement    - decrement a count, respond with the count in JSON
        * localhost/status       - respond with the count in JSON
*/
/************************************************************************ */
'use strict';           // be picky about errors.  
const { fstat } = require('fs');
let http = require('http');
const { fileURLToPath } = require('url');
const fs = require('fs');

// This is the state object, that is shared among all clients of the server.  
let state = { count: 0 };

console.log("Staring server, accepting connections at port 80 (default)");

/************************************************************************ */
function sendJSONResponse(res, json) {
    res.writeHead(200, { "Content-Type": "text/json" });
    let responseText = JSON.stringify(json);
    res.end(responseText);
    console.log("Sent response: " + responseText);
}

/************************************************************************ */
http.createServer(function (req, res) {
    console.log("RECIEVED REQUEST url='" + req.url + "' at " + (new Date()).toLocaleTimeString());
    if (req.url == "/increment") {
        state.count++;
        sendJSONResponse(res, state);
    }
    if (req.url == "/decrement") {
        --state.count;
        sendJSONResponse(res, state);
    }
    else if (req.url == "/status") {
        sendJSONResponse(res, state);
    }
    else if (req.url == "/") {
        console.log("*********** Recieved Request: ROOT");
        fs.readFile("client.html", (err, fileData) => {
            console.log("Read File  len = " + fileData.length);
            console.assert(!err);
            console.log("Sending Responce for ROOT");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(fileData);
        });
    }
    else {
        console.log("Unknown command " + req.url + " replying with error");
        res.writeHead(400);
        res.end();
    }
}).listen(80);