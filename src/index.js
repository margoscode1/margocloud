// src/index.js

const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const server = http.createServer((req, res) => {
    // Serve the homepage
    if (req.url === '/' || req.url === '/index.html') {
        serveFile('index.html', 'text/html', res);
    } else if (req.url === '/style.css') {
        serveFile('style.css', 'text/css', res);
    } else if (req.url === '/script.js') {
        serveFile('script.js', 'application/javascript', res);
    } else {
        res.statusCode = 404;
        res.end('404 - Not Found');
    }
});

function serveFile(fileName, contentType, res) {
    const filePath = path.join(__dirname, fileName);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
