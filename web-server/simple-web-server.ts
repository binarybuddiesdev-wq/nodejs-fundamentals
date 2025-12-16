import http from 'node:http';

const server = http.createServer((req, res) => {
    res.end('OJAS GAMBHEERA');
    console.log('request received');
});

server.listen(54321, '127.0.0.1', () => {
    console.log('server is started');
});