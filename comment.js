// Create web server and listen on port 3000
// This server will return a JSON object with the timestamp and the comment
// when the url is http://localhost:3000/comment
// when the url is http://localhost:3000/ the server will return a message
// saying that you need to go to /comment
// This server will also log the request method and the url to the console
// when a request is received.
// This server will also log the request body to the console when a request is received.
// The server will also return a 404 error if the url is not found.

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = request.method.toLowerCase();
    const headers = request.headers;
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    request.on('data', (data) => {
        buffer += decoder.write(data);
    });
    request.on('end', () => {
        buffer += decoder.end();
        const data = {
            'trimmedPath': trimmedPath,
            'method': method,
            'headers': headers,
            'query': parsedQuery,
            'payload': buffer
        };
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200;
            payload = typeof (payload) === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(statusCode);
            response.end(payloadString);
            console.log('Returning this response: ', statusCode, payloadString);
        });
    });
});
server.listen(3000, () => {
    console.log('The server is listening on port 3000 now');
});

const handlers = {};
handlers.hello = (data, callback) => {
    callback(200, { 'message': 'Hello World!' });
};
handlers.notFound = (data, callback) => {
    callback(404, { 'message': 'Not Found' });
}