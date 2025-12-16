import http from 'node:http';
import fs from 'node:fs';

const filePath = '../../utils-testing/streams/huge_data.json';
const readableStream = fs.createReadStream(filePath, { highWaterMark: 10 });
const server = http.createServer();

// sending the response using normal readFile
// server.on('request', (req,res) => {
//     fs.readFile(filePath, 'utf-8', (error, data) => {
//         if (error) {
//             console.log('error : ', error);
//             res.end('Something Went Wrong');
//             return;
//         } else {
//             res.end(data);
//         }
//     })
// })



// sending response using the readableStream
// server.on('request', (req,res) => {
//     readableStream.on('data', (chunk) => {
//         res.write(chunk);
//     });
//     readableStream.on('end', () => {
//         res.write('\n\n--- data sending completed ---');
//         res.end();
//     });
//     readableStream.on('error', (error) => {
//         console.log('error : ', error);
//         res.statusCode = 500;
//         res.end('Something Went Wrong');
//     });
// });


// instead of using individual events like reading, writing, error we can use the pipe method which automatically handles everything for us
// it even handles Backpressure for us.
server.on('request', (req, res) => {
    readableStream.pipe(res);
})

server.listen(54321, '127.0.0.1', () => {
    console.log('server is started');
});

