import http from 'node:http';
import fs from 'node:fs';
import { Transform } from "node:stream";

const server = http.createServer();
const filePath = '../../utils-testing/streams/huge_data.json';
const readableStream = fs.createReadStream(filePath, { highWaterMark: 16 * 1024 });

class FilterActiveUsersTransform extends Transform {
    private leftover = "";

    _transform(chunk: Buffer, encoding: BufferEncoding, callback: Function) {
        // combine leftover from previous chunk
        const data = this.leftover + chunk.toString();

        // split by new line
        const lines = data.split("\n");

        // last line may be incomplete
        this.leftover = lines.pop() || "";

        for (const line of lines) {
            if (!line.trim()) continue;

            try {
                const json = JSON.parse(line);

                if (json.isActive === true) {
                    this.push(JSON.stringify(json) + "\n");
                }
            } catch (err) {
                console.log('error : ', err);
            }
        }

        callback();
    }

    _flush(callback: Function) {
        // process remaining leftover data
        if (this.leftover) {
            try {
                const json = JSON.parse(this.leftover);
                if (json.isActive === true) {
                    this.push(JSON.stringify(json) + "\n");
                }
            } catch { }
        }
        callback();
    }
};

const transformStream = new FilterActiveUsersTransform();

server.on('request', (req, res) => {

    readableStream.pipe(transformStream).pipe(res).on('error', () => {
        res.statusCode = 500;
        res.end('Something Went Wrong');
    });

});

server.listen(54321, '127.0.0.1', () => {
    console.log('server is started');
});