//chatAPI.js
const http = require('http');
const url = require('url');
const fs = require('fs');

// TODO

http.createServer(function (req, res) {
    let path = url.parse(req.url, true).pathname;
    console.log("Request:" + path);
    if (path == "/") {
        // TODO
    } else if (path == "/chat") {
        // TODO
    } else if (path == "/save") {
        // TODO
    } else if (path == "/reload") {
        // TODO
    }
    else {
        res.end();
    }
}).listen(8080);